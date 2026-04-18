/**
 * Token-Optimized Paper Generation Orchestrator
 * 
 * Handles multi-agent workflow with aggressive token management:
 * - Caveman mode for inter-agent communication
 * - Streaming responses to avoid context buildup
 * - Memory-based state persistence
 * - File-based handoffs instead of context passing
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface PaperGenerationConfig {
  topic: string;
  paperType: 'survey' | 'empirical' | 'theoretical' | 'methodological' | 'auto';
  scope: 'narrow' | 'medium' | 'broad';
  domain?: string;
  emphasis?: string[];
  constraints?: string[];
  maxIterations?: number;
  targetLength?: 'short' | 'medium' | 'long'; // 4-6 pages, 8-12 pages, 15+ pages
}

export interface QualityGate {
  name: string;
  status: 'pending' | 'pass' | 'fail' | 'skip';
  score?: number;
  issues?: string[];
  timestamp?: Date;
}

export interface AgentTask {
  id: string;
  agent: string;
  task: string;
  status: 'pending' | 'running' | 'complete' | 'failed' | 'blocked';
  output?: string;
  tokenUsage?: number;
  startTime?: Date;
  endTime?: Date;
  error?: string;
}

export interface OrchestrationState {
  sessionId: string;
  slug: string;
  config: PaperGenerationConfig;
  phase: 'init' | 'planning' | 'research' | 'synthesis' | 'writing' | 'review' | 'iteration' | 'complete' | 'failed';
  currentIteration: number;
  tasks: AgentTask[];
  qualityGates: QualityGate[];
  artifacts: Record<string, string>; // filename -> path
  totalTokens: number;
  estimatedCompletion?: Date;
  userInteractions: UserInteraction[];
  memoryKeys: string[]; // Keys stored in persistent memory
}

export interface UserInteraction {
  id: string;
  type: 'question' | 'clarification' | 'approval' | 'feedback';
  question: string;
  options?: string[];
  response?: string;
  timestamp: Date;
}

/**
 * Token Optimization Strategies
 */
export class TokenOptimizer {
  private static readonly CAVEMAN_MODES = {
    'agent-to-agent': 'ultra', // Maximum compression for inter-agent communication
    'agent-to-file': 'full',   // Moderate compression for file outputs
    'agent-to-user': 'lite',   // Minimal compression for user-facing content
  };

  /**
   * Compress prompt using caveman mode
   */
  static compressPrompt(prompt: string, mode: keyof typeof TokenOptimizer.CAVEMAN_MODES): string {
    const cavemanLevel = this.CAVEMAN_MODES[mode];
    
    // Add caveman instruction prefix
    const cavemanPrefix = `[CAVEMAN MODE: ${cavemanLevel}] Respond ultra-compressed. Drop articles/filler/hedging. Technical accuracy preserved. Fragments OK.`;
    
    return `${cavemanPrefix}\n\n${prompt}`;
  }

  /**
   * Extract only essential information from agent response
   */
  static extractEssentials(response: string, essentialKeys: string[]): Record<string, any> {
    const essentials: Record<string, any> = {};
    
    // Parse structured data from response
    for (const key of essentialKeys) {
      const regex = new RegExp(`${key}:\\s*(.+?)(?=\\n|$)`, 'i');
      const match = response.match(regex);
      if (match) {
        essentials[key] = match[1].trim();
      }
    }
    
    return essentials;
  }

  /**
   * Summarize long content for context
   */
  static summarizeForContext(content: string, maxTokens: number = 500): string {
    // Rough token estimation: 1 token ≈ 4 characters
    const maxChars = maxTokens * 4;
    
    if (content.length <= maxChars) {
      return content;
    }
    
    // Extract key sections
    const sections = content.split('\n\n');
    const summary: string[] = [];
    let currentLength = 0;
    
    for (const section of sections) {
      if (currentLength + section.length > maxChars) {
        break;
      }
      summary.push(section);
      currentLength += section.length;
    }
    
    return summary.join('\n\n') + '\n\n[... truncated for token efficiency ...]';
  }
}

/**
 * Memory-based state manager to avoid context buildup
 */
export class StateManager {
  private stateDir: string;
  private sessionId: string;

  constructor(sessionId: string, workspaceRoot: string) {
    this.sessionId = sessionId;
    this.stateDir = join(workspaceRoot, '.paper-gen-state', sessionId);
  }

  /** Session storage directory for Pi prompts and agent output files */
  getStateDir(): string {
    return this.stateDir;
  }

  /**
   * Save state to disk (not in context)
   */
  saveState(state: OrchestrationState): void {
    const statePath = join(this.stateDir, 'state.json');
    writeFileSync(statePath, JSON.stringify(state, null, 2));
  }

  /**
   * Load state from disk
   */
  loadState(): OrchestrationState | null {
    const statePath = join(this.stateDir, 'state.json');
    if (!existsSync(statePath)) {
      return null;
    }
    return JSON.parse(readFileSync(statePath, 'utf-8'));
  }

  /**
   * Save artifact to disk
   */
  saveArtifact(filename: string, content: string): string {
    const artifactPath = join(this.stateDir, 'artifacts', filename);
    writeFileSync(artifactPath, content);
    return artifactPath;
  }

  /**
   * Load artifact from disk
   */
  loadArtifact(filename: string): string | null {
    const artifactPath = join(this.stateDir, 'artifacts', filename);
    if (!existsSync(artifactPath)) {
      return null;
    }
    return readFileSync(artifactPath, 'utf-8');
  }

  /**
   * Get lightweight state summary for context
   */
  getStateSummary(state: OrchestrationState): string {
    return TokenOptimizer.compressPrompt(
      `Session: ${state.sessionId}
Topic: ${state.config.topic}
Phase: ${state.phase}
Iteration: ${state.currentIteration}/${state.config.maxIterations || 4}
Tasks: ${state.tasks.filter(t => t.status === 'complete').length}/${state.tasks.length} complete
Gates: ${state.qualityGates.filter(g => g.status === 'pass').length}/${state.qualityGates.length} passed
Tokens: ${state.totalTokens}`,
      'agent-to-agent'
    );
  }
}

/**
 * Agent executor with token tracking
 */
export class AgentExecutor {
  private tokenUsage: Map<string, number> = new Map();

  /**
   * Execute agent with token optimization
   */
  async executeAgent(
    agentName: string,
    task: string,
    context: Record<string, any>,
    outputFile: string,
    stateManager: StateManager,
    appRoot: string,
    workingDir: string,
    sessionDir: string
  ): Promise<{ output: string; tokens: number }> {
    // Import Pi integration
    const { executeSubagent } = await import('./pi-integration');
    
    // Execute via Pi subagent system
    const result = await executeSubagent(
      {
        agent: agentName,
        task,
        outputFile,
        context,
        clarify: false,
        async: false
      },
      appRoot,
      workingDir,
      sessionDir
    );
    
    // Track tokens
    this.tokenUsage.set(agentName, (this.tokenUsage.get(agentName) || 0) + result.tokens);
    
    if (!result.success) {
      throw new Error(result.error || 'Agent execution failed');
    }
    
    return {
      output: result.output, // File path
      tokens: result.tokens
    };
  }

  /**
   * Build minimal context from full context
   */
  private buildMinimalContext(context: Record<string, any>): string {
    const essential = {
      slug: context.slug,
      phase: context.phase,
      iteration: context.iteration,
      priorOutputs: context.priorOutputs?.map((f: string) => f.split('/').pop()) // Just filenames
    };
    
    return JSON.stringify(essential);
  }

  /**
   * Get total token usage
   */
  getTotalTokens(): number {
    return Array.from(this.tokenUsage.values()).reduce((sum, tokens) => sum + tokens, 0);
  }

  /**
   * Get token usage by agent
   */
  getTokensByAgent(): Record<string, number> {
    return Object.fromEntries(this.tokenUsage);
  }
}

/**
 * Main orchestrator
 */
export class PaperOrchestrator {
  private stateManager: StateManager;
  private agentExecutor: AgentExecutor;
  private state: OrchestrationState;
  /** Repo root — Pi CLI and Bohr paths must resolve from here when `cwd` is a subfolder. */
  private readonly workspaceRoot: string;

  constructor(sessionId: string, workspaceRoot: string) {
    this.workspaceRoot = workspaceRoot;
    this.stateManager = new StateManager(sessionId, workspaceRoot);
    this.agentExecutor = new AgentExecutor();
    
    // Try to load existing state
    const existingState = this.stateManager.loadState();
    if (existingState) {
      this.state = existingState;
    } else {
      // Initialize new state
      this.state = {
        sessionId,
        slug: '',
        config: {} as PaperGenerationConfig,
        phase: 'init',
        currentIteration: 0,
        tasks: [],
        qualityGates: [],
        artifacts: {},
        totalTokens: 0,
        userInteractions: [],
        memoryKeys: []
      };
    }
  }

  /**
   * Initialize paper generation
   */
  async initialize(config: PaperGenerationConfig): Promise<UserInteraction[]> {
    this.state.config = config;
    this.state.slug = this.generateSlug(config.topic);
    this.state.phase = 'planning';
    
    // Analyze topic and generate clarifying questions
    const questions = await this.analyzeTopicAndGenerateQuestions(config);
    
    this.stateManager.saveState(this.state);
    return questions;
  }

  /**
   * Analyze topic and generate clarifying questions
   */
  private async analyzeTopicAndGenerateQuestions(config: PaperGenerationConfig): Promise<UserInteraction[]> {
    const questions: UserInteraction[] = [];
    
    // Question 1: Paper type (if auto)
    if (config.paperType === 'auto') {
      questions.push({
        id: 'paper-type',
        type: 'question',
        question: 'What type of paper do you want to write?',
        options: [
          'Survey/Review - Comprehensive overview of existing research',
          'Empirical - Original experiments and results',
          'Theoretical - Mathematical analysis and proofs',
          'Methodological - New method or framework'
        ],
        timestamp: new Date()
      });
    }
    
    // Question 2: Scope
    questions.push({
      id: 'scope',
      type: 'question',
      question: 'What is the scope of your paper?',
      options: [
        'Narrow - Focused on specific method/problem (4-6 pages)',
        'Medium - Moderate coverage (8-12 pages)',
        'Broad - Comprehensive survey (15+ pages)'
      ],
      timestamp: new Date()
    });
    
    // Question 3: Domain/Field
    questions.push({
      id: 'domain',
      type: 'question',
      question: 'What is the primary research domain?',
      options: [
        'Machine Learning / AI',
        'Computer Vision',
        'Natural Language Processing',
        'Systems / Architecture',
        'Theory / Algorithms',
        'Other (specify)'
      ],
      timestamp: new Date()
    });
    
    // Question 4: Emphasis
    questions.push({
      id: 'emphasis',
      type: 'question',
      question: 'What aspects should we emphasize? (Select multiple)',
      options: [
        'Novelty and innovation',
        'Empirical results and benchmarks',
        'Theoretical rigor',
        'Practical applications',
        'Computational efficiency',
        'Reproducibility'
      ],
      timestamp: new Date()
    });
    
    this.state.userInteractions = questions;
    return questions;
  }

  /**
   * Process user responses and refine plan
   */
  async processUserResponses(responses: Record<string, string>): Promise<void> {
    // Update config based on responses
    if (responses['paper-type']) {
      this.state.config.paperType = this.parsePaperType(responses['paper-type']);
    }
    
    if (responses['scope']) {
      this.state.config.scope = this.parseScope(responses['scope']);
    }
    
    if (responses['domain']) {
      this.state.config.domain = responses['domain'];
    }
    
    if (responses['emphasis']) {
      this.state.config.emphasis = responses['emphasis'].split(',');
    }
    
    // Generate execution plan
    await this.generateExecutionPlan();
    
    this.stateManager.saveState(this.state);
  }

  /**
   * Generate execution plan based on config
   */
  private async generateExecutionPlan(): Promise<void> {
    const { paperType, scope } = this.state.config;
    
    // Define quality gates
    this.state.qualityGates = [
      { name: 'Evidence Sufficiency', status: 'pending' },
      { name: 'Logical Consistency', status: 'pending' },
      { name: 'Draft Quality', status: 'pending' },
      { name: 'Citation Integrity', status: 'pending' },
      { name: 'Peer Review', status: 'pending' },
      { name: 'Compliance', status: 'pending' }
    ];
    
    // Define agent tasks based on paper type
    this.state.tasks = this.getTasksForPaperType(paperType);
    
    this.state.phase = 'research';
  }

  /**
   * Get tasks for specific paper type
   */
  private getTasksForPaperType(paperType: string): AgentTask[] {
    const baseTasks: AgentTask[] = [
      { id: 'plan', agent: 'research-planner', task: 'Create research plan', status: 'pending' },
    ];
    
    switch (paperType) {
      case 'survey':
        return [
          ...baseTasks,
          { id: 'lit-collect', agent: 'literature-collector', task: 'Collect papers', status: 'pending' },
          { id: 'lit-quality', agent: 'literature-quality', task: 'Assess quality', status: 'pending' },
          { id: 'lit-synth', agent: 'literature-synthesizer', task: 'Synthesize findings', status: 'pending' },
          { id: 'lit-gap', agent: 'literature-gap', task: 'Identify gaps', status: 'pending' },
          { id: 'knowledge-graph', agent: 'knowledge-graph', task: 'Build knowledge graph', status: 'pending' },
          { id: 'write', agent: 'literature-review-writer', task: 'Write paper', status: 'pending' },
          { id: 'cite', agent: 'verifier', task: 'Add citations', status: 'pending' },
          { id: 'review', agent: 'reviewer', task: 'Peer review', status: 'pending' },
          { id: 'compliance', agent: 'paper-compliance', task: 'Check compliance', status: 'pending' }
        ];
      
      case 'empirical':
        return [
          ...baseTasks,
          { id: 'hypothesis', agent: 'hypothesis', task: 'Generate hypotheses', status: 'pending' },
          { id: 'lit-collect', agent: 'literature-collector', task: 'Collect papers', status: 'pending' },
          { id: 'experiment', agent: 'experiment', task: 'Design experiments', status: 'pending' },
          { id: 'write', agent: 'writer', task: 'Write paper', status: 'pending' },
          { id: 'method-math', agent: 'method-math', task: 'Validate methods', status: 'pending' },
          { id: 'figures', agent: 'figures-tables', task: 'Create figures', status: 'pending' },
          { id: 'cite', agent: 'verifier', task: 'Add citations', status: 'pending' },
          { id: 'review', agent: 'reviewer', task: 'Peer review', status: 'pending' },
          { id: 'compliance', agent: 'paper-compliance', task: 'Check compliance', status: 'pending' }
        ];
      
      case 'theoretical':
        return [
          ...baseTasks,
          { id: 'hypothesis', agent: 'hypothesis', task: 'Formulate claims', status: 'pending' },
          { id: 'lit-collect', agent: 'literature-collector', task: 'Collect papers', status: 'pending' },
          { id: 'method-math', agent: 'method-math', task: 'Formal framework', status: 'pending' },
          { id: 'reasoning', agent: 'reasoning-validator', task: 'Validate reasoning', status: 'pending' },
          { id: 'write', agent: 'writer', task: 'Write paper', status: 'pending' },
          { id: 'cite', agent: 'verifier', task: 'Add citations', status: 'pending' },
          { id: 'review', agent: 'reviewer', task: 'Peer review', status: 'pending' },
          { id: 'compliance', agent: 'paper-compliance', task: 'Check compliance', status: 'pending' }
        ];

      case 'methodological':
        return [
          ...baseTasks,
          { id: 'lit-collect', agent: 'literature-collector', task: 'Collect papers', status: 'pending' },
          { id: 'experiment', agent: 'experiment', task: 'Evaluation design', status: 'pending' },
          { id: 'method-math', agent: 'method-math', task: 'Formalize method', status: 'pending' },
          { id: 'figures', agent: 'figures-tables', task: 'Figures & tables', status: 'pending' },
          { id: 'write', agent: 'writer', task: 'Write paper', status: 'pending' },
          { id: 'cite', agent: 'verifier', task: 'Add citations', status: 'pending' },
          { id: 'review', agent: 'reviewer', task: 'Peer review', status: 'pending' },
          { id: 'compliance', agent: 'paper-compliance', task: 'Check compliance', status: 'pending' }
        ];
      
      default:
        return baseTasks;
    }
  }

  /**
   * Execute workflow
   */
  async execute(progressCallback?: (state: OrchestrationState) => void): Promise<void> {
    while (this.state.phase !== 'complete' && this.state.phase !== 'failed') {
      // Execute next pending task
      const nextTask = this.state.tasks.find(t => t.status === 'pending');
      
      if (!nextTask) {
        const anyFailed = this.state.tasks.some((t) => t.status === 'failed');
        if (anyFailed) {
          this.state.phase = 'failed';
        } else {
          // All tasks complete, check quality gates
          await this.checkQualityGates();

          if (this.shouldIterate()) {
            this.state.currentIteration++;
            this.state.phase = 'iteration';
            await this.planIteration();
          } else {
            this.state.phase = 'complete';
          }
        }
      } else {
        // Execute task
        await this.executeTask(nextTask);
      }
      
      // Save state and notify progress
      this.stateManager.saveState(this.state);
      if (progressCallback) {
        progressCallback(this.state);
      }
    }
  }

  /**
   * Execute single task
   */
  private async executeTask(task: AgentTask): Promise<void> {
    task.status = 'running';
    task.startTime = new Date();
    
    try {
      const outputFile = `${this.state.slug}-${task.id}.md`;
      const context = {
        slug: this.state.slug,
        phase: this.state.phase,
        iteration: this.state.currentIteration,
        priorOutputs: Object.values(this.state.artifacts)
      };
      
      // Pi must run with monorepo root so node_modules/@mariozechner/pi-coding-agent and extensions resolve.
      const appRoot = this.workspaceRoot;
      const workingDir = this.workspaceRoot;
      const sessionDir = this.stateManager.getStateDir();
      
      const result = await this.agentExecutor.executeAgent(
        task.agent,
        task.task,
        context,
        outputFile,
        this.stateManager,
        appRoot,
        workingDir,
        sessionDir
      );
      
      const outputRelative = result.output;
      const outputAbsolute = join(sessionDir, outputRelative);
      task.output = outputAbsolute;
      task.tokenUsage = result.tokens;
      task.status = 'complete';
      task.endTime = new Date();
      
      this.state.artifacts[task.id] = outputAbsolute;
      this.state.totalTokens += result.tokens;
      
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);
      task.endTime = new Date();
    }
  }

  /**
   * Check quality gates
   */
  private async checkQualityGates(): Promise<void> {
    // Placeholder - would implement actual gate checks
    for (const gate of this.state.qualityGates) {
      if (gate.status === 'pending') {
        gate.status = 'pass'; // Simplified
        gate.timestamp = new Date();
      }
    }
  }

  /**
   * Determine if iteration is needed
   */
  private shouldIterate(): boolean {
    const failedGates = this.state.qualityGates.filter(g => g.status === 'fail');
    const maxIterations = this.state.config.maxIterations || 4;
    
    return failedGates.length > 0 && this.state.currentIteration < maxIterations;
  }

  /**
   * Plan next iteration
   */
  private async planIteration(): Promise<void> {
    // Add remediation tasks based on failed gates
    const failedGates = this.state.qualityGates.filter(g => g.status === 'fail');
    
    for (const gate of failedGates) {
      // Add targeted tasks to fix issues
      // Simplified for now
    }
  }

  /**
   * Get current state
   */
  getState(): OrchestrationState {
    return this.state;
  }

  /**
   * Generate slug from topic
   */
  private generateSlug(topic: string): string {
    return topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 5)
      .join('-');
  }

  /**
   * Parse paper type from user response
   */
  private parsePaperType(response: string): 'survey' | 'empirical' | 'theoretical' | 'methodological' {
    if (response.includes('Survey')) return 'survey';
    if (response.includes('Empirical')) return 'empirical';
    if (response.includes('Theoretical')) return 'theoretical';
    return 'methodological';
  }

  /**
   * Parse scope from user response
   */
  private parseScope(response: string): 'narrow' | 'medium' | 'broad' {
    if (response.includes('Narrow')) return 'narrow';
    if (response.includes('Broad')) return 'broad';
    return 'medium';
  }
}
