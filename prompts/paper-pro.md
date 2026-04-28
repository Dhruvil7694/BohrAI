---
description: Professional paper pipeline with planning, evidence structuring, adversarial review, citation verification, and final provenance.
args: <topic-or-artifact>
section: Research Workflows
topLevelCli: true
---
Build a professional research paper for: $@

Derive a short slug from the topic or artifact (lowercase, hyphens, no filler words, <=5 words). If the user explicitly provides a slug instruction, honor it. Reuse that slug for every artifact in this run.

This workflow must continue automatically after showing the plan. Do not stop at the plan stage. The workflow is not complete until both `papers/<slug>.md` and `papers/<slug>.provenance.md` exist on disk.

## Artifact contract

- Plan: `outputs/.plans/<slug>-paper-pro.md`
- Architecture/evidence map: `outputs/.plans/<slug>-architecture.md`
- Draft: `papers/<slug>-draft.md`
- Citation integrity memo: `papers/<slug>-citation-integrity.md`
- Review memo: `papers/<slug>-review.md`
- Compliance memo: `papers/<slug>-compliance.md`
- Final paper: `papers/<slug>.md`
- Provenance sidecar: `papers/<slug>.provenance.md`

Use caveman-style compression only for internal handoffs and status notes. Final paper prose must stay professional.

## Workflow

1. **Inventory**
   - Inspect only the most relevant local evidence first.
   - Limit initial workspace scan to exact or near slug matches in:
     - `notes/`
     - `outputs/.plans/`
     - `papers/`
   - Read at most 6 candidate files before deciding whether more research is needed.
   - If `papers/<slug>-draft.md`, `papers/<slug>-review.md`, or `papers/<slug>-citation-integrity.md` already exist, treat this run as a resume/finalization pass and reuse them instead of restarting from scratch.

2. **Plan**
   - Write `outputs/.plans/<slug>-paper-pro.md` with:
     - paper type
     - core question
     - evidence files to use
     - target claims
     - quality risks
   - Show the plan briefly, then continue automatically.

3. **Architecture**
   - Use `paper-architect` to create `outputs/.plans/<slug>-architecture.md`.

4. **Evidence**
   - Prefer existing local evidence.
   - Use `research-planner`, `literature-*`, or `researcher` only if local evidence is insufficient.
   - If external tooling is unavailable, continue with local evidence and record that honestly in provenance.

5. **Draft**
   - Use `writer` to create `papers/<slug>-draft.md`.
   - Required sections:
     - Title
     - Abstract
     - Introduction
     - Related Work
     - Method
     - Evidence
     - Discussion
     - Limitations
     - Conclusion
   - Visuals are optional. Do not block the workflow on chart or package installation.
   - If visuals are included, factual charts and tables must come from structured source data files; image models may create only conceptual visuals.

6. **Checks**
   - Run `citation-integrity` -> `papers/<slug>-citation-integrity.md`
   - Run `reviewer` -> `papers/<slug>-review.md`
   - Fix fatal or clearly material issues
   - Run `verifier` only if the draft still needs a citation pass or source cleanup
   - Run `paper-compliance` -> `papers/<slug>-compliance.md`

7. **Finalize**
   - Apply the final accepted revisions directly to the manuscript.
   - Save the final manuscript to `papers/<slug>.md` even if `verifier` was skipped or used only as an audit.
   - If the existing draft already has inline citations and only minor fixes remain, promote the revised draft directly instead of starting another rewrite loop.
   - Save `papers/<slug>.provenance.md` with:
     - topic
     - slug
     - evidence files used
     - agents used
     - citation/URL verification status
     - unresolved weaknesses
     - final output path

## Operating rules

- Do not ask for approval between stages unless the topic itself is ambiguous.
- Do not stop after writing the plan.
- Prefer fewer strong artifacts over many shallow ones.
- Do not overclaim. Small evidence base -> narrow claims.
- If no reliable evidence supports a strong conclusion, weaken the conclusion instead of inventing support.
- If an existing local note file already contains a verified evidence base, use it.
- Keep internal summaries compact; keep final paper prose clear and professional.
- Use no more than one additional research-expansion loop for this run.
- If a prior pass already produced a strong draft plus review artifacts, prioritize completion and promotion over more research.
- If charts, tables, or generated images are created, write `papers/<slug>.assets/manifest.json` with artifact paths, source data, provider/model when used, and verification state.

## Success condition

This workflow succeeds only when:
- `papers/<slug>.md` exists
- `papers/<slug>.provenance.md` exists
- the final paper contains the required manuscript sections
- the provenance file honestly states what was and was not verified
