---
title: Token optimization & caveman mode
description: How Bohr reduces token usage in multi-agent workflows and what savings to expect.
section: Reference
order: 4
---

Multi-agent research and paper pipelines repeat prompts, context, and intermediate text many times. Token cost is often the practical limit long before model capability. Bohr addresses this in two layers: **instruction-level compression** (“caveman” style for machine-facing steps) and **architecture** (minimal context JSON, file handoffs instead of huge inline pastes).

## Bundled caveman skill

The repo ships a caveman skill at `skills/caveman/caveman.md` (also installed with the skills-only installers). Its definition states that ultra-compressed assistant replies can cut **approximately 75%** of tokens compared with verbose defaults, **while preserving technical substance**. That figure is a **design target for assistant output**, not a guaranteed or uniformly measured benchmark: real savings depend on the model, task, and how closely the model follows terse instructions.

Intensity levels include `lite`, `full`, and `ultra`, plus optional classical-Chinese variants for maximum character compression.

## Paper generator / Pi subagents

The token-optimized paper path does **not** paste the full caveman skill file into every prompt. Instead it injects short **`[CAVEMAN MODE: …]` prefixes** that mirror those rules (`lite` / `full` / `ultra`), combines them with:

- **Minimal context** — typically slug, phase, iteration, and basenames of prior outputs (not full file contents).
- **File-based handoffs** — agents write artifacts to disk; the parent reads files instead of reloading everything into context.

Optional environment variables (loaded via `dotenv` when using the CLI, see `.env.example`):

| Variable | Role |
| --- | --- |
| `ENABLE_TOKEN_OPTIMIZATION` | If set to `false`, subagent caveman defaults to **`lite`** instead of your `CAVEMAN_MODE_DEFAULT`. |
| `CAVEMAN_MODE_DEFAULT` | `lite`, `full`, or `ultra` when optimization is enabled (default **`ultra`** if unset or invalid). |

Internal “token” figures in tooling often use a rough estimate (for example **characters ÷ 4**). Treat them as **order-of-magnitude tracking**, not billing-accurate counts.

## Interactive sessions

In the REPL, users can enable the full caveman skill behavior (including `/caveman` level switches) when the skill is installed—see the caveman skill text for triggers and boundaries. Code, commits, and PR text should stay in normal prose even when caveman is active for chat.

## Summary

| Mechanism | What it saves |
| --- | --- |
| Caveman-style replies | Primarily **assistant output** tokens when the model stays terse; skill docs cite **~75%** as a typical goal, not a promise. |
| Minimal context + files | **Prompt** tokens and repeated context in long runs. |
| Env-tunable caveman default | Lets you trade compression for readability (`lite` vs `ultra`). |

See also [Cost & token estimation](/docs/reference/cost-token-estimation) for provider pricing tiers, illustrative paper-run budgets, tool fees, and FLOPs intuition.
