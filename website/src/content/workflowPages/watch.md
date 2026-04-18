---
title: "Watch"
summary: "Recurring monitoring on a topic with alerts and summaries."
slashCommand: "/watch"
cliName: "watch"
docsSlug: "workflows/watch"
category: "pipeline"
order: 11
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /watch …
    - stage: 02 · SCHEDULE
      nodes:
        - variant: hero
          lines:
            - scheduler
            - CADENCE · SOURCES
    - stage: 03 · FETCH
      nodes:
        - lines:
            - fetch deltas
    - stage: 04 · SUMMARIZE
      nodes:
        - lines:
            - rolling summary
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - notify / log
keyPoints:
  - "Schedules pulls and summarizes what changed for a topic over time."
  - "Use for fast-moving fields, competitor tracking, or rolling literature scans."
  - "Produces periodic summaries with deltas and a durable log."
mermaidFlow: |
  flowchart LR
    T["topic"] --> Sch["schedule"]
    Sch --> F["fetch deltas"]
    F --> S["summarize"]
    S --> N["notify / log"]
---

## Overview

Sets up ongoing observation: periodic pulls, diff summaries, and durable logs for long-running topics.

## When to use it

Fast-moving fields, competitor tracking, or rolling literature awareness.

## Outputs

Scheduled summaries with delta highlights.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

