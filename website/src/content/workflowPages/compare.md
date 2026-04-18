---
title: "Source Comparison"
summary: "Agreement / disagreement matrix across sources on a topic."
slashCommand: "/compare"
cliName: "compare"
docsSlug: "workflows/compare"
category: "pipeline"
order: 8
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /compare …
    - stage: 02 · INGEST
      nodes:
        - variant: hero
          lines:
            - orchestrator
            - SOURCES · ALIGN
    - stage: 03 · MATRIX
      nodes:
        - lines:
            - matrix builder
    - stage: 04 · READ
      nodes:
        - lines:
            - agree / disagree
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - matrix table
keyPoints:
  - "Builds an agreement / disagreement view across several sources on one topic."
  - "Suited to debates, policy memos, or triangulating controversial claims."
  - "Delivers a compact matrix plus short interpretation."
mermaidFlow: |
  flowchart TD
    S1["source A"] --> M["matrix builder"]
    S2["source B"] --> M
    S3["source C"] --> M
    M --> G["agree / disagree"]
    G --> T["matrix table"]
---

## Overview

Builds a comparative view: where sources align, conflict, or leave silence—useful for debates and surveys.

## When to use it

Multi-source controversies, policy briefs, or literature triangulation.

## Outputs

A compact matrix plus narrative interpretation.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

