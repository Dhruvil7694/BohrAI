---
title: "Autoresearch"
summary: "Autonomous experiment loop: analyze, measure, hypothesize, test toward a goal."
slashCommand: "/autoresearch"
cliName: "autoresearch"
docsSlug: "workflows/autoresearch"
category: "pipeline"
order: 10
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /autoresearch …
    - stage: 02 · LOOP
      nodes:
        - variant: hero
          lines:
            - controller
            - GOAL · STOP RULES
    - stage: 03 · THINK
      nodes:
        - lines:
            - analyze state
        - lines:
            - new hypothesis
    - stage: 04 · ACT
      nodes:
        - lines:
            - test / measure
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - report
  loopCaption: LOOP UNTIL STOP CRITERIA · ANALYZE → TEST → MEASURE
keyPoints:
  - "Runs a goal-directed loop: analyze state, propose hypotheses, measure, repeat."
  - "Fits exploratory problems where the next step should follow from data."
  - "Stops when configured criteria are met; full trace is retained."
mermaidFlow: |
  flowchart TD
    G["goal"] --> L["loop"]
    L --> A["analyze state"]
    A --> H["new hypothesis"]
    H --> T["test / measure"]
    T -->|not done| L
    T -->|done| R["report"]
---

## Overview

Runs repeated cycles of analysis → hypothesis → measurement until stop criteria hit—good for optimization-style research questions.

## When to use it

Exploratory spaces where the next step should emerge from measurements.

## Outputs

Iteration log plus final recommendation and metrics.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

