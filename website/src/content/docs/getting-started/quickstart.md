---
title: Quick Start
description: Get up and running with Bohr AI in under five minutes.
section: Getting Started
order: 2
---

This guide assumes you have already [installed Bohr AI](/docs/getting-started/installation) and run `bohr setup`. If not, start there first.

## Launch the REPL

Start an interactive session by running:

```bash
bohr
```

You are dropped into a conversational REPL where you can ask research questions, run workflows, and interact with agents in natural language. Type your question and press Enter.

## Run a one-shot prompt

If you want a quick answer without entering the REPL, use the `--prompt` flag:

```bash
bohr --prompt "Summarize the key findings of Attention Is All You Need"
```

Bohr AI processes the prompt, prints the response, and exits. This is useful for scripting or piping output into other tools.

## Start a deep research session

Deep research is the flagship workflow. It dispatches multiple agents to search, read, cross-reference, and synthesize information from academic papers and the web:

```bash
bohr
> /deepresearch What are the current approaches to mechanistic interpretability in LLMs?
```

The agents collaborate to produce a structured research report with citations, key findings, and open questions. The full report is saved to your session directory for later reference.

## Work with files

Bohr AI can read and write files in your working directory. Point it at a paper or codebase for targeted analysis:

```bash
bohr --cwd ~/papers
> /review arxiv:2301.07041
```

You can also ask Bohr AI to draft documents, audit code, or compare multiple sources by referencing local files directly in your prompts.

## Explore slash commands

Type `/help` inside the REPL to see all available slash commands. Each command maps to a workflow or utility, such as `/deepresearch`, `/review`, `/draft`, `/watch`, and more. You can also run any workflow directly from the CLI:

```bash
bohr deepresearch "transformer architectures for protein folding"
```

See the [Slash Commands reference](/docs/reference/slash-commands) for the complete list.
