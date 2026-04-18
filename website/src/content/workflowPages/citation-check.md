---
title: "Citation Check"
summary: "Sentence-level alignment between claims and citations."
slashCommand: "/citation-check"
cliName: "citation-check"
docsSlug: "workflows/citation-check"
category: "module"
order: 105
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /citation-check …
    - stage: 02 · PARSE
      nodes:
        - variant: hero
          lines:
            - parser
            - SENTENCES · CITES
    - stage: 03 · VERIFY
      nodes:
        - lines:
            - map to cites
        - lines:
            - verify support
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - flags
keyPoints:
  - "Aligns sentences with what citations actually support—catches drift and overclaiming."
  - "Use near submission or during heavy collaborative editing."
  - "Flags spans and suggests fixes without rewriting the whole draft."
mermaidFlow: |
  flowchart TD
    D["draft"] --> P["parse sentences"]
    P --> M["map to cites"]
    M --> V["verify support"]
    V --> F["flags"]
---

## Overview

Finds citations that drift from what sentences actually claim.

## When to use it

Pre-submission integrity passes or collaborative editing.

## Outputs

Flagged spans with suggested fixes.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

