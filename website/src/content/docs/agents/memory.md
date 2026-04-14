---
title: Memory
description: The memory agent maintains durable project memory across sessions.
section: Agents
order: 10
---

The memory agent keeps long-running work coherent across days or weeks.

## What it does

It tracks durable decisions, assumptions, unresolved questions, and next-step priorities. It filters out transient chatter and preserves only information that should survive across sessions.

This allows research to continue without repeatedly rediscovering prior context.

## Output

A structured memory log with decisions, active assumptions, open questions, and next-session bootstrap tasks.

## Memory model

The memory agent organizes state into high-signal buckets:

- **Decisions** -- what was decided and why
- **Assumptions** -- what is believed but not fully validated
- **Open questions** -- unresolved items blocking progress
- **Next actions** -- concrete tasks for the next session

This format minimizes context loss while keeping memory concise.

## What counts as durable memory

Good durable entries:

- model/provider defaults and why they were chosen
- accepted or rejected methodologies
- known data quality caveats
- repeatedly observed failure patterns

Do not store ephemeral notes that do not help future decisions.

## When to use it

Use this agent when work spans multiple sessions, teammates, or iterations. It is especially useful for long investigations where priorities and assumptions evolve over time.

## Limitations

Memory is a support layer, not a substitute for verification. Stored assumptions can become stale; contradiction and experiment passes should revalidate critical items.

## Used by

Useful across all long-running workflows, especially `/watch`, `/deepresearch`, and ongoing replication projects.
