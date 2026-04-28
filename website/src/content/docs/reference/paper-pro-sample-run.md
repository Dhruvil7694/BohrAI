---
title: Paper-Pro Sample Run
description: End-to-end tested example of a paper-pro workflow, including prompt, artifacts, measured telemetry, and quality checks.
section: Reference
order: 6
---

This page documents a real tested `paper-pro` run from this repository.

## Goal

Generate a full paper-shaped Markdown manuscript from an existing local evidence base about citation verification in research, then validate that the workflow produced all required audit artifacts.

## Prompt used

```text
/paper-pro notes/citation-verification-research-notes.md.
Use slug citation-verification-proof.
Primary local evidence files are notes/citation-verification-research-notes.md,
notes/citation-verification-research-verified-excerpts.md, and
notes/citation-verification-research-verification.md.
Do not reuse draft, review, citation, compliance, or provenance artifacts from any other slug.
Create fresh architecture, draft, citation-integrity, review, and compliance artifacts for this slug before finalizing.
```

CLI equivalent:

```bash
bohr paper-pro "notes/citation-verification-research-notes.md"
```

In the proof run, the CLI was forced to `openai/gpt-5.4` so the manuscript subagents inherited the same active model.

## End-to-end artifact set

The tested run created these slug-specific files:

```text
outputs/.plans/citation-verification-proof-paper-pro.md
outputs/.plans/citation-verification-proof-architecture.md
papers/citation-verification-proof-draft.md
papers/citation-verification-proof-citation-integrity.md
papers/citation-verification-proof-review.md
notes/citation-verification-proof-verification.md
papers/citation-verification-proof-compliance.md
papers/citation-verification-proof.md
papers/citation-verification-proof.provenance.md
```

## Workflow shape

1. Lead agent inventories the evidence files and writes the run plan.
2. `paper-architect` builds the manuscript structure and claim map.
3. `writer` creates the draft.
4. `citation-integrity` audits claim-to-source support and URL hygiene.
5. `reviewer` performs a skeptical manuscript critique.
6. `verifier` checks the revised draft against the evidence.
7. `paper-compliance` validates required sections and artifact contract.
8. Lead agent promotes the final paper and writes provenance.

## Measured telemetry

Fresh subagent telemetry from the proof run recorded:

| Metric | Value |
| --- | --- |
| Active model for manuscript subagents | `openai/gpt-5.4` |
| Input tokens | `133,875` |
| Output tokens | `37,594` |
| Recorded subagent cost | `$0.99469` |

Important scope note:

- This dollar figure comes from the saved subagent metadata only.
- The top-level orchestration turn is not included in those subagent totals, so the real end-to-end billable cost is slightly higher.

## Quality checks applied

The automated and manual proof checks required all of the following:

- final paper exists at `papers/citation-verification-proof.md`
- provenance exists at `papers/citation-verification-proof.provenance.md`
- fresh architecture, draft, review, verification, citation-integrity, and compliance artifacts exist and are non-blank
- the final manuscript contains:
  - `Abstract`
  - `Introduction`
  - `Related Work`
  - `Method`
  - `Evidence`
  - `Discussion`
  - `Limitations`
  - `Conclusion`
- manuscript subagents report successful exit codes with no hidden error payloads
- manuscript subagents inherit the active OpenAI model instead of falling back to stale Gemini overrides
- provenance states what was and was not verified, rather than smoothing over gaps

## Output quality summary

This sample paper is a narrow, professional synthesis rather than a broad systematic review. The strongest parts of the output are:

- claims are explicitly bounded to the biomedical-heavy evidence base
- de Lacey (1985) is kept as historical context only
- ICMJE is kept as high-level normative context only
- practical guidance is labeled as an author-proposed heuristic, not a validated intervention
- provenance records the scripted URL-liveness caveat honestly

## Why this sample matters

This run is useful as a release/demo reference because it proves more than “the command exits 0.” It proves that:

- the workflow can generate a full paper-shaped Markdown manuscript
- the new `paper-architect` agent is active in the pipeline
- the manuscript-quality gates actually run
- the old blank-output / wrong-provider caveat was removed by forcing manuscript subagents to inherit the active session model

Proof transcript saved during the automated smoke test:

```text
notes/citation-verification-proof-paper-pro-session.txt
```

## Related docs

- [Paper-Pro workflow](/docs/workflows/paper-pro)
- [Paper architect agent](/docs/agents/paper-architect)
- [CLI commands](/docs/reference/cli-commands)
- [Slash commands](/docs/reference/slash-commands)
