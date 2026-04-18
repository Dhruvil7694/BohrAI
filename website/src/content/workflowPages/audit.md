---
title: "Code Audit"
summary: "Compare paper claims against code for reproducibility and mismatch risks."
slashCommand: "/audit"
cliName: "audit"
docsSlug: "workflows/audit"
category: "pipeline"
order: 6
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /audit …
    - stage: 02 · MAP
      nodes:
        - variant: hero
          lines:
            - orchestrator
            - CLAIM · CODE
    - stage: 03 · TRACE
      nodes:
        - lines:
            - code retrieval
        - lines:
            - claim→code map
    - stage: 04 · FIND
      nodes:
        - lines:
            - mismatch finder
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - risk report
keyPoints:
  - "Links claims in writing to code behavior and highlights mismatches or risks."
  - "Built for reproducibility reviews and ML papers with accompanying repositories."
  - "Outputs traceable mappings and ranked risk items."
mermaidFlow: |
  flowchart TD
    P["paper claims"] --> C["code retrieval"]
    C --> M["claim-to-code map"]
    M --> X["mismatch finder"]
    X --> R["risk report"]
---

## Overview

Maps statements in a paper to repository behavior and flags discrepancies—ideal for ML reproducibility reviews.

## When to use it

Before release, during replication studies, or when reviewing third-party papers with code.

## Outputs

Traceable mappings plus severity-ranked risks.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

