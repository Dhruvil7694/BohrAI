---
title: "Evidence Score"
summary: "Transparent rubric for claim support quality."
slashCommand: "/evidence-score"
cliName: "evidence-score"
docsSlug: "workflows/evidence-score"
category: "module"
order: 103
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /evidence-score …
    - stage: 02 · RUBRIC
      nodes:
        - variant: hero
          lines:
            - scorer
            - RUBRIC · WEIGHTS
    - stage: 03 · TIER
      nodes:
        - lines:
            - tier table
    - stage: 04 · OUTPUT
      nodes:
        - lines:
            - scored sheet
keyPoints:
  - "Scores how strongly evidence supports each claim using a transparent rubric."
  - "Use for dense briefs, audits, or making argument strength visible."
  - "Delivers per-claim tiers with short rationale snippets."
mermaidFlow: |
  flowchart TD
    K["claims"] --> S["score rubric"]
    S --> W["weights"]
    W --> T["tier table"]
    T --> out["scored sheet"]
---

## Overview

Scores how well evidence backs each claim—useful for triage and reviewer transparency.

## When to use it

Dense briefs, audit prep, or grading argument strength.

## Outputs

Per-claim scores with rationale snippets.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

