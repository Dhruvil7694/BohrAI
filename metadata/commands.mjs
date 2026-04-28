import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

function parseFrontmatter(text) {
	const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) return {};

	const frontmatter = {};
	for (const line of match[1].split("\n")) {
		const separator = line.indexOf(":");
		if (separator === -1) continue;
		const key = line.slice(0, separator).trim();
		const value = line.slice(separator + 1).trim();
		if (!key) continue;
		frontmatter[key] = value;
	}
	return frontmatter;
}

export function readPromptSpecs(appRoot) {
	const dir = resolve(appRoot, "prompts");
	return readdirSync(dir)
		.filter((f) => f.endsWith(".md"))
		.map((f) => {
			const text = readFileSync(resolve(dir, f), "utf8");
			const fm = parseFrontmatter(text);
			return {
				name: f.replace(/\.md$/, ""),
				description: fm.description ?? "",
				args: fm.args ?? "",
				section: fm.section ?? "Research Workflows",
				topLevelCli: fm.topLevelCli === "true",
			};
		});
}

export const extensionCommandSpecs = [
	{ name: "capabilities", args: "", section: "Project & Session", description: "Show installed packages, discovery entrypoints, and runtime capability counts.", publicDocs: true },
	{ name: "commands", args: "", section: "Project & Session", description: "Browse all available slash commands, including built-in and package commands.", publicDocs: true },
	{ name: "help", args: "", section: "Project & Session", description: "Show grouped Bohr commands and prefill the editor with a selected command.", publicDocs: true },
	{ name: "bohr-model", args: "", section: "Project & Session", description: "Open Bohr model menu (main + per-subagent overrides).", publicDocs: true },
	{ name: "init", args: "", section: "Project & Session", description: "Bootstrap AGENTS.md and session-log folders for a research project.", publicDocs: true },
	{ name: "outputs", args: "", section: "Project & Session", description: "Browse all research artifacts (papers, outputs, experiments, notes).", publicDocs: true },
	{ name: "service-tier", args: "", section: "Project & Session", description: "View or set the provider service tier override for supported models.", publicDocs: true },
	{ name: "tools", args: "", section: "Project & Session", description: "Browse all callable tools with their source and parameter summary.", publicDocs: true },
];

export const livePackageCommandGroups = [
	{
		title: "Agents & Delegation",
		commands: [
			{ name: "agents", usage: "/agents" },
			{ name: "run", usage: "/run <agent> <task>" },
			{ name: "chain", usage: "/chain agent1 -> agent2" },
			{ name: "parallel", usage: "/parallel agent1 -> agent2" },
		],
	},
	{
		title: "Bundled Package Commands",
		commands: [
			{ name: "ps", usage: "/ps" },
			{ name: "schedule-prompt", usage: "/schedule-prompt" },
			{ name: "search", usage: "/search" },
			{ name: "preview", usage: "/preview" },
			{ name: "hotkeys", usage: "/hotkeys" },
			{ name: "new", usage: "/new" },
			{ name: "quit", usage: "/quit" },
			{ name: "exit", usage: "/exit" },
		],
	},
];

export const cliCommandSections = [
	{
		title: "Core",
		commands: [
			{ usage: "bohr", description: "Launch the interactive REPL." },
			{ usage: "bohr chat [prompt]", description: "Start chat explicitly, optionally with an initial prompt." },
			{ usage: "bohr help", description: "Show CLI help." },
			{ usage: "bohr setup", description: "Run the guided setup wizard." },
			{ usage: "bohr doctor", description: "Diagnose config, auth, Pi runtime, and preview dependencies." },
			{ usage: "bohr status", description: "Show the current setup summary." },
		],
	},
	{
		title: "Model Management",
		commands: [
			{ usage: "bohr model list", description: "List available models in Pi auth storage." },
			{ usage: "bohr model login [id]", description: "Authenticate a model provider with OAuth or API-key setup." },
			{ usage: "bohr model logout [id]", description: "Clear stored auth for a model provider." },
			{ usage: "bohr model set <provider/model>", description: "Set the default model (also accepts provider:model)." },
			{ usage: "bohr model tier [value]", description: "View or set the request service tier override." },
		],
	},
	{
		title: "AlphaXiv",
		commands: [
			{ usage: "bohr alpha login", description: "Sign in to alphaXiv." },
			{ usage: "bohr alpha logout", description: "Clear alphaXiv auth." },
			{ usage: "bohr alpha status", description: "Check alphaXiv auth status." },
		],
	},
	{
		title: "Utilities",
		commands: [
			{ usage: "bohr packages list", description: "Show core and optional Pi package presets." },
			{ usage: "bohr packages install <preset>", description: "Install optional package presets on demand." },
			{ usage: "bohr search status", description: "Show Pi web-access status and config path." },
			{ usage: "bohr search set <provider> [api-key]", description: "Set the web search provider and optionally save its API key." },
			{ usage: "bohr search clear", description: "Reset web search provider to auto while preserving API keys." },
			{ usage: "bohr visual status", description: "Show visual provider status and default image model." },
			{ usage: "bohr visual set <provider> <api-key>", description: "Save a Gemini or OpenAI image-generation API key." },
			{ usage: "bohr visual default <provider> [model]", description: "Set the default image provider and optional model." },
			{ usage: "bohr visual clear [provider]", description: "Clear one visual provider or all visual configuration." },
			{ usage: "bohr update [package]", description: "Update installed packages, or a specific package." },
		],
	},
];

export const legacyFlags = [
	{ usage: '--prompt "<text>"', description: "Run one prompt and exit." },
	{ usage: "--alpha-login", description: "Sign in to alphaXiv and exit." },
	{ usage: "--alpha-logout", description: "Clear alphaXiv auth and exit." },
	{ usage: "--alpha-status", description: "Show alphaXiv auth status and exit." },
	{ usage: "--model <provider/model|provider:model>", description: "Force a specific model." },
	{ usage: "--service-tier <tier>", description: "Override request service tier for this run." },
	{ usage: "--thinking <level>", description: "Set thinking level: off | minimal | low | medium | high | xhigh." },
	{ usage: "--cwd <path>", description: "Set the working directory for tools." },
	{ usage: "--session-dir <path>", description: "Set the session storage directory." },
	{ usage: "--new-session", description: "Start a new persisted session." },
	{ usage: "--doctor", description: "Alias for `bohr doctor`." },
	{ usage: "--setup-preview", description: "Alias for `bohr setup preview`." },
];

export const topLevelCommandNames = ["alpha", "chat", "doctor", "help", "model", "packages", "search", "setup", "status", "update", "visual"];

export function formatSlashUsage(command) {
	return `/${command.name}${command.args ? ` ${command.args}` : ""}`;
}

export function formatCliWorkflowUsage(command) {
	return `bohr ${command.name}${command.args ? ` ${command.args}` : ""}`;
}

export function getExtensionCommandSpec(name) {
	return extensionCommandSpecs.find((command) => command.name === name);
}
