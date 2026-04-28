import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type VisualDataRow = {
	label: string;
	value: number;
	source: string;
	notes?: string;
};

export type ChartOptions = {
	title: string;
	valueLabel: string;
};

export type VisualsWorkflowOptions = {
	topic: string;
	workspaceRoot: string;
	rows: VisualDataRow[];
	valueLabel?: string;
};

export type VisualArtifactRecord = {
	kind: "data-json" | "data-csv" | "chart-svg" | "table-markdown" | "image";
	path: string;
	verification: "source-data" | "data-backed" | "generated-concept";
	provider?: string;
	model?: string;
	prompt?: string;
	sourceData?: string[];
};

export type VisualsWorkflowResult = {
	slug: string;
	reportPath: string;
	provenancePath: string;
	assetsDir: string;
	manifestPath: string;
};

export function slugifyTopic(topic: string): string {
	const slug = topic
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 5)
		.join("-");
	return slug || "visuals";
}

function escapeMarkdownCell(value: string | number | undefined): string {
	return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

export function buildComparisonTable(rows: VisualDataRow[], valueLabel = "Value"): string {
	const lines = [
		`| Item | ${escapeMarkdownCell(valueLabel)} | Source | Notes |`,
		"| --- | ---: | --- | --- |",
	];
	for (const row of rows) {
		lines.push(
			`| ${escapeMarkdownCell(row.label)} | ${row.value} | ${escapeMarkdownCell(row.source)} | ${escapeMarkdownCell(row.notes)} |`,
		);
	}
	return `${lines.join("\n")}\n`;
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export function renderBarChartSvg(rows: VisualDataRow[], options: ChartOptions): string {
	const width = 960;
	const rowHeight = 64;
	const top = 96;
	const left = 220;
	const right = 72;
	const height = top + rows.length * rowHeight + 64;
	const maxValue = Math.max(...rows.map((row) => row.value), 1);
	const chartWidth = width - left - right;
	const bars = rows
		.map((row, index) => {
			const y = top + index * rowHeight;
			const barWidth = Math.max(4, (row.value / maxValue) * chartWidth);
			return [
				`<text x="32" y="${y + 27}" font-size="22" fill="#1f2937">${escapeXml(row.label)}</text>`,
				`<rect x="${left}" y="${y}" width="${barWidth.toFixed(2)}" height="36" rx="4" fill="#2563eb" />`,
				`<text x="${left + barWidth + 14}" y="${y + 25}" font-size="20" fill="#111827">${row.value}</text>`,
			].join("\n");
		})
		.join("\n");

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(options.title)}">
<rect width="100%" height="100%" fill="#ffffff" />
<text x="32" y="46" font-size="30" font-weight="700" fill="#111827">${escapeXml(options.title)}</text>
<text x="32" y="76" font-size="18" fill="#4b5563">${escapeXml(options.valueLabel)}; data-backed chart, see adjacent CSV/JSON.</text>
${bars}
</svg>
`;
}

function csvEscape(value: string | number | undefined): string {
	const raw = String(value ?? "");
	if (/[",\r\n]/.test(raw)) {
		return `"${raw.replace(/"/g, '""')}"`;
	}
	return raw;
}

function toCsv(rows: VisualDataRow[]): string {
	const header = ["label", "value", "source", "notes"].join(",");
	const body = rows
		.map((row) => [row.label, row.value, row.source, row.notes ?? ""].map(csvEscape).join(","))
		.join("\n");
	return `${header}\n${body}\n`;
}

export function createVisualsWorkflowArtifacts(options: VisualsWorkflowOptions): VisualsWorkflowResult {
	const slug = slugifyTopic(options.topic);
	const outputsDir = join(options.workspaceRoot, "outputs");
	const assetsDir = join(outputsDir, `${slug}.assets`);
	const valueLabel = options.valueLabel ?? "Value";
	mkdirSync(assetsDir, { recursive: true });

	const dataJsonPath = join(assetsDir, "data.json");
	const dataCsvPath = join(assetsDir, "data.csv");
	const chartPath = join(assetsDir, "comparison.svg");
	const tablePath = join(assetsDir, "table.md");
	const manifestPath = join(assetsDir, "manifest.json");
	const reportPath = join(outputsDir, `${slug}.md`);
	const provenancePath = join(outputsDir, `${slug}.provenance.md`);

	const table = buildComparisonTable(options.rows, valueLabel);
	writeFileSync(dataJsonPath, JSON.stringify({ topic: options.topic, rows: options.rows }, null, 2) + "\n", "utf8");
	writeFileSync(dataCsvPath, toCsv(options.rows), "utf8");
	writeFileSync(chartPath, renderBarChartSvg(options.rows, { title: options.topic, valueLabel }), "utf8");
	writeFileSync(tablePath, table, "utf8");

	const artifacts: VisualArtifactRecord[] = [
		{ kind: "data-json", path: dataJsonPath, verification: "source-data" },
		{ kind: "data-csv", path: dataCsvPath, verification: "source-data" },
		{ kind: "chart-svg", path: chartPath, verification: "data-backed", sourceData: [dataJsonPath, dataCsvPath] },
		{ kind: "table-markdown", path: tablePath, verification: "data-backed", sourceData: [dataJsonPath, dataCsvPath] },
	];

	writeFileSync(
		manifestPath,
		JSON.stringify(
			{
				slug,
				topic: options.topic,
				createdAt: new Date().toISOString(),
				policy: "Charts and tables are generated from structured source data; image models are for conceptual visuals only.",
				artifacts,
			},
			null,
			2,
		) + "\n",
		"utf8",
	);

	writeFileSync(
		reportPath,
		`# ${options.topic}\n\n## Data-Backed Comparison\n\n![Comparison chart](${slug}.assets/comparison.svg)\n\n${table}\n\n## Assets\n\n- Manifest: \`${slug}.assets/manifest.json\`\n- Source data: \`${slug}.assets/data.json\`, \`${slug}.assets/data.csv\`\n- Chart: \`${slug}.assets/comparison.svg\`\n- Table: \`${slug}.assets/table.md\`\n`,
		"utf8",
	);

	writeFileSync(
		provenancePath,
		`# Provenance: ${options.topic}\n\n- **Workflow:** visuals\n- **Plan:** data-backed visuals with source data artifacts\n- **Structured data:** ${slug}.assets/data.json; ${slug}.assets/data.csv\n- **Verification:** chart and table are data-backed; no numeric claims were generated by an image model\n- **Manifest:** ${slug}.assets/manifest.json\n`,
		"utf8",
	);

	return { slug, reportPath, provenancePath, assetsDir, manifestPath };
}
