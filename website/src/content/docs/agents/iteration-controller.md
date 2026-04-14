---
title: Iteration Controller
description: The iteration controller runs multi-loop research cycles to convergence.
section: Agents
order: 14
---

The iteration controller governs repeated research loops until quality criteria are met.

## What it does

It tracks loop-level confidence, unresolved contradictions, and stop criteria. Instead of one-shot generation, it drives improve-and-retest cycles.

## Output

An iteration log with:

- per-loop metrics
- continue/stop decisions
- final convergence status and reason

## Used by

Primary in `/iterate`, and useful for high-stakes deep research where convergence quality matters more than speed.
