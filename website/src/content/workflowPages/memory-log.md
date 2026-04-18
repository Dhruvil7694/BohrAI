---
title: "Memory Log"
summary: "Consolidate durable project memory for later sessions."
slashCommand: "/memory-log"
cliName: "memory-log"
docsSlug: "workflows/memory-log"
category: "module"
order: 106
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /memory-log …
    - stage: 02 · COMPRESS
      nodes:
        - variant: hero
          lines:
            - compressor
            - ARTIFACTS → MEMORY
    - stage: 03 · STORE
      nodes:
        - lines:
            - memory agent
        - lines:
            - durable log
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - retrieval keys
keyPoints:
  - "Consolidates session artifacts into durable, retrievable project memory."
  - "Use for long-running work or handoffs between sessions."
  - "Structured entries are keyed for later recall in the shell."
mermaidFlow: |
  flowchart LR
    S["session artifacts"] --> C["compress"]
    C --> M["memory agent"]
    M --> L["durable log"]
    L --> K["retrieval keys"]
---

## Overview

Turns scattered notes into structured memory your next session can reload.

## When to use it

Long projects or handoffs between sessions.

## Outputs

Structured memory entries linked to topics.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

