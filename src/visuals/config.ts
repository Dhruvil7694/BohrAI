import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { getBohrHome } from "../config/paths.js";

export type VisualProviderId = "gemini" | "openai";

export const DEFAULT_GEMINI_IMAGE_MODEL = "gemini-2.5-flash-image";
export const GEMINI_NANO_BANANA_PRO_MODEL = "gemini-3-pro-image-preview";
export const DEFAULT_OPENAI_IMAGE_MODEL = "gpt-image-1.5";

export type VisualsConfig = Record<string, unknown> & {
	defaultProvider?: VisualProviderId;
	geminiApiKey?: string;
	geminiModel?: string;
	openaiApiKey?: string;
	openaiModel?: string;
};

export type VisualConfigStatus = {
	configPath: string;
	defaultProvider: VisualProviderId;
	defaultModel: string;
	geminiConfigured: boolean;
	openaiConfigured: boolean;
	geminiModel: string;
	openaiModel: string;
	lines: string[];
};

type EnvLike = Record<string, string | undefined>;

const VISUAL_PROVIDERS: VisualProviderId[] = ["gemini", "openai"];

export function getBohrVisualConfigPath(home?: string): string {
	const bohrHome = home ? resolve(home) : getBohrHome();
	return resolve(bohrHome, "visuals.json");
}

export function isVisualProvider(value: string): value is VisualProviderId {
	return VISUAL_PROVIDERS.includes(value as VisualProviderId);
}

function assertVisualProvider(provider: VisualProviderId): void {
	if (!isVisualProvider(provider)) {
		throw new Error(`Unknown visual provider: ${provider}`);
	}
}

function normalizeProvider(value: unknown): VisualProviderId | undefined {
	return value === "gemini" || value === "openai" ? value : undefined;
}

function normalizeNonEmptyString(value: unknown): string | undefined {
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

export function loadVisualConfig(configPath = getBohrVisualConfigPath()): VisualsConfig {
	if (!existsSync(configPath)) {
		return {};
	}

	try {
		const parsed = JSON.parse(readFileSync(configPath, "utf8")) as VisualsConfig;
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}

export function saveVisualConfig(
	updates: Partial<Record<keyof VisualsConfig, unknown>>,
	configPath = getBohrVisualConfigPath(),
): void {
	const merged: Record<string, unknown> = { ...loadVisualConfig(configPath) };
	for (const [key, value] of Object.entries(updates)) {
		if (value === undefined) {
			delete merged[key];
		} else {
			merged[key] = value;
		}
	}

	mkdirSync(dirname(configPath), { recursive: true });
	writeFileSync(configPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
}

export function setVisualProviderKey(
	provider: VisualProviderId,
	apiKey: string,
	configPath = getBohrVisualConfigPath(),
): void {
	assertVisualProvider(provider);
	const trimmed = apiKey.trim();
	if (!trimmed) {
		throw new Error("API key cannot be empty.");
	}
	saveVisualConfig({ [`${provider}ApiKey`]: trimmed }, configPath);
}

export function setDefaultVisualProvider(
	provider: VisualProviderId,
	model?: string,
	configPath = getBohrVisualConfigPath(),
): void {
	assertVisualProvider(provider);
	const modelKey = provider === "gemini" ? "geminiModel" : "openaiModel";
	saveVisualConfig(
		{
			defaultProvider: provider,
			[modelKey]: model?.trim() || undefined,
		},
		configPath,
	);
}

export function clearVisualProvider(provider?: VisualProviderId, configPath = getBohrVisualConfigPath()): void {
	if (provider !== undefined) {
		assertVisualProvider(provider);
		const updates: Partial<Record<keyof VisualsConfig, undefined>> =
			provider === "gemini"
				? { geminiApiKey: undefined, geminiModel: undefined }
				: { openaiApiKey: undefined, openaiModel: undefined };
		const config = loadVisualConfig(configPath);
		if (config.defaultProvider === provider) {
			updates.defaultProvider = undefined;
		}
		saveVisualConfig(updates, configPath);
		return;
	}

	saveVisualConfig(
		{
			defaultProvider: undefined,
			geminiApiKey: undefined,
			geminiModel: undefined,
			openaiApiKey: undefined,
			openaiModel: undefined,
		},
		configPath,
	);
}

export function resolveVisualApiKey(
	provider: VisualProviderId,
	config: VisualsConfig = loadVisualConfig(),
	env: EnvLike = process.env,
): string | undefined {
	assertVisualProvider(provider);
	if (provider === "gemini") {
		return normalizeNonEmptyString(config.geminiApiKey) ?? normalizeNonEmptyString(env.GEMINI_API_KEY);
	}
	return normalizeNonEmptyString(config.openaiApiKey) ?? normalizeNonEmptyString(env.OPENAI_API_KEY);
}

export function resolveVisualModel(
	provider: VisualProviderId,
	config: VisualsConfig = loadVisualConfig(),
	env: EnvLike = process.env,
): string {
	assertVisualProvider(provider);
	const envDefaultModel = normalizeNonEmptyString(env.BOHR_VISUAL_DEFAULT_MODEL);
	if (provider === "gemini") {
		return normalizeNonEmptyString(config.geminiModel) ?? envDefaultModel ?? DEFAULT_GEMINI_IMAGE_MODEL;
	}
	return normalizeNonEmptyString(config.openaiModel) ?? envDefaultModel ?? DEFAULT_OPENAI_IMAGE_MODEL;
}

function configuredLabel(configured: boolean): string {
	return configured ? "configured" : "not configured";
}

export function getVisualConfigStatus(
	config: VisualsConfig = loadVisualConfig(),
	configPath = getBohrVisualConfigPath(),
	env: EnvLike = process.env,
): VisualConfigStatus {
	const defaultProvider = normalizeProvider(config.defaultProvider) ?? normalizeProvider(env.BOHR_VISUAL_DEFAULT_PROVIDER) ?? "gemini";
	const geminiModel = resolveVisualModel("gemini", config, env);
	const openaiModel = resolveVisualModel("openai", config, env);
	const geminiConfigured = Boolean(resolveVisualApiKey("gemini", config, env));
	const openaiConfigured = Boolean(resolveVisualApiKey("openai", config, env));
	const defaultModel = resolveVisualModel(defaultProvider, config, env);
	const lines = [
		`visual config: ${configPath}`,
		`default provider: ${defaultProvider}`,
		`default model: ${defaultModel}`,
		`Gemini API: ${configuredLabel(geminiConfigured)}`,
		`Gemini model: ${geminiModel}`,
		`OpenAI API: ${configuredLabel(openaiConfigured)}`,
		`OpenAI model: ${openaiModel}`,
	];

	return {
		configPath,
		defaultProvider,
		defaultModel,
		geminiConfigured,
		openaiConfigured,
		geminiModel,
		openaiModel,
		lines,
	};
}
