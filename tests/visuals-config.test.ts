import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import {
	DEFAULT_GEMINI_IMAGE_MODEL,
	DEFAULT_OPENAI_IMAGE_MODEL,
	clearVisualProvider,
	getBohrVisualConfigPath,
	getVisualConfigStatus,
	loadVisualConfig,
	saveVisualConfig,
	setDefaultVisualProvider,
	setVisualProviderKey,
} from "../src/visuals/config.js";

test("getBohrVisualConfigPath respects BOHR_HOME semantics", () => {
	assert.equal(getBohrVisualConfigPath("/tmp/custom-home"), resolve("/tmp/custom-home/visuals.json"));
});

test("visual config saves provider keys without exposing them in status lines", () => {
	const root = mkdtempSync(join(tmpdir(), "bohr-visuals-"));
	const configPath = getBohrVisualConfigPath(root);

	setVisualProviderKey("gemini", "gemini-secret-value", configPath);
	setDefaultVisualProvider("gemini", "gemini-3-pro-image-preview", configPath);

	const config = loadVisualConfig(configPath);
	assert.equal(config.geminiApiKey, "gemini-secret-value");
	assert.equal(config.defaultProvider, "gemini");
	assert.equal(config.geminiModel, "gemini-3-pro-image-preview");

	const status = getVisualConfigStatus(config, configPath, {});
	assert.equal(status.geminiConfigured, true);
	assert.equal(status.openaiConfigured, false);
	assert.equal(status.defaultProvider, "gemini");
	assert.equal(status.defaultModel, "gemini-3-pro-image-preview");
	assert.ok(status.lines.every((line) => !line.includes("gemini-secret-value")));
});

test("visual config status uses env var fallback without writing it to disk", () => {
	const root = mkdtempSync(join(tmpdir(), "bohr-visuals-"));
	const configPath = getBohrVisualConfigPath(root);
	saveVisualConfig({ defaultProvider: "openai" }, configPath);

	const status = getVisualConfigStatus(loadVisualConfig(configPath), configPath, {
		OPENAI_API_KEY: "openai-env-secret",
	});

	assert.equal(status.openaiConfigured, true);
	assert.equal(status.defaultProvider, "openai");
	assert.equal(status.defaultModel, DEFAULT_OPENAI_IMAGE_MODEL);
	assert.deepEqual(loadVisualConfig(configPath), { defaultProvider: "openai" });
	assert.ok(status.lines.every((line) => !line.includes("openai-env-secret")));
});

test("visual config rejects unknown providers and can clear one provider", () => {
	const root = mkdtempSync(join(tmpdir(), "bohr-visuals-"));
	const configPath = getBohrVisualConfigPath(root);

	assert.throws(() => setVisualProviderKey("stability" as never, "key", configPath), /Unknown visual provider/);

	setVisualProviderKey("gemini", "gemini-secret", configPath);
	setVisualProviderKey("openai", "openai-secret", configPath);
	clearVisualProvider("gemini", configPath);

	assert.deepEqual(loadVisualConfig(configPath), {
		openaiApiKey: "openai-secret",
	});
});

test("visual defaults choose Gemini Nano Banana unless a provider is configured", () => {
	const status = getVisualConfigStatus({}, "/tmp/visuals.json", {});

	assert.equal(status.defaultProvider, "gemini");
	assert.equal(status.defaultModel, DEFAULT_GEMINI_IMAGE_MODEL);
	assert.equal(status.geminiConfigured, false);
	assert.equal(status.openaiConfigured, false);
});

test("visual defaults can come from environment when config is unset", () => {
	const status = getVisualConfigStatus({}, "/tmp/visuals.json", {
		BOHR_VISUAL_DEFAULT_PROVIDER: "openai",
		BOHR_VISUAL_DEFAULT_MODEL: "gpt-image-custom",
	});

	assert.equal(status.defaultProvider, "openai");
	assert.equal(status.defaultModel, "gpt-image-custom");
});
