---
title: Evidence Scorer
description: The evidence scorer agent quantifies support strength for each claim.
section: Agents
order: 7
---

The evidence scorer agent turns qualitative support into explicit confidence scores.

## What it does

For each claim, it evaluates source quality, methodological rigor, agreement across sources, and reproducibility signals. This produces a transparent ranking of which claims are strong, weak, or uncertain.

The goal is not to replace judgment, but to make judgment auditable and consistent across claims.

## Output

A claim-by-claim score table with risk notes and rubric explanation.

## Scoring rubric

The evidence scorer typically applies a weighted rubric across:

- **Source quality** -- primary, secondary, or self-reported evidence
- **Method quality** -- controls, sample size, benchmark design, and statistical soundness
- **Cross-source consistency** -- agreement or conflict across independent sources
- **Reproducibility signal** -- availability of code, data, and procedural detail
- **Stability** -- whether the finding is robust across settings and time

This makes low-confidence claims visible early, before they become central to the narrative.

## How to interpret scores

Practical interpretation:

- **80-100** -- strong support, suitable for high-confidence recommendations
- **50-79** -- moderate support, keep caveats explicit
- **0-49** -- weak support, treat as exploratory or remove from key conclusions

Thresholds are guidance, not absolute truth; final decisions should consider context and risk tolerance.

## When to use it

Use this agent when:

- multiple claims compete for inclusion
- evidence quality varies widely
- stakeholders need transparent confidence framing

It is particularly useful in strategy, product, and research planning documents where weak claims can be costly.

## Limitations

A numeric score can hide nuance if read in isolation. Always review accompanying risk notes and contradiction findings before final decisions.

## Used by

Most useful in `/compare`, `/deepresearch`, and high-stakes decision briefs where prioritization depends on evidence quality.
