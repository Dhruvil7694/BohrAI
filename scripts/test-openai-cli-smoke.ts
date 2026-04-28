import "dotenv/config";

import { mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type CommandResult = {
  args: string[];
  status: number | null;
  stdout: string;
  stderr: string;
  error?: string;
};

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const bohrEntry = resolve(repoRoot, "bin", "bohr.js");
const smokeHome = resolve(repoRoot, "dist", "openai-smoke-home");

mkdirSync(smokeHome, { recursive: true });

function runBohr(args: string[], timeoutMs = 180_000): CommandResult {
  const result = spawnSync(process.execPath, [bohrEntry, ...args], {
    cwd: repoRoot,
    env: {
      ...process.env,
      BOHR_HOME: smokeHome,
    },
    encoding: "utf8",
    timeout: timeoutMs,
  });

  return {
    args,
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    error: result.error?.message,
  };
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function summarize(result: CommandResult): void {
  console.log(`\n> bohr ${result.args.join(" ")}`);
  console.log(`status: ${result.status ?? "null"}`);
  if (result.error) {
    console.log(`error: ${result.error}`);
  }
  if (result.stdout.trim()) {
    console.log("\nstdout:");
    console.log(result.stdout.trim());
  }
  if (result.stderr.trim()) {
    console.log("\nstderr:");
    console.log(result.stderr.trim());
  }
}

function extractOpenAiModels(output: string): string[] {
  const matches = output.match(/openai\/[A-Za-z0-9._:-]+/g) ?? [];
  return Array.from(new Set(matches));
}

function chooseModel(models: string[]): string | undefined {
  const preferred = [
    "openai/gpt-5.4",
    "openai/gpt-5",
    "openai/gpt-4.1",
    "openai/gpt-4o",
    "openai/gpt-4.1-mini",
  ];

  for (const spec of preferred) {
    if (models.includes(spec)) return spec;
  }
  return models[0];
}

async function main(): Promise<void> {
  console.log("Bohr OpenAI CLI smoke test");
  console.log(`repo: ${repoRoot}`);
  console.log(`BOHR_HOME: ${smokeHome}`);
  console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? "set" : "missing"}`);

  if (!process.env.OPENAI_API_KEY) {
    fail("OPENAI_API_KEY is missing. Aborting smoke test.");
  }

  const modelList = runBohr(["model", "list"]);
  summarize(modelList);

  if (modelList.status !== 0) {
    fail("`bohr model list` failed.");
  }

  const openAiModels = extractOpenAiModels(modelList.stdout);
  console.log(`\nDetected OpenAI models: ${openAiModels.length}`);
  if (openAiModels.length === 0) {
    fail("No OpenAI models were exposed by `bohr model list`.");
  }

  const selectedModel = chooseModel(openAiModels);
  if (!selectedModel) {
    fail("Unable to choose an OpenAI model.");
  }
  console.log(`Selected model: ${selectedModel}`);

  const readyPrompt = runBohr([
    "--model",
    selectedModel,
    "--prompt",
    "Reply with exactly READY.",
  ]);
  summarize(readyPrompt);

  const researchPrompt = runBohr(
    [
      "--model",
      selectedModel,
      "--prompt",
      "Write exactly 3 short bullets on why citation verification matters in research. No web search. No tools. Keep total output under 60 words.",
    ],
    240_000,
  );
  summarize(researchPrompt);

  const readyOk = /\bREADY\b/.test(readyPrompt.stdout);
  const researchBullets = (researchPrompt.stdout.match(/^\s*[-*]/gm) ?? []).length;

  console.log("\nAnalysis");
  console.log(`ready prompt returned READY: ${readyOk ? "yes" : "no"}`);
  console.log(`research prompt bullet count: ${researchBullets}`);

  if (readyPrompt.status !== 0 || !readyOk) {
    fail("The base one-shot OpenAI prompt did not complete successfully.");
  }

  if (researchPrompt.status !== 0 || researchBullets < 3) {
    fail("The research-style one-shot prompt did not produce the expected structure.");
  }

  console.log("\nSmoke test passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
