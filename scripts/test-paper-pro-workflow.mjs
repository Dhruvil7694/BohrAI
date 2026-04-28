import "dotenv/config";

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const bohrEntry = resolve(repoRoot, "bin", "bohr.js");
const bohrHome = resolve(repoRoot, "dist", "paper-pro-home");
const slug = process.env.PAPER_PRO_TEST_SLUG ?? "citation-verification-proof";
const transcriptPath = resolve(repoRoot, "notes", `${slug}-paper-pro-session.txt`);
const paperPath = resolve(repoRoot, "papers", `${slug}.md`);
const provenancePath = resolve(repoRoot, "papers", `${slug}.provenance.md`);
const architecturePath = resolve(repoRoot, "outputs", ".plans", `${slug}-architecture.md`);
const planPath = resolve(repoRoot, "outputs", ".plans", `${slug}-paper-pro.md`);
const draftPath = resolve(repoRoot, "papers", `${slug}-draft.md`);
const citationPath = resolve(repoRoot, "papers", `${slug}-citation-integrity.md`);
const reviewPath = resolve(repoRoot, "papers", `${slug}-review.md`);
const verificationPath = resolve(repoRoot, "notes", `${slug}-verification.md`);
const compliancePath = resolve(repoRoot, "papers", `${slug}-compliance.md`);
const artifactsDir = resolve(bohrHome, "sessions", "subagent-artifacts");

const prompt =
  `/paper-pro notes/citation-verification-research-notes.md. Use slug ${slug}. Primary local evidence files are notes/citation-verification-research-notes.md, notes/citation-verification-research-verified-excerpts.md, and notes/citation-verification-research-verification.md. Do not reuse draft, review, citation, compliance, or provenance artifacts from any other slug. Create fresh architecture, draft, citation-integrity, review, and compliance artifacts for this slug before finalizing.`;

mkdirSync(bohrHome, { recursive: true });

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is missing.");
  process.exit(1);
}

for (const path of [
  planPath,
  architecturePath,
  draftPath,
  citationPath,
  reviewPath,
  verificationPath,
  compliancePath,
  paperPath,
  provenancePath,
  transcriptPath,
]) {
  if (existsSync(path)) {
    rmSync(path, { force: true });
  }
}

const models = ["openai/gpt-5.4", "openai/gpt-5-mini", "openai/gpt-4.1"];
const transcriptChunks = [];
let result = null;
const startedAt = Date.now();

for (const model of models) {
  const attempt = spawnSync(process.execPath, [bohrEntry, "--model", model, "--prompt", prompt], {
    cwd: repoRoot,
    env: {
      ...process.env,
      BOHR_HOME: bohrHome,
      CAVEMAN_MODE_DEFAULT: process.env.CAVEMAN_MODE_DEFAULT ?? "full",
      ENABLE_TOKEN_OPTIMIZATION: process.env.ENABLE_TOKEN_OPTIMIZATION ?? "true",
    },
    encoding: "utf8",
    timeout: 900_000,
  });

  transcriptChunks.push(
    [
      `command: node ${bohrEntry} --model ${model} --prompt "${prompt}"`,
      `status: ${attempt.status ?? "null"}`,
      "",
      "stdout:",
      attempt.stdout ?? "",
      "",
      "stderr:",
      attempt.stderr ?? "",
      "",
      "-----",
      "",
    ].join("\n"),
  );

  if (attempt.error) {
    result = attempt;
    break;
  }

  if (attempt.status === 0 && existsSync(paperPath) && existsSync(provenancePath)) {
    result = attempt;
    break;
  }

  result = attempt;
}

const transcript = transcriptChunks.join("");

writeFileSync(transcriptPath, transcript, "utf8");

console.log(`Transcript: ${transcriptPath}`);

if (result?.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (!result || result.status !== 0) {
  console.error("Workflow command exited non-zero.");
  process.exit(result?.status ?? 1);
}

if (!existsSync(paperPath)) {
  console.error(`Missing final paper: ${paperPath}`);
  process.exit(1);
}

if (!existsSync(provenancePath)) {
  console.error(`Missing provenance file: ${provenancePath}`);
  process.exit(1);
}

const requiredArtifacts = [
  planPath,
  architecturePath,
  draftPath,
  citationPath,
  reviewPath,
  verificationPath,
  compliancePath,
  paperPath,
  provenancePath,
];

for (const artifactPath of requiredArtifacts) {
  if (!existsSync(artifactPath)) {
    console.error(`Missing required artifact: ${artifactPath}`);
    process.exit(1);
  }
  const content = readFileSync(artifactPath, "utf8");
  if (content.trim().length === 0) {
    console.error(`Artifact is blank: ${artifactPath}`);
    process.exit(1);
  }
}

const paper = readFileSync(paperPath, "utf8");
const provenance = readFileSync(provenancePath, "utf8");
const requiredSections = [
  "Abstract",
  "Introduction",
  "Related Work",
  "Method",
  "Evidence",
  "Discussion",
  "Limitations",
  "Conclusion",
];

const missing = requiredSections.filter((section) => {
  const pattern = new RegExp(`^#{1,6}\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m");
  return !pattern.test(paper);
});
if (missing.length > 0) {
  console.error(`Paper is missing required sections: ${missing.join(", ")}`);
  process.exit(1);
}

if (/(blank target|blank file|manual restoration|restored manually|quota-exhausted)/i.test(provenance)) {
  console.error("Provenance still reports the old reliability caveat.");
  process.exit(1);
}

const requiredAgents = new Set([
  "paper-architect",
  "writer",
  "citation-integrity",
  "reviewer",
  "verifier",
  "paper-compliance",
]);

const seenAgents = new Map();
for (const entry of readdirSync(artifactsDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith("_meta.json")) continue;
  const metaPath = resolve(artifactsDir, entry.name);
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  if (typeof meta.timestamp !== "number" || meta.timestamp < startedAt) continue;
  if (typeof meta.task !== "string" || !meta.task.includes(slug)) continue;
  if (!requiredAgents.has(meta.agent)) continue;

  if (meta.exitCode !== 0) {
    console.error(`Subagent failed: ${meta.agent} (${metaPath})`);
    process.exit(1);
  }
  if (meta.error) {
    console.error(`Subagent reported an error despite zero exit: ${meta.agent} (${metaPath})`);
    process.exit(1);
  }
  if (typeof meta.model !== "string" || !meta.model.startsWith("openai/")) {
    console.error(`Subagent did not inherit the active OpenAI model: ${meta.agent} -> ${meta.model ?? "missing"}`);
    process.exit(1);
  }
  seenAgents.set(meta.agent, meta);
}

const missingAgents = [...requiredAgents].filter((agent) => !seenAgents.has(agent));
if (missingAgents.length > 0) {
  console.error(`Missing subagent telemetry for: ${missingAgents.join(", ")}`);
  process.exit(1);
}

const totals = [...seenAgents.values()].reduce(
  (acc, meta) => {
    acc.input += Number(meta.usage?.input ?? 0);
    acc.output += Number(meta.usage?.output ?? 0);
    acc.cost += Number(meta.usage?.cost ?? 0);
    return acc;
  },
  { input: 0, output: 0, cost: 0 },
);

console.log(`Paper generated: ${paperPath}`);
console.log(`Provenance generated: ${provenancePath}`);
console.log(`Subagent telemetry: input=${totals.input}, output=${totals.output}, cost=${totals.cost.toFixed(5)}`);
console.log("Paper-pro workflow validation passed.");
