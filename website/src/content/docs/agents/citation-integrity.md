---
title: Citation Integrity
description: The citation integrity agent verifies that each citation supports the exact claim text.
section: Agents
order: 9
---

The citation integrity agent performs sentence-level citation validation.

## What it does

It checks whether each citation actually supports the exact statement it is attached to, flags overstatement or misattribution, and recommends precise fixes.

This protects against a common failure mode: claims that look sourced, but are not truly supported by the cited material.

## Output

A citation-integrity report classifying claim-citation pairs as valid, weak, invalid, or contradicted.

## Validation criteria

A citation is considered valid only if it supports the exact claim scope:

- same direction of conclusion
- compatible quantity/value if numbers are cited
- matching conditions and assumptions
- no stronger wording than the source supports

The agent flags "topic overlap without claim support" as weak or invalid.

## Common issues it catches

- citation supports a related but different claim
- numbers are copied with drift or rounding distortion
- source context is narrower than the draft's wording
- citation was correct in a previous draft but broken after edits

These issues are subtle and often missed in standard proofreading.

## When to use it

Use this agent before publishing any output with factual claims, especially:

- literature reviews
- benchmark summaries
- executive recommendations
- externally shared briefs

It is most effective after writer output and before final verifier pass.

## Limitations

Citation integrity checks source alignment, not claim importance or novelty. Use reviewer/contradiction for argument quality and impact assessment.

## Used by

Best for `/draft`, `/review`, and final delivery passes where citation correctness is mandatory.
