---
title: Memory Log
description: Build or refresh durable project memory across sessions.
section: Workflows
order: 15
---

The memory-log workflow creates a concise durable record of decisions, assumptions, open questions, and next-session priorities.

## How it works

The workflow consolidates long-running context in a structured format:

1. **Artifact review** -- reads recent outputs, plans, and session notes.
2. **Signal extraction** -- captures durable items (decisions, assumptions, blockers).
3. **Status update** -- marks assumptions as validated, untested, or rejected.
4. **Resume prep** -- writes a next-session bootstrap list.

This prevents context loss across days, handoffs, or interrupted runs.

## Real examples

Example 1 (project continuity):

```
/memory-log "llm-evals-roadmap"
```

```bash
bohr memory-log "llm-evals-roadmap"
```

Example 2 (after a major research sprint):

```
/memory-log "enterprise-rag-reliability"
```

```bash
bohr memory-log "enterprise-rag-reliability"
```

## Expected output

Primary output file:

- `notes/<slug>-memory.md`

Typical structure:

- durable decisions and rationale
- active assumptions with status
- open questions and blockers
- next-session top priorities

Example snippet:

```markdown
## Decisions
- [D3] Standardize on evaluation set v2 for all latency comparisons.
  - Why: v1 showed leakage risk in two categories.

## Next Session Bootstrap
- Re-run contradiction pass on executive summary claims.
- Validate assumption A4 with experiment workflow.
```

## Customization

You can tailor memory logs by specifying:

- **focus area** -- "track only model-choice decisions"
- **granularity** -- concise summary vs detailed ledger
- **time scope** -- "include only last 2 weeks"
- **handoff mode** -- include checklist optimized for another teammate

## When to use

Use this workflow for long-running projects where context continuity matters across days, teammates, and handoffs.

For single one-off tasks, this is usually unnecessary.
