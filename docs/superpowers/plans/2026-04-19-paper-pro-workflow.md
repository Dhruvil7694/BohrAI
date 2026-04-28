# Paper-Pro Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a professional end-to-end paper workflow that turns a topic or artifact into a full Markdown paper with evidence planning, structured drafting, adversarial checks, citation verification, and final provenance.

**Architecture:** Implement this as a new prompt-discovered workflow (`paper-pro`) on top of the existing Bohr prompt/agent system. Add one new supporting agent (`paper-architect`) to bridge planning and drafting, keep caveman compression for internal handoffs only, and validate the workflow by generating a real paper artifact from a narrow topic with existing workspace evidence.

**Tech Stack:** Prompt-driven Bohr workflows, bundled Bohr subagents in `.bohr/agents/`, Markdown docs, Node-based CLI validation scripts.

---

### Task 1: Add the professional workflow and missing architecture agent

**Files:**
- Create: `prompts/paper-pro.md`
- Create: `.bohr/agents/paper-architect.md`

- [ ] Define the new top-level workflow prompt with a deterministic artifact contract.
- [ ] Ensure the workflow:
  - derives a slug
  - writes a plan to `outputs/.plans/<slug>-paper-pro.md`
  - prefers existing slug-matched notes/plans before launching fresh research
  - uses caveman only for internal handoffs
  - produces `papers/<slug>.md` and `papers/<slug>.provenance.md`
  - continues automatically after planning
- [ ] Define the `paper-architect` agent to produce section map, claim map, evidence map, and figure/table plan.

### Task 2: Expose the workflow in user-facing docs

**Files:**
- Modify: `README.md`
- Modify: `website/src/content/docs/reference/slash-commands.md`
- Modify: `website/src/content/docs/reference/cli-commands.md`

- [ ] Add `paper-pro` to workflow listings and describe it as the professional, evidence-gated paper pipeline.
- [ ] Keep docs short and aligned with how prompt discovery already works.

### Task 3: Add a workflow validation harness

**Files:**
- Create: `scripts/test-paper-pro-workflow.mjs`

- [ ] Add a script that:
  - runs `bohr --model openai/gpt-5.4 --prompt "/paper-pro <topic>"`
  - uses an isolated `BOHR_HOME`
  - waits for `papers/<slug>.md`
  - saves a transcript
  - exits non-zero if the final paper is missing

### Task 4: Generate a real paper artifact and inspect quality

**Files:**
- Expected output: `papers/<slug>.md`
- Expected output: `papers/<slug>.provenance.md`
- Optional notes: `notes/<slug>-paper-pro-session.txt`

- [ ] Run the new workflow on a narrow topic that already has supporting workspace notes.
- [ ] Open the generated paper and provenance files.
- [ ] Evaluate:
  - section completeness
  - claim discipline
  - limitation honesty
  - citation/source handling
  - whether the final prose stayed professional despite caveman internals

### Task 5: Verify implementation claims before close-out

**Files:**
- Modify if needed after validation: `prompts/paper-pro.md`, `.bohr/agents/paper-architect.md`, `scripts/test-paper-pro-workflow.mjs`

- [ ] Run the exact validation command again after any workflow fixes.
- [ ] Confirm the final paper file exists and contains a full paper structure.
- [ ] Report what worked, what failed, and what remains unproven.
