/**
 * Integration with Pi subagent system
 * Executes agents using the existing Pi infrastructure
 */

import { spawn } from 'child_process';
import { resolve } from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { buildPiArgs, buildPiEnv, resolvePiPaths, type PiRuntimeOptions } from '../pi/runtime';
import { getBohrAgentDir } from '../config/paths';

export interface SubagentExecutionOptions {
  agent: string;
  task: string;
  outputFile: string;
  context?: Record<string, any>;
  clarify?: boolean;
  async?: boolean;
  /** When omitted, resolved from ENABLE_TOKEN_OPTIMIZATION and CAVEMAN_MODE_DEFAULT (see resolveDefaultCavemanMode). */
  cavemanMode?: 'lite' | 'full' | 'ultra';
}

export interface SubagentResult {
  success: boolean;
  output: string;
  tokens: number;
  error?: string;
}

/**
 * Default caveman intensity for Pi subagent runs when callers omit `cavemanMode`.
 * Honors `ENABLE_TOKEN_OPTIMIZATION` and `CAVEMAN_MODE_DEFAULT` from the environment (after dotenv loads in CLI).
 */
export function resolveDefaultCavemanMode(): 'lite' | 'full' | 'ultra' {
  if (process.env.ENABLE_TOKEN_OPTIMIZATION === 'false') {
    return 'lite';
  }
  const raw = process.env.CAVEMAN_MODE_DEFAULT?.trim().toLowerCase();
  if (raw === 'lite' || raw === 'full' || raw === 'ultra') {
    return raw;
  }
  return 'ultra';
}

/**
 * Execute a Pi subagent with token optimization
 */
export async function executeSubagent(
  options: SubagentExecutionOptions,
  appRoot: string,
  workingDir: string,
  sessionDir: string
): Promise<SubagentResult> {
  const {
    agent,
    task,
    outputFile,
    context = {},
    clarify = false,
    async = false,
    cavemanMode: cavemanModeOpt
  } = options;

  const cavemanMode = cavemanModeOpt ?? resolveDefaultCavemanMode();

  try {
    // Build caveman-optimized prompt
    const cavemanPrefix = getCavemanPrefix(cavemanMode);
    const compressedTask = `${cavemanPrefix}\n\n${task}`;
    
    // Build minimal context
    const minimalContext = buildMinimalContext(context);
    
    // Create agent invocation prompt
    const agentPrompt = buildAgentPrompt(agent, compressedTask, minimalContext, outputFile);
    
    // Write prompt to temp file
    const promptFile = resolve(sessionDir, `prompt-${agent}-${Date.now()}.txt`);
    writeFileSync(promptFile, agentPrompt);
    
    // Execute via Pi
    const result = await executePiSubagent(
      agentPrompt,
      appRoot,
      workingDir,
      sessionDir,
      clarify,
      async
    );
    
    // Read output from file
    const outputPath = resolve(sessionDir, outputFile);
    const output = existsSync(outputPath) ? readFileSync(outputPath, 'utf-8') : '';
    
    // Estimate tokens (rough: 1 token ≈ 4 characters)
    const tokens = Math.ceil((agentPrompt.length + output.length) / 4);
    
    return {
      success: result.success,
      output: outputFile, // Return file path, not content
      tokens,
      error: result.error
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      tokens: 0,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Get caveman mode prefix
 */
function getCavemanPrefix(mode: 'lite' | 'full' | 'ultra'): string {
  const prefixes = {
    lite: '[CAVEMAN MODE: lite] Respond concisely. No filler. Keep articles. Professional.',
    full: '[CAVEMAN MODE: full] Drop articles/filler. Fragments OK. Technical accuracy preserved.',
    ultra: '[CAVEMAN MODE: ultra] Max compression. Abbreviate. Arrows for causality. One word when enough.'
  };
  
  return prefixes[mode];
}

/**
 * Build minimal context from full context
 */
function buildMinimalContext(context: Record<string, any>): string {
  // Extract only essential fields
  const essential: Record<string, any> = {};
  
  const essentialKeys = ['slug', 'phase', 'iteration', 'priorOutputs'];
  for (const key of essentialKeys) {
    if (context[key] !== undefined) {
      // If it's an array of file paths, just keep filenames
      if (Array.isArray(context[key])) {
        essential[key] = context[key].map((item: string) => 
          typeof item === 'string' ? item.split('/').pop() : item
        );
      } else {
        essential[key] = context[key];
      }
    }
  }
  
  return JSON.stringify(essential);
}

/**
 * Build agent invocation prompt
 */
function buildAgentPrompt(
  agent: string,
  task: string,
  context: string,
  outputFile: string
): string {
  return `Execute subagent: ${agent}

Task: ${task}

Context: ${context}

Output: Write results to ${outputFile}

Rules:
- Write output directly to file
- Use caveman mode (already active)
- No verbose explanations
- Focus on deliverables`;
}

/**
 * Execute Pi subagent using existing Pi infrastructure
 */
async function executePiSubagent(
  prompt: string,
  appRoot: string,
  workingDir: string,
  sessionDir: string,
  clarify: boolean,
  async: boolean
): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve, reject) => {
    const bohrAgentDir = getBohrAgentDir();
    const paths = resolvePiPaths(appRoot);
    
    // Build Pi runtime options
    const runtimeOptions: PiRuntimeOptions = {
      appRoot,
      workingDir,
      sessionDir,
      bohrAgentDir,
      mode: 'text',
      oneShotPrompt: prompt
    };
    
    // Build Pi arguments and environment
    const args = buildPiArgs(runtimeOptions);
    const env = buildPiEnv(runtimeOptions);
    
    // Spawn Pi process
    const piProcess = spawn(
      process.execPath,
      [paths.piCliPath, ...args],
      {
        cwd: workingDir,
        env,
        stdio: async ? 'ignore' : 'pipe'
      }
    );
    
    let stdout = '';
    let stderr = '';
    
    if (!async) {
      piProcess.stdout?.on('data', (data) => {
        stdout += data.toString();
      });
      
      piProcess.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
    }
    
    piProcess.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true });
      } else {
        resolve({
          success: false,
          error: `Pi process exited with code ${code}: ${stderr}`
        });
      }
    });
    
    piProcess.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });
    
    // If async, resolve immediately
    if (async) {
      resolve({ success: true });
    }
  });
}

/**
 * Execute multiple subagents in parallel
 */
export async function executeSubagentsParallel(
  agents: SubagentExecutionOptions[],
  appRoot: string,
  workingDir: string,
  sessionDir: string,
  maxConcurrency: number = 4
): Promise<SubagentResult[]> {
  const results: SubagentResult[] = [];
  
  // Execute in batches
  for (let i = 0; i < agents.length; i += maxConcurrency) {
    const batch = agents.slice(i, i + maxConcurrency);
    const batchResults = await Promise.all(
      batch.map(agent => executeSubagent(agent, appRoot, workingDir, sessionDir))
    );
    results.push(...batchResults);
  }
  
  return results;
}

/**
 * Check if a subagent exists
 */
export function subagentExists(agentName: string, appRoot: string): boolean {
  const agentPath = resolve(appRoot, '.bohr', 'agents', `${agentName}.md`);
  return existsSync(agentPath);
}

/**
 * Get list of available subagents
 */
export function listSubagents(appRoot: string): string[] {
  const agentsDir = resolve(appRoot, '.bohr', 'agents');
  if (!existsSync(agentsDir)) {
    return [];
  }
  
  const { readdirSync } = require('fs');
  return readdirSync(agentsDir)
    .filter((file: string) => file.endsWith('.md'))
    .map((file: string) => file.replace('.md', ''));
}
