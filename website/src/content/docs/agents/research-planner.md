---
title: Research Planner
description: The orchestration brain that decides agent sequence, checkpoints, and stop conditions.
section: Agents
order: 11
---

The research planner agent is the control layer for complex research runs.

## What it does

It decides which agents to run, in what order, and under what stop criteria. It also sets verification checkpoints and loop policies to avoid static one-pass workflows.

## Output

A structured orchestration plan with:

- objective and key questions
- agent sequence and handoffs
- stop conditions (confidence, contradiction thresholds)
- verification checkpoints

## Used by

Most useful in `/plan-research`, `/deepresearch`, and `/iterate` for non-trivial research tasks.
