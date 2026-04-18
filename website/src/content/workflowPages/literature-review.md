---
title: "Literature Review"
summary: "Structured survey: consensus, disagreements, gaps, and open questions across sources."
slashCommand: "/lit"
cliName: "lit"
docsSlug: "workflows/literature-review"
category: "pipeline"
order: 2
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /lit …
    - stage: 02 · COLLECT
      nodes:
        - variant: hero
          lines:
            - orchestrator
            - SEARCH · ROUTE
    - stage: 03 · SYNTHESIZE
      nodes:
        - lines:
            - theme clustering
        - lines:
            - consensus map
    - stage: 04 · TENSION
      nodes:
        - lines:
            - disagreements
        - lines:
            - gap scan
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - reviewer polish
        - lines:
            - survey doc
keyPoints:
  - "Builds a survey-style picture: themes, where sources agree or clash, and open gaps."
  - "Faster than the full lit-review pipeline when you want breadth first."
  - "Outputs are structured for positioning new work or writing introductions."
mermaidFlow: |
  flowchart LR
    T["topic"] --> S["search + collect"]
    S --> Y["synthesize themes"]
    Y --> G["gaps + contradictions"]
    G --> R["reviewer polish"]
    R --> out["survey doc"]
---

## Overview

The literature workflow collects sources, clusters themes, surfaces disagreements, and highlights research gaps—ideal for positioning new work.

## When to use it

Use `/lit` when you need a **survey-style** output faster than the full lit-review pipeline.

## Outputs

Themes, tension points, and explicit open questions with citations.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

