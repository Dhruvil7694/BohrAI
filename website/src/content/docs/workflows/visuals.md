---
title: Visuals Workflow
description: Generate data-backed charts, source-linked tables, and conceptual image assets.
section: Workflows
order: 4.5
---

The `/visuals` workflow creates chart, table, and image assets from a topic or analysis request.

## Usage

From the REPL:

```bash
/visuals "AI agent market comparison"
```

From the CLI:

```bash
bohr visuals "AI agent market comparison"
```

## Pipeline

1. Plan the visual package and slug
2. Collect source-backed market or comparison data
3. Save normalized `data.json` and `data.csv`
4. Generate factual charts and tables from that structured data
5. Generate optional conceptual images with Gemini or OpenAI when configured
6. Write `manifest.json`, final Markdown report, and provenance

## Expected output

- `outputs/<slug>.md`
- `outputs/<slug>.provenance.md`
- `outputs/<slug>.assets/manifest.json`
- `outputs/<slug>.assets/data.json`
- `outputs/<slug>.assets/data.csv`
- chart, table, and optional image assets

## Accuracy rule

Charts and factual tables must be generated from structured source data. Image models are used only for conceptual assets such as flowcharts, material boards, and presentation images.
