/** Sidebar + hub — single source of truth for docs IA */
export type DocNavItem = { label: string; slug: string }

export type DocNavSection = { title: string; items: DocNavItem[] }

export const docsSidebarSections: DocNavSection[] = [
  {
    title: "Getting started",
    items: [
      { label: "Installation", slug: "getting-started/installation" },
      { label: "Why Bohr?", slug: "getting-started/why-bohr" },
      { label: "Quick start", slug: "getting-started/quickstart" },
      { label: "Setup", slug: "getting-started/setup" },
      { label: "Configuration", slug: "getting-started/configuration" },
    ],
  },
  {
    title: "Workflows",
    items: [
      { label: "Deep research", slug: "workflows/deep-research" },
      { label: "Literature review", slug: "workflows/literature-review" },
      { label: "Lit review pipeline", slug: "workflows/lit-review" },
      { label: "Paper", slug: "workflows/paper" },
      { label: "Peer review", slug: "workflows/review" },
      { label: "Code audit", slug: "workflows/audit" },
      { label: "Replication", slug: "workflows/replication" },
      { label: "Source comparison", slug: "workflows/compare" },
      { label: "Draft writing", slug: "workflows/draft" },
      { label: "Autoresearch", slug: "workflows/autoresearch" },
      { label: "Watch", slug: "workflows/watch" },
    ],
  },
  {
    title: "Workflow modules",
    items: [
      { label: "Hypothesis", slug: "workflows/hypothesis" },
      { label: "Contradiction", slug: "workflows/contradict" },
      { label: "Evidence score", slug: "workflows/evidence-score" },
      { label: "Experiment", slug: "workflows/experiment" },
      { label: "Citation check", slug: "workflows/citation-check" },
      { label: "Memory log", slug: "workflows/memory-log" },
      { label: "Plan research", slug: "workflows/plan-research" },
      { label: "Knowledge graph", slug: "workflows/knowledge-graph" },
      { label: "Reasoning validate", slug: "workflows/reasoning-validate" },
      { label: "Iterate", slug: "workflows/iterate" },
    ],
  },
  {
    title: "Templates",
    items: [
      { label: "Research template", slug: "templates/research-template" },
      { label: "Review template", slug: "templates/review-template" },
      { label: "Replication template", slug: "templates/replication-template" },
      { label: "Decision brief template", slug: "templates/decision-brief-template" },
    ],
  },
  {
    title: "Agents · Core",
    items: [
      { label: "Researcher", slug: "agents/researcher" },
      { label: "Reviewer", slug: "agents/reviewer" },
      { label: "Writer", slug: "agents/writer" },
      { label: "Verifier", slug: "agents/verifier" },
      { label: "Research planner", slug: "agents/research-planner" },
      { label: "Iteration controller", slug: "agents/iteration-controller" },
    ],
  },
  {
    title: "Agents · Literature",
    items: [
      { label: "Literature collector", slug: "agents/literature-collector" },
      { label: "Literature quality", slug: "agents/literature-quality" },
      { label: "Literature synthesizer", slug: "agents/literature-synthesizer" },
      { label: "Literature gap", slug: "agents/literature-gap" },
      { label: "Literature review writer", slug: "agents/literature-review-writer" },
    ],
  },
  {
    title: "Agents · Analysis",
    items: [
      { label: "Hypothesis", slug: "agents/hypothesis" },
      { label: "Contradiction", slug: "agents/contradiction" },
      { label: "Evidence scorer", slug: "agents/evidence-scorer" },
      { label: "Experiment", slug: "agents/experiment" },
      { label: "Citation integrity", slug: "agents/citation-integrity" },
      { label: "Memory", slug: "agents/memory" },
      { label: "Knowledge graph", slug: "agents/knowledge-graph" },
      { label: "Reasoning validator", slug: "agents/reasoning-validator" },
      { label: "Method & math", slug: "agents/method-math" },
      { label: "Figures & tables", slug: "agents/figures-tables" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "AlphaXiv", slug: "tools/alphaxiv" },
      { label: "Web search", slug: "tools/web-search" },
      { label: "Session search", slug: "tools/session-search" },
      { label: "Preview", slug: "tools/preview" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "CLI commands", slug: "reference/cli-commands" },
      { label: "Slash commands", slug: "reference/slash-commands" },
      { label: "Package stack", slug: "reference/package-stack" },
      { label: "Token optimization", slug: "reference/token-optimization" },
      { label: "Cost & token estimation", slug: "reference/cost-token-estimation" },
    ],
  },
]
