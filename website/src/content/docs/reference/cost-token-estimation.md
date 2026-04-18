---
title: Cost & token estimation
description: Illustrative token budgets, provider pricing buckets, tool costs, and FLOPs intuition for research-to-paper runs.
section: Reference
order: 5
---

Cloud LLM bills are priced in **tokens**, not FLOPs. This page separates **what you pay the model provider**, **what you pay for external tools** (search, hosted APIs), and **what Bohr does to shrink usage without lowering scientific quality**—then walks through a **representative “paper from scratch”** example. All **dollar and token figures are approximations** for planning; always confirm **live rates** on each provider’s pricing page before budgeting.

## 1. How to estimate tokens

| Method | Use when |
| --- | --- |
| **Provider usage / dashboard** | Authoritative for billing (OpenAI, Anthropic, Google AI Studio, xAI, DeepSeek, Moonshot, etc.). |
| **Rough heuristic** | English prose is often **~4 characters per token** (similar to `chars / 4`). Code and symbols can differ. |
| **Tokenizer** | Libraries such as `tiktoken` (OpenAI-style) or each vendor’s counter give exact counts for a string. |

Bohr’s internal token hints (for example in paper-generator tooling) may use **character-based estimates**. Treat those as **order-of-magnitude**, not invoice-grade.

**Input vs output:** APIs usually charge **output tokens higher** than input. Long multi-agent runs often burn more **input** (repeated system prompts, prior turns, tool results), so total cost is **not** proportional to “final manuscript length.”

---

## 2. Representative API pricing by provider family (verify before you buy)

Rates change frequently. The table below lists **illustrative USD per 1M tokens** from **public docs** as of early **2026**—use it only to compare **tiers**, then open the official link.

| Family | Illustrative flagship tier (input / output per 1M USD) | Budget / fast tier (illustrative) | Official pricing |
| --- | --- | --- | --- |
| **Anthropic (Claude)** | Opus 4.5–4.7: **$5 / $25** · Sonnet 4.5–4.6: **$3 / $15** · Haiku 4.5: **$1 / $5** | Haiku 3: **$0.25 / $1.25** | [Claude pricing](https://docs.anthropic.com/en/docs/about-claude/pricing) |
| **OpenAI** | Flagship rows on the pricing page—check **Standard** tier columns | Mini / nano rows are much lower | [OpenAI pricing](https://platform.openai.com/docs/pricing) |
| **Google (Gemini)** | Pro / Flash tiers vary by model and prompt size | Flash / Flash-Lite often **sub-dollar per 1M** on input | [Gemini Developer API pricing](https://ai.google.dev/gemini-api/docs/pricing) |
| **xAI (Grok)** | Example from xAI docs: **~$2 / $6** per 1M (e.g. Grok 4.20 class) · **~$0.20 / $0.50** for Grok 4.1 fast | Cached input rates lower | [xAI models & pricing](https://docs.x.ai/docs/models) |
| **DeepSeek (China, global API)** | **deepseek-chat / deepseek-reasoner (V3.2):** **$0.28** per 1M input (cache miss) · **$0.42** per 1M output; cache-hit input **$0.028** / 1M | Extremely cost-competitive vs Western flagships | [DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing) |
| **Other Chinese APIs (Moonshot / Kimi, Qwen, Zhipu, etc.)** | Often **CNY-native** listings; third-party mirrors quote **~$0.55–$2.50 / 1M** depending on model — **high variance** | Use **official portals** after currency conversion | Check each vendor’s developer console |

**Chinese models:** list prices may be in **yuan per 1k or 1M tokens**. Convert at the day’s FX and read **tiering** (context length, reasoning mode, batch).

**Third-party routers (OpenRouter, etc.):** markups or discounts vs direct—compare **effective $/M** including rate limits.

---

## 3. Non-LLM costs (“other tools”)

These are **not** Bohr-specific model tokens but show up on real bills:

| Category | Typical pattern | Notes |
| --- | --- | --- |
| **Web search (provider-native)** | **Per search** or **per 1k calls** + **search result text billed as tokens** | Example: Anthropic API [documents](https://docs.anthropic.com/en/docs/about-claude/pricing) web search at **$10 per 1,000 searches** plus token usage; OpenAI lists tool/search line items on their pricing page; xAI lists **$5 per 1,000** `web_search` invocations on [their models page](https://docs.x.ai/docs/models). |
| **Third-party search APIs** (SerpAPI, Tavily, Serper, etc.) | Subscription or per-query | Bohr may route web search through your configured provider—see [Web search](/docs/tools/web-search) and your `settings`. |
| **Paper / academic APIs** | Often **free** (arXiv, PubMed) or **optional keys** for higher limits (e.g. Semantic Scholar) | See `.env.example` in the repo. |
| **GPU / Modal / RunPod** | **Per second** GPU or **per job** | Only if you run **replication / experiments**—not inherent to writing the manuscript in the REPL. |

So: **most of your variable cost is still LLM tokens**; search and retrieval are smaller but **spiky** when agents issue many queries.

---

## 4. FLOPs: when they matter (and when they don’t)

**Hosted APIs:** you do **not** pay FLOPs—you pay **tokens** (and tool fees). FLOPs are useful for **self-hosted** or **hardware sizing** intuition.

**Order-of-magnitude decode cost** for dense transformer inference is often summarized as **~2× parameter-count FLOPs per generated token** (very rough; MoE, quantization, kernels, and attention kernels change constants). Example: a **70B** parameter model → on the order of **10¹¹–10¹² FLOP per output token**—useful to compare **GPU TFLOPS** vs desired **tokens/sec**, not to compute your OpenAI bill.

**Self-host sanity check:**

\[
\text{approx FLOPs per token} \sim c \times P
\]

where \(P\) is parameter count and \(c\) is an \(O(1)\) factor (often quoted near **2** for forward decode in simplified analyses). Multiply by **tokens/sec** to get required **sustained TFLOPS** at the GPU.

---

## 5. Where Bohr spends tokens vs where it saves

**Spend (“our stack”):**

- **Orchestration + subagents:** each Pi subagent turn sends **instructions + task + compact context + path to artifacts** ([Token optimization](/docs/reference/token-optimization)).
- **Your chosen model** bills **every** input and output token at that provider’s rate.

**Save (without lowering scientific bar):**

- **Caveman-style machine-facing replies** — fewer filler tokens on **assistant** turns when models comply; skill-level goal **~75%** output compression vs verbose defaults is **aspirational**, not guaranteed.
- **Minimal JSON context + file handoffs** — avoids re-embedding multi-page intermediates in every prompt.
- **Thinking level** — lower `BOHR_THINKING` reduces **hidden reasoning** spend where the runtime supports it (trade quality/latency per task).

**Quality:** compression targets **phrasing**, not **evidence**. Verification, citations, and provenance still come from structured stages ([Paper workflow](/docs/workflows/paper)).

---

## 6. Worked example: one research paper from scratch (`/paper`)

Assume a **full** `/paper` run: planning → evidence → draft → method/figures → citation integrity → review → compliance ([Paper workflow](/docs/workflows/paper)). Numbers below are **illustrative** for one **medium** manuscript (not a guarantee).

### 6.1 Token budget (single order-of-magnitude scenario)

| Phase | What happens | Illustrative naive tokens (input / output) | Why Bohr lowers it |
| --- | --- | --- | --- |
| Planning & routing | Planner picks agents, writes plan file | ~200k / ~40k | Plan externalized to disk; not re-pasted every turn |
| Evidence & literature | Parallel researchers, summaries | ~2.5M / ~600k | Handoffs = **paths + short deltas**, not full dumps each hop |
| Draft & sections | Writer + revisions | ~1.2M / ~350k | Same |
| Method / figures / tables | Specialized passes | ~400k / ~120k | Focused prompts |
| Citation + verifier + review | Integrity + peer-review sim | ~600k / ~180k | Structured outputs |
| Compliance & polish | Final gates | ~200k / ~60k | Short machine summaries |

**Rounded naive illustrative total:** **~5M input**, **~1.35M output** (same model family throughout).

With **token discipline** (caveman on subagents, file handoffs, minimal context)—**illustrative**, not measured:

- **Input** might land nearer **~3–3.5M** (~30–40% reduction vs naive re-threading).
- **Output** on machine-facing steps might land nearer **~0.45–0.55M** if verbosity drops sharply (~60% on those steps); blended across all phases **~0.55–0.75M total output** is a plausible planning range.

Always **measure on your actual run** via provider dashboards.

### 6.2 Dollar illustration (Sonnet-class pricing)

Using **Claude Sonnet 4.5** list **$3 / MTok input**, **$15 / MTok output** ([Anthropic table above](https://docs.anthropic.com/en/docs/about-claude/pricing)):

| Scenario | Input cost | Output cost | Total (LLM only) |
| --- | ---: | ---: | ---: |
| **Naive illustrative** (5M in, 1.35M out) | $15.00 | $20.25 | **~$35** |
| **Optimized illustrative** (3.25M in, 0.65M out) | $9.75 | $9.75 | **~$19–20** |

So **same workflow intent**, rough **~45% lower** LLM spend in this toy arithmetic—**your mileage will differ** with model choice, topic breadth, iteration count, and search/tool usage.

Repeat with **DeepSeek** official **$0.28 / $0.42** per 1M (cache miss / output) for [deepseek-chat / reasoner](https://api-docs.deepseek.com/quick_start/pricing):

- Naive illustrative: \(5×0.28 + 1.35×0.42 \approx \$1.97\)
- Optimized illustrative: \(3.25×0.28 + 0.65×0.42 \approx \$1.18\)

Again: **tool fees and cache tier** change totals.

---

## 7. Model selection strategy (quick)

| Goal | Direction |
| --- | --- |
| **Minimize cost** | Prefer **budget APIs** (e.g. DeepSeek, Gemini Flash-class, Haiku-class, Grok fast tier) for breadth; reserve **flagship** for final drafting or hard reasoning steps. |
| **Maximize quality / safety** | **Sonnet / Opus-class**, GPT-5.x flagship, Gemini Pro-class—expect **higher $/M** and often **more reasoning tokens**. |
| **Predictable bills** | Enable **prompt caching** where offered (Anthropic/OpenAI/Google document separate cache pricing); reduce **turn count** via file handoffs already built into Bohr. |

---

## 8. Related reading

- [Token optimization & caveman mode](/docs/reference/token-optimization)
- [Paper workflow](/docs/workflows/paper)
- [Configuration](/docs/getting-started/configuration)
