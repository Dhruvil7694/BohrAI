/**
 * One-shot generator for src/content/workflowPages/*.md
 * Run: node scripts/gen-workflow-pages.mjs (from website/)
 */
import fs from "node:fs"
import path from "node:path"
import { stringify } from "yaml"
import { workflowPipelines } from "./workflow-pipelines.mjs"
import { workflowKeyPoints } from "./workflow-key-points.mjs"

const dir = path.join(process.cwd(), "src/content/workflowPages")
fs.mkdirSync(dir, { recursive: true })

const workflows = [
  {
    slug: "deep-research",
    title: "Deep Research",
    summary: "Multi-agent investigation with citations, contradiction checks, and iteration until convergence.",
    slashCommand: "/deepresearch",
    cliName: "deepresearch",
    docsSlug: "workflows/deep-research",
    category: "pipeline",
    order: 1,
    mermaid: `flowchart TD
  P["plan-research"] --> H["hypothesis"]
  H --> R["parallel researchers"]
  R --> E["evidence-scorer"]
  E --> C["contradiction + reasoning"]
  C --> W["writer"]
  W --> V["verifier + reviewer"]
  V --> I["iteration-controller"]
  I -->|loop or done| O["Final brief"]`,
    body: `## Overview

Deep research is Bohr's flagship workflow: it fans out gathering, scores evidence, runs adversarial checks, writes a synthesis, and loops until quality gates pass.

## When to use it

Choose deep research when you need a **source-heavy brief** with traceable citations and resolved contradictions—not a quick summary.

## What you get

A durable artifact (often Markdown or structured brief) with inline citations, explicit gaps, and iteration notes from \`iteration-controller\`.`,
  },
  {
    slug: "literature-review",
    title: "Literature Review",
    summary: "Structured survey: consensus, disagreements, gaps, and open questions across sources.",
    slashCommand: "/lit",
    cliName: "lit",
    docsSlug: "workflows/literature-review",
    category: "pipeline",
    order: 2,
    mermaid: `flowchart LR
  T["topic"] --> S["search + collect"]
  S --> Y["synthesize themes"]
  Y --> G["gaps + contradictions"]
  G --> R["reviewer polish"]
  R --> out["survey doc"]`,
    body: `## Overview

The literature workflow collects sources, clusters themes, surfaces disagreements, and highlights research gaps—ideal for positioning new work.

## When to use it

Use \`/lit\` when you need a **survey-style** output faster than the full lit-review pipeline.

## Outputs

Themes, tension points, and explicit open questions with citations.`,
  },
  {
    slug: "lit-review",
    title: "Literature Review Pipeline",
    summary: "Full pipeline: themes, contradictions, gaps, and validation passes.",
    slashCommand: "/lit-review",
    cliName: "lit-review",
    docsSlug: "workflows/lit-review",
    category: "pipeline",
    order: 3,
    mermaid: `flowchart TD
  A["sources"] --> B["theme map"]
  B --> C["contradiction scan"]
  C --> D["gap analysis"]
  D --> V["validator"]
  V --> L["lit-review writer"]
  L --> X["validated survey"]`,
    body: `## Overview

This is the **extended** literature pipeline—more checkpoints than \`/lit\`, including structured validation before delivery.

## When to use it

Pick lit-review pipeline when stakes are high (thesis chapter, survey paper, regulatory brief).

## Outputs

A richer narrative plus validation artifacts and gap maps.`,
  },
  {
    slug: "paper",
    title: "Paper Workflow",
    summary: "Manuscript-oriented pipeline with methods, figures, and compliance-oriented passes.",
    slashCommand: "/paper",
    cliName: "paper",
    docsSlug: "workflows/paper",
    category: "pipeline",
    order: 4,
    mermaid: `flowchart TD
  Q["question / outline"] --> D["draft sections"]
  D --> F["figures & tables"]
  F --> M["method/math checks"]
  M --> P["paper-compliance"]
  P --> Rev["review"]
  Rev --> Pub["submission-ready draft"]`,
    body: `## Overview

Builds a publication-shaped artifact: sections, figures where applicable, and checks tuned for scientific writing norms.

## When to use it

When your goal is a **paper-shaped deliverable**, not only a research brief.

## Outputs

Structured manuscript drafts with reviewer-style passes where configured.`,
  },
  {
    slug: "review",
    title: "Peer Review",
    summary: "Severity-graded feedback and inline annotations on an artifact.",
    slashCommand: "/review",
    cliName: "review",
    docsSlug: "workflows/review",
    category: "pipeline",
    order: 5,
    mermaid: `flowchart LR
  A["artifact"] --> R["reviewer agent"]
  R --> S["severity grades"]
  S --> N["inline notes"]
  N --> out["review report"]`,
    body: `## Overview

Simulates structured peer review: strengths, weaknesses, severity, and concrete revision asks.

## When to use it

Before submission or when stress-testing an internal draft.

## Outputs

An annotated review pack tied to sections or claims.`,
  },
  {
    slug: "audit",
    title: "Code Audit",
    summary: "Compare paper claims against code for reproducibility and mismatch risks.",
    slashCommand: "/audit",
    cliName: "audit",
    docsSlug: "workflows/audit",
    category: "pipeline",
    order: 6,
    mermaid: `flowchart TD
  P["paper claims"] --> C["code retrieval"]
  C --> M["claim-to-code map"]
  M --> X["mismatch finder"]
  X --> R["risk report"]`,
    body: `## Overview

Maps statements in a paper to repository behavior and flags discrepancies—ideal for ML reproducibility reviews.

## When to use it

Before release, during replication studies, or when reviewing third-party papers with code.

## Outputs

Traceable mappings plus severity-ranked risks.`,
  },
  {
    slug: "replication",
    title: "Replication",
    summary: "Plan or execute replication steps for a paper, claim, or benchmark.",
    slashCommand: "/replicate",
    cliName: "replicate",
    docsSlug: "workflows/replication",
    category: "pipeline",
    order: 7,
    mermaid: `flowchart LR
  G["goal"] --> Pl["plan"]
  Pl --> Ex["experiment steps"]
  Ex --> Me["measure"]
  Me --> Cmp["compare to paper"]
  Cmp --> Rep["replication notes"]`,
    body: `## Overview

Structures replication as explicit steps, measurements, and comparison back to reported results.

## When to use it

Benchmark reproduction, claim verification, or lab protocol follow-through.

## Outputs

Scripts, logs, and a narrative of what matched or diverged.`,
  },
  {
    slug: "compare",
    title: "Source Comparison",
    summary: "Agreement / disagreement matrix across sources on a topic.",
    slashCommand: "/compare",
    cliName: "compare",
    docsSlug: "workflows/compare",
    category: "pipeline",
    order: 8,
    mermaid: `flowchart TD
  S1["source A"] --> M["matrix builder"]
  S2["source B"] --> M
  S3["source C"] --> M
  M --> G["agree / disagree"]
  G --> T["matrix table"]`,
    body: `## Overview

Builds a comparative view: where sources align, conflict, or leave silence—useful for debates and surveys.

## When to use it

Multi-source controversies, policy briefs, or literature triangulation.

## Outputs

A compact matrix plus narrative interpretation.`,
  },
  {
    slug: "draft",
    title: "Draft Writing",
    summary: "Turn accumulated findings into structured draft sections.",
    slashCommand: "/draft",
    cliName: "draft",
    docsSlug: "workflows/draft",
    category: "pipeline",
    order: 9,
    mermaid: `flowchart LR
  F["findings"] --> O["outline"]
  O --> W["writer"]
  W --> E["editor pass"]
  E --> D["draft MD"]`,
    body: `## Overview

Consumes prior artifacts or inline context and produces manuscript-style sections with transitions.

## When to use it

After research passes, when you need prose quickly without restarting discovery.

## Outputs

Sectioned draft with placeholders for figures if needed.`,
  },
  {
    slug: "autoresearch",
    title: "Autoresearch",
    summary: "Autonomous experiment loop: analyze, measure, hypothesize, test toward a goal.",
    slashCommand: "/autoresearch",
    cliName: "autoresearch",
    docsSlug: "workflows/autoresearch",
    category: "pipeline",
    order: 10,
    mermaid: `flowchart TD
  G["goal"] --> L["loop"]
  L --> A["analyze state"]
  A --> H["new hypothesis"]
  H --> T["test / measure"]
  T -->|not done| L
  T -->|done| R["report"]`,
    body: `## Overview

Runs repeated cycles of analysis → hypothesis → measurement until stop criteria hit—good for optimization-style research questions.

## When to use it

Exploratory spaces where the next step should emerge from measurements.

## Outputs

Iteration log plus final recommendation and metrics.`,
  },
  {
    slug: "watch",
    title: "Watch",
    summary: "Recurring monitoring on a topic with alerts and summaries.",
    slashCommand: "/watch",
    cliName: "watch",
    docsSlug: "workflows/watch",
    category: "pipeline",
    order: 11,
    mermaid: `flowchart LR
  T["topic"] --> Sch["schedule"]
  Sch --> F["fetch deltas"]
  F --> S["summarize"]
  S --> N["notify / log"]`,
    body: `## Overview

Sets up ongoing observation: periodic pulls, diff summaries, and durable logs for long-running topics.

## When to use it

Fast-moving fields, competitor tracking, or rolling literature awareness.

## Outputs

Scheduled summaries with delta highlights.`,
  },
  {
    slug: "hypothesis",
    title: "Hypothesis",
    summary: "Ranked, testable hypotheses with explicit falsifiers.",
    slashCommand: "/hypothesis",
    cliName: "hypothesis",
    docsSlug: "workflows/hypothesis",
    category: "module",
    order: 101,
    mermaid: `flowchart TD
  C["context"] --> H["hypothesis agent"]
  H --> R["ranked list"]
  R --> F["falsifiers"]
  F --> out["hypothesis brief"]`,
    body: `## Overview

A focused module that frames falsifiable statements before heavier research spend.

## When to use it

Early phase scoping or before experiment design.

## Outputs

Ordered hypotheses with counterevidence hooks.`,
  },
  {
    slug: "contradict",
    title: "Contradiction",
    summary: "Adversarial pass on conclusions and cited support.",
    slashCommand: "/contradict",
    cliName: "contradict",
    docsSlug: "workflows/contradict",
    category: "module",
    order: 102,
    mermaid: `flowchart LR
  Cl["claims"] --> A["attack paths"]
  A --> E["evidence stress"]
  E --> L["counterclaims"]
  L --> rep["risk list"]`,
    body: `## Overview

Surfaces conflicts between narrative and evidence—pair with reasoning validation for rigor.

## When to use it

Before finalizing conclusions or when a draft feels too tidy.

## Outputs

Contradiction map with severity hints.`,
  },
  {
    slug: "evidence-score",
    title: "Evidence Score",
    summary: "Transparent rubric for claim support quality.",
    slashCommand: "/evidence-score",
    cliName: "evidence-score",
    docsSlug: "workflows/evidence-score",
    category: "module",
    order: 103,
    mermaid: `flowchart TD
  K["claims"] --> S["score rubric"]
  S --> W["weights"]
  W --> T["tier table"]
  T --> out["scored sheet"]`,
    body: `## Overview

Scores how well evidence backs each claim—useful for triage and reviewer transparency.

## When to use it

Dense briefs, audit prep, or grading argument strength.

## Outputs

Per-claim scores with rationale snippets.`,
  },
  {
    slug: "experiment",
    title: "Experiment",
    summary: "Design a minimal decisive experiment for a hypothesis or goal.",
    slashCommand: "/experiment",
    cliName: "experiment",
    docsSlug: "workflows/experiment",
    category: "module",
    order: 104,
    mermaid: `flowchart LR
  H["hypothesis"] --> D["design"]
  D --> M["metrics"]
  M --> P["protocol"]
  P --> E["execute hook"]
  E --> L["log"]`,
    body: `## Overview

Produces an executable plan: variables, controls, metrics, and stop rules.

## When to use it

After hypotheses exist and you need a crisp test—not full lab automation unless configured.

## Outputs

Protocol doc plus measurement checklist.`,
  },
  {
    slug: "citation-check",
    title: "Citation Check",
    summary: "Sentence-level alignment between claims and citations.",
    slashCommand: "/citation-check",
    cliName: "citation-check",
    docsSlug: "workflows/citation-check",
    category: "module",
    order: 105,
    mermaid: `flowchart TD
  D["draft"] --> P["parse sentences"]
  P --> M["map to cites"]
  M --> V["verify support"]
  V --> F["flags"]`,
    body: `## Overview

Finds citations that drift from what sentences actually claim.

## When to use it

Pre-submission integrity passes or collaborative editing.

## Outputs

Flagged spans with suggested fixes.`,
  },
  {
    slug: "memory-log",
    title: "Memory Log",
    summary: "Consolidate durable project memory for later sessions.",
    slashCommand: "/memory-log",
    cliName: "memory-log",
    docsSlug: "workflows/memory-log",
    category: "module",
    order: 106,
    mermaid: `flowchart LR
  S["session artifacts"] --> C["compress"]
  C --> M["memory agent"]
  M --> L["durable log"]
  L --> K["retrieval keys"]`,
    body: `## Overview

Turns scattered notes into structured memory your next session can reload.

## When to use it

Long projects or handoffs between sessions.

## Outputs

Structured memory entries linked to topics.`,
  },
  {
    slug: "plan-research",
    title: "Plan Research",
    summary: "Orchestration plan: agent order, checkpoints, stop criteria.",
    slashCommand: "/plan-research",
    cliName: "plan-research",
    docsSlug: "workflows/plan-research",
    category: "module",
    order: 107,
    mermaid: `flowchart TD
  G["goal"] --> B["breakdown"]
  B --> O["agent order"]
  O --> C["checkpoints"]
  C --> S["stop rules"]
  S --> Pl["plan doc"]`,
    body: `## Overview

Creates an explicit DAG-style plan before expensive fan-out—often paired with deep research.

## When to use it

Ambiguous scopes or when you want governance over agent sequencing.

## Outputs

Machine- and human-readable plan with checkpoints.`,
  },
  {
    slug: "knowledge-graph",
    title: "Knowledge Graph",
    summary: "Entity–relation graph from findings for reuse and querying.",
    slashCommand: "/knowledge-graph",
    cliName: "knowledge-graph",
    docsSlug: "workflows/knowledge-graph",
    category: "module",
    order: 108,
    mermaid: `flowchart LR
  T["text / brief"] --> E["entities"]
  E --> R["relations"]
  R --> G["graph"]
  G --> Q["queries"]`,
    body: `## Overview

Extracts entities and edges so downstream steps can traverse structure, not only text.

## When to use it

Complex domains with many actors, datasets, or claims.

## Outputs

Graph artifact plus optional visualization hooks.`,
  },
  {
    slug: "reasoning-validate",
    title: "Reasoning Validate",
    summary: "Check whether conclusions logically follow from cited evidence.",
    slashCommand: "/reasoning-validate",
    cliName: "reasoning-validate",
    docsSlug: "workflows/reasoning-validate",
    category: "module",
    order: 109,
    mermaid: `flowchart TD
  Pr["premises"] --> L["logic chain"]
  L --> C["conclusion"]
  C --> V["validator"]
  V --> I["issues"]`,
    body: `## Overview

Stress-tests argumentative glue—where leaps happen even if citations exist.

## When to use it

Policy memos, reviews, or executive summaries with tight logic needs.

## Outputs

Issue list with suggested repairs.`,
  },
  {
    slug: "iterate",
    title: "Iterate",
    summary: "Research loops until convergence criteria are met.",
    slashCommand: "/iterate",
    cliName: "iterate",
    docsSlug: "workflows/iterate",
    category: "module",
    order: 110,
    mermaid: `flowchart TD
  X["topic"] --> L["loop"]
  L --> W["work unit"]
  W --> E["evaluate"]
  E -->|continue| L
  E -->|stop| F["final"]`,
    body: `## Overview

Generic iteration harness—pairs with other modules to refine until thresholds hit.

## When to use it

When stop conditions matter more than a single pass.

## Outputs

Iteration trace plus final artifact.`,
  },
]

const detailSuffix = `

## Practical notes

Exact agents, tools, and stop rules depend on your Bohr configuration. For CLI flags, examples, and edge cases, open the **full documentation** from the Documentation & links section on this page.

## See also

- [Slash commands](/docs/reference/slash-commands) — syntax reference for every workflow
- [All workflows](/workflows) — browse pipelines and modules side by side
`

for (const w of workflows) {
  const pipeline = workflowPipelines[w.slug]
  if (!pipeline) {
    throw new Error(`workflow-pipelines.mjs missing entry for slug: ${w.slug}`)
  }
  const keyPoints = workflowKeyPoints[w.slug]
  if (!keyPoints?.length) {
    throw new Error(`workflow-key-points.mjs missing entry for slug: ${w.slug}`)
  }
  const pipelineYaml = stringify(pipeline)
    .trimEnd()
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")

  const fm = `---
title: ${JSON.stringify(w.title)}
summary: ${JSON.stringify(w.summary)}
slashCommand: ${JSON.stringify(w.slashCommand)}
cliName: ${JSON.stringify(w.cliName)}
docsSlug: ${JSON.stringify(w.docsSlug)}
category: ${JSON.stringify(w.category)}
order: ${w.order}
pipelineDiagram:
${pipelineYaml}
keyPoints:
${keyPoints.map((line) => `  - ${JSON.stringify(line)}`).join("\n")}
mermaidFlow: |
${w.mermaid
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n")}
---

${w.body}${detailSuffix}
`
  fs.writeFileSync(path.join(dir, `${w.slug}.md`), fm, "utf8")
}

console.log(`Wrote ${workflows.length} files to ${dir}`)
