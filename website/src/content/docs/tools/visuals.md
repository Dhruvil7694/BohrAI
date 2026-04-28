---
title: Visuals
description: Image generation, data-backed charts, and source-linked tables in Bohr AI.
section: Tools
order: 3
---

Bohr AI can produce report-ready visual assets through `/visuals` and through research workflows when the evidence supports a chart, table, or conceptual image.

## Configuration

Check visual provider status:

```bash
bohr visual status
```

Save an API key:

```bash
bohr visual set gemini "YOUR_GEMINI_API_KEY"
bohr visual set openai "YOUR_OPENAI_API_KEY"
```

Set the default provider and model:

```bash
bohr visual default gemini gemini-2.5-flash-image
bohr visual default gemini gemini-3-pro-image-preview
bohr visual default openai gpt-image-1.5
```

Keys are stored in `~/.bohr/visuals.json`. Bohr also falls back to `GEMINI_API_KEY` and `OPENAI_API_KEY` from the environment.

## Artifact contract

Visual workflows write:

- `outputs/<slug>.md`
- `outputs/<slug>.provenance.md`
- `outputs/<slug>.assets/manifest.json`
- source data such as `data.json` and `data.csv`
- chart, table, and image assets next to the manifest

Charts and factual tables must come from structured source data. Image models are reserved for conceptual flowcharts, material boards, presentation images, and similar non-numeric visuals.
