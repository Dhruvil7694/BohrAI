---
title: Configuration
description: Understand Bohr AI configuration files and environment variables.
section: Getting Started
order: 5
---

Bohr AI stores all configuration and state under `~/.bohr/`. This directory is created on first run and contains settings, authentication tokens, session history, and installed packages.

## Directory structure

```
~/.bohr/
├── settings.json       # Core configuration
├── web-search.json     # Web search routing config
├── auth/               # OAuth tokens and API keys
├── sessions/           # Persisted conversation history
└── packages/           # Installed optional packages
```

The `settings.json` file is the primary configuration file. It is created by `bohr setup` and can be edited manually. A typical configuration looks like:

```json
{
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-20250514",
  "defaultThinkingLevel": "medium"
}
```

## Model configuration

The `defaultProvider` and `defaultModel` fields set which model is used when you launch Bohr AI without the `--model` flag. You can change them via the CLI:

```bash
bohr model set anthropic/claude-opus-4-20250514
```

To see all models you have configured:

```bash
bohr model list
```

Only authenticated/configured providers appear in `bohr model list`. If you only see OpenAI models, it usually means only OpenAI auth is configured so far.

To add another provider, authenticate it first:

```bash
bohr model login anthropic
bohr model login google
bohr model login amazon-bedrock
```

Then switch the default model:

```bash
bohr model set anthropic/claude-opus-4-6
```

The `model set` command accepts both `provider/model` and `provider:model` formats. `bohr model login google` opens the API-key flow directly, while `bohr model login amazon-bedrock` verifies the AWS credential chain that Pi uses for Bedrock access.

## Subagent model overrides

Bohr AI bundled subagents inherit the main default model unless you override them explicitly. Inside the REPL, run:

```bash
/bohr-model
```

This opens an interactive picker where you can either:

- change the main default model for the session environment
- assign a different model to any bundled subagent such as `researcher`, `reviewer`, `writer`, `verifier`, `hypothesis`, `contradiction`, `evidence-scorer`, `experiment`, `citation-integrity`, or `memory`

Per-subagent overrides are persisted in the synced agent files under `~/.bohr/agent/agents/` with a `model:` frontmatter field. Removing that field makes the subagent inherit the main default model again.

## Thinking levels

The `thinkingLevel` field controls how much reasoning the model does before responding. Available levels are `off`, `minimal`, `low`, `medium`, `high`, and `xhigh`. Higher levels produce more thorough analysis at the cost of latency and token usage. You can override per-session:

```bash
bohr --thinking high
```

## Environment variables

Bohr AI respects the following environment variables, which take precedence over `settings.json`:

| Variable | Description |
| --- | --- |
| `BOHR_MODEL` | Override the default model |
| `BOHR_HOME` | Override the config directory (default: `~/.bohr`) |
| `BOHR_THINKING` | Override the thinking level |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `AWS_PROFILE` | Preferred AWS profile for Amazon Bedrock |
| `TAVILY_API_KEY` | Tavily web search API key |
| `SERPER_API_KEY` | Serper web search API key |

For optional paper-generator token tuning (`CAVEMAN_MODE_DEFAULT`, `ENABLE_TOKEN_OPTIMIZATION`), see [Token optimization & caveman mode](/docs/reference/token-optimization). For illustrative **$/run** planning by provider, see [Cost & token estimation](/docs/reference/cost-token-estimation).

## Session storage

Each conversation is persisted as a JSON file in `~/.bohr/sessions/`. To start a fresh session:

```bash
bohr --new-session
```

To point sessions at a different directory (useful for per-project session isolation):

```bash
bohr --session-dir ~/myproject/.bohr/sessions
```

## Diagnostics

Run `bohr doctor` to verify your configuration is valid, check authentication status for all configured providers, and detect missing optional dependencies. The doctor command outputs a checklist showing what is working and what needs attention.
