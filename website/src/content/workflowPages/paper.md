---
title: "Paper Workflow"
summary: "Manuscript-oriented pipeline with methods, figures, and compliance-oriented passes."
slashCommand: "/paper"
cliName: "paper"
docsSlug: "workflows/paper"
category: "pipeline"
order: 4
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /paper …
    - stage: 02 · DRAFT
      nodes:
        - variant: hero
          lines:
            - outline → sections
            - STRUCTURE
    - stage: 03 · ASSETS
      nodes:
        - lines:
            - figures & tables
        - lines:
            - method / math
    - stage: 04 · COMPLIANCE
      nodes:
        - lines:
            - paper checks
    - stage: 05 · REVIEW
      nodes:
        - lines:
            - review pass
        - lines:
            - submission draft
keyPoints:
  - "Shapes output like a manuscript: sections, figures or tables, and writing-oriented checks."
  - "Use when the goal is a paper-like artifact, not only a research memo."
  - "Includes compliance- and review-style passes where configured."
mermaidFlow: |
  flowchart TD
    Q["question / outline"] --> D["draft sections"]
    D --> F["figures & tables"]
    F --> M["method/math checks"]
    M --> P["paper-compliance"]
    P --> Rev["review"]
    Rev --> Pub["submission-ready draft"]
---

## Overview

Builds a publication-shaped artifact: sections, figures where applicable, and checks tuned for scientific writing norms.

## When to use it

When your goal is a **paper-shaped deliverable**, not only a research brief.

## Outputs

Structured manuscript drafts with reviewer-style passes where configured.

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side

