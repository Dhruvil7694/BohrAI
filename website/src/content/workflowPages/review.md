---
title: "Peer Review"
summary: "Severity-graded feedback and inline annotations on an artifact."
slashCommand: "/review"
cliName: "review"
docsSlug: "workflows/review"
category: "pipeline"
order: 5
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /review …
    - stage: 02 · INGEST
      nodes:
        - variant: hero
          lines:
            - orchestrator
            - SCOPE · ALLOCATE
    - stage: 03 · REVIEW
      nodes:
        - lines:
            - reviewer agent
        - lines:
            - severity grades
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - inline notes
        - lines:
            - review report
keyPoints:
  - "Produces structured peer-style feedback: severity, strengths, and concrete revisions."
  - "Ideal before submission or when you want an adversarial read of a near-final draft."
  - "Review pack ties notes to sections or claims for easier editing."
mermaidFlow: |
  flowchart LR
    A["artifact"] --> R["reviewer agent"]
    R --> S["severity grades"]
    S --> N["inline notes"]
    N --> out["review report"]
---

## Overview

Simulates structured peer review: strengths, weaknesses, severity, and concrete revision asks.

## When to use it

Before submission or when stress-testing an internal draft.

## Outputs

An annotated review pack tied to sections or claims.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

