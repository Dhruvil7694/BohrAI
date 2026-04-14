---
title: Citation Check
description: Verify that citations support the exact claims they annotate.
section: Workflows
order: 14
---

The citation-check workflow validates sentence-level citation integrity and catches weak, invalid, or contradicted references.

## How it works

The workflow performs a targeted citation audit:

1. **Claim-citation extraction** -- identifies factual statements and their attached references.
2. **Source verification** -- checks whether the cited source supports the exact wording and scope.
3. **Status labeling** -- tags pairs as valid, weak, invalid, or contradicted.
4. **Repair guidance** -- recommends replacement citations or safer claim wording.

This catches "looks cited" claims that are not truly supported.

## Real examples

Example 1 (full draft check):

```
/citation-check outputs/my-draft.md
```

```bash
bohr citation-check outputs/my-draft.md
```

Example 2 (pre-publish brief check):

```
/citation-check outputs/q2-llm-brief.md
```

```bash
bohr citation-check outputs/q2-llm-brief.md
```

## Expected output

Primary output file:

- `outputs/<slug>-citation-integrity.md`

Typical structure:

- claim-citation validation table
- status counts
- fix recommendations per failed pair
- unresolved references needing manual review

Example snippet:

```markdown
- Claim: "Method X reduces latency by 40% in production."
  - Citation: [7]
  - Status: Weak
  - Note: Source reports 40% only in synthetic benchmark, not production.
  - Fix: Qualify claim scope or add production-source citation.
```

## Customization

You can request:

- **strict mode** -- fail any numeric claim without direct numeric support
- **section scope** -- "check only executive summary and conclusions"
- **source policy** -- "only accept peer-reviewed or official vendor docs"
- **output style** -- "include rewrite-ready replacement phrasing"

## When to use

Run before final publication or external sharing when factual precision and traceability are mandatory.

Best used after `/draft` and before final verifier/reviewer passes.
