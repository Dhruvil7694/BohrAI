# Quick start

Get Bohr (CLI) running locally.

## Prerequisites

- Node.js 20.19.0 or higher
- npm
- API key for Anthropic or OpenAI (see `.env.example`)

## Install

```bash
cd BohrAI
npm install
```

Optional paper-generator helper (installs deps, creates dirs, builds):

```bash
npm run install:paper-gen
```

## Configuration

```bash
cp .env.example .env
# Edit .env and set your API keys
```

## Run the CLI

```bash
npm run dev
```

This runs `tsx src/index.ts` (development entry). Use the documented slash commands and skills for research and paper workflows.

## Paper generator tests

```bash
npm run test:paper
```

## Troubleshooting

### Cannot find module

```bash
npm install
npm run build
```

### API key errors

Ensure `.env` contains the expected keys (see `.env.example`).

### Search tools

```bash
npm run test:search
```

---

**Paper generation state** (when using orchestration) may live under `.paper-gen-state/<sessionId>/` — see repo docs for your workflow.
