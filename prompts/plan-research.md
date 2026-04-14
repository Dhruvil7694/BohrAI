---
description: Create an orchestration plan that decides agent order, checkpoints, and stop criteria.
args: <topic-or-goal>
section: Research Workflows
topLevelCli: true
---
Plan a research orchestration strategy for: $@

Execution:
1. Spawn `research-planner` to create a structured plan.
2. Include:
   - agent sequence and handoff contracts
   - confidence and contradiction stop thresholds
   - verification checkpoints
3. If a plan already exists, update it instead of rewriting from scratch.

Output:
- Save to `outputs/.plans/<slug>-orchestration.md`.
- End with a clear "Run Next" recommendation.
