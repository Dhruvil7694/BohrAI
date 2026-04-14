---
title: Reasoning Validate
description: Validate logical correctness from evidence to conclusions.
section: Workflows
order: 18
---

The reasoning-validate workflow checks whether conclusions are logically justified.

## How it works

1. Extracts claims and their cited support.
2. Evaluates premise-to-conclusion logic.
3. Flags inference gaps, scope jumps, and hidden assumptions.
4. Produces prioritized fixes for invalid chains.

## Real examples

```
/reasoning-validate outputs/enterprise-ai-brief.md
```

```bash
bohr reasoning-validate outputs/enterprise-ai-brief.md
```

## Expected output

- `outputs/<slug>-reasoning-validation.md`

Includes: valid/weak/invalid counts and fix recommendations.

## Customization

- Strict mode for quantitative claims
- Section-only validation (for example, executive summary + conclusions)
- Require direct evidence support for every high-impact recommendation
