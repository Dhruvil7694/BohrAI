---
title: "Paper-Pro Workflow"
summary: "Structured manuscript pipeline with architecture, writing, skeptical review, verification, compliance, and provenance."
slashCommand: "/paper-pro"
cliName: "paper-pro"
docsSlug: "workflows/paper-pro"
category: "pipeline"
order: 5
pipelineDiagram:
  columns:
    - stage: 01 · BRIEF
      nodes:
        - variant: outline
          lines:
            - prompt / artifact
            - slug + scope
    - stage: 02 · PLAN
      nodes:
        - variant: dark
          lines:
            - plan
            - evidence map
    - stage: 03 · DRAFT
      nodes:
        - variant: hero
          lines:
            - architecture
            - manuscript
    - stage: 04 · CHECKS
      nodes:
        - lines:
            - citation audit
        - lines:
            - reviewer
        - lines:
            - verifier
    - stage: 05 · SHIP
      nodes:
        - lines:
            - compliance
        - lines:
            - final paper
        - lines:
            - provenance
keyPoints:
  - "Builds a paper-shaped artifact with explicit structure before drafting starts."
  - "Uses skeptical review and verification passes before promotion."
  - "Produces a provenance sidecar alongside the final manuscript."
mermaidFlow: |
  flowchart TD
    Q["topic / local evidence"] --> P["plan"]
    P --> A["paper-architect"]
    A --> D["writer draft"]
    D --> C["citation-integrity"]
    C --> R["reviewer"]
    R --> V["verifier (if needed)"]
    V --> PC["paper-compliance"]
    PC --> F["final paper + provenance"]
---

## Overview

`paper-pro` is the manuscript workflow for teams who want a polished paper and an honest record of what the paper is actually supported by.

## When to use it

Use it when the deliverable should feel like a professional paper rather than a short memo or raw literature brief.

## Outputs

The workflow produces both the manuscript and the audit trail around it: plan, architecture, review, compliance, and provenance.

## Practical notes

It works best when you start from a real evidence file or a verified local note set. If the evidence is thin, the workflow should narrow the claims instead of pretending certainty.

## See also

- [Paper-Pro workflow docs](/docs/workflows/paper-pro)
- [Paper architect agent](/docs/agents/paper-architect)
- [Paper-pro sample run](/docs/reference/paper-pro-sample-run)

