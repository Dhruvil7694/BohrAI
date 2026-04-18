---
title: Why Bohr vs free AI writers
description: What makes Bohr different from generic paper generators—and how to spend less without lowering rigor.
section: Getting Started
order: 2
---

Free chatbots and “essay writer” sites optimize for **fluent prose in one shot**. Bohr optimizes for **traceable research**: sources, structured workflows, verification, and artifacts you can audit.

## What generic free writers do

- One model, one conversation—**no durable pipeline**
- **No guaranteed** citations, provenance, or reproducible steps
- Output that **sounds academic** without grounding in your sources
- **Opaque** history: hard to resume, diff, or hand off to a team

## What Bohr does instead

| Dimension | Typical free writer | Bohr |
| --- | --- | --- |
| **Goal** | Readable text | **Cited**, reviewable research output |
| **Architecture** | Single chat | **Multi-agent workflows** (`/paper`, `/lit-review`, `/deepresearch`, …) |
| **Evidence** | Often implied | **Grounded** in papers, web, repos—with URLs and provenance sidecars where workflows require them |
| **Quality control** | You re-prompt forever | **Verifier**, citation integrity, peer-review simulation, compliance passes |
| **Cost discipline** | Burn context in one thread | **File handoffs**, minimal subagent context, optional **caveman-style** compression for machine-facing steps |

The product value is **not** “we type faster.” It is **orchestration + grounding + verification** so you spend tokens on **reasoning and synthesis**, not on reinventing search or padding prose.

## How to spend less (without cutting quality)

1. **Use cheaper models for breadth**, stronger models for **final synthesis** (draft vs submission polish).
2. **Lean on Bohr’s routing**: artifacts on disk, compact context—see [Token optimization & caveman mode](/docs/reference/token-optimization).
3. **Plan dollars with published rates**: [Cost & token estimation](/docs/reference/cost-token-estimation).
4. **Prefer real retrieval** (papers, APIs you configure) over paying the LLM to **guess** citations.

## Next steps

- [Installation](/docs/getting-started/installation) · [Quick start](/docs/getting-started/quickstart)
- [Paper workflow](/docs/workflows/paper) · [Slash commands](/docs/reference/slash-commands)
