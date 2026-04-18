---
title: "Hypothesis"
summary: "Ranked, testable hypotheses with explicit falsifiers."
slashCommand: "/hypothesis"
cliName: "hypothesis"
docsSlug: "workflows/hypothesis"
category: "module"
order: 101
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /hypothesis …
    - stage: 02 · FRAME
      nodes:
        - variant: hero
          lines:
            - hypothesis agent
            - GENERATE · RANK
    - stage: 03 · SHARPEN
      nodes:
        - lines:
            - falsifiers
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - hypothesis brief
keyPoints:
  - "Generates ranked, falsifiable hypotheses before you spend heavy research effort."
  - "Good for early scoping and experiment planning."
  - "Each item includes hooks for what would disprove it."
mermaidFlow: |
  flowchart TD
    C["context"] --> H["hypothesis agent"]
    H --> R["ranked list"]
    R --> F["falsifiers"]
    F --> out["hypothesis brief"]
---

## Overview

A focused module that frames falsifiable statements before heavier research spend.

## When to use it

Early phase scoping or before experiment design.

## Outputs

Ordered hypotheses with counterevidence hooks.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

