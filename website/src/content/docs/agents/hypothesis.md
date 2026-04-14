---
title: Hypothesis
description: The hypothesis agent converts evidence into falsifiable, test-ready hypotheses.
section: Agents
order: 5
---

The hypothesis agent turns evidence into testable candidate explanations. It is useful when you have broad findings but need focused bets for what to validate next.

## What it does

It proposes falsifiable hypotheses, defines what evidence would support or refute each one, and ranks them by expected information gain. This helps prioritize experiments and avoid chasing vague ideas.

The agent distinguishes:

- **Descriptive hypotheses** -- what patterns appear in the data
- **Causal hypotheses** -- what mechanism or intervention might explain those patterns
- **Boundary hypotheses** -- where a known result might stop working

Each hypothesis includes explicit assumptions so downstream agents can test the right thing instead of debating wording.

## How it works

The hypothesis agent follows a structured flow:

1. **Evidence scan** -- identifies strongest observations and unresolved tensions
2. **Hypothesis generation** -- proposes multiple competing explanations
3. **Falsification design** -- defines what result would disprove each hypothesis
4. **Prioritization** -- ranks hypotheses by expected value and test cost

This process reduces bias toward a single "favorite" explanation and keeps the workflow decision-oriented.

## Output

The agent emits a hypothesis list with confidence, assumptions, falsifiers, and a recommended validation path for each hypothesis.

A typical entry includes:

- hypothesis statement
- confidence level
- assumptions
- measurable test
- falsification condition
- expected impact if true

## When to use it

Use this agent when:

- you have many findings but unclear next experiments
- your team is debating multiple explanations
- you need a research plan that is easy to test and iterate

Avoid using it when no meaningful evidence exists yet; in that case, run researcher-led discovery first.

## Limitations

The hypothesis agent does not prove correctness on its own. It proposes and prioritizes tests. Final validation should be handled by experiment execution and verification passes.

## Used by

Most useful in `/autoresearch`, `/replicate`, and deep investigation runs where multiple plausible explanations are competing.
