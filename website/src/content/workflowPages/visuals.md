---
title: "Visuals"
summary: "Generate data-backed charts, source-linked tables, and conceptual image assets."
slashCommand: "/visuals"
cliName: "visuals"
docsSlug: "workflows/visuals"
category: "pipeline"
order: 4.5
pipelineDiagram:
  columns:
    - stage: 01 · PROMPT
      nodes:
        - variant: outline
          lines:
            - you (REPL)
            - /visuals …
    - stage: 02 · SOURCE DATA
      nodes:
        - variant: hero
          lines:
            - collect
            - JSON · CSV
    - stage: 03 · FACTUAL ASSETS
      nodes:
        - lines:
            - charts
        - lines:
            - tables
    - stage: 04 · CONCEPT ASSETS
      nodes:
        - lines:
            - Nano Banana
        - lines:
            - OpenAI image
    - stage: 05 · DELIVER
      nodes:
        - variant: hero
          lines:
            - manifest
            - provenance
keyPoints:
  - "Creates a report plus an asset folder with chart, table, JSON, CSV, and image outputs."
  - "Keeps market analysis and numeric comparisons data-backed before any chart is rendered."
  - "Uses image models only for conceptual visuals such as flowcharts, material boards, and presentation imagery."
  - "Records every asset in a manifest with source data, provider/model, prompt, and verification state."
mermaidFlow: |
  flowchart TD
    P["/visuals topic"] --> D["collect source data"]
    D --> J["data.json + data.csv"]
    J --> C["data-backed charts"]
    J --> T["source-linked tables"]
    D --> I["concept image prompts"]
    I --> M["Gemini / OpenAI images"]
    C --> A["asset manifest"]
    T --> A
    M --> A
    A --> O["outputs/<slug>.md + provenance"]
---

## Overview

Visuals turns research or market-analysis data into a visible package: source data, charts, tables, optional generated images, a report, and a manifest.

## When to use it

Use it when you need **client-facing visual assets** rather than only prose: market comparisons, product matrices, flowcharts, material boards, process diagrams, or research summaries with charts.

## Outputs

The workflow writes `outputs/<slug>.md`, `outputs/<slug>.provenance.md`, and `outputs/<slug>.assets/` with `manifest.json`, source data, chart/table assets, and optional generated images.

## Accuracy rule

Factual charts and comparison tables are generated from structured source data. Image models are reserved for conceptual assets and are not used to invent numbers, market shares, rankings, or factual labels.

## See also

- [Visuals tool docs](/docs/tools/visuals) — provider setup and asset contract
- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side
