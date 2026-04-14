import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";

export function getBohrHome(): string {
	if (process.env.BOHR_HOME?.trim()) {
		return resolve(process.env.BOHR_HOME.trim());
	}
	return resolve(homedir(), ".bohr");
}

export function getBohrAgentDir(home = getBohrHome()): string {
	return resolve(home, "agent");
}

export function getBohrMemoryDir(home = getBohrHome()): string {
	return resolve(home, "memory");
}

export function getBohrStateDir(home = getBohrHome()): string {
	return resolve(home, ".state");
}

export function getDefaultSessionDir(home = getBohrHome()): string {
	return resolve(home, "sessions");
}

export function getBootstrapStatePath(home = getBohrHome()): string {
	return resolve(getBohrStateDir(home), "bootstrap.json");
}

export function ensureBohrHome(home = getBohrHome()): void {
	for (const dir of [
		home,
		getBohrAgentDir(home),
		getBohrMemoryDir(home),
		getBohrStateDir(home),
		getDefaultSessionDir(home),
	]) {
		mkdirSync(dir, { recursive: true });
	}
}
