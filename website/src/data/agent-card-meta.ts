import { docsSidebarSections } from "./docs-nav"

/** Sidebar group for agents (Core / Literature / Analysis) */
export type AgentFamily = "Core" | "Literature" | "Analysis"

const TAGS_BY_SLUG: Record<string, string[]> = {
  researcher: ["Gather", "AlphaXiv", "Parallel"],
  reviewer: ["Critique", "Severity"],
  writer: ["Synthesis", "Citations"],
  verifier: ["Checks", "Claims"],
  "research-planner": ["Orchestration", "Plan"],
  "iteration-controller": ["Loops", "Stop rules"],
  "literature-collector": ["Harvest", "Candidates"],
  "literature-quality": ["Scoring", "Triage"],
  "literature-synthesizer": ["Themes", "Merge"],
  "literature-gap": ["Gaps", "Open questions"],
  "literature-review-writer": ["Survey doc", "Narrative"],
  hypothesis: ["Framing", "Falsifiers"],
  contradiction: ["Adversarial", "Stress test"],
  "evidence-scorer": ["Rubric", "Tiers"],
  experiment: ["Design", "Protocol"],
  "citation-integrity": ["Align", "Sentences"],
  memory: ["Consolidate", "Recall"],
  "knowledge-graph": ["Entities", "Relations"],
  "reasoning-validator": ["Logic", "Premises"],
  "method-math": ["Methods", "Notation"],
  "figures-tables": ["Figures", "Tables"],
}

/** Which pastel accent stripe to use per family (matches Bohr neutrals + subtle color) */
const FAMILY_ACCENT: Record<AgentFamily, 0 | 1 | 2> = {
  Core: 0,
  Literature: 1,
  Analysis: 2,
}

export function getAgentFamily(slug: string): AgentFamily | null {
  for (const sec of docsSidebarSections) {
    if (!sec.title.startsWith("Agents ·")) continue
    const m = /^Agents · (.+)$/.exec(sec.title)
    const name = m?.[1]
    if (!name || (name !== "Core" && name !== "Literature" && name !== "Analysis")) continue
    if (sec.items.some((i) => i.slug === slug)) return name
  }
  return null
}

export function getAgentTags(slug: string): string[] {
  const key = slug.replace(/^agents\//, "")
  const family = getAgentFamily(slug)
  const custom = TAGS_BY_SLUG[key]
  if (custom?.length) {
    const withFamily = family ? [family, ...custom] : [...custom]
    return withFamily.slice(0, 4)
  }
  const base = family ? [family] : ["Agent"]
  return [...base, "Pi subagent"]
}

export function getAgentAccentIndex(slug: string): 0 | 1 | 2 {
  const family = getAgentFamily(slug)
  if (family && family in FAMILY_ACCENT) return FAMILY_ACCENT[family]
  return 0
}
