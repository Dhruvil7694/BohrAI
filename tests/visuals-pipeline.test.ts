import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
	buildComparisonTable,
	createVisualsWorkflowArtifacts,
	renderBarChartSvg,
} from "../src/visuals/pipeline.js";

const sampleRows = [
	{ label: "Alpha", value: 12, source: "https://example.com/a", notes: "Public estimate" },
	{ label: "Beta", value: 8, source: "https://example.com/b", notes: "Vendor filing" },
];

test("buildComparisonTable keeps source links with factual table rows", () => {
	const table = buildComparisonTable(sampleRows, "Share");

	assert.match(table, /\| Item \| Share \| Source \| Notes \|/);
	assert.match(table, /\| Alpha \| 12 \| https:\/\/example\.com\/a \| Public estimate \|/);
	assert.match(table, /\| Beta \| 8 \| https:\/\/example\.com\/b \| Vendor filing \|/);
});

test("renderBarChartSvg renders deterministic data-backed SVG without image model prompts", () => {
	const svg = renderBarChartSvg(sampleRows, {
		title: "AI agent market comparison",
		valueLabel: "Share",
	});

	assert.match(svg, /<svg/);
	assert.match(svg, /AI agent market comparison/);
	assert.match(svg, /Alpha/);
	assert.match(svg, /Beta/);
	assert.ok(!svg.includes("prompt"));
});

test("createVisualsWorkflowArtifacts writes report, provenance, manifest, CSV, JSON, and SVG assets", () => {
	const root = mkdtempSync(join(tmpdir(), "bohr-visuals-workflow-"));

	const result = createVisualsWorkflowArtifacts({
		topic: "AI agent market comparison",
		workspaceRoot: root,
		rows: sampleRows,
	});

	assert.equal(result.slug, "ai-agent-market-comparison");
	assert.ok(existsSync(join(root, "outputs", "ai-agent-market-comparison.md")));
	assert.ok(existsSync(join(root, "outputs", "ai-agent-market-comparison.provenance.md")));
	assert.ok(existsSync(join(root, "outputs", "ai-agent-market-comparison.assets", "manifest.json")));
	assert.ok(existsSync(join(root, "outputs", "ai-agent-market-comparison.assets", "data.json")));
	assert.ok(existsSync(join(root, "outputs", "ai-agent-market-comparison.assets", "data.csv")));
	assert.ok(existsSync(join(root, "outputs", "ai-agent-market-comparison.assets", "comparison.svg")));

	const manifest = JSON.parse(readFileSync(join(root, "outputs", "ai-agent-market-comparison.assets", "manifest.json"), "utf8"));
	assert.equal(manifest.slug, "ai-agent-market-comparison");
	assert.equal(manifest.artifacts.length, 4);
	assert.deepEqual(
		manifest.artifacts.map((artifact: { kind: string; verification: string }) => [artifact.kind, artifact.verification]),
		[
			["data-json", "source-data"],
			["data-csv", "source-data"],
			["chart-svg", "data-backed"],
			["table-markdown", "data-backed"],
		],
	);
	assert.ok(
		manifest.artifacts.every((artifact: { model?: string; provider?: string }) => artifact.model === undefined && artifact.provider === undefined),
		"data-backed chart/table artifacts must not pretend to come from image models",
	);
});
