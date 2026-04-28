---
title: Figures Tables
description: Produces publication-ready figure/table plans with traceable captions and data paths.
section: Agents
order: 21
---

The figures-tables agent turns result artifacts into publication-ready visual assets. It now also enforces the visual accuracy rule used by `/visuals`: factual charts and tables come from structured source data, while image models are reserved for conceptual assets.

## What it does

It defines figure and table structures, writes clear captions, maps each visual to underlying source data paths, and records chart/table/image assets in a manifest when the parent workflow creates one.

For numeric charts, market comparisons, benchmark tables, or timelines, it expects `data.json` and/or `data.csv` before rendering. For flowcharts, material boards, or presentation imagery, it can use configured image providers without treating the generated image as evidence for factual claims.

## Output

A visual inventory artifact with figure/table specs and traceability links.
