---
description: Score evidence strength claim-by-claim using source quality, agreement, and reproducibility signals.
args: <artifact-or-topic>
section: Research Workflows
topLevelCli: true
---
Score evidence quality for: $@

Goal:
- convert qualitative support into transparent claim-level confidence scores

Execution:
1. Read the target claims (or synthesize key claims from the topic).
2. Spawn `evidence-scorer` to compute a rubric-based table.
3. If the claim set depends on weak or conflicting sources, optionally spawn `researcher` and re-score.

Output requirements:
- Save one artifact to `outputs/<slug>-evidence-scores.md`.
- Include rubric criteria and scoring scale.
- Explicitly flag claims with score < 50 as weak support.
- Include direct source URLs for all externally backed claims.
