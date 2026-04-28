/**
 * API endpoints for paper generation UI
 */

import { PaperOrchestrator, PaperGenerationConfig, OrchestrationState } from './orchestrator.js';
import { exportToWord, exportToPDF } from './exporters.js';

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Session manager to track active paper generation sessions
 */
class SessionManager {
  private sessions: Map<string, PaperOrchestrator> = new Map();

  createSession(workspaceRoot: string): string {
    const sessionId = this.generateSessionId();
    const orchestrator = new PaperOrchestrator(sessionId, workspaceRoot);
    this.sessions.set(sessionId, orchestrator);
    return sessionId;
  }

  getSession(sessionId: string): PaperOrchestrator | undefined {
    return this.sessions.get(sessionId);
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  private generateSessionId(): string {
    return `paper-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

const sessionManager = new SessionManager();

/**
 * API Handlers
 */

/**
 * POST /api/paper/init
 * Initialize a new paper generation session
 */
export async function initializePaper(
  config: PaperGenerationConfig,
  workspaceRoot: string
): Promise<APIResponse<{ sessionId: string; questions: any[] }>> {
  try {
    const sessionId = sessionManager.createSession(workspaceRoot);
    const orchestrator = sessionManager.getSession(sessionId)!;
    
    const questions = await orchestrator.initialize(config);
    
    return {
      success: true,
      data: { sessionId, questions }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to initialize paper generation'
    };
  }
}

/**
 * POST /api/paper/respond
 * Submit user responses to clarifying questions
 */
export async function submitResponses(
  sessionId: string,
  responses: Record<string, string>
): Promise<APIResponse<{ state: OrchestrationState }>> {
  try {
    const orchestrator = sessionManager.getSession(sessionId);
    if (!orchestrator) {
      return { success: false, error: 'Session not found' };
    }
    
    await orchestrator.processUserResponses(responses);
    const state = orchestrator.getState();
    
    return {
      success: true,
      data: { state }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process responses'
    };
  }
}

/**
 * POST /api/paper/start
 * Start paper generation workflow
 */
export async function startGeneration(
  sessionId: string
): Promise<APIResponse<{ state: OrchestrationState }>> {
  try {
    const orchestrator = sessionManager.getSession(sessionId);
    if (!orchestrator) {
      return { success: false, error: 'Session not found' };
    }
    
    // Start execution in background
    orchestrator.execute((state) => {
      // Progress callback - could emit WebSocket events here
      console.log(`Progress: ${state.phase} - ${state.tasks.filter(t => t.status === 'complete').length}/${state.tasks.length} tasks`);
    }).catch(error => {
      console.error('Execution error:', error);
    });
    
    const state = orchestrator.getState();
    
    return {
      success: true,
      data: { state }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start generation'
    };
  }
}

/**
 * GET /api/paper/status/:sessionId
 * Get current status of paper generation
 */
export async function getStatus(
  sessionId: string
): Promise<APIResponse<{ state: OrchestrationState }>> {
  try {
    const orchestrator = sessionManager.getSession(sessionId);
    if (!orchestrator) {
      return { success: false, error: 'Session not found' };
    }
    
    const state = orchestrator.getState();
    
    return {
      success: true,
      data: { state }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get status'
    };
  }
}

/**
 * POST /api/paper/export/:sessionId
 * Export paper to Word or PDF
 */
export async function exportPaper(
  sessionId: string,
  format: 'word' | 'pdf'
): Promise<APIResponse<{ downloadUrl: string }>> {
  try {
    const orchestrator = sessionManager.getSession(sessionId);
    if (!orchestrator) {
      return { success: false, error: 'Session not found' };
    }
    
    const state = orchestrator.getState();
    
    if (state.phase !== 'complete') {
      return { success: false, error: 'Paper generation not complete' };
    }
    
    // Get final paper artifact
    const finalPaperPath = state.artifacts['final'] || state.artifacts['write'];
    if (!finalPaperPath) {
      return { success: false, error: 'Final paper not found' };
    }
    
    // Export based on format
    let exportPath: string;
    if (format === 'word') {
      exportPath = await exportToWord(finalPaperPath, state.slug);
    } else {
      exportPath = await exportToPDF(finalPaperPath, state.slug);
    }
    
    return {
      success: true,
      data: { downloadUrl: `/downloads/${exportPath}` }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to export paper'
    };
  }
}

/**
 * DELETE /api/paper/:sessionId
 * Cancel and delete a paper generation session
 */
export async function cancelSession(
  sessionId: string
): Promise<APIResponse<void>> {
  try {
    sessionManager.deleteSession(sessionId);
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel session'
    };
  }
}
