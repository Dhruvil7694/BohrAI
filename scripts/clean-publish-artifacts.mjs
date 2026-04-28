import { rmSync } from "node:fs";
import { resolve } from "node:path";

const appRoot = resolve(import.meta.dirname, "..");

const dirsToClean = [
  resolve(appRoot, "dist", "release"),
  resolve(appRoot, "dist", "release-smoke"),
  resolve(appRoot, "dist", "openai-smoke-home"),
  resolve(appRoot, "dist", "openai-workflow-home"),
  resolve(appRoot, "dist", "paper-pro-home"),
  resolve(appRoot, "dist", "validation-bohr-home"),
  resolve(appRoot, "dist", "validation-bohr-home-live"),
];

for (const dir of dirsToClean) {
  rmSync(dir, { recursive: true, force: true });
}
console.log("[bohr] removed dist test/release artifacts before npm pack/publish");
