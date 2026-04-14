---
title: Contradiction
description: Run adversarial contradiction analysis against a claim or draft.
section: Workflows
order: 11
---

The contradiction workflow pressure-tests conclusions by looking for direct conflicts, boundary failures, and hidden assumptions.

## How it works

The contradiction workflow runs as an adversarial pass:

1. **Claim extraction** -- identifies key assertions from your draft or claim statement.
2. **Counter-evidence search** -- looks for conflicting findings, alternate explanations, and edge cases.
3. **Severity tagging** -- classifies issues as fatal, major, or minor.
4. **Resolution mapping** -- proposes concrete fixes (rewrite, verify, or remove).

This helps prevent overconfident conclusions from shipping without stress testing.

## Real examples

Example 1 (draft stress test):

```
/contradict outputs/my-brief.md
```

```bash
bohr contradict outputs/my-brief.md
```

Example 2 (single claim challenge):

```
/contradict "RAG always beats fine-tuning for support QA"
```

```bash
bohr contradict "RAG always beats fine-tuning for support QA"
```

## Expected output

Primary output file:

- `outputs/<slug>-contradictions.md`

Typical structure:

- challenged claims list
- contradiction entries with evidence and severity
- fragile assumptions summary
- remediation checklist

Example snippet:

```markdown
## Contradiction Log
- [C2] Claim overgeneralizes benchmark result to production.
  - Severity: Major
  - Evidence: Source [4] reports gains only under controlled retrieval quality.
  - Resolution: Narrow wording and add production caveat.
```

## Customization

You can tune this workflow by asking for:

- **strictness** -- "treat unsupported quantitative claims as fatal"
- **scope** -- "only test claims in executive summary"
- **evidence policy** -- "prefer peer-reviewed sources over blog evidence"
- **output style** -- "give rewrite-ready fix language per issue"

## When to use

Run this before sharing external reports, high-stakes recommendations, or publication drafts.

For broad discovery work, run `/deepresearch` first and use `/contradict` near the end.
