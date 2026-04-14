---
description: Run a full literature review pipeline with thematic clustering, contradiction analysis, gap extraction, and validation.
args: <topic>
section: Research Workflows
topLevelCli: true
---
Run a literature review workflow for: $@

Derive a short slug from the topic (lowercase, hyphens, no filler words, <=5 words). Use this slug for all files in this run.

## Pipeline (required)
1. `literature-collector` -> `<slug>-lit-collection.md`
2. `literature-quality` -> `<slug>-lit-quality.md`
3. `literature-synthesizer` -> `<slug>-lit-themes.md`
4. `literature-contradiction` -> `<slug>-lit-contradictions.md`
5. `literature-gap` -> `<slug>-lit-gaps.md`
6. `literature-review-writer` -> `<slug>-lit-review-draft.md`
7. `literature-review-validator` -> `<slug>-lit-review-validation.md`
8. `verifier` -> `outputs/<slug>.md` and `outputs/<slug>.provenance.md`

## Required output structure
The final review must include:
- Introduction
- Thematic sections (clustered by research themes)
- Key disagreements / contradictions
- Research gaps and open problems

## Quality rules
- Do not produce a generic summary.
- Keep contradictions explicit; do not average them away.
- Validate coverage completeness, logic flow, and missing perspectives before final delivery.
- If validator reports fatal issues, fix and rerun validator once.

## Deliverables
- Final: `outputs/<slug>.md`
- Provenance sidecar: `outputs/<slug>.provenance.md`
