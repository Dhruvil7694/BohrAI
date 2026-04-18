/** Concise bullets for workflow detail pages (At a glance). */

export const workflowKeyPoints = {
  "deep-research": [
    "Runs multiple gathering agents in parallel, then scores and challenges evidence before writing.",
    "Loops through review and iteration gates until convergence—suited to citation-heavy deliverables.",
    "Best when you need traceable sources and contradictions surfaced, not a one-shot summary.",
  ],
  "literature-review": [
    "Builds a survey-style picture: themes, where sources agree or clash, and open gaps.",
    "Faster than the full lit-review pipeline when you want breadth first.",
    "Outputs are structured for positioning new work or writing introductions.",
  ],
  "lit-review": [
    "Adds validation checkpoints and a stronger narrative pass than `/lit` alone.",
    "Use when quality bar is high—long-form chapters, surveys, or regulatory-facing drafts.",
    "Delivers a richer survey plus validation artifacts and gap maps.",
  ],
  paper: [
    "Shapes output like a manuscript: sections, figures or tables, and writing-oriented checks.",
    "Use when the goal is a paper-like artifact, not only a research memo.",
    "Includes compliance- and review-style passes where configured.",
  ],
  review: [
    "Produces structured peer-style feedback: severity, strengths, and concrete revisions.",
    "Ideal before submission or when you want an adversarial read of a near-final draft.",
    "Review pack ties notes to sections or claims for easier editing.",
  ],
  audit: [
    "Links claims in writing to code behavior and highlights mismatches or risks.",
    "Built for reproducibility reviews and ML papers with accompanying repositories.",
    "Outputs traceable mappings and ranked risk items.",
  ],
  replication: [
    "Turns replication into explicit steps, measurements, and comparison to published results.",
    "Use for benchmarks, claim checks, or lab-style follow-through.",
    "Leaves a clear trail of what matched, what diverged, and why.",
  ],
  compare: [
    "Builds an agreement / disagreement view across several sources on one topic.",
    "Suited to debates, policy memos, or triangulating controversial claims.",
    "Delivers a compact matrix plus short interpretation.",
  ],
  draft: [
    "Turns existing findings into coherent sections with transitions—not a fresh discovery pass.",
    "Use after research when you need prose quickly.",
    "Output is sectioned draft text; figures can remain placeholders where needed.",
  ],
  autoresearch: [
    "Runs a goal-directed loop: analyze state, propose hypotheses, measure, repeat.",
    "Fits exploratory problems where the next step should follow from data.",
    "Stops when configured criteria are met; full trace is retained.",
  ],
  watch: [
    "Schedules pulls and summarizes what changed for a topic over time.",
    "Use for fast-moving fields, competitor tracking, or rolling literature scans.",
    "Produces periodic summaries with deltas and a durable log.",
  ],
  hypothesis: [
    "Generates ranked, falsifiable hypotheses before you spend heavy research effort.",
    "Good for early scoping and experiment planning.",
    "Each item includes hooks for what would disprove it.",
  ],
  contradict: [
    "Stress-tests whether conclusions hold up against the cited evidence.",
    "Pairs well with reasoning validation for argumentative rigor.",
    "Surfaces contradictions with severity hints for triage.",
  ],
  "evidence-score": [
    "Scores how strongly evidence supports each claim using a transparent rubric.",
    "Use for dense briefs, audits, or making argument strength visible.",
    "Delivers per-claim tiers with short rationale snippets.",
  ],
  experiment: [
    "Produces a minimal experiment design: variables, metrics, controls, and stop rules.",
    "Use once hypotheses exist and you need a decisive test.",
    "Includes a protocol-style write-up and measurement checklist.",
  ],
  "citation-check": [
    "Aligns sentences with what citations actually support—catches drift and overclaiming.",
    "Use near submission or during heavy collaborative editing.",
    "Flags spans and suggests fixes without rewriting the whole draft.",
  ],
  "memory-log": [
    "Consolidates session artifacts into durable, retrievable project memory.",
    "Use for long-running work or handoffs between sessions.",
    "Structured entries are keyed for later recall in the shell.",
  ],
  "plan-research": [
    "Emits an explicit plan—agent order, checkpoints, and stop rules—before wide fan-out.",
    "Use when scope is ambiguous or you need governance over sequencing.",
    "Often composed with deeper research workflows.",
  ],
  "knowledge-graph": [
    "Extracts entities and relations so you can query structure, not only text.",
    "Best when the domain has many actors, datasets, or interlocking claims.",
    "Outputs a graph artifact for downstream tooling or inspection.",
  ],
  "reasoning-validate": [
    "Checks whether conclusions follow logically from premises and citations.",
    "Use for memos and summaries where logical leaps are costly.",
    "Returns an issue list with suggested repairs.",
  ],
  iterate: [
    "Generic iteration harness: run a work unit, evaluate, continue or stop.",
    "Compose with other modules when thresholds and convergence matter.",
    "Preserves an iteration trace alongside the final artifact.",
  ],
}
