---
title: "Contradiction"
summary: "Adversarial pass on conclusions and cited support."
slashCommand: "/contradict"
cliName: "contradict"
docsSlug: "workflows/contradict"
category: "module"
order: 102
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /contradict …
    - stage: 02 · ATTACK
      nodes:
        - variant: hero
          lines:
            - adversary
            - CLAIMS · STRESS
    - stage: 03 · STRESS
      nodes:
        - lines:
            - evidence stress
        - lines:
            - counterclaims
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - risk list
keyPoints:
  - "Stress-tests whether conclusions hold up against the cited evidence."
  - "Pairs well with reasoning validation for argumentative rigor."
  - "Surfaces contradictions with severity hints for triage."
mermaidFlow: |
  flowchart LR
    Cl["claims"] --> A["attack paths"]
    A --> E["evidence stress"]
    E --> L["counterclaims"]
    L --> rep["risk list"]
---

## Overview

Surfaces conflicts between narrative and evidence—pair with reasoning validation for rigor.

## When to use it

Before finalizing conclusions or when a draft feels too tidy.

## Outputs

Contradiction map with severity hints.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

