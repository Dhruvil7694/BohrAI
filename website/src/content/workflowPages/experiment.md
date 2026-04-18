---
title: "Experiment"
summary: "Design a minimal decisive experiment for a hypothesis or goal."
slashCommand: "/experiment"
cliName: "experiment"
docsSlug: "workflows/experiment"
category: "module"
order: 104
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /experiment …
    - stage: 02 · DESIGN
      nodes:
        - variant: hero
          lines:
            - designer
            - METRICS · CONTROLS
    - stage: 03 · PROTOCOL
      nodes:
        - lines:
            - protocol
    - stage: 04 · HOOK
      nodes:
        - lines:
            - execute hook
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - log
keyPoints:
  - "Produces a minimal experiment design: variables, metrics, controls, and stop rules."
  - "Use once hypotheses exist and you need a decisive test."
  - "Includes a protocol-style write-up and measurement checklist."
mermaidFlow: |
  flowchart LR
    H["hypothesis"] --> D["design"]
    D --> M["metrics"]
    M --> P["protocol"]
    P --> E["execute hook"]
    E --> L["log"]
---

## Overview

Produces an executable plan: variables, controls, metrics, and stop rules.

## When to use it

After hypotheses exist and you need a crisp test—not full lab automation unless configured.

## Outputs

Protocol doc plus measurement checklist.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

