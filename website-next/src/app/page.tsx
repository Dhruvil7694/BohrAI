"use client";

import Link from "next/link";
import { useRef } from "react";

const workflows = [
  { command: "/deepresearch", description: "Multi-agent investigation across papers, web, and code" },
  { command: "/lit", description: "Literature review from primary sources with consensus mapping" },
  { command: "/lit-review", description: "Full literature pipeline: collect, score, theme, contradict, gap, validate" },
  { command: "/paper", description: "Publication-grade pipeline with formal methods, figures, and compliance checks" },
  { command: "/review", description: "Simulated peer review with severity scores and a revision plan" },
  { command: "/audit", description: "Paper-to-code mismatch audit for reproducibility claims" },
  { command: "/replicate", description: "Replication plan and execution in a sandboxed Docker container" },
  { command: "/compare", description: "Side-by-side source comparison with agreement and conflict matrix" },
  { command: "/draft", description: "Polished paper-style draft with inline citations from findings" },
  { command: "/autoresearch", description: "Autonomous loop: hypothesize, experiment, measure, repeat" },
  { command: "/watch", description: "Recurring monitor for new papers, code, or product updates" },
  { command: "/hypothesis", description: "Generate falsifiable hypotheses and prioritize decisive tests" },
  { command: "/contradict", description: "Adversarially stress-test claims with counter-evidence" },
  { command: "/evidence-score", description: "Score claim support strength with a transparent rubric" },
  { command: "/experiment", description: "Design and run minimal experiments to resolve uncertainty" },
  { command: "/citation-check", description: "Validate citation-to-claim alignment sentence by sentence" },
  { command: "/memory-log", description: "Consolidate durable decisions, assumptions, and next actions" },
  { command: "/plan-research", description: "Plan orchestration: agent order, checkpoints, and stop criteria" },
  { command: "/knowledge-graph", description: "Build reusable entity-relation graph from findings" },
  { command: "/reasoning-validate", description: "Check if conclusions logically follow from evidence" },
  { command: "/iterate", description: "Run looped research until confidence and contradiction goals are met" },
];

const scenarioExamples = [
  {
    audience: "Startup",
    title: "Validate a feature bet before roadmap commitment",
    command: 'bohr deepresearch "AI sales assistant market for SMB, pricing benchmarks, retention risks"',
    outcome: "Decision brief with competitor matrix, pricing bands, and go/no-go risks.",
  },
  {
    audience: "AI/ML Research",
    title: "Map consensus before starting a new experiment track",
    command: 'bohr lit "test-time compute scaling for reasoning models"',
    outcome: "Literature synthesis with agreements, conflicts, and open questions.",
  },
  {
    audience: "Product",
    title: "Choose between two architecture directions",
    command: 'bohr compare "RAG vs long-context fine-tuning for customer support QA"',
    outcome: "Trade-off report covering latency, cost, implementation complexity, and risk.",
  },
  {
    audience: "Research Engineering",
    title: "Pressure-test a headline paper claim before adoption",
    command: 'bohr replicate "chain-of-thought improves grade-school math under strict eval"',
    outcome: "Replication protocol with experiment checklist and failure-mode log.",
  },
  {
    audience: "Analyst",
    title: "Build an executive-ready landscape memo quickly",
    command: 'bohr draft "foundation model vendor positioning for enterprise procurement"',
    outcome: "Clean memo with source-grounded positioning and recommendation paths.",
  },
  {
    audience: "Leadership",
    title: "Monitor fast-moving topics without manual tracking",
    command: 'bohr watch "open-source reasoning model releases and benchmark shifts"',
    outcome: "Recurring update stream with notable changes and implication notes.",
  },
];

const templates = [
  {
    name: "Fast Research Brief",
    steps: ["bohr plan-research \"topic\"", "bohr deepresearch \"topic\"", "bohr citation-check outputs/<slug>.md"],
    output: "Plan + cited brief + citation integrity report",
  },
  {
    name: "Claim Stress Test",
    steps: ["bohr hypothesis \"claim\"", "bohr contradict outputs/<slug>-hypotheses.md", "bohr reasoning-validate outputs/<slug>-contradictions.md"],
    output: "Hypotheses + contradictions + logic validation",
  },
  {
    name: "Evidence-Weighted Comparison",
    steps: ["bohr compare \"A vs B on topic\"", "bohr evidence-score outputs/<slug>.md", "bohr knowledge-graph outputs/<slug>.md"],
    output: "Comparison brief + support scores + reusable graph",
  },
  {
    name: "Iterative Convergence",
    steps: ["bohr plan-research \"topic\"", "bohr iterate \"topic\"", "bohr memory-log \"topic\""],
    output: "Iterative brief + loop log + durable memory",
  },
];

const agents = [
  { name: "Researcher", description: "Hunts for evidence across papers, the web, repos, and docs" },
  { name: "Writer", description: "Structures notes into briefs, drafts, and paper-style output" },
  { name: "Hypothesis", description: "Builds testable hypotheses and clear falsification criteria" },
  { name: "Experiment", description: "Designs minimal experiments and records reproducible results" },
  { name: "Research Planner", description: "Chooses agent sequence, checkpoints, and stop conditions" },
  { name: "Knowledge Graph", description: "Structures research into reusable entities and relations" },
  { name: "Memory", description: "Maintains durable decisions, assumptions, and open questions" },
  { name: "Literature Collector", description: "Collects paper candidates with structured metadata" },
  { name: "Literature Quality", description: "Scores and filters papers for inclusion quality" },
  { name: "Literature Synthesizer", description: "Clusters included papers into thematic groups" },
  { name: "Literature Gap", description: "Identifies open problems and underexplored areas" },
  { name: "Literature Review Writer", description: "Produces survey-style thematic literature reviews" },
  { name: "Method Math", description: "Formalizes equations, notation, and method sections" },
  { name: "Figures Tables", description: "Builds publication-ready figures, tables, and captions" },
];

const sources = [
  { name: "AlphaXiv", description: "Paper search, Q&A, code reading, and annotations via the alpha CLI", href: "https://alphaxiv.org" },
  { name: "Web search", description: "Searches via Gemini or Perplexity" },
  { name: "Session search", description: "Indexed recall across prior research sessions" },
  { name: "Preview", description: "Browser and PDF export of generated artifacts" },
];

const compute = [
  { name: "Docker", description: "Isolated local containers for safe experiments", href: "https://www.docker.com/" },
  { name: "Modal", description: "Serverless GPU compute for burst training and inference", href: "https://modal.com/" },
  { name: "RunPod", description: "Persistent GPU pods with SSH access for long-running runs", href: "https://www.runpod.io/" },
];

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const installCommand = "curl -fsSL https://bohr-ai.internal/install | bash";

  const scrollExamples = (dir: -1 | 1) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.92));
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installCommand);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed left-0 right-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 lg:px-6">
        <div className="flex h-14 w-full items-center justify-between gap-4 rounded-xl bg-black/45 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-6">
          <Link href="/" className="font-mono text-2xl text-white">
            bohr ai
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/docs/getting-started/installation" className="text-sm text-zinc-400 hover:text-zinc-100">
              Docs
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full px-4 pt-20 sm:px-6 lg:px-10 2xl:px-16">
        <section className="w-full pb-16 pt-16 sm:pt-20">
          <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6 text-left">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Private Research Infrastructure</p>
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Bohr AI for serious research teams
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Run source-grounded research workflows with structured analysis, reproducible outputs, and agent-driven verification.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/docs/getting-started/installation"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-medium text-black transition hover:bg-zinc-200"
                >
                  Get Started
                </Link>
                <Link
                  href="/docs/getting-started/installation"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm font-medium text-white transition hover:bg-zinc-900"
                >
                  View Docs
                </Link>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
              <button
                onClick={copyInstall}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-700 bg-black px-4 py-3 text-left font-mono text-sm text-zinc-200 hover:bg-zinc-950"
              >
                <span className="truncate">{installCommand}</span>
                <span className="text-zinc-400">Copy</span>
              </button>
              <div className="mt-4 grid gap-2 text-sm text-zinc-400">
                <p>Private deployment configured for internal teams.</p>
                <p>Every workflow is designed for evidence-first outputs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="flex flex-col items-center gap-10 text-center">
            <div className="flex max-w-3xl flex-col gap-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you ask → what Bohr delivers</h2>
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">Real-world requests with concrete, source-grounded outputs.</p>
            </div>
            <div className="w-full max-w-6xl text-left">
              <div className="mb-4 flex items-center justify-end gap-2">
                <button onClick={() => scrollExamples(-1)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">←</button>
                <button onClick={() => scrollExamples(1)} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100">→</button>
              </div>
              <div ref={carouselRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                {scenarioExamples.map((example) => (
                  <article key={example.title} className="h-full min-w-[88%] snap-start rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:min-w-[70%] lg:min-w-[48%]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{example.audience}</p>
                    <h3 className="mt-3 text-lg leading-snug">{example.title}</h3>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Example command</p>
                    <p className="mt-2 rounded-md border border-zinc-700 bg-black px-3 py-2 font-mono text-sm leading-relaxed text-zinc-200">{example.command}</p>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">{example.outcome}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Research &amp; Review Templates</h2>
              <p className="text-zinc-400">Step-by-step command paths users can run one-by-one.</p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {templates.map((tpl) => (
                <article key={tpl.name} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-left">
                  <h3 className="font-semibold text-zinc-100">{tpl.name}</h3>
                  <div className="mt-3 space-y-2">
                    {tpl.steps.map((step) => (
                      <p key={step} className="rounded-md border border-zinc-700 bg-black px-3 py-2 font-mono text-xs text-zinc-200">
                        {step}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-zinc-400">{tpl.output}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Workflows</h2>
              <p className="text-zinc-400">Slash commands or natural language. Your call.</p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {workflows.map((wf) => (
                <article key={wf.command} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-left">
                  <h3 className="font-mono text-sm text-zinc-100">{wf.command}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{wf.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Agents</h2>
              <p className="text-zinc-400">You ask a question. The right team assembles.</p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {agents.map((agent) => (
                <article key={agent.name} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{agent.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Skills &amp; Tools</h2>
              <p className="text-zinc-400">How Bohr AI searches, remembers, and exports work.</p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {sources.map((source) => (
                <article key={source.name} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
                  <h3 className="font-semibold">
                    {source.href ? (
                      <a href={source.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {source.name}
                      </a>
                    ) : (
                      source.name
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{source.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Compute</h2>
              <p className="text-zinc-400">Run experiments locally or burst onto managed GPU infrastructure when needed.</p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {compute.map((provider) => (
                <article key={provider.name} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
                  <h3 className="font-semibold">
                    <a href={provider.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {provider.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{provider.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
