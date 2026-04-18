---
title: "Draft Writing"
summary: "Turn accumulated findings into structured draft sections."
slashCommand: "/draft"
cliName: "draft"
docsSlug: "workflows/draft"
category: "pipeline"
order: 9
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /draft …
    - stage: 02 · SHAPE
      nodes:
        - variant: hero
          lines:
            - outline
            - SECTIONS
    - stage: 03 · WRITE
      nodes:
        - lines:
            - writer
    - stage: 04 · EDIT
      nodes:
        - lines:
            - editor pass
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - draft MD
keyPoints:
  - "Turns existing findings into coherent sections with transitions—not a fresh discovery pass."
  - "Use after research when you need prose quickly."
  - "Output is sectioned draft text; figures can remain placeholders where needed."
mermaidFlow: |
  flowchart LR
    F["findings"] --> O["outline"]
    O --> W["writer"]
    W --> E["editor pass"]
    E --> D["draft MD"]
---

## Overview

Consumes prior artifacts or inline context and produces manuscript-style sections with transitions.

## When to use it

After research passes, when you need prose quickly without restarting discovery.

## Outputs

Sectioned draft with placeholders for figures if needed.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

