---
title: Hypothesis
description: Generate ranked, testable hypotheses from evidence.
section: Workflows
order: 10
---

The hypothesis workflow turns broad findings into falsifiable candidate explanations that can be tested quickly.

## How it works

The workflow usually runs in four stages:

1. **Context intake** -- reads your topic, draft, or prior findings.
2. **Evidence grounding** -- pulls supporting observations from existing artifacts (and can dispatch additional research if context is thin).
3. **Hypothesis generation** -- creates multiple competing explanations, not just one preferred narrative.
4. **Prioritization** -- ranks hypotheses by impact, falsifiability, and validation cost.

Each top hypothesis includes assumptions, measurable test criteria, and explicit falsifiers.

## Real examples

Example 1 (topic-first):

```
/hypothesis "Why does benchmark performance drop on long-context legal tasks?"
```

```bash
bohr hypothesis "Why does benchmark performance drop on long-context legal tasks?"
```

Example 2 (artifact-first):

```
/hypothesis outputs/legal-rag-brief.md
```

```bash
bohr hypothesis outputs/legal-rag-brief.md
```

## Expected output

Primary output file:

- `outputs/<slug>-hypotheses.md`

Typical structure:

- research objective
- ranked hypothesis table
- assumptions per hypothesis
- falsification criteria
- top 3 recommended validation actions

Example snippet:

```markdown
## Hypotheses
- [H1] Performance drop is primarily retrieval-noise amplification at long context windows.
  - Assumptions: retrieval recall remains high but precision drops after chunk expansion.
  - Test: compare long-context runs with adaptive retrieval filtering.
  - Falsifier: no measurable gain from filtering while context stays constant.
  - Priority: High
```

## Customization

You can tailor this workflow by specifying:

- **scope** -- "focus only on 2024-2026 results"
- **domain constraints** -- "only legal QA benchmarks"
- **validation budget** -- "prioritize cheap tests first"
- **evidence type** -- "weight code-backed evidence higher than commentary"

## When to use

Use this workflow when your team has enough evidence to reason, but not enough certainty to choose the next experiment confidently.

Avoid it when you have no meaningful evidence yet; start with `/deepresearch` or `/lit` first.
