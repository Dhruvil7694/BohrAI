---
title: CLI Commands
description: Complete reference for all Bohr AI CLI commands and flags.
section: Reference
order: 1
---

This page covers the dedicated Bohr AI CLI commands and flags. Workflow commands like `bohr deepresearch` are also documented in the [Slash Commands](/docs/reference/slash-commands) reference since they map directly to REPL slash commands.

## Core commands

| Command | Description |
| --- | --- |
| `bohr` | Launch the interactive REPL |
| `bohr chat [prompt]` | Start chat explicitly, optionally with an initial prompt |
| `bohr help` | Show CLI help |
| `bohr setup` | Run the guided setup wizard |
| `bohr doctor` | Diagnose config, auth, Pi runtime, and preview dependencies |
| `bohr status` | Show the current setup summary (model, auth, packages) |

## Model management

| Command | Description |
| --- | --- |
| `bohr model list` | List available models in Pi auth storage |
| `bohr model login [id]` | Authenticate a model provider with OAuth or API-key setup |
| `bohr model logout [id]` | Clear stored auth for a model provider |
| `bohr model set <provider/model>` | Set the default model for all sessions |

These commands manage your model provider configuration. The `model set` command updates `~/.bohr/settings.json` with the new default. It accepts either `provider/model-name` or `provider:model-name`, for example `anthropic/claude-sonnet-4-20250514` or `anthropic:claude-sonnet-4-20250514`. Running `bohr model login google` or `bohr model login amazon-bedrock` routes directly into the relevant API-key setup flow instead of requiring the interactive picker.

## AlphaXiv commands

| Command | Description |
| --- | --- |
| `bohr alpha login` | Sign in to alphaXiv |
| `bohr alpha logout` | Clear alphaXiv auth |
| `bohr alpha status` | Check alphaXiv auth status |

AlphaXiv authentication enables Bohr AI to search and retrieve papers, access discussion threads, and pull citation metadata. The `alpha` CLI is also available directly in the agent shell for paper search, Q&A, and code inspection.

## Package management

| Command | Description |
| --- | --- |
| `bohr packages list` | List all available packages and their install status |
| `bohr packages install <preset>` | Install an optional package preset |
| `bohr update [package]` | Update installed packages, or a specific package by name |

Use `bohr packages list` to see which optional packages are available and which are already installed. The `all-extras` preset installs every optional package at once.

## Utility commands

| Command | Description |
| --- | --- |
| `bohr search status` | Show Pi web-access status and config path |

## Workflow commands

All research workflow slash commands can also be invoked directly from the CLI:

```bash
bohr deepresearch "topic"
bohr lit "topic"
bohr lit-review "topic"
bohr paper "topic"
bohr review artifact.md
bohr audit 2401.12345
bohr replicate "claim"
bohr compare "topic"
bohr draft "topic"
bohr hypothesis "topic"
bohr contradict artifact.md
bohr evidence-score artifact.md
bohr experiment "hypothesis"
bohr citation-check artifact.md
bohr memory-log "project"
```

These are equivalent to launching the REPL and typing the corresponding slash command.

## Flags

| Flag | Description |
| --- | --- |
| `--prompt "<text>"` | Run one prompt and exit (one-shot mode) |
| `--model <provider/model|provider:model>` | Force a specific model for this session |
| `--thinking <level>` | Set thinking level: `off`, `minimal`, `low`, `medium`, `high`, `xhigh` |
| `--cwd <path>` | Set the working directory for all file operations |
| `--session-dir <path>` | Set the session storage directory |
| `--new-session` | Start a new persisted session |
| `--alpha-login` | Sign in to alphaXiv and exit |
| `--alpha-logout` | Clear alphaXiv auth and exit |
| `--alpha-status` | Show alphaXiv auth status and exit |
| `--doctor` | Alias for `bohr doctor` |
| `--setup-preview` | Install preview dependencies (pandoc) |
