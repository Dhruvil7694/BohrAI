# CHANGELOG

Workspace lab notebook for long-running or resumable research work.

Use this file to track chronology, not release notes. Keep entries short, factual, and operational.

## Entry template

### YYYY-MM-DD HH:MM TZ — [slug or objective]

- Objective: ...
- Changed: ...
- Verified: ...
- Failed / learned: ...
- Blockers: ...
- Next: ...

### 2026-04-19 17:20 +05:30 - release-docs-install-verification

- Objective: Verify installation docs and release-readiness for the first deployment, then fix any concrete blockers discovered during the pass.
- Changed: Patched `website/src/data/site-urls.ts` so build-time install URLs honor deployment env overrides via `process.env` fallback; fixed ESM import-path mismatches across `src/paper-generator/*`, `src/pi/*`, and `src/system/open-url.ts`; updated `tests/node-version.test.ts` to match current default installer URLs and to assert explicit override behavior.
- Verified: `cmd /c npm run build` succeeds at the repo root; `cmd /c npm test` passes with 75/75 tests; `cmd /c npm run typecheck` and `cmd /c npm run build` succeed in `website/`; rebuilding the website with `PUBLIC_BOHR_INSTALL_BASE_URL=https://downloads.example.test/bohr` rewrites the generated install commands in both `website/dist/docs/getting-started/installation/index.html` and `website/dist/index.html`.
- Failed / learned: `cmd /c npm run build:native-bundle` did not complete within the verification window and left a zero-byte `dist/release/bohr-0.2.18-win32-x64.zip`, so the native bundle artifact path is not yet verified end-to-end.
- Blockers: Release bundle generation still needs a successful full run plus a smoke check on the produced archive before the installer flow can be called fully release-ready.
- Next: Re-run `npm run build:native-bundle` to completion, confirm the archive is non-empty, and smoke-test the generated bundle or installer before publishing.

### 2026-04-19 18:10 +05:30 - release-bundle-smoke-test

- Objective: Close the last release blocker by proving the native Windows bundle exists and launches.
- Changed: Ran a full `npm run build:native-bundle`; extracted `dist/release/bohr-0.2.18-win32-x64.zip` into `dist/release-smoke/` using `tar -xf` after `Expand-Archive` proved too slow for the verification loop.
- Verified: `dist/release/bohr-0.2.18-win32-x64.zip` now exists at `149796059` bytes; SHA-256 is `9C23A8628673CC785EA25E5C2CC71BC0C99D448707379EA76980E1FE2EB209CA`; the extracted bundle runs `bohr.cmd --help` successfully when `BOHR_HOME` is pointed at a workspace-local directory.
- Failed / learned: `Expand-Archive` was not a practical smoke-test path for this artifact size in the current environment, but `tar -xf` completed quickly and produced a runnable bundle.
- Blockers: None for the verified Windows bundle path in this workspace.
- Next: Publish the first deployment, then optionally do one post-publish remote installer check against the hosted URL as a final production sanity check.

### 2026-04-18 23:55 +05:30 - install-doc-host-overrides

- Objective: Make installation docs and commands work cleanly across supported platforms and custom-host deployments.
- Changed: Added `website/src/components/docs/InstallationDoc.astro` so `/docs/getting-started/installation` now renders env-driven install commands from `website/src/data/site-urls.ts`; updated `website/src/pages/docs/[...slug].astro` to route that one page through the custom component; clarified the root `README.md` installation section so deploy-versus-release responsibilities are explicit.
- Verified: Ran `cmd /c npm run typecheck` and `cmd /c npm run build` in `website/` outside the sandbox; Astro reported 0 errors with only the same pre-existing hints, and the static build completed successfully.
- Failed / learned: Markdown docs content cannot directly consume Astro env constants, so the installation page needed a targeted component-backed render path instead of more hardcoded URLs.
- Blockers: Root `npm run typecheck` / `npm run build` still fail on pre-existing TypeScript issues outside this change; root `npm test` is sandbox-blocked by `spawn EPERM` unless rerun unrestricted.
- Next: Spot-check the built installation page and, if needed, wire the deployment env vars before the next tagged release.

### 2026-04-18 22:21 +05:30 — website-home-motion

- Objective: Clean the homepage mojibake, add route transitions, strengthen workflow-card motion, and make the homepage terminal preview scroll-linked.
- Changed: Replaced mojibake-heavy homepage/navigation/footer copy with ASCII-safe text; switched the shared layout from deprecated `ViewTransitions` to Astro `ClientRouter` with persisted nav/footer and animated main-content swaps; upgraded `website/src/components/WorkflowCard.astro` plus `website/src/pages/workflows/index.astro` with stronger layered card visuals and GSAP reveal/hover motion; added a scroll-linked narrative meter and stage updates to the homepage terminal preview in `website/src/pages/index.astro`.
- Verified: Ran `npm.cmd run typecheck` in `website/` after the edits; Astro reported `0 errors` and `0 warnings` with only pre-existing hints.
- Failed / learned: Sandbox execution blocks Astro's content sync with `spawn EPERM`, so the verification pass required an escalated rerun outside the sandbox.
- Blockers: None for source changes; browser feel still needs human eyeballing for motion pacing.
- Next: Spot-check the homepage and workflows hub in a browser, then tune motion timing only if any section feels too eager or too busy.

### 2026-04-18 23:00 local — workflow-detail-docs-shell

- Objective: Rework workflow detail pages into a cleaner documentation shell with a fixed sidebar and independent content scrolling.
- Changed: Replaced `website/src/pages/workflows/[slug].astro` with a two-panel docs layout: richer sidebar briefing, section-map navigation, related-doc links, copy actions, internal-scroll TOC syncing, and a desktop-only fixed-height shell where the article pane scrolls independently from the navigation.
- Verified: Ran `cmd /c npm run typecheck` in `website/`; Astro reported `0 errors` and only the same pre-existing hints in `MermaidDiagrams.astro` and `index.astro`.
- Failed / learned: Sandbox execution still blocks Astro content sync with `spawn EPERM`, so verification again required an escalated rerun outside the sandbox.
- Blockers: Browser-level UX still needs a visual pass to confirm the desktop height feels right across shorter and taller screens.
- Next: Spot-check one workflow detail page on desktop and mobile, then tune shell height or spacing if the content panel feels cramped.

### 2026-04-12 00:00 local — capital-france

- Objective: Run an unattended deep-research workflow for the question "What is the capital of France?"
- Changed: Created plan artifact at `outputs/.plans/capital-france.md`; scoped the workflow as a narrow fact-verification run with direct lead-agent evidence gathering instead of researcher subagents.
- Verified: Read `CHANGELOG.md` and recalled prior saved plan memory for `capital-france` before finalizing the new run plan.
- Failed / learned: None yet.
- Blockers: Need at least two current independent authoritative sources and a quick ambiguity check before drafting.
- Next: Collect current official/public sources, resolve any legal nuance, then draft and verify the brief.

### 2026-04-12 00:20 local — capital-france

- Objective: Complete evidence gathering and ambiguity check for the capital-of-France workflow.
- Changed: Wrote `notes/capital-france-research-web.md` and `notes/capital-france-legal-context.md`; identified Insee (2024) and a Sénat report as the two main corroborating sources.
- Verified: Cross-read current public French sources that explicitly describe Paris as the capital/capital city of France; found no current contradiction.
- Failed / learned: The Presidency homepage was useful contextual support but not explicit enough to carry the core claim alone.
- Blockers: Need citation pass and final review pass before promotion.
- Next: Draft the brief, then run verifier and reviewer passes.

### 2026-04-12 00:35 local — capital-france

- Objective: Move from gathered evidence to a citable draft.
- Changed: Wrote `outputs/.drafts/capital-france-draft.md` and updated the plan ledger to mark drafting complete.
- Verified: Kept the core claim narrowly scoped to what the Insee and Sénat sources explicitly support; treated the Élysée page as contextual only.
- Failed / learned: None.
- Blockers: Need verifier URL/citation pass and reviewer verification pass before final promotion.
- Next: Run verifier on the draft, then review and promote the final brief.

### 2026-04-12 00:50 local — capital-france

- Objective: Complete citation, verification, and final promotion for the capital-of-France workflow.
- Changed: Produced `outputs/capital-france-brief.md`, ran verification into `notes/capital-france-verification.md`, promoted the final brief to `outputs/capital-france.md`, and wrote `outputs/capital-france.provenance.md`.
- Verified: Reviewer found no FATAL or MAJOR issues. Core claim remains backed by two independent French public-institution sources, with Insee as the primary explicit source and the Sénat report as corroboration.
- Failed / learned: The runtime did not expose a named `verifier` subagent, so I used an available worker in a verifier-equivalent role and recorded that deviation in the plan.
- Blockers: None.
- Next: If needed, extend the brief with deeper legal-historical sourcing, but the narrow factual question is sufficiently answered.

### 2026-04-12 10:05 local — capital-france

- Objective: Run the citation-verification pass on the capital-of-France draft and promote a final cited brief.
- Changed: Verified the three draft source URLs were live (HTTP 200 at check time), added numbered inline citations, downgraded unsupported phrasing around the Élysée/context and broad ambiguity claims, and wrote `outputs/capital-france-brief.md`.
- Verified: Confirmed Insee explicitly says Paris is the capital of France; confirmed the Sénat report describes Paris’s capital status and the presence of national institutions; confirmed the Élysée homepage is contextual only and not explicit enough to carry the core claim.
- Failed / learned: The draft wording about the Presidency being seated in Paris was not directly supported by the cited homepage, so it was removed rather than carried forward.
- Blockers: Reviewer pass still pending if the workflow requires an adversarial final check.
- Next: If needed, run a final reviewer pass; otherwise use `outputs/capital-france-brief.md` as the canonical brief.

### 2026-04-12 10:20 local — capital-france

- Objective: Close the workflow with final review, final artifact promotion, and provenance.
- Changed: Ran a reviewer pass recorded in `notes/capital-france-verification.md`; promoted the cited brief into `outputs/capital-france.md`; wrote `outputs/capital-france.provenance.md`; updated the run plan to mark all tasks complete.
- Verified: Reviewer verdict was PASS WITH MINOR REVISIONS only; those minor wording fixes were applied before delivery.
- Failed / learned: The runtime did not expose a project-named `verifier` agent, so the citation pass used an available worker agent as a verifier-equivalent step.
- Blockers: None.
- Next: Optional only — produce a legal memorandum on the basis of Paris's capital status if requested.

### 2026-03-25 00:00 local — scaling-laws

- Objective: Set up a deep research workflow for scaling laws.
- Changed: Created plan artifact at `outputs/.plans/scaling-laws.md`; defined 4 disjoint researcher dimensions and acceptance criteria.
- Verified: Read `CHANGELOG.md` and checked prior memory for related plan `scaling-laws-implications`.
- Failed / learned: No prior run-specific changelog entries existed beyond the template.
- Blockers: Waiting for user confirmation before launching researcher round 1.
- Next: On confirmation, spawn 4 parallel researcher subagents and begin evidence collection.

### 2026-03-25 00:30 local — scaling-laws (T4 inference/time-scale pass)

- Objective: Complete T4 on inference/test-time scaling and reasoning-time compute, scoped to 2023–2026.
- Changed: Wrote `notes/scaling-laws-research-inference.md`; updated `outputs/.plans/scaling-laws.md` to mark T4 done and log the inference-scaling verification pass.
- Verified: Cross-read 13 primary/official sources covering Tree-of-Thoughts, PRMs, repeated sampling, compute-optimal test-time scaling, provable laws, o1, DeepSeek-R1, s1, verifier failures, Anthropic extended thinking, and OpenAI reasoning API docs.
- Failed / learned: OpenAI blog fetch for `learning-to-reason-with-llms` returned malformed content, so the note leans on the o1 system card and API docs instead of that blog post.
- Blockers: T2 and T5 remain open before final synthesis; no single unified law for inference-time scaling emerged from public sources.
- Next: Complete T5 implications synthesis, then reconcile T3/T4 with foundational T2 before drafting the cited brief.

### 2026-03-25 11:20 local — scaling-laws (T6 draft synthesis)

- Objective: Synthesize the four research notes into a single user-facing draft brief for the scaling-laws workflow.
- Changed: Wrote `outputs/.drafts/scaling-laws-draft.md` with an executive summary, curated reading list, qualitative meta-analysis, core-paper comparison table, explicit training-vs-inference distinction, and numbered inline citations with direct-URL sources.
- Verified: Cross-checked the draft against `notes/scaling-laws-research-foundations.md`, `notes/scaling-laws-research-revisions.md`, `notes/scaling-laws-research-inference.md`, and `notes/scaling-laws-research-implications.md` to ensure the brief explicitly states the literature is too heterogeneous for a pooled effect-size estimate.
- Failed / learned: The requested temp-run `context.md` and `plan.md` were absent, so the synthesis used `outputs/.plans/scaling-laws.md` plus the four note files as the working context.
- Blockers: Citation/claim verification pass still pending; this draft should be treated as pre-verification.
- Next: Run verifier/reviewer passes, then promote the draft into the final cited brief and provenance sidecar.

### 2026-03-25 11:28 local — scaling-laws (final brief + pdf)

- Objective: Deliver a paper guide and qualitative meta-analysis on AI scaling laws.
- Changed: Finalized `outputs/scaling-laws.md` and sidecar `outputs/scaling-laws.provenance.md`; rendered preview PDF at `outputs/scaling-laws.pdf`; updated plan ledger and verification log in `outputs/.plans/scaling-laws.md`.
- Verified: Ran a reviewer pass recorded in `notes/scaling-laws-verification.md`; spot-checked key primary papers via alpha-backed reads for Kaplan 2020, Chinchilla 2022, and Snell 2024; confirmed PDF render output exists.
- Failed / learned: A pooled statistical meta-analysis would be misleading because the literature mixes heterogeneous outcomes, scaling axes, and evaluation regimes; final deliverable uses a qualitative meta-analysis instead.
- Blockers: None for this brief.
- Next: If needed, extend into a narrower sub-survey (e.g. only pretraining laws, only inference-time scaling, or only post-Chinchilla data-quality revisions).

### 2026-03-25 14:52 local — skills-only-install

- Objective: Let users download the Bohr research skills without installing the full terminal runtime.
- Changed: Added standalone skills-only installers at `scripts/install/install-skills.sh` and `scripts/install/install-skills.ps1`; synced website-public copies; documented user-level and repo-local install flows in `README.md`, `website/src/content/docs/getting-started/installation.md`, and `website/src/pages/index.astro`.
- Verified: Ran `sh -n scripts/install/install-skills.sh`; ran `node scripts/sync-website-installers.mjs`; ran `cd website && npm run build`; executed `sh scripts/install/install-skills.sh --dir <tmp>` and confirmed extracted `SKILL.md` files land in the target directory.
- Failed / learned: PowerShell installer behavior was not executed locally because PowerShell is not installed in this environment.
- Blockers: None for the Unix installer flow; Windows remains syntax-only by inspection.
- Next: If users want this exposed more prominently, add a dedicated docs/reference page and a homepage-specific skills-only CTA instead of a text link.

### 2026-03-26 18:08 PDT — installer-release-unification

- Objective: Remove the moving `edge` installer channel and unify installs on tagged releases only.
- Changed: Updated `scripts/install/install.sh`, `scripts/install/install.ps1`, `scripts/install/install-skills.sh`, and `scripts/install/install-skills.ps1` so the default target is the latest tagged release, latest-version resolution uses public GitHub release pages instead of `api.github.com`, and explicit `edge` requests now fail with a removal message; removed the `release-edge` job from `.github/workflows/publish.yml`; updated `README.md` and `website/src/content/docs/getting-started/installation.md`; re-synced `website/public/install*`.
- Verified: Ran `sh -n` on the Unix installer copies; confirmed `sh scripts/install/install.sh edge` and `sh scripts/install/install-skills.sh edge --dir <tmp>` fail with the intended removal message; executed `sh scripts/install/install.sh` into temp dirs and confirmed the installed binary reports `0.2.14`; executed `sh scripts/install/install-skills.sh --dir <tmp>` and confirmed extracted `SKILL.md` files; ran `cd website && npm run build`.
- Failed / learned: The install failure was caused by unauthenticated GitHub API rate limiting on the `edge` path, so renaming channels without removing the API dependency would not have fixed the root cause.
- Blockers: `npm run build` still emits a pre-existing duplicate-content warning for `getting-started/installation`; the build succeeds.
- Next: If desired, remove the now-unused `stable` alias too and clean up the duplicate docs-content warning separately.

### 2026-03-27 11:58 PDT — release-0.2.15

- Objective: Make the non-Anthropic subagent/auth fixes and contributor-guide updates releasable to tagged-install users instead of leaving them only on `main`.
- Changed: Bumped the package version from `0.2.14` to `0.2.15` in `package.json` and `package-lock.json`; updated pinned installer examples in `README.md` and `website/src/content/docs/getting-started/installation.md`; aligned the local-development docs example to the npm-based root workflow; added `CONTRIBUTING.md` plus the bundled `skills/contributing/SKILL.md`.
- Verified: Confirmed the publish workflow keys off `package.json` versus the currently published npm version; confirmed local `npm test`, `npm run typecheck`, and `npm run build` pass before the release bump.
- Failed / learned: The open subagent issue is fixed on `main` but still user-visible on tagged installs until a fresh release is cut.
- Blockers: Need the GitHub publish workflow to finish successfully before the issue can be honestly closed as released.
- Next: Push `0.2.15`, monitor the publish workflow, then update and close the relevant GitHub issue/PR once the release is live.

### 2026-03-28 15:15 PDT — pi-subagents-agent-dir-compat

- Objective: Debug why tagged installs can still fail subagent/auth flows after `0.2.15` when users are not on Anthropic.
- Changed: Added `scripts/lib/pi-subagents-patch.mjs` plus type declarations and wired `scripts/patch-embedded-pi.mjs` to rewrite vendored `pi-subagents` runtime files so they resolve user-scoped paths from `PI_CODING_AGENT_DIR` instead of hardcoded `~/.pi/agent`; added `tests/pi-subagents-patch.test.ts`.
- Verified: Materialized `.bohr/npm`, inspected the shipped `pi-subagents@0.11.11` sources, confirmed the hardcoded `~/.pi/agent` paths in `index.ts`, `agents.ts`, `artifacts.ts`, `run-history.ts`, `skills.ts`, and `chain-clarify.ts`; ran `node scripts/patch-embedded-pi.mjs`; ran `npm test`, `npm run typecheck`, and `npm run build`.
- Failed / learned: The earlier `0.2.15` fix only proved that Bohr exported `PI_CODING_AGENT_DIR` to the top-level Pi child; it did not cover vendored extension code that still hardcoded `.pi` paths internally.
- Blockers: Users still need a release containing this patch before tagged installs benefit from it.
- Next: Cut the next release and verify a tagged install exercises subagents without reading from `~/.pi/agent`.

### 2026-03-28 21:46 PDT — release-0.2.16

- Objective: Ship the vendored `pi-subagents` agent-dir compatibility fix to tagged installs.
- Changed: Bumped the package version from `0.2.15` to `0.2.16` in `package.json` and `package-lock.json`; updated pinned installer examples in `README.md` and `website/src/content/docs/getting-started/installation.md`.
- Verified: Re-ran `npm test`, `npm run typecheck`, and `npm run build`; ran `cd website && npm run build`; ran `npm pack` and confirmed the `0.2.16` tarball includes the new `scripts/lib/pi-subagents-patch.*` files.
- Failed / learned: An initial local `build:native-bundle` check failed because `npm pack` and `build:native-bundle` were run in parallel, and `prepack` intentionally removes `dist/release`; rerunning `npm run build:native-bundle` sequentially succeeded.
- Blockers: None in the repo; publishing still depends on the GitHub workflow running on the bumped version.
- Next: Push the `0.2.16` release bump and monitor npm/GitHub release publication.

### 2026-04-19 20:05 +05:30 — citation-verification-research

- Objective: Finalize the paper-style manuscript for `notes/citation-verification-research-notes.md` using the existing local evidence base and matching near-slug artifacts.

### 2026-04-26 00:00 local — silent-pipeline-semantic-drift

- Objective: Build a professional paper-style manuscript on contract-aware detection and attribution of silent semantic drift in production ML pipelines.
- Changed: Scanned local near-slug artifacts and found no reusable prior draft; created `outputs/.plans/silent-pipeline-semantic-drift-paper-pro.md`, gathered external evidence into `notes/silent-pipeline-semantic-drift-research.md`, and generated the manuscript architecture memo at `outputs/.plans/silent-pipeline-semantic-drift-architecture.md`.
- Verified: Confirmed the local alpha paper tool is unavailable in this session because login is missing, so the evidence base currently relies on accessible proceedings/arXiv pages and official docs; architecture memo explicitly narrows claims to a design/position paper rather than an empirically validated new method.
- Failed / learned: There was no existing near-slug local evidence to resume from, so this run is a fresh synthesis rather than a finalization pass.
- Blockers: Need draft, citation audit, review pass, compliance pass, and final manuscript promotion.
- Next: Use the local plan/research/architecture artifacts to draft the manuscript, then run citation-integrity, reviewer, and paper-compliance before final promotion.

### 2026-04-26 00:45 local — silent-pipeline-semantic-drift

- Objective: Complete the manuscript checks, apply the final reframing, and promote the canonical paper artifact with provenance.
- Changed: Drafted `papers/silent-pipeline-semantic-drift-draft.md`; ran `citation-integrity`, `reviewer`, and `paper-compliance` into their respective memos; revised the manuscript to reframe it explicitly as a position/design paper, added a taxonomy table, added illustrative incident archetypes, added a claim/evidence-strength table, promoted the final manuscript to `papers/silent-pipeline-semantic-drift.md`, and wrote `papers/silent-pipeline-semantic-drift.provenance.md`.
- Verified: `paper-compliance` reported the revised draft as section-complete and topic-aligned; the final canonical paper path and provenance sidecar now both exist on disk.
- Failed / learned: Reviewer judged the first draft to overpromise detection/attribution relative to the evidence; the salvage path was explicit reframing rather than pretending the paper was an evaluated method.
- Blockers: None for artifact completion; empirical validation remains future work and is stated as such in the manuscript.
- Next: Optional only — render or preview the final paper if a formatted export is desired.

### 2026-04-26 00:52 local — silent-pipeline-semantic-drift

- Objective: Close the workflow with a final compliance re-check after promotion.
- Changed: Re-ran `paper-compliance` against `papers/silent-pipeline-semantic-drift.md` and `papers/silent-pipeline-semantic-drift.provenance.md`, overwriting the compliance memo with the final PASS state.
- Verified: The canonical final paper, plan artifacts, and provenance sidecar now satisfy the requested artifact contract with no remaining compliance issues.
- Failed / learned: The first compliance memo was accurate at the time of draft-only review but was obsolete after promotion, so a final pass was necessary to leave an honest end-state record.
- Blockers: None.
- Next: Optional only — preview/export the manuscript if a rendered version is needed.
- Changed: Read the local evidence notes, verified excerpts, prior verification log, and architecture memo; rewrote the manuscript in `papers/citation-verification-proof-draft.md` as a narrow biomedical perspective with explicit provenance caveats; kept de Lacey historical-only, ICMJE high-level only, and anchored the quantitative spine on Mogull, Greenberg, and Tatsioni.
- Verified: New draft includes the required sections, a direct-URL Sources section, bounded biomedical scope, and explicit statements that the evidence does not validate a citation-verification intervention or generalize across all disciplines.
- Failed / learned: The local evidence bundle supports a stronger historical-context note for de Lacey than the prior manuscript used, but not a stronger current-run verification claim; direct URL liveness could not be rechecked for every source within the same pass.
- Blockers: Draft still needed independent citation-integrity / verifier review before promotion or final user delivery.
- Next: Run the verification pass against the revised draft and record whether any unsupported claims remain.

### 2026-04-19 20:12 +05:30 — citation-verification-research

- Objective: Audit the revised biomedical citation-verification manuscript for citation integrity and provenance discipline.
- Changed: Re-read `papers/citation-verification-proof-draft.md` against the local evidence notes, verified excerpts, prior verification log, and architecture memo; wrote the fresh verification memo to `notes/citation-verification-proof-verification.md`.
- Verified: The revised draft fixes the material provenance issues: de Lacey remains historical-only with explicit caveat, ICMJE stays high-level only, Mogull/Greenberg/Tatsioni carry the core empirical spine, and no fatal or major unsupported factual claims were found.
- Failed / learned: A few recommendation sentences remain synthesis-level inferences rather than direct intervention evidence, but they are clearly bounded and not overstated enough to count as material verification failures.
- Blockers: None for the requested verification memo.
- Next: If requested, tighten a few practice-recommendation sentences further or promote the manuscript with the verification memo as the audit record.

### 2026-04-19 20:20 +05:30 — citation-verification-proof

- Objective: Complete the fresh paper-production workflow for the `citation-verification-proof` slug and deliver the final manuscript plus provenance sidecar.
- Changed: Ran citation-integrity, review, verifier, and compliance passes; revised `papers/citation-verification-proof-draft.md` to sharpen the distinction between citation mismatch, selective citation, and persistence after contradiction; promoted the revised draft to `papers/citation-verification-proof.md`; wrote `papers/citation-verification-proof.provenance.md`; updated the plan ledger in `outputs/.plans/citation-verification-proof-paper-pro.md`.
- Verified: `papers/citation-verification-proof.md` contains all required manuscript sections and a direct-URL Sources section; `papers/citation-verification-proof.provenance.md` records the evidence files used, agent passes, and what was and was not directly re-verified in this run.
- Failed / learned: The final pass relied on the supplied local evidence package and fresh manuscript audits rather than a new end-to-end web retrieval loop for every cited URL, so provenance wording had to stay explicit about inherited verification status.
- Blockers: None for the requested deliverables.
- Next: Optional only — render or export the paper if a formatted preview or PDF is needed.
### 2026-04-19 20:43 +05:30 � paper-pro-docs-and-reliability
- Objective: Surface `paper-pro` and `paper-architect` in the docs, add a real end-to-end sample page, and remove the manuscript-workflow reliability caveat caused by wrong-provider subagent execution and blank output-path writes.
- Changed: Added `website/src/content/docs/workflows/paper-pro.md`, `website/src/content/workflowPages/paper-pro.md`, `website/src/content/docs/agents/paper-architect.md`, and `website/src/content/docs/reference/paper-pro-sample-run.md`; updated `scripts/test-paper-pro-workflow.mjs` to force a fresh slug-specific proof run and assert non-blank intermediate artifacts plus OpenAI-backed subagent telemetry; patched the vendored `pi-subagents` runtime so subagents inherit the active parent model when no override is set and blank changed output files no longer silently win; removed the stale Gemini model pins from `.pi/agents/{paper-architect,writer,citation-integrity,reviewer,verifier,paper-compliance}.md`.
- Verified: Fresh `node scripts/test-paper-pro-workflow.mjs` passed and wrote `notes/citation-verification-proof-paper-pro-session.txt`; the proof run created fresh architecture, draft, citation-integrity, review, verifier, compliance, final paper, and provenance artifacts for slug `citation-verification-proof`; manuscript subagent telemetry showed `openai/gpt-5.4` for all required manuscript agents with recorded subagent totals of `133875` input tokens, `37594` output tokens, and `$0.99469` cost; `npm run build` passed at repo root; `cd website && npm run build` passed and generated the new docs routes.
- Failed / learned: Earlier failures were not random filesystem brittleness; they came from project-level `.pi/agents` overrides pinning manuscript agents to quota-exhausted Gemini models, plus the subagent runtime treating error-bearing zero-exit attempts and blank changed output files as acceptable success cases.
- Blockers: None for the requested docs and workflow reliability work.
- Next: Optional only � render the proof paper into a preview/PDF, or upstream the local `pi-subagents` runtime fixes if you want the same behavior outside this bundled workspace.

### 2026-04-20 20:42 +05:30 � paper-prototype-page

- Objective: Turn the `paper-pro` sample into a first-class client-facing prototype page instead of leaving the sample buried only in docs/reference.
- Changed: Added `website/src/pages/prototype/index.astro`, a top-level showcase page that reads the live sample artifacts from `papers/` and `notes/`, renders the full generated paper inline, explains the end-to-end agent workflow with Mermaid diagrams, and documents the proof-run prompt, artifact contract, provenance highlights, and token-optimization model.
- Verified: `cd website && npm run build` passed after fixing the prototype page to resolve artifact paths from the repo root, and the build generated `/prototype/index.html` successfully alongside the existing docs/workflow routes.
- Failed / learned: Using `import.meta.url` for build-time artifact reads was brittle after Astro compilation because the generated chunk location no longer matched the source-tree depth; switching to `process.cwd()` plus repo-root resolution made the page stable in static builds.
- Blockers: None for the prototype page itself; the only remaining follow-up would be optional visual QA in a browser or deployment preview.
- Next: If desired, deploy the site or run browser-level visual QA on `/prototype` before the first public/internal release.

### 2026-04-20 21:51 +05:30 � paper-prototype-page-savings

- Objective: Add explicit caveman token and spend-savings data to the client-facing /prototype page without overstating certainty.
- Changed: Updated website/src/pages/prototype/index.astro to compute the measured run totals from the recorded proof telemetry, show a three-card savings block for measured usage, modeled caveman output-token avoidance, and approximate spend implication, and normalize the savings cards into the page's card system.
- Verified: cd website && npm run build passed and regenerated /prototype/index.html successfully after the savings-model changes.
- Failed / learned: Exact caveman dollar savings are still modeled rather than directly measured because this repo has a single observed successful run, not an instrumented verbose-vs-caveman A/B comparison with provider-billed splits.
- Blockers: None for the requested prototype-page savings disclosure.
- Next: Optional only � do a browser-level visual QA pass on /prototype if you want to tune the wording or card density before deployment.

### 2026-04-26 00:20 local — silent-pipeline-semantic-drift

- Objective: Run the paper-compliance pass on `papers/silent-pipeline-semantic-drift-draft.md`.
- Changed: Wrote `papers/silent-pipeline-semantic-drift-compliance.md` after checking manuscript sections, topic alignment, artifact completeness, and provenance status against the slug plan and current paper artifacts.
- Verified: The draft contains all required manuscript sections and remains aligned with the run's scoped position/design-paper objective.
- Failed / learned: The remaining blockers are workflow-completeness issues rather than manuscript-body defects.
- Blockers: `papers/silent-pipeline-semantic-drift.md` and `papers/silent-pipeline-semantic-drift.provenance.md` do not yet exist.
- Next: Promote the draft to the canonical final paper path and write the provenance sidecar with the standard run-accounting fields.
