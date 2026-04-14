---
title: Research & Review Templates
description: Ready-to-run workflow templates for common research and review jobs.
section: Workflows
order: 20
---

These templates are practical starting points for common research tasks. Each template gives you a clear command sequence, expected outputs, and quality checks.

## Template 1: Fast topic research brief

Use this when you need a high-quality brief quickly.

### Run sequence

```bash
bohr plan-research "topic"
bohr deepresearch "topic"
bohr citation-check outputs/<slug>.md
```

### Expected outputs

- `outputs/.plans/<slug>-orchestration.md`
- `outputs/<slug>.md`
- `outputs/<slug>-citation-integrity.md`

### Success checks

- key claims have inline citations
- no invalid citation pairs
- contradictions are listed in caveats/open questions

## Template 2: Claim stress test before decision

Use this before committing roadmap or product strategy based on a claim.

### Run sequence

```bash
bohr hypothesis "claim or proposal"
bohr contradict outputs/<slug>-hypotheses.md
bohr reasoning-validate outputs/<slug>-contradictions.md
```

### Expected outputs

- `outputs/<slug>-hypotheses.md`
- `outputs/<slug>-contradictions.md`
- `outputs/<slug>-reasoning-validation.md`

### Success checks

- critical contradictions are resolved or explicitly accepted
- high-impact reasoning chains are marked valid

## Template 3: Evidence-weighted comparison

Use this when comparing approaches, vendors, or architectures.

### Run sequence

```bash
bohr compare "A vs B on <topic>"
bohr evidence-score outputs/<slug>.md
bohr knowledge-graph outputs/<slug>.md
```

### Expected outputs

- `outputs/<slug>.md`
- `outputs/<slug>-evidence-scores.md`
- `outputs/<slug>-knowledge-graph.md`

### Success checks

- weak-support claims are clearly flagged
- trade-offs map to evidence quality, not wording

## Template 4: Replication readiness check

Use this before implementation or benchmark adoption.

### Run sequence

```bash
bohr replicate "paper or benchmark claim"
bohr experiment "top risk from replication plan"
bohr review outputs/<slug>-experiment.md
```

### Expected outputs

- replication artifact (workflow output)
- `outputs/<slug>-experiment.md`
- `outputs/<slug>-review.md`

### Success checks

- experiment includes metric threshold and artifact paths
- review identifies remaining reproducibility risk

## Template 5: Iterative convergence workflow

Use this for high-stakes topics where one-pass output is not enough.

### Run sequence

```bash
bohr plan-research "topic"
bohr iterate "topic"
bohr memory-log "topic"
```

### Expected outputs

- `outputs/<slug>-iterative-brief.md`
- `outputs/<slug>-iteration-log.md`
- `notes/<slug>-memory.md`

### Success checks

- confidence threshold reached
- critical contradictions resolved
- next-session priorities captured

## Customization tips

- Raise strictness for external reports by always adding:
  - `bohr citation-check <artifact>`
  - `bohr reasoning-validate <artifact>`
- For broad topics, use `bohr knowledge-graph` to preserve reusable structure.
- For long-running projects, finish with `bohr memory-log` to avoid context loss.
