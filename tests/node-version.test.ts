import test from "node:test";
import assert from "node:assert/strict";

import {
	MIN_NODE_VERSION,
	ensureSupportedNodeVersion,
	getUnsupportedNodeVersionLines,
	isSupportedNodeVersion,
} from "../src/system/node-version.js";

function withEnv<T>(
	updates: Partial<Record<"BOHR_INSTALL_SCRIPT_URL" | "BOHR_INSTALL_PS1_URL", string | undefined>>,
	run: () => T,
): T {
	const previous = {
		BOHR_INSTALL_SCRIPT_URL: process.env.BOHR_INSTALL_SCRIPT_URL,
		BOHR_INSTALL_PS1_URL: process.env.BOHR_INSTALL_PS1_URL,
	};

	for (const [key, value] of Object.entries(updates)) {
		if (value === undefined) {
			delete process.env[key];
		} else {
			process.env[key] = value;
		}
	}

	try {
		return run();
	} finally {
		for (const [key, value] of Object.entries(previous)) {
			if (value === undefined) {
				delete process.env[key];
			} else {
				process.env[key] = value;
			}
		}
	}
}

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
			error.message.includes(
				isWindows
					? "https://raw.githubusercontent.com/Dhruvil7694/BohrAI/main/website/public/install.ps1"
					: "https://raw.githubusercontent.com/Dhruvil7694/BohrAI/main/website/public/install",
			),
	);
});

test("unsupported version guidance reports the detected version", () => {
	const lines = getUnsupportedNodeVersionLines("18.17.0");
	const isWindows = process.platform === "win32";

	assert.equal(lines[0], "bohr requires Node.js 20.19.0 or later (detected 18.17.0).");
	assert.ok(
		lines.some((line) =>
			line.includes(
				isWindows
					? "irm https://raw.githubusercontent.com/Dhruvil7694/BohrAI/main/website/public/install.ps1 | iex"
					: "curl -fsSL https://raw.githubusercontent.com/Dhruvil7694/BohrAI/main/website/public/install | bash",
			),
		),
	);
});

test("unsupported version guidance respects explicit installer URL overrides", () => {
	const isWindows = process.platform === "win32";
	const lines = withEnv(
		{
			BOHR_INSTALL_SCRIPT_URL: "https://bohr-ai.internal/install",
			BOHR_INSTALL_PS1_URL: "https://bohr-ai.internal/install.ps1",
		},
		() => getUnsupportedNodeVersionLines("18.17.0"),
	);

	assert.ok(
		lines.some((line) =>
			line.includes(
				isWindows ? "irm https://bohr-ai.internal/install.ps1 | iex" : "curl -fsSL https://bohr-ai.internal/install | bash",
			),
		),
	);
});
