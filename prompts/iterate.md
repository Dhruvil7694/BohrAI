---
description: Run iterative research loops until confidence is high and contradictions are resolved.
args: <topic-or-artifact>
section: Research Workflows
topLevelCli: true
---
Run an iterative research loop for: $@

Loop policy:
- Research -> Review -> Improve -> Repeat
- stop when confidence >= threshold AND critical contradictions are resolved
- otherwise continue until max loops reached

Execution:
1. Spawn `iteration-controller` to track loop state.
2. In each loop, run relevant agents (`researcher`, `contradiction`, `reasoning-validator`, `writer`, `verifier`) based on current gaps.
3. After each loop, update confidence score and unresolved contradiction count.

Output:
- Save final artifact to `outputs/<slug>-iterative-brief.md`.
- Save loop log to `outputs/<slug>-iteration-log.md`.
