import {
	clearVisualProvider,
	getVisualConfigStatus,
	isVisualProvider,
	loadVisualConfig,
	setDefaultVisualProvider,
	setVisualProviderKey,
	type VisualProviderId,
} from "./config.js";
import { printInfo, printSuccess } from "../ui/terminal.js";

function parseProvider(value: string | undefined): VisualProviderId {
	if (!value || !isVisualProvider(value)) {
		throw new Error("Usage: bohr visual <status|set|default|clear> ...\nProviders: gemini, openai");
	}
	return value;
}

export function printVisualStatus(): void {
	const status = getVisualConfigStatus();
	for (const line of status.lines) {
		printInfo(line);
	}
}

export function handleVisualCommand(subcommand: string | undefined, args: string[]): void {
	if (!subcommand || subcommand === "status") {
		printVisualStatus();
		return;
	}

	if (subcommand === "set") {
		const provider = parseProvider(args[0]);
		const apiKey = args[1];
		if (!apiKey) {
			throw new Error("Usage: bohr visual set <gemini|openai> <api-key>");
		}
		setVisualProviderKey(provider, apiKey);
		const status = getVisualConfigStatus(loadVisualConfig());
		printSuccess(`Saved ${provider} visual API key.`);
		printInfo(`Config path: ${status.configPath}`);
		return;
	}

	if (subcommand === "default") {
		const provider = parseProvider(args[0]);
		setDefaultVisualProvider(provider, args[1]);
		const status = getVisualConfigStatus(loadVisualConfig());
		printSuccess(`Default visual provider set to ${provider}.`);
		printInfo(`Default model: ${status.defaultModel}`);
		printInfo(`Config path: ${status.configPath}`);
		return;
	}

	if (subcommand === "clear") {
		const provider = args[0] ? parseProvider(args[0]) : undefined;
		clearVisualProvider(provider);
		printSuccess(provider ? `Cleared ${provider} visual config.` : "Cleared all visual config.");
		return;
	}

	throw new Error("Usage: bohr visual <status|set|default|clear> ...");
}
