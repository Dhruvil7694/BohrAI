---
title: Installation
description: Install Feynman and get started
section: Getting Started
order: 1
---

## Requirements

- macOS, Linux, or WSL
- `curl` or `wget`

## Recommended install

```bash
curl -fsSL https://feynman.companion.ai/install | bash
```

## Verify

```bash
feynman --version
```

## Windows PowerShell

```powershell
irm https://feynman.companion.ai/install.ps1 | iex
```

## npm fallback

If you already manage Node yourself:

```bash
npm install -g @companion-ai/feynman
```

## Local Development

For contributing or local development:

```bash
git clone https://github.com/getcompanion-ai/feynman.git
cd feynman
npm install
npm run start
```
