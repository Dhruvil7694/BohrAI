---
description: Consolidate durable project memory across sessions: decisions, assumptions, open questions, and next actions.
args: <project-or-topic>
section: Research Workflows
topLevelCli: true
---
Create or refresh durable memory for: $@

Goal:
- keep long-running work coherent and resumable

Execution:
1. Review recent outputs, plans, and session artifacts.
2. Spawn `memory` to produce a structured durable memory log.
3. Capture:
   - key decisions and rationale
   - active assumptions (validated / untested / rejected)
   - open questions
   - next-session bootstrap priorities

Output requirements:
- Save one artifact to `notes/<slug>-memory.md`.
- Keep entries concise and operational.
- Do not include transient chatter or redundant narrative.
