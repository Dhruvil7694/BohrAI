---
title: Research Template
description: Step-by-step template for running a full research investigation.
section: Templates
order: 1
---

Use this template when you need a source-grounded research brief with strong verification.

## Command sequence

```bash
bohr plan-research "topic"
bohr deepresearch "topic"
bohr citation-check outputs/<slug>.md
bohr reasoning-validate outputs/<slug>.md
```

## Expected outputs

- `outputs/.plans/<slug>-orchestration.md`
- `outputs/<slug>.md`
- `outputs/<slug>-citation-integrity.md`
- `outputs/<slug>-reasoning-validation.md`

## Quality checklist

- Critical claims have direct sources.
- Contradictions are addressed or explicitly documented.
- Reasoning validation has no invalid high-impact claim chain.
