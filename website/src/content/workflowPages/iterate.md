---
title: "Iterate"
summary: "Research loops until convergence criteria are met."
slashCommand: "/iterate"
cliName: "iterate"
docsSlug: "workflows/iterate"
category: "module"
order: 110
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /iterate …
    - stage: 02 · CONTROL
      nodes:
        - variant: hero
          lines:
            - iteration-ctrl
            - LOOP · GATES
    - stage: 03 · WORK
      nodes:
        - lines:
            - work unit
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - evaluate
        - lines:
            - final
  loopCaption: LOOP UNTIL THRESHOLDS · WORK → EVALUATE → CONTINUE OR STOP
keyPoints:
  - "Generic iteration harness: run a work unit, evaluate, continue or stop."
  - "Compose with other modules when thresholds and convergence matter."
  - "Preserves an iteration trace alongside the final artifact."
mermaidFlow: |
  flowchart TD
    X["topic"] --> L["loop"]
    L --> W["work unit"]
    W --> E["evaluate"]
    E -->|continue| L
    E -->|stop| F["final"]
---

## Overview

Generic iteration harness—pairs with other modules to refine until thresholds hit.

## When to use it

When stop conditions matter more than a single pass.

## Outputs

Iteration trace plus final artifact.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

