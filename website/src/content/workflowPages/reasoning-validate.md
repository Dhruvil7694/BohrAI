---
title: "Reasoning Validate"
summary: "Check whether conclusions logically follow from cited evidence."
slashCommand: "/reasoning-validate"
cliName: "reasoning-validate"
docsSlug: "workflows/reasoning-validate"
category: "module"
order: 109
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /reasoning-validate …
    - stage: 02 · TRACE
      nodes:
        - variant: hero
          lines:
            - logic tracer
            - PREMISES · CHAIN
    - stage: 03 · CHECK
      nodes:
        - lines:
            - validator
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - issues
keyPoints:
  - "Checks whether conclusions follow logically from premises and citations."
  - "Use for memos and summaries where logical leaps are costly."
  - "Returns an issue list with suggested repairs."
mermaidFlow: |
  flowchart TD
    Pr["premises"] --> L["logic chain"]
    L --> C["conclusion"]
    C --> V["validator"]
    V --> I["issues"]
---

## Overview

Stress-tests argumentative glue—where leaps happen even if citations exist.

## When to use it

Policy memos, reviews, or executive summaries with tight logic needs.

## Outputs

Issue list with suggested repairs.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

