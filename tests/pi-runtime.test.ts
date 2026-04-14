import test from "node:test";
import assert from "node:assert/strict";
import { delimiter, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { applyBohrPackageManagerEnv, buildPiArgs, buildPiEnv, resolvePiPaths, toNodeImportSpecifier } from "../src/pi/runtime.js";

test("buildPiArgs includes configured runtime paths and prompt", () => {
	const args = buildPiArgs({
		appRoot: "/repo/bohr",
		workingDir: "/workspace",
		sessionDir: "/sessions",
		bohrAgentDir: "/home/.bohr/agent",
		mode: "rpc",
		initialPrompt: "hello",
		explicitModelSpec: "openai:gpt-5.4",
		thinkingLevel: "medium",
	});

	assert.deepEqual(args, [
		"--session-dir",
		"/sessions",
		"--extension",
		resolve("/repo/bohr/extensions/research-tools.ts"),
		"--prompt-template",
		resolve("/repo/bohr/prompts"),
		"--mode",
		"rpc",
		"--model",
		"openai:gpt-5.4",
		"--thinking",
		"medium",
		"hello",
	]);
});

test("buildPiEnv wires Bohr paths into the Pi environment", () => {
	const previousUppercasePrefix = process.env.NPM_CONFIG_PREFIX;
	const previousLowercasePrefix = process.env.npm_config_prefix;
	process.env.NPM_CONFIG_PREFIX = "/tmp/global-prefix";
	process.env.npm_config_prefix = "/tmp/global-prefix-lower";

	const env = buildPiEnv({
		appRoot: "/repo/bohr",
		workingDir: "/workspace",
		sessionDir: "/sessions",
		bohrAgentDir: "/home/.bohr/agent",
		bohrVersion: "0.1.5",
	});

	try {
		assert.equal(env.BOHR_SESSION_DIR, "/sessions");
		assert.equal(env.BOHR_BIN_PATH, resolve("/repo/bohr/bin/bohr.js"));
		assert.equal(env.BOHR_MEMORY_DIR, resolve("/home/.bohr/memory"));
		assert.equal(env.BOHR_NPM_PREFIX, resolve("/home/.bohr/npm-global"));
		assert.equal(env.NPM_CONFIG_PREFIX, resolve("/home/.bohr/npm-global"));
		assert.equal(env.npm_config_prefix, resolve("/home/.bohr/npm-global"));
		assert.equal(env.PI_CODING_AGENT_DIR, "/home/.bohr/agent");
		assert.ok(
			env.PATH?.startsWith(
				[
					resolve("/repo/bohr/node_modules/.bin"),
					resolve("/repo/bohr/.bohr/npm/node_modules/.bin"),
					resolve("/home/.bohr/npm-global/bin"),
				].join(delimiter) + delimiter,
			),
		);
	} finally {
		if (previousUppercasePrefix === undefined) {
			delete process.env.NPM_CONFIG_PREFIX;
		} else {
			process.env.NPM_CONFIG_PREFIX = previousUppercasePrefix;
		}
		if (previousLowercasePrefix === undefined) {
			delete process.env.npm_config_prefix;
		} else {
			process.env.npm_config_prefix = previousLowercasePrefix;
		}
	}
});

test("applyBohrPackageManagerEnv pins npm globals to the Bohr prefix", () => {
	const previousBohrPrefix = process.env.BOHR_NPM_PREFIX;
	const previousUppercasePrefix = process.env.NPM_CONFIG_PREFIX;
	const previousLowercasePrefix = process.env.npm_config_prefix;

	try {
		const prefix = applyBohrPackageManagerEnv("/home/.bohr/agent");

		assert.equal(prefix, resolve("/home/.bohr/npm-global"));
		assert.equal(process.env.BOHR_NPM_PREFIX, resolve("/home/.bohr/npm-global"));
		assert.equal(process.env.NPM_CONFIG_PREFIX, resolve("/home/.bohr/npm-global"));
		assert.equal(process.env.npm_config_prefix, resolve("/home/.bohr/npm-global"));
	} finally {
		if (previousBohrPrefix === undefined) {
			delete process.env.BOHR_NPM_PREFIX;
		} else {
			process.env.BOHR_NPM_PREFIX = previousBohrPrefix;
		}
		if (previousUppercasePrefix === undefined) {
			delete process.env.NPM_CONFIG_PREFIX;
		} else {
			process.env.NPM_CONFIG_PREFIX = previousUppercasePrefix;
		}
		if (previousLowercasePrefix === undefined) {
			delete process.env.npm_config_prefix;
		} else {
			process.env.npm_config_prefix = previousLowercasePrefix;
		}
	}
});

test("resolvePiPaths includes the Promise.withResolvers polyfill path", () => {
	const paths = resolvePiPaths("/repo/bohr");

	assert.equal(paths.promisePolyfillPath, resolve("/repo/bohr/dist/system/promise-polyfill.js"));
});

test("toNodeImportSpecifier converts absolute preload paths to file URLs", () => {
	assert.equal(
		toNodeImportSpecifier("/repo/bohr/dist/system/promise-polyfill.js"),
		pathToFileURL("/repo/bohr/dist/system/promise-polyfill.js").href,
	);
	assert.equal(toNodeImportSpecifier("tsx"), "tsx");
});
