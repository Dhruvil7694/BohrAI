---
title: "Plan Research"
summary: "Orchestration plan: agent order, checkpoints, stop criteria."
slashCommand: "/plan-research"
cliName: "plan-research"
docsSlug: "workflows/plan-research"
category: "module"
order: 107
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /plan-research …
    - stage: 02 · DECOMPOSE
      nodes:
        - variant: hero
          lines:
            - planner
            - BREAKDOWN · ORDER
    - stage: 03 · GOVERN
      nodes:
        - lines:
            - checkpoints
        - lines:
            - stop rules
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - plan doc
keyPoints:
  - "Emits an explicit plan—agent order, checkpoints, and stop rules—before wide fan-out."
  - "Use when scope is ambiguous or you need governance over sequencing."
  - "Often composed with deeper research workflows."
mermaidFlow: |
  flowchart TD
    G["goal"] --> B["breakdown"]
    B --> O["agent order"]
    O --> C["checkpoints"]
    C --> S["stop rules"]
    S --> Pl["plan doc"]
---

## Overview

Creates an explicit DAG-style plan before expensive fan-out—often paired with deep research.

## When to use it

Ambiguous scopes or when you want governance over agent sequencing.

## Outputs

Machine- and human-readable plan with checkpoints.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

