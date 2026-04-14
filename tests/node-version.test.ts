import test from "node:test";
import assert from "node:assert/strict";

import {
	MIN_NODE_VERSION,
	ensureSupportedNodeVersion,
	getUnsupportedNodeVersionLines,
	isSupportedNodeVersion,
} from "../src/system/node-version.js";

test("isSupportedNodeVersion enforces the exact minimum floor", () => {
	assert.equal(isSupportedNodeVersion("20.19.0"), true);
	assert.equal(isSupportedNodeVersion("20.19.0"), true);
	assert.equal(isSupportedNodeVersion("21.0.0"), true);
	assert.equal(isSupportedNodeVersion("20.18.1"), false);
	assert.equal(isSupportedNodeVersion("18.17.0"), false);
});

test("ensureSupportedNodeVersion throws a guided upgrade message", () => {
	const isWindows = process.platform === "win32";
	assert.throws(
		() => ensureSupportedNodeVersion("18.17.0"),
		(error: unknown) =>
			error instanceof Error &&
			error.message.includes(`Node.js ${MIN_NODE_VERSION}`) &&
			error.message.includes(isWindows ? "Install a newer Node.js from https://nodejs.org" : "nvm install 20 && nvm use 20") &&
			error.message.includes(isWindows ? "https://bohr-ai.internal/install.ps1" : "https://bohr-ai.internal/install"),
	);
});

test("unsupported version guidance reports the detected version", () => {
	const lines = getUnsupportedNodeVersionLines("18.17.0");
	const isWindows = process.platform === "win32";

	assert.equal(lines[0], "bohr requires Node.js 20.19.0 or later (detected 18.17.0).");
	assert.ok(
		lines.some((line) =>
			line.includes(isWindows ? "irm https://bohr-ai.internal/install.ps1 | iex" : "curl -fsSL https://bohr-ai.internal/install | bash"),
		),
	);
});
