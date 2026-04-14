---
title: Literature Review Pipeline
description: End-to-end academic survey workflow with themes, contradictions, gaps, and validation.
section: Workflows
order: 3
---

The `/lit-review` workflow runs a full, structured survey-paper pipeline rather than a simple summary.

## Usage

From the REPL:

```
/lit-review "retrieval-augmented generation for legal reasoning"
```

From the CLI:

```bash
bohr lit-review "retrieval-augmented generation for legal reasoning"
```

## Pipeline

1. Literature Collector
2. Literature Quality
3. Literature Synthesizer
4. Literature Contradiction
5. Literature Gap
6. Literature Review Writer
7. Literature Review Validator
8. Citation Verifier

## Expected output

- `outputs/<slug>.md`
- `outputs/<slug>.provenance.md`

The final review is required to include:

- Introduction
- Thematic sections
- Key disagreements
- Research gaps

## Customization

- Scope by year window (for example, 2020-2026)
- Domain constraints (for example, only peer-reviewed venues)
- Quality strictness (for example, keep only medium/high score papers)
- Validator strictness for bias and missing perspectives
