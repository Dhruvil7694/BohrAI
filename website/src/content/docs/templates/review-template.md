---
title: Literature Review Template
description: Section-by-section template to build a full survey-style literature review.
section: Templates
order: 2
---

Use this template when you want to produce a full literature review paper, not a short summary.

## Full process command sequence

```bash
bohr plan-research "topic"
bohr lit-review "topic"
bohr evidence-score outputs/<slug>.md
bohr contradict outputs/<slug>.md
bohr reasoning-validate outputs/<slug>.md
bohr citation-check outputs/<slug>.md
bohr review outputs/<slug>.md
```

## Expected outputs

- `outputs/.plans/<slug>-orchestration.md`
- `outputs/<slug>.md`
- `outputs/<slug>-evidence-scores.md`
- `outputs/<slug>-contradictions.md`
- `outputs/<slug>-reasoning-validation.md`
- `outputs/<slug>-citation-integrity.md`
- `outputs/<slug>-review.md`
- `outputs/<slug>.provenance.md`

## Section-by-section build guide

Build each section in this order so the final review stays coherent and source-grounded.

### 1) Introduction

Goal: define scope, motivation, and review question.

Checklist:

- state the exact topic boundary
- define timeframe and source coverage policy
- explain why this review matters now

### 2) Search and selection method

Goal: make paper selection reproducible.

Checklist:

- list academic sources used
- include inclusion/exclusion criteria
- summarize quality scoring logic (relevance, recency, influence)

### 3) Thematic sections

Goal: organize papers into meaningful clusters.

Checklist:

- group papers by method, problem framing, or evaluation style
- summarize each theme's core claims and evidence
- include representative papers per theme

### 4) Key disagreements

Goal: surface real conflicts, not averaged consensus.

Checklist:

- identify contradictory findings between papers
- explain likely disagreement drivers (data, metrics, setup, assumptions)
- mark unresolved contradictions clearly

### 5) Research gaps and open problems

Goal: show what is missing from current literature.

Checklist:

- underexplored settings or populations
- missing evaluations or robustness checks
- high-value open questions for future work

### 6) Conclusion and implications

Goal: provide a balanced synthesis.

Checklist:

- what is well-supported vs tentative
- where confidence is high vs low
- practical implications and next-step recommendations

### 7) References and citation integrity

Goal: ensure claims and citations align exactly.

Checklist:

- all high-impact claims have direct support
- no invalid or weak citation on critical conclusions
- provenance sidecar is complete

## Quality checklist

- Thematic clustering is explicit and traceable.
- Contradictions are visible and not hidden in prose.
- Research gaps are concrete and prioritized.
- Low-support claims are downgraded or removed.
- Reasoning validation has no invalid high-impact chain.
- Citation checks show no invalid high-impact references.
