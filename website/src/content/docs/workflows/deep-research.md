---
title: Deep Research
description: Run a thorough, multi-agent investigation that produces a cited research brief.
section: Workflows
order: 1
---

Deep research is the flagship Bohr AI workflow. It now runs a planner-led, iterative architecture that combines evidence gathering, contradiction checks, reasoning validation, and citation verification before final delivery.

## Usage

From the REPL:

```
/deepresearch What are the current approaches to mechanistic interpretability in LLMs?
```

From the CLI:

```bash
bohr deepresearch "What are the current approaches to mechanistic interpretability in LLMs?"
```

Both forms are equivalent. The workflow begins immediately and streams progress as agents discover and analyze sources.

## How it works

The workflow runs through an orchestrated pipeline:

1. **Planning** -- `research-planner` creates the execution strategy, agent order, and stop criteria.
2. **Hypothesis + research fan-out** -- `hypothesis` frames testable lines of inquiry, then parallel `researcher` agents gather evidence across papers, docs, and code.
3. **Scoring + structure** -- `evidence-scorer` assesses claim strength and `knowledge-graph` captures reusable entity-relation structure.
4. **Adversarial checks** -- `contradiction` finds conflicts and edge cases; `reasoning-validator` checks whether conclusions logically follow from evidence.
5. **Draft + citation + review** -- `writer` synthesizes, `verifier` anchors citations, `reviewer` pressure-tests quality.
6. **Iteration loop** -- `iteration-controller` decides whether to continue another loop (Research -> Review -> Improve) until convergence criteria are met.

Default convergence policy targets high confidence and resolved critical contradictions before final output promotion.

## Expected output

Deep research produces multiple durable artifacts:

- `outputs/.plans/<slug>.md` -- orchestration plan and verification ledger
- `outputs/<slug>-knowledge-graph.md` -- reusable structured knowledge
- `outputs/.drafts/<slug>-draft.md` -- synthesis draft
- `outputs/<slug>.md` (or `papers/<slug>.md`) -- final cited and verified deliverable
- `<slug>.provenance.md` sidecar -- source and verification accounting

The final brief typically includes:

- executive summary
- key findings by theme
- contradictions and caveats
- open questions
- inline citations with source links

## Customization

You can steer deep research by specifying:

- **scope** -- "focus on enterprise production deployments only"
- **time range** -- "use sources from 2023 onward"
- **evidence policy** -- "prioritize peer-reviewed + official docs"
- **convergence targets** -- "stop only when confidence > 0.85 and no critical contradictions"
- **output style** -- "brief for executives" vs "technical deep dive"

### Real example

```bash
bohr deepresearch "Do long-context models reduce RAG complexity for regulated-domain QA in production?"
```

Typical output: a cited brief with trade-offs, contradiction handling, confidence-calibrated recommendations, and a reusable knowledge-graph artifact.
