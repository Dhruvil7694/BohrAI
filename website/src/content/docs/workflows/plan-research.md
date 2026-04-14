---
title: Plan Research
description: Create a planner-led orchestration strategy before execution.
section: Workflows
order: 16
---

The plan-research workflow creates the orchestration brain for complex runs.

## How it works

1. Reads your topic and constraints.
2. Builds an agent sequence and handoff plan.
3. Sets stop criteria (confidence threshold, contradiction targets).
4. Defines verification checkpoints.

## Real examples

```
/plan-research "safety and performance trade-offs in long-context RAG"
```

```bash
bohr plan-research "safety and performance trade-offs in long-context RAG"
```

## Expected output

- `outputs/.plans/<slug>-orchestration.md`

Includes: questions, agent order, loop policy, and run-next recommendation.

## Customization

- Set confidence target (for example, 0.8+)
- Set contradiction tolerance (for example, zero critical contradictions)
- Choose max loop count and verification strictness
