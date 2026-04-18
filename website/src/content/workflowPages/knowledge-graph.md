---
title: "Knowledge Graph"
summary: "Entity–relation graph from findings for reuse and querying."
slashCommand: "/knowledge-graph"
cliName: "knowledge-graph"
docsSlug: "workflows/knowledge-graph"
category: "module"
order: 108
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /knowledge-graph …
    - stage: 02 · EXTRACT
      nodes:
        - variant: hero
          lines:
            - extractor
            - ENTITIES · RELS
    - stage: 03 · GRAPH
      nodes:
        - lines:
            - graph build
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - queries
keyPoints:
  - "Extracts entities and relations so you can query structure, not only text."
  - "Best when the domain has many actors, datasets, or interlocking claims."
  - "Outputs a graph artifact for downstream tooling or inspection."
mermaidFlow: |
  flowchart LR
    T["text / brief"] --> E["entities"]
    E --> R["relations"]
    R --> G["graph"]
    G --> Q["queries"]
---

## Overview

Extracts entities and edges so downstream steps can traverse structure, not only text.

## When to use it

Complex domains with many actors, datasets, or claims.

## Outputs

Graph artifact plus optional visualization hooks.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

