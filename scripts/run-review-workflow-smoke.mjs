import "dotenv/config";

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const bohrEntry = resolve(repoRoot, "bin", "bohr.js");
const bohrHome = resolve(repoRoot, "dist", "openai-workflow-home");
const transcriptPath = resolve(repoRoot, "notes", "agent-quality-workflow-session.txt");
const outputPath = resolve(repoRoot, "outputs", "agent-quality-target-review.md");
const artifactPath = resolve(repoRoot, "outputs", "agent-quality-target.md");

mkdirSync(bohrHome, { recursive: true });

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is missing.");
  process.exit(1);
}

if (!existsSync(artifactPath)) {
  console.error(`Artifact not found: ${artifactPath}`);
  process.exit(1);
}

const transcript = [];
const command = `/review outputs/agent-quality-target.md`;
const timeoutMs = 240_000;
const startedAt = Date.now();
let finalized = false;

function append(prefix, chunk) {
  const text = chunk.toString();
  transcript.push(`${prefix}${text}`);
  writeFileSync(transcriptPath, transcript.join(""), "utf8");
  process.stdout.write(`${prefix}${text}`);
}

function finalize(code) {
  if (finalized) return;
  finalized = true;
  writeFileSync(transcriptPath, transcript.join(""), "utf8");
  console.log(`\nTranscript saved to ${transcriptPath}`);
  if (existsSync(outputPath)) {
    console.log(`Workflow output found at ${outputPath}`);
    const preview = readFileSync(outputPath, "utf8").split(/\r?\n/).slice(0, 60).join("\n");
    console.log("\n=== Review Preview ===\n");
    console.log(preview);
  } else {
    console.log(`Workflow output missing: ${outputPath}`);
  }
  process.exit(code);
}

const child = spawn(process.execPath, [bohrEntry, "--model", "openai/gpt-5.4"], {
  cwd: repoRoot,
  env: {
    ...process.env,
    BOHR_HOME: bohrHome,
  },
  stdio: ["pipe", "pipe", "pipe"],
});

child.stdout.on("data", (chunk) => append("", chunk));
child.stderr.on("data", (chunk) => append("[stderr] ", chunk));
child.on("error", (error) => {
  console.error(error);
  finalize(1);
});
child.on("exit", (code) => finalize(code ?? 0));

setTimeout(() => {
  child.stdin.write(`${command}\n`);
}, 2000);

const poll = setInterval(() => {
  if (existsSync(outputPath)) {
    clearInterval(poll);
    child.stdin.write("/exit\n");
    setTimeout(() => {
      child.kill();
    }, 10_000);
    return;
  }

  if (Date.now() - startedAt > timeoutMs) {
    clearInterval(poll);
    append("", "\n[runner] Workflow timeout reached, sending /exit.\n");
    child.stdin.write("/exit\n");
    setTimeout(() => {
      append("", "[runner] Forcing process exit after timeout.\n");
      child.kill();
    }, 10_000);
  }
}, 5000);
