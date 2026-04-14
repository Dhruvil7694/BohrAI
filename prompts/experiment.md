---
description: Design and run minimal experiments to validate or falsify a high-priority hypothesis.
args: <hypothesis-or-goal>
section: Research Workflows
topLevelCli: true
---
Run an experiment workflow for: $@

Goal:
- reduce uncertainty with the smallest decisive test

Execution:
1. Define metric, threshold, and success/failure criteria before execution.
2. Spawn `experiment` to produce an experiment plan and execution log.
3. Run commands, capture outputs, and record artifact paths.
4. Conclude with supported / not supported / inconclusive.

Output requirements:
- Save one artifact to `outputs/<slug>-experiment.md`.
- Include commands, environment notes, metric outputs, and artifact paths.
- Record at least one next-step recommendation.
