---
title: "Deep Research"
summary: "Multi-agent investigation with citations, contradiction checks, and iteration until convergence."
slashCommand: "/deepresearch"
cliName: "deepresearch"
docsSlug: "workflows/deep-research"
category: "pipeline"
order: 1
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /deepresearch …
    - stage: 02 · ORCHESTRATE
      nodes:
        - variant: hero
          lines:
            - orchestrator
            - PLAN · DISPATCH
    - stage: 03 · GATHER
      nodes:
        - lines:
            - researcher ×4
        - lines:
            - lit-collector
        - lines:
            - evidence-scorer
    - stage: 04 · CHALLENGE
      nodes:
        - lines:
            - contradiction
        - lines:
            - reasoning-validator
        - lines:
            - knowledge-graph
    - stage: 05 · DELIVER
      nodes:
        - lines:
            - writer → verifier
        - lines:
            - reviewer
        - variant: hero
          lines:
            - iteration-ctrl
  loopCaption: LOOP UNTIL CONVERGENCE · RESEARCH → REVIEW → IMPROVE
keyPoints:
  - "Runs multiple gathering agents in parallel, then scores and challenges evidence before writing."
  - "Loops through review and iteration gates until convergence—suited to citation-heavy deliverables."
  - "Best when you need traceable sources and contradictions surfaced, not a one-shot summary."
mermaidFlow: |
  flowchart TD
    P["plan-research"] --> H["hypothesis"]
    H --> R["parallel researchers"]
    R --> E["evidence-scorer"]
    E --> C["contradiction + reasoning"]
    C --> W["writer"]
    W --> V["verifier + reviewer"]
    V --> I["iteration-controller"]
    I -->|loop or done| O["Final brief"]
---

## Overview

Deep research is Bohr's flagship workflow: it fans out gathering, scores evidence, runs adversarial checks, writes a synthesis, and loops until quality gates pass.

## When to use it

Choose deep research when you need a **source-heavy brief** with traceable citations and resolved contradictions—not a quick summary.

## What you get

A durable artifact (often Markdown or structured brief) with inline citations, explicit gaps, and iteration notes from `iteration-controller`.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

