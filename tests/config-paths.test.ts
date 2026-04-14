import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import {
	ensureBohrHome,
	getBootstrapStatePath,
	getBohrAgentDir,
	getBohrHome,
	getBohrMemoryDir,
	getBohrStateDir,
	getDefaultSessionDir,
} from "../src/config/paths.js";

test("getBohrHome uses BOHR_HOME env var when set", () => {
	const previous = process.env.BOHR_HOME;
	try {
		process.env.BOHR_HOME = "/custom/home";
		assert.equal(getBohrHome(), resolve("/custom/home"));
	} finally {
		if (previous === undefined) {
			delete process.env.BOHR_HOME;
		} else {
			process.env.BOHR_HOME = previous;
		}
	}
});

test("getBohrHome falls back to homedir when BOHR_HOME is unset", () => {
	const previous = process.env.BOHR_HOME;
	try {
		delete process.env.BOHR_HOME;
		const home = getBohrHome();
		assert.ok(home.endsWith(".bohr"), `expected path ending in .bohr, got: ${home}`);
		assert.ok(!home.includes("undefined"), `expected no 'undefined' in path, got: ${home}`);
	} finally {
		if (previous === undefined) {
			delete process.env.BOHR_HOME;
		} else {
			process.env.BOHR_HOME = previous;
		}
	}
});

test("getBohrAgentDir resolves to <home>/agent", () => {
	assert.equal(getBohrAgentDir("/some/home"), resolve("/some/home", "agent"));
});

test("getBohrMemoryDir resolves to <home>/memory", () => {
	assert.equal(getBohrMemoryDir("/some/home"), resolve("/some/home", "memory"));
});

test("getBohrStateDir resolves to <home>/.state", () => {
	assert.equal(getBohrStateDir("/some/home"), resolve("/some/home", ".state"));
});

test("getDefaultSessionDir resolves to <home>/sessions", () => {
	assert.equal(getDefaultSessionDir("/some/home"), resolve("/some/home", "sessions"));
});

test("getBootstrapStatePath resolves to <home>/.state/bootstrap.json", () => {
	assert.equal(getBootstrapStatePath("/some/home"), resolve("/some/home", ".state", "bootstrap.json"));
});

test("ensureBohrHome creates all required subdirectories", () => {
	const root = mkdtempSync(join(tmpdir(), "bohr-paths-"));
	try {
		const home = join(root, "home");
		ensureBohrHome(home);

		assert.ok(existsSync(home), "home dir should exist");
		assert.ok(existsSync(join(home, "agent")), "agent dir should exist");
		assert.ok(existsSync(join(home, "memory")), "memory dir should exist");
		assert.ok(existsSync(join(home, ".state")), ".state dir should exist");
		assert.ok(existsSync(join(home, "sessions")), "sessions dir should exist");
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});

test("ensureBohrHome is idempotent when dirs already exist", () => {
	const root = mkdtempSync(join(tmpdir(), "bohr-paths-"));
	try {
		const home = join(root, "home");
		ensureBohrHome(home);
		assert.doesNotThrow(() => ensureBohrHome(home));
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});
