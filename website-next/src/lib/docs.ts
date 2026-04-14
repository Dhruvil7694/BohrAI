import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

import matter from "gray-matter";

export type DocSection = {
  title: string;
  items: Array<{ label: string; slug: string }>;
};

export type DocEntry = {
  slug: string;
  title: string;
  description?: string;
  content: string;
};

const DOCS_ROOT = resolve(process.cwd(), "../website/src/content/docs");

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Installation", slug: "getting-started/installation" },
      { label: "Quick Start", slug: "getting-started/quickstart" },
      { label: "Setup", slug: "getting-started/setup" },
      { label: "Configuration", slug: "getting-started/configuration" },
    ],
  },
  {
    title: "Workflows",
    items: [
      { label: "Deep Research", slug: "workflows/deep-research" },
      { label: "Literature Review", slug: "workflows/literature-review" },
      { label: "Literature Review Pipeline", slug: "workflows/lit-review" },
      { label: "Paper Workflow", slug: "workflows/paper" },
      { label: "Peer Review", slug: "workflows/review" },
      { label: "Code Audit", slug: "workflows/audit" },
      { label: "Replication", slug: "workflows/replication" },
      { label: "Source Comparison", slug: "workflows/compare" },
      { label: "Draft Writing", slug: "workflows/draft" },
      { label: "Autoresearch", slug: "workflows/autoresearch" },
      { label: "Watch", slug: "workflows/watch" },
      { label: "Hypothesis", slug: "workflows/hypothesis" },
      { label: "Contradiction", slug: "workflows/contradict" },
      { label: "Evidence Score", slug: "workflows/evidence-score" },
      { label: "Experiment", slug: "workflows/experiment" },
      { label: "Citation Check", slug: "workflows/citation-check" },
      { label: "Memory Log", slug: "workflows/memory-log" },
      { label: "Plan Research", slug: "workflows/plan-research" },
      { label: "Knowledge Graph", slug: "workflows/knowledge-graph" },
      { label: "Reasoning Validate", slug: "workflows/reasoning-validate" },
      { label: "Iterate", slug: "workflows/iterate" },
    ],
  },
  {
    title: "Templates",
    items: [
      { label: "Research Template", slug: "templates/research-template" },
      { label: "Review Template", slug: "templates/review-template" },
      { label: "Replication Template", slug: "templates/replication-template" },
      { label: "Decision Brief Template", slug: "templates/decision-brief-template" },
    ],
  },
  {
    title: "Agents",
    items: [
      { label: "Researcher", slug: "agents/researcher" },
      { label: "Reviewer", slug: "agents/reviewer" },
      { label: "Writer", slug: "agents/writer" },
      { label: "Verifier", slug: "agents/verifier" },
      { label: "Hypothesis", slug: "agents/hypothesis" },
      { label: "Contradiction", slug: "agents/contradiction" },
      { label: "Evidence Scorer", slug: "agents/evidence-scorer" },
      { label: "Experiment", slug: "agents/experiment" },
      { label: "Citation Integrity", slug: "agents/citation-integrity" },
      { label: "Memory", slug: "agents/memory" },
      { label: "Research Planner", slug: "agents/research-planner" },
      { label: "Knowledge Graph", slug: "agents/knowledge-graph" },
      { label: "Literature Collector", slug: "agents/literature-collector" },
      { label: "Literature Quality", slug: "agents/literature-quality" },
      { label: "Literature Synthesizer", slug: "agents/literature-synthesizer" },
      { label: "Literature Gap", slug: "agents/literature-gap" },
      { label: "Literature Review Writer", slug: "agents/literature-review-writer" },
      { label: "Method Math", slug: "agents/method-math" },
      { label: "Figures Tables", slug: "agents/figures-tables" },
      { label: "Reasoning Validator", slug: "agents/reasoning-validator" },
      { label: "Iteration Controller", slug: "agents/iteration-controller" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "AlphaXiv", slug: "tools/alphaxiv" },
      { label: "Web Search", slug: "tools/web-search" },
      { label: "Session Search", slug: "tools/session-search" },
      { label: "Preview", slug: "tools/preview" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "CLI Commands", slug: "reference/cli-commands" },
      { label: "Slash Commands", slug: "reference/slash-commands" },
      { label: "Package Stack", slug: "reference/package-stack" },
    ],
  },
];

function listMarkdownFiles(root: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(root)) {
    const fullPath = join(root, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...listMarkdownFiles(fullPath));
      continue;
    }
    if (stat.isFile() && fullPath.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllDocSlugs(): string[] {
  return listMarkdownFiles(DOCS_ROOT).map((file) =>
    relative(DOCS_ROOT, file).replace(/\.md$/, "").split(sep).join("/"),
  );
}

export function getDocBySlug(slug: string): DocEntry | null {
  const target = resolve(DOCS_ROOT, `${slug}.md`);
  try {
    const raw = readFileSync(target, "utf8");
    const parsed = matter(raw);
    const title = typeof parsed.data.title === "string" ? parsed.data.title : slug;
    const description = typeof parsed.data.description === "string" ? parsed.data.description : undefined;
    return { slug, title, description, content: parsed.content };
  } catch {
    return null;
  }
}
