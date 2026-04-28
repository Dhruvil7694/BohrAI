---
title: Paper-Pro Workflow
description: Professional paper pipeline with architecture, drafting, skeptical review, verification, compliance, and provenance.
section: Workflows
order: 5
---

The `/paper-pro` workflow is the disciplined manuscript path for Bohr when you want a paper-shaped artifact and a visible audit trail.

## Usage

From the REPL:

```text
/paper-pro "topic or evidence artifact"
```

From the CLI:

```bash
bohr paper-pro "topic or evidence artifact"
```

## Pipeline

1. Inventory the local evidence and derive a run slug
2. Write a run plan to `outputs/.plans/<slug>-paper-pro.md`
3. Use `paper-architect` to build the manuscript structure and claim map
4. Draft the manuscript with `writer`
5. Audit citations with `citation-integrity`
6. Critique the paper with `reviewer`
7. Verify claim support with `verifier` when needed
8. Check section and artifact contract with `paper-compliance`
9. Promote the accepted manuscript to `papers/<slug>.md`
10. Write `papers/<slug>.provenance.md`

## Expected output

- `outputs/.plans/<slug>-paper-pro.md`
- `outputs/.plans/<slug>-architecture.md`
- `papers/<slug>-draft.md`
- `papers/<slug>-citation-integrity.md`
- `papers/<slug>-review.md`
- `papers/<slug>-compliance.md`
- `papers/<slug>.md`
- `papers/<slug>.provenance.md`

## Good use cases

- a professional narrative synthesis from a verified local evidence base
- a manuscript-style client deliverable with explicit quality gates
- a paper draft that needs skeptical review and provenance before sharing

## Important notes

- `paper-pro` is intentionally conservative: it should narrow claims rather than invent support.
- The workflow is strongest when you already have a credible local evidence base.
- Provenance is part of the contract, not an optional afterthought.

