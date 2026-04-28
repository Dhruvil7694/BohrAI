---
title: Slash Commands
description: Complete reference for REPL slash commands.
section: Reference
order: 2
---

Slash commands are available inside the Bohr AI REPL. They map to research workflows, project management tools, and setup utilities. Type `/help` inside the REPL for the live command list, which may include additional commands from installed Pi packages.

## Research workflows

| Command | Description |
| --- | --- |
| `/deepresearch <topic>` | Run a thorough, source-heavy investigation and produce a research brief with inline citations |
| `/lit <topic>` | Run a structured literature review with consensus, disagreements, and open questions |
| `/lit-review <topic>` | Run a full literature-review pipeline with themes, contradictions, gaps, and validation |
| `/visuals <topic>` | Generate data-backed charts, source-linked tables, and conceptual image assets |
| `/paper <topic-or-artifact>` | Build a publication-grade manuscript pipeline with method, figures, and compliance checks |
| `/paper-pro <topic-or-artifact>` | Run the professional paper workflow with architecture mapping, adversarial review, citation verification, and provenance |
| `/review <artifact>` | Simulate a peer review with severity-graded feedback and inline annotations |
| `/audit <item>` | Compare a paper's claims against its public codebase for mismatches and reproducibility risks |
| `/replicate <paper>` | Plan or execute a replication workflow for a paper, claim, or benchmark |
| `/compare <topic>` | Compare multiple sources and produce an agreement/disagreement matrix |
| `/draft <topic>` | Generate a paper-style draft from research findings |
| `/autoresearch <idea>` | Start an autonomous experiment loop that iteratively optimizes toward a goal |
| `/watch <topic>` | Set up recurring research monitoring on a topic |
| `/hypothesis <topic-or-artifact>` | Generate ranked, testable hypotheses with explicit falsifiers |
| `/contradict <claim-or-artifact>` | Run adversarial contradiction analysis on conclusions |
| `/evidence-score <artifact-or-topic>` | Score claim support quality with a transparent rubric |
| `/experiment <hypothesis-or-goal>` | Design and execute a minimal decisive experiment |
| `/citation-check <artifact>` | Validate sentence-level claim-to-citation alignment |
| `/memory-log <project-or-topic>` | Consolidate durable project memory for later sessions |
| `/plan-research <topic-or-goal>` | Build orchestration plan: agent order, checkpoints, stop criteria |
| `/knowledge-graph <artifact-or-topic>` | Build reusable entity-relation graph from findings |
| `/reasoning-validate <artifact>` | Validate whether conclusions logically follow from evidence |
| `/iterate <topic-or-artifact>` | Run iterative research loops until convergence criteria are met |

These are the primary commands you will use day-to-day. Each workflow dispatches one or more specialized agents (`researcher`, `reviewer`, `writer`, `verifier`, `hypothesis`, `contradiction`, `evidence-scorer`, `experiment`, `citation-integrity`, `memory`) depending on the task.

## Project and session

| Command | Description |
| --- | --- |
| `/log` | Write a durable session log with completed work, findings, open questions, and next steps |
| `/jobs` | Inspect active background work: running processes, scheduled follow-ups, and active watches |
| `/help` | Show grouped Bohr AI commands and prefill the editor with a selected command |
| `/bohr-model` | Open the model picker for the main default model and per-subagent overrides |
| `/init` | Bootstrap `AGENTS.md` and session-log folders for a new research project |
| `/outputs` | Browse all research artifacts (papers, outputs, experiments, notes) |
| `/search` | Search prior session transcripts for past research and findings |
| `/preview` | Preview the current artifact as rendered HTML or PDF |

Session management commands help you organize ongoing work. The `/log` command is particularly useful at the end of a research session to capture what was accomplished and what remains.

The `/bohr-model` command opens an interactive picker that lets you either change the main default model or assign a different model to any bundled subagent, including `researcher`, `reviewer`, `writer`, `verifier`, `hypothesis`, `contradiction`, `evidence-scorer`, `experiment`, `citation-integrity`, and `memory`.

## Running workflows from the CLI

All research workflow slash commands can also be run directly from the command line:

```bash
bohr deepresearch "topic"
bohr lit "topic"
bohr lit-review "topic"
bohr visuals "topic"
bohr paper "topic"
bohr paper-pro "topic"
bohr review artifact.md
bohr audit 2401.12345
bohr replicate "claim"
bohr compare "topic"
bohr draft "topic"
bohr hypothesis "topic"
bohr contradict artifact.md
bohr evidence-score artifact.md
bohr experiment "hypothesis"
bohr citation-check artifact.md
bohr memory-log "project"
bohr plan-research "topic"
bohr knowledge-graph artifact.md
bohr reasoning-validate artifact.md
bohr iterate "topic"
```

This is equivalent to launching the REPL and typing the slash command. The CLI form is useful for scripting and automation.
