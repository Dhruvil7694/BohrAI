---
title: Replication Template
description: Template for validating reproducibility and implementation readiness.
section: Templates
order: 3
---

Use this template before adopting paper claims into production or product strategy.

## Command sequence

```bash
bohr replicate "paper or claim"
bohr experiment "highest-risk hypothesis from replication output"
bohr review outputs/<slug>-experiment.md
```

## Expected outputs

- Replication workflow artifact
- `outputs/<slug>-experiment.md`
- `outputs/<slug>-review.md`

## Quality checklist

- Experiment includes metrics, threshold, and artifact paths.
- Reproducibility blockers are explicitly listed.
- Review includes actionable next iteration steps.
