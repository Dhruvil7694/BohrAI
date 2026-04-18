---
title: "Replication"
summary: "Plan or execute replication steps for a paper, claim, or benchmark."
slashCommand: "/replicate"
cliName: "replicate"
docsSlug: "workflows/replication"
category: "pipeline"
order: 7
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /replicate …
    - stage: 02 · PLAN
      nodes:
        - variant: hero
          lines:
            - planner
            - GOAL · PROTOCOL
    - stage: 03 · EXECUTE
      nodes:
        - lines:
            - experiment steps
        - lines:
            - measure
    - stage: 04 · COMPARE
      nodes:
        - lines:
            - vs paper results
    - stage: 05 · OUTPUT
      nodes:
        - lines:
            - replication notes
keyPoints:
  - "Turns replication into explicit steps, measurements, and comparison to published results."
  - "Use for benchmarks, claim checks, or lab-style follow-through."
  - "Leaves a clear trail of what matched, what diverged, and why."
mermaidFlow: |
  flowchart LR
    G["goal"] --> Pl["plan"]
    Pl --> Ex["experiment steps"]
    Ex --> Me["measure"]
    Me --> Cmp["compare to paper"]
    Cmp --> Rep["replication notes"]
---

## Overview

Structures replication as explicit steps, measurements, and comparison back to reported results.

## When to use it

Benchmark reproduction, claim verification, or lab protocol follow-through.

## Outputs

Scripts, logs, and a narrative of what matched or diverged.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

