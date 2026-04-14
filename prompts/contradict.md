---
description: Stress-test a claim or draft by finding contradictions, edge cases, and fragile assumptions.
args: <claim-or-artifact>
section: Research Workflows
topLevelCli: true
---
Run contradiction analysis for: $@

Goal:
- identify where conclusions are overstated, unsupported, or likely to fail

Execution:
1. Read the target claim/document and extract core assertions.
2. Spawn `contradiction` to produce an adversarial contradiction log.
3. When needed, spawn `researcher` for targeted counter-evidence.
4. Classify each issue as fatal / major / minor and map to a concrete resolution action.

Output requirements:
- Save one artifact to `outputs/<slug>-contradictions.md`.
- Include a final "Most fragile assumptions" section.
- Include direct source URLs for all external evidence.
