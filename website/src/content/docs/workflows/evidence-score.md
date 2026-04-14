---
title: Evidence Score
description: Score evidence strength claim-by-claim with a transparent rubric.
section: Workflows
order: 12
---

The evidence-score workflow quantifies support quality so you can separate strong findings from weak or uncertain ones.

## How it works

The workflow applies a rubric-based scoring pass:

1. **Claim inventory** -- extracts claims from your artifact or topic summary.
2. **Evidence alignment** -- maps each claim to supporting sources.
3. **Scoring** -- computes support strength using source quality, consistency, and reproducibility cues.
4. **Risk flagging** -- marks weakly supported claims for downgrade, rewrite, or removal.

Scores are decision support, not absolute truth; always read associated risk notes.

## Real examples

Example 1 (score an existing brief):

```
/evidence-score outputs/my-brief.md
```

```bash
bohr evidence-score outputs/my-brief.md
```

Example 2 (score by topic):

```
/evidence-score "enterprise copilots ROI claims"
```

```bash
bohr evidence-score "enterprise copilots ROI claims"
```

## Expected output

Primary output file:

- `outputs/<slug>-evidence-scores.md`

Typical structure:

- scoring rubric section
- claim-by-claim score table (0-100)
- confidence and key-risk annotations
- weak-support summary (claims under threshold)

Example snippet:

```markdown
| Claim | Score | Confidence | Key Risks |
|---|---:|---|---|
| "Latency drops 35% with adaptive retrieval." | 82 | Medium | Small sample size; one benchmark family |
| "Approach generalizes across domains." | 41 | Low | Evidence limited to legal QA only |
```

## Customization

You can customize:

- **thresholds** -- "treat anything below 60 as weak"
- **weights** -- "weight code-backed replication higher"
- **scope** -- "score only top-line claims from summary"
- **format** -- "include action recommendation per low-score claim"

## When to use

Use this workflow before decision reviews, prioritization meetings, or whenever stakeholders need transparent confidence framing.

Use alongside `/contradict` when you need both quantitative support scoring and adversarial critique.
