---
title: Iterate
description: Run iterative research loops until convergence criteria are met.
section: Workflows
order: 19
---

The iterate workflow executes multi-loop research instead of one-pass generation.

## How it works

1. Starts with a planning and baseline pass.
2. Runs loop cycles: Research -> Review -> Improve.
3. Tracks confidence and unresolved contradiction counts each loop.
4. Stops when thresholds are met or max loops are reached.

## Real examples

```
/iterate "agentic coding benchmarks reproducibility"
```

```bash
bohr iterate "agentic coding benchmarks reproducibility"
```

## Expected output

- `outputs/<slug>-iterative-brief.md`
- `outputs/<slug>-iteration-log.md`

Iteration log includes per-loop decisions and convergence reason.

## Customization

- Set confidence threshold (for example, >= 0.8)
- Set contradiction target (for example, zero critical unresolved contradictions)
- Set max loop count and verification strictness per loop
