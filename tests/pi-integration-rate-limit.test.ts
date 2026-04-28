import test from "node:test";
import assert from "node:assert/strict";

import { resolveSubagentConcurrency } from "../src/paper-generator/pi-integration.js";

function withEnv(env: Record<string, string | undefined>, fn: () => void) {
	const previous = new Map<string, string | undefined>();
	for (const [key, value] of Object.entries(env)) {
		previous.set(key, process.env[key]);
		if (value === undefined) {
			delete process.env[key];
		} else {
			process.env[key] = value;
		}
	}

	try {
		fn();
	} finally {
		for (const [key, value] of previous.entries()) {
			if (value === undefined) {
				delete process.env[key];
			} else {
				process.env[key] = value;
			}
		}
	}
}

test("resolveSubagentConcurrency defaults to two concurrent subagents", () => {
	withEnv(
		{
			BOHR_SUBAGENT_CONCURRENCY: undefined,
			BOHR_RATE_LIMIT_MODE: undefined,
		},
		() => {
			assert.equal(resolveSubagentConcurrency(), 2);
		},
	);
});

test("resolveSubagentConcurrency uses rate-limit mode as a one-at-a-time default", () => {
	withEnv(
		{
			BOHR_SUBAGENT_CONCURRENCY: undefined,
			BOHR_RATE_LIMIT_MODE: "true",
		},
		() => {
			assert.equal(resolveSubagentConcurrency(4), 1);
		},
	);
});

test("resolveSubagentConcurrency lets explicit env concurrency override requested batches", () => {
	withEnv(
		{
			BOHR_SUBAGENT_CONCURRENCY: "3",
			BOHR_RATE_LIMIT_MODE: "true",
		},
		() => {
			assert.equal(resolveSubagentConcurrency(4), 3);
		},
	);
});

test("resolveSubagentConcurrency ignores invalid env values", () => {
	withEnv(
		{
			BOHR_SUBAGENT_CONCURRENCY: "many",
			BOHR_RATE_LIMIT_MODE: undefined,
		},
		() => {
			assert.equal(resolveSubagentConcurrency(5), 5);
		},
	);
});
