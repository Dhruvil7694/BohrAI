---
description: Build a publication-grade paper package with formal methods, figures/tables, compliance checks, and final verification.
args: <topic-or-artifact>
section: Research Workflows
topLevelCli: true
---
Build a full paper workflow for: $@

Derive a short slug from the topic (lowercase, hyphens, no filler words, <=5 words). Use this slug for all files in this run.

## Pipeline
1. Plan with `research-planner` -> `outputs/.plans/<slug>-paper.md`
2. Evidence base via `deepresearch` or `lit-review` (depending on prompt)
3. Draft via `writer` -> `papers/<slug>-draft.md`
4. Formal methods pass via `method-math` -> `papers/<slug>-method-math.md`
5. Visual assets pass via `figures-tables` -> `papers/<slug>-figures-tables.md`
6. Citation integrity + verifier pass -> `papers/<slug>-cited.md`
7. Paper review pass via `reviewer` -> `papers/<slug>-review.md`
8. Compliance pass via `paper-compliance` -> `papers/<slug>-compliance.md`
9. Final promotion -> `papers/<slug>.md` + `papers/<slug>.provenance.md`

## Required paper structure
- Abstract
- Introduction
- Related Work
- Method
- Experiments / Evaluation
- Results
- Discussion / Limitations
- Conclusion
- References

## Rules
- Do not claim submission readiness unless compliance pass is clean or issues are explicitly documented.
- If compliance has fatal issues, fix and rerun compliance once.
