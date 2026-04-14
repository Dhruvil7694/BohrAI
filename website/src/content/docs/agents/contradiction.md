---
title: Contradiction
description: The contradiction agent stress-tests conclusions with counter-evidence and failure cases.
section: Agents
order: 6
---

The contradiction agent is an adversarial quality-control pass. It assumes your current conclusion may be wrong and searches for the strongest counter-evidence.

## What it does

It identifies direct contradictions, boundary conditions, alternate explanations, and hidden assumptions. Findings are severity-graded so you can distinguish fatal issues from minor caveats.

Instead of asking "is this claim plausible?", it asks:

- where does this claim fail?
- what evidence points the other way?
- what assumptions are carrying too much weight?

## Output

A contradiction log mapping each challenged claim to conflicting evidence and the check needed to resolve it.

## Contradiction types

The agent classifies issues into practical categories:

- **Direct contradiction** -- source states the opposite of the claim
- **Scope mismatch** -- claim generalizes beyond source conditions
- **Alternate explanation** -- evidence can be explained by a different mechanism
- **Fragile assumption** -- conclusion depends on untested prerequisites

This classification helps teams choose whether to rewrite, re-test, or remove a claim.

## Severity model

Findings are typically grouped as:

- **Fatal** -- claim is likely wrong or unsupported
- **Major** -- claim may be directionally right but overstated
- **Minor** -- caveats needed for precision

Severity prioritization makes contradiction output actionable for drafts, reviews, and decision memos.

## When to use it

Use contradiction analysis before finalizing:

- executive summaries
- publication-facing drafts
- recommendations tied to cost or risk

It is especially valuable when multiple stakeholders already agree on a narrative, because consensus can hide blind spots.

## Limitations

This agent optimizes for finding weaknesses, not polishing language. After contradiction review, use writer/verifier passes to produce final reader-ready output.

## Used by

Ideal for `/review`, `/audit`, and final validation stages before publishing a brief or draft.
