---
description: Validate claim-to-citation alignment and flag weak, invalid, or contradicted references.
args: <artifact>
section: Research Workflows
topLevelCli: true
---
Run citation integrity checks for: $@

Goal:
- ensure every citation supports the exact sentence it is attached to

Execution:
1. Read the target artifact and enumerate factual claims with citations.
2. Spawn `citation-integrity` for sentence-level citation validation.
3. For unresolved claims, use `researcher` to find replacement sources if available.
4. Mark each finding valid / weak / invalid / contradicted and propose fixes.

Output requirements:
- Save one artifact to `outputs/<slug>-citation-integrity.md`.
- Include summary counts by status.
- Include direct source URLs for all checked references.
