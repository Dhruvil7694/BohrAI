---
title: "Literature Review Pipeline"
summary: "Full pipeline: themes, contradictions, gaps, and validation passes."
slashCommand: "/lit-review"
cliName: "lit-review"
docsSlug: "workflows/lit-review"
category: "pipeline"
order: 3
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /lit-review …
    - stage: 02 · SOURCES
      nodes:
        - variant: hero
          lines:
            - planner
            - SCOPE · COLLECT
    - stage: 03 · ANALYSIS
      nodes:
        - lines:
            - theme map
        - lines:
            - contradiction scan
        - lines:
            - gap analysis
    - stage: 04 · VALIDATE
      nodes:
        - lines:
            - validator
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - lit-review writer
        - lines:
            - validated survey
keyPoints:
  - "Adds validation checkpoints and a stronger narrative pass than `/lit` alone."
  - "Use when quality bar is high—long-form chapters, surveys, or regulatory-facing drafts."
  - "Delivers a richer survey plus validation artifacts and gap maps."
mermaidFlow: |
  flowchart TD
    A["sources"] --> B["theme map"]
    B --> C["contradiction scan"]
    C --> D["gap analysis"]
    D --> V["validator"]
    V --> L["lit-review writer"]
    L --> X["validated survey"]
---

## Overview

This is the **extended** literature pipeline—more checkpoints than `/lit`, including structured validation before delivery.

## When to use it

Pick lit-review pipeline when stakes are high (thesis chapter, survey paper, regulatory brief).

## Outputs

A richer narrative plus validation artifacts and gap maps.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

