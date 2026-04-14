---
title: Paper Workflow
description: Build publication-grade papers with method, figures, citation, review, and compliance passes.
section: Workflows
order: 4
---

The `/paper` workflow is designed for full manuscript production, not just a summary draft.

## Usage

From the REPL:

```
/paper "topic or draft objective"
```

From the CLI:

```bash
bohr paper "topic or draft objective"
```

## Pipeline

1. Research planning
2. Evidence synthesis (`/deepresearch` or `/lit-review`)
3. Writer draft
4. Method/math formalization
5. Figures/tables generation
6. Citation integrity + verifier
7. Peer-review simulation
8. Paper compliance validation
9. Final manuscript promotion

## Expected output

- `papers/<slug>.md`
- `papers/<slug>.provenance.md`
- supporting artifacts for methods, visuals, review, and compliance

## Customization

- Choose target rigor: internal report vs submission-style manuscript
- Provide preferred venue style constraints
- Increase compliance strictness for external sharing
