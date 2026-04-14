---
description: Validate that conclusions logically follow from evidence and assumptions.
args: <artifact>
section: Research Workflows
topLevelCli: true
---
Run reasoning validation for: $@

Execution:
1. Parse claims and supporting evidence in the artifact.
2. Spawn `reasoning-validator` to evaluate premise-to-conclusion chains.
3. Flag invalid inference jumps and suggest claim-safe rewrites.

Output:
- Save to `outputs/<slug>-reasoning-validation.md`.
- Include valid/weak/invalid counts and prioritized fixes.
