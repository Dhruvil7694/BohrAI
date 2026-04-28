---
description: Generate data-backed charts, tables, and conceptual image assets for a topic.
args: <topic>
section: Research Workflows
topLevelCli: true
---
Create visual assets for: $@

Derive a short slug from the topic (lowercase, hyphens, no filler words, <=5 words). Use this slug for all files in this run.

## Workflow

1. **Plan** - Write `outputs/.plans/<slug>.md` with the intended assets, data needed, source plan, and verification checklist. Continue automatically after writing the plan.
2. **Collect data** - For market analysis, comparisons, benchmarks, timelines, or any numeric claim, collect source-backed data first. Save normalized data to `outputs/<slug>.assets/data.json` and `outputs/<slug>.assets/data.csv` before creating charts or tables. Each row must include a source URL or local source path.
3. **Generate data-backed visuals** - Create charts from the structured data using `pi-charts` or deterministic SVG/Markdown generation. Do not ask an image model to invent numeric charts, market shares, ranks, prices, or factual labels.
4. **Generate conceptual visuals** - Use configured visual models only for non-factual presentation assets: flowcharts, process diagrams, material boards, product mood boards, or conceptual illustrations. Prefer Gemini Nano Banana (`gemini-2.5-flash-image`) unless `bohr visual status` shows another default. Nano Banana Pro may be used as `gemini-3-pro-image-preview`; OpenAI image generation may be used when configured. If no image API key is configured, skip conceptual image generation and record the skip in provenance.
5. **Tables** - Produce comparison tables as Markdown and, when data-backed, export the same data as CSV. Tables must preserve source links and distinguish verified source data from inferred commentary.
6. **Manifest** - Write `outputs/<slug>.assets/manifest.json` listing every artifact path, kind, source data path, provider/model when used, prompt when used, and verification state (`source-data`, `data-backed`, `generated-concept`, `blocked`, or `unverified`).
7. **Deliver** - Save the final visual brief to `outputs/<slug>.md` and provenance to `outputs/<slug>.provenance.md`. Verify on disk that the report, provenance, asset directory, manifest, and all listed assets exist before stopping.

## Output contract

- `outputs/.plans/<slug>.md`
- `outputs/<slug>.md`
- `outputs/<slug>.provenance.md`
- `outputs/<slug>.assets/manifest.json`
- `outputs/<slug>.assets/*.png|*.svg|*.csv|*.json|*.md`

## Visual accuracy rule

Charts and tables must be generated from structured data. Image models are allowed only for conceptual assets and must not be treated as verification for factual claims.
