---
title: Decision Brief Template
description: Template for producing a confidence-calibrated decision memo for stakeholders.
section: Templates
order: 4
---

Use this template when leadership needs a clear recommendation backed by evidence quality.

## Command sequence

```bash
bohr deepresearch "decision question"
bohr evidence-score outputs/<slug>.md
bohr contradict outputs/<slug>.md
bohr memory-log "decision topic"
```

## Expected outputs

- `outputs/<slug>.md`
- `outputs/<slug>-evidence-scores.md`
- `outputs/<slug>-contradictions.md`
- `notes/<slug>-memory.md`

## Quality checklist

- Recommendation confidence matches evidence strength.
- Major uncertainty and downside risks are explicit.
- Follow-up actions are captured for next review cycle.
