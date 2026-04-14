import "dotenv/config";

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

import {
	getUserName as getAlphaUserName,
	isLoggedIn as isAlphaLoggedIn,
	login as loginAlpha,
	logout as logoutAlpha,
} from "@companion-ai/alpha-hub/lib";
import { DefaultPackageManager, SettingsManager } from "@mariozechner/pi-coding-agent";

import { syncBundledAssets } from "./bootstrap/sync.js";
import { ensureBohrHome, getBohrAgentDir, getBohrHome, getDefaultSessionDir } from "./config/paths.js";
import { launchPiChat } from "./pi/launch.js";
import { CORE_PACKAGE_SOURCES, getOptionalPackagePresetSources, listOptionalPackagePresets } from "./pi/package-presets.js";
import { normalizeBohrSettings, normalizeThinkingLevel, parseModelSpec } from "./pi/settings.js";
import { applyBohrPackageManagerEnv } from "./pi/runtime.js";
import { getConfiguredServiceTier, normalizeServiceTier, setConfiguredServiceTier } from "./model/service-tier.js";
import {
	authenticateModelProvider,
	getCurrentModelSpec,
	loginModelProvider,
	logoutModelProvider,
	printModelList,
	setDefaultModelSpec,
} from "./model/commands.js";
import { clearSearchConfig, printSearchStatus, setSearchProvider } from "./search/commands.js";
import type { PiWebSearchProvider } from "./pi/web-access.js";
import { runDoctor, runStatus } from "./setup/doctor.js";
import { setupPreviewDependencies } from "./setup/preview.js";
import { runSetup } from "./setup/setup.js";
import { ASH, printAsciiHeader, printInfo, printPanel, printSection, RESET, SAGE } from "./ui/terminal.js";
import { createModelRegistry } from "./model/registry.js";
import {
	cliCommandSections,
	formatCliWorkflowUsage,
	legacyFlags,
	readPromptSpecs,
	topLevelCommandNames,
} from "../metadata/commands.mjs";

const TOP_LEVEL_COMMANDS = new Set(topLevelCommandNames);

function printHelpLine(usage: string, description: string): void {
	const width = 30;
	const padding = Math.max(1, width - usage.length);
	console.log(`  ${SAGE}${usage}${RESET}${" ".repeat(padding)}${ASH}${description}${RESET}`);
}

function printHelp(appRoot: string): void {
	const workflowCommands = readPromptSpecs(appRoot).filter(
		(command) => command.section === "Research Workflows" && command.topLevelCli,
	);

	printAsciiHeader([
		"Research-first agent shell built on Pi.",
		"Use `bohr setup` first if this is a new machine.",
	]);

	printSection("Getting Started");
	printInfo("bohr");
	printInfo("bohr setup");
	printInfo("bohr doctor");
	printInfo("bohr model");
	printInfo("bohr search status");

	printSection("Commands");
	for (const section of cliCommandSections) {
		for (const command of section.commands) {
			printHelpLine(command.usage, command.description);
		}
	}

	printSection("Research Workflows");
	for (const command of workflowCommands) {
		printHelpLine(formatCliWorkflowUsage(command), command.description);
	}

	printSection("Legacy Flags");
	for (const flag of legacyFlags) {
		printHelpLine(flag.usage, flag.description);
	}

	printSection("REPL");
	printInfo("Inside the REPL, slash workflows come from the live prompt-template and extension command set.");
}

async function handleAlphaCommand(action: string | undefined): Promise<void> {
	if (action === "login") {
		const result = await loginAlpha();
		const name =
			result.userInfo &&
			typeof result.userInfo === "object" &&
			"name" in result.userInfo &&
			typeof result.userInfo.name === "string"
				? result.userInfo.name
				: getAlphaUserName();
		console.log(name ? `alphaXiv login complete: ${name}` : "alphaXiv login complete");
		return;
	}

	if (action === "logout") {
		logoutAlpha();
		console.log("alphaXiv auth cleared");
		return;
	}

	if (!action || action === "status") {
		if (isAlphaLoggedIn()) {
			const name = getAlphaUserName();
			console.log(name ? `alphaXiv logged in as ${name}` : "alphaXiv logged in");
		} else {
			console.log("alphaXiv not logged in");
		}
		return;
	}

	throw new Error(`Unknown alpha command: ${action}`);
}

async function handleModelCommand(subcommand: string | undefined, args: string[], bohrSettingsPath: string, bohrAuthPath: string): Promise<void> {
	if (!subcommand || subcommand === "list") {
		printModelList(bohrSettingsPath, bohrAuthPath);
		return;
	}

	if (subcommand === "login") {
		if (args[0]) {
			// Specific provider given - resolve OAuth vs API-key setup automatically
			await loginModelProvider(bohrAuthPath, args[0], bohrSettingsPath);
		} else {
			// No provider specified - show auth method choice
			await authenticateModelProvider(bohrAuthPath, bohrSettingsPath);
		}
		return;
	}

	if (subcommand === "logout") {
		await logoutModelProvider(bohrAuthPath, args[0]);
		return;
	}

	if (subcommand === "set") {
		const spec = args[0];
		if (!spec) {
			throw new Error("Usage: bohr model set <provider/model|provider:model>");
		}
		setDefaultModelSpec(bohrSettingsPath, bohrAuthPath, spec);
		return;
	}

	if (subcommand === "tier") {
		const requested = args[0];
		if (!requested) {
			console.log(getConfiguredServiceTier(bohrSettingsPath) ?? "not set");
			return;
		}

		if (requested === "unset" || requested === "clear" || requested === "off") {
			setConfiguredServiceTier(bohrSettingsPath, undefined);
			console.log("Cleared service tier override");
			return;
		}

		const tier = normalizeServiceTier(requested);
		if (!tier) {
			throw new Error("Usage: bohr model tier <auto|default|flex|priority|standard_only|unset>");
		}

		setConfiguredServiceTier(bohrSettingsPath, tier);
		console.log(`Service tier set to ${tier}`);
		return;
	}

	throw new Error(`Unknown model command: ${subcommand}`);
}

async function handleUpdateCommand(workingDir: string, bohrAgentDir: string, source?: string): Promise<void> {
	applyBohrPackageManagerEnv(bohrAgentDir);
	const settingsManager = SettingsManager.create(workingDir, bohrAgentDir);
	const packageManager = new DefaultPackageManager({
		cwd: workingDir,
		agentDir: bohrAgentDir,
		settingsManager,
	});

	packageManager.setProgressCallback((event) => {
		if (event.type === "start") {
			console.log(`Updating ${event.source}...`);
		} else if (event.type === "complete") {
			console.log(`Updated ${event.source}`);
		} else if (event.type === "error") {
			console.error(`Failed to update ${event.source}: ${event.message ?? "unknown error"}`);
		}
	});

	await packageManager.update(source);
	await settingsManager.flush();
	console.log("All packages up to date.");
}

async function handlePackagesCommand(subcommand: string | undefined, args: string[], workingDir: string, bohrAgentDir: string): Promise<void> {
	applyBohrPackageManagerEnv(bohrAgentDir);
	const settingsManager = SettingsManager.create(workingDir, bohrAgentDir);
	const configuredSources = new Set(
		settingsManager
			.getPackages()
			.map((entry) => (typeof entry === "string" ? entry : entry.source))
			.filter((entry): entry is string => typeof entry === "string"),
	);

	if (!subcommand || subcommand === "list") {
		printPanel("Bohr Packages", [
			"Core packages are installed by default to keep first-run setup fast.",
		]);
		printSection("Core");
		for (const source of CORE_PACKAGE_SOURCES) {
			printInfo(source);
		}
		printSection("Optional");
		for (const preset of listOptionalPackagePresets()) {
			const installed = preset.sources.every((source) => configuredSources.has(source));
			printInfo(`${preset.name}${installed ? " (installed)" : ""}  ${preset.description}`);
		}
		printInfo("Install with: bohr packages install <preset>");
		return;
	}

	if (subcommand !== "install") {
		throw new Error(`Unknown packages command: ${subcommand}`);
	}

	const target = args[0];
	if (!target) {
		throw new Error("Usage: bohr packages install <generative-ui|memory|session-search|all-extras>");
	}

	const sources = getOptionalPackagePresetSources(target);
	if (!sources) {
		throw new Error(`Unknown package preset: ${target}`);
	}

	const packageManager = new DefaultPackageManager({
		cwd: workingDir,
		agentDir: bohrAgentDir,
		settingsManager,
	});
	packageManager.setProgressCallback((event) => {
		if (event.type === "start") {
			console.log(`Installing ${event.source}...`);
		} else if (event.type === "complete") {
			console.log(`Installed ${event.source}`);
		} else if (event.type === "error") {
			console.error(`Failed to install ${event.source}: ${event.message ?? "unknown error"}`);
		}
	});

	for (const source of sources) {
		if (configuredSources.has(source)) {
			console.log(`${source} already installed`);
			continue;
		}
		await packageManager.install(source);
	}
	await settingsManager.flush();
	console.log("Optional packages installed.");
}

function handleSearchCommand(subcommand: string | undefined, args: string[]): void {
	if (!subcommand || subcommand === "status") {
		printSearchStatus();
		return;
	}

	if (subcommand === "set") {
		const provider = args[0] as PiWebSearchProvider | undefined;
		const validProviders: PiWebSearchProvider[] = ["auto", "perplexity", "exa", "gemini"];
		if (!provider || !validProviders.includes(provider)) {
			throw new Error("Usage: bohr search set <auto|perplexity|exa|gemini> [api-key]");
		}
		setSearchProvider(provider, args[1]);
		return;
	}

	if (subcommand === "clear") {
		clearSearchConfig();
		return;
	}

	throw new Error(`Unknown search command: ${subcommand}`);
}

function loadPackageVersion(appRoot: string): { version?: string } {
	try {
		return JSON.parse(readFileSync(resolve(appRoot, "package.json"), "utf8")) as { version?: string };
	} catch {
		return {};
	}
}

export function resolveInitialPrompt(
	command: string | undefined,
	rest: string[],
	oneShotPrompt: string | undefined,
	workflowCommands: Set<string>,
): string | undefined {
	if (oneShotPrompt) {
		return oneShotPrompt;
	}
	if (!command) {
		return undefined;
	}
	if (command === "chat") {
		return rest.length > 0 ? rest.join(" ") : undefined;
	}
	if (workflowCommands.has(command)) {
		return [`/${command}`, ...rest].join(" ").trim();
	}
	if (!TOP_LEVEL_COMMANDS.has(command)) {
		return [command, ...rest].join(" ");
	}
	return undefined;
}

export async function main(): Promise<void> {
	const here = dirname(fileURLToPath(import.meta.url));
	const appRoot = resolve(here, "..");
	const bohrVersion = loadPackageVersion(appRoot).version;
	const bundledSettingsPath = resolve(appRoot, ".bohr", "settings.json");
	const bohrHome = getBohrHome();
	const bohrAgentDir = getBohrAgentDir(bohrHome);

	ensureBohrHome(bohrHome);
	syncBundledAssets(appRoot, bohrAgentDir);

	const { values, positionals } = parseArgs({
		args: process.argv.slice(2),
		allowPositionals: true,
		options: {
			cwd: { type: "string" },
			doctor: { type: "boolean" },
			help: { type: "boolean" },
			version: { type: "boolean" },
			"alpha-login": { type: "boolean" },
			"alpha-logout": { type: "boolean" },
			"alpha-status": { type: "boolean" },
			mode: { type: "string" },
			model: { type: "string" },
			"new-session": { type: "boolean" },
			prompt: { type: "string" },
			"service-tier": { type: "string" },
			"session-dir": { type: "string" },
			"setup-preview": { type: "boolean" },
			thinking: { type: "string" },
		},
	});

	if (values.help) {
		printHelp(appRoot);
		return;
	}

	if (values.version) {
		if (bohrVersion) {
			console.log(bohrVersion);
			return;
		}
		throw new Error("Unable to determine the installed Bohr version.");
	}

	const workingDir = resolve(values.cwd ?? process.cwd());
	const sessionDir = resolve(values["session-dir"] ?? getDefaultSessionDir(bohrHome));
	const bohrSettingsPath = resolve(bohrAgentDir, "settings.json");
	const bohrAuthPath = resolve(bohrAgentDir, "auth.json");
	const thinkingLevel = normalizeThinkingLevel(values.thinking ?? process.env.BOHR_THINKING) ?? "medium";

	normalizeBohrSettings(bohrSettingsPath, bundledSettingsPath, thinkingLevel, bohrAuthPath);

	if (values.doctor) {
		runDoctor({
			settingsPath: bohrSettingsPath,
			authPath: bohrAuthPath,
			sessionDir,
			workingDir,
			appRoot,
		});
		return;
	}

	if (values["setup-preview"]) {
		const result = setupPreviewDependencies();
		console.log(result.message);
		return;
	}

	if (values["alpha-login"]) {
		await handleAlphaCommand("login");
		return;
	}

	if (values["alpha-logout"]) {
		await handleAlphaCommand("logout");
		return;
	}

	if (values["alpha-status"]) {
		await handleAlphaCommand("status");
		return;
	}

	const [command, ...rest] = positionals;
	if (command === "help") {
		printHelp(appRoot);
		return;
	}

	if (command === "setup") {
		await runSetup({
			settingsPath: bohrSettingsPath,
			bundledSettingsPath,
			authPath: bohrAuthPath,
			workingDir,
			sessionDir,
			appRoot,
			defaultThinkingLevel: thinkingLevel,
		});
		return;
	}

	if (command === "doctor") {
		runDoctor({
			settingsPath: bohrSettingsPath,
			authPath: bohrAuthPath,
			sessionDir,
			workingDir,
			appRoot,
		});
		return;
	}

	if (command === "status") {
		runStatus({
			settingsPath: bohrSettingsPath,
			authPath: bohrAuthPath,
			sessionDir,
			workingDir,
			appRoot,
		});
		return;
	}

	if (command === "model") {
		await handleModelCommand(rest[0], rest.slice(1), bohrSettingsPath, bohrAuthPath);
		return;
	}

	if (command === "search") {
		handleSearchCommand(rest[0], rest.slice(1));
		return;
	}

	if (command === "packages") {
		await handlePackagesCommand(rest[0], rest.slice(1), workingDir, bohrAgentDir);
		return;
	}

	if (command === "update") {
		await handleUpdateCommand(workingDir, bohrAgentDir, rest[0]);
		return;
	}

	if (command === "alpha") {
		await handleAlphaCommand(rest[0]);
		return;
	}

	const explicitModelSpec = values.model ?? process.env.BOHR_MODEL;
	const explicitServiceTier = normalizeServiceTier(values["service-tier"] ?? process.env.BOHR_SERVICE_TIER);
	const mode = values.mode;
	if (mode !== undefined && mode !== "text" && mode !== "json" && mode !== "rpc") {
		throw new Error("Unknown mode. Use text, json, or rpc.");
	}
	if ((values["service-tier"] ?? process.env.BOHR_SERVICE_TIER) && !explicitServiceTier) {
		throw new Error("Unknown service tier. Use auto, default, flex, priority, or standard_only.");
	}
	if (explicitServiceTier) {
		process.env.BOHR_SERVICE_TIER = explicitServiceTier;
	}
	if (explicitModelSpec) {
		const modelRegistry = createModelRegistry(bohrAuthPath);
		const explicitModel = parseModelSpec(explicitModelSpec, modelRegistry);
		if (!explicitModel) {
			throw new Error(`Unknown model: ${explicitModelSpec}`);
		}
	}

	if (!explicitModelSpec && !getCurrentModelSpec(bohrSettingsPath) && process.stdin.isTTY && process.stdout.isTTY) {
		await runSetup({
			settingsPath: bohrSettingsPath,
			bundledSettingsPath,
			authPath: bohrAuthPath,
			workingDir,
			sessionDir,
			appRoot,
			defaultThinkingLevel: thinkingLevel,
		});
		if (!getCurrentModelSpec(bohrSettingsPath)) {
			return;
		}
		normalizeBohrSettings(bohrSettingsPath, bundledSettingsPath, thinkingLevel, bohrAuthPath);
	}

	await launchPiChat({
		appRoot,
		workingDir,
		sessionDir,
		bohrAgentDir,
		bohrVersion,
		mode,
		thinkingLevel,
		explicitModelSpec,
		oneShotPrompt: values.prompt,
		initialPrompt: resolveInitialPrompt(command, rest, values.prompt, new Set(readPromptSpecs(appRoot).filter((s) => s.topLevelCli).map((s) => s.name))),
	});
}
