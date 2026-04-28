import {
	DEFAULT_GEMINI_IMAGE_MODEL,
	DEFAULT_OPENAI_IMAGE_MODEL,
	type VisualProviderId,
} from "./config.js";

export type FetchLike = (url: string | URL, init?: RequestInit) => Promise<Response>;

export type VisualImageRequest = {
	prompt: string;
	apiKey: string;
	model?: string;
	size?: string;
	quality?: string;
	outputFormat?: "png" | "jpeg" | "webp";
};

export type VisualImageResult = {
	provider: VisualProviderId;
	model: string;
	imageBase64: string;
	mimeType: string;
	revisedPrompt?: string;
};

export interface VisualProvider {
	readonly id: VisualProviderId;
	readonly defaultModel: string;
	generateImage(request: VisualImageRequest): Promise<VisualImageResult>;
}

function sanitizeErrorMessage(message: string, apiKey: string): string {
	return message.split(apiKey).join("[redacted]");
}

async function readError(response: Response, apiKey: string): Promise<string> {
	try {
		const json = (await response.json()) as any;
		const message = json?.error?.message ?? json?.message ?? response.statusText;
		return sanitizeErrorMessage(String(message), apiKey);
	} catch {
		return response.statusText;
	}
}

export class GeminiVisualProvider implements VisualProvider {
	readonly id = "gemini" as const;
	readonly defaultModel = DEFAULT_GEMINI_IMAGE_MODEL;

	constructor(private readonly fetchImpl: FetchLike = fetch) {}

	async generateImage(request: VisualImageRequest): Promise<VisualImageResult> {
		const model = request.model?.trim() || this.defaultModel;
		const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(request.apiKey)}`;
		const response = await this.fetchImpl(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				contents: [{ parts: [{ text: request.prompt }] }],
			}),
		});

		if (!response.ok) {
			throw new Error(`Gemini image generation failed: ${response.status} ${await readError(response, request.apiKey)}`);
		}

		const json = (await response.json()) as any;
		const parts = json?.candidates?.[0]?.content?.parts;
		const imagePart = Array.isArray(parts)
			? parts.find((part) => part?.inlineData?.data || part?.inline_data?.data)
			: undefined;
		const inlineData = imagePart?.inlineData ?? imagePart?.inline_data;
		if (!inlineData?.data) {
			throw new Error("Gemini image generation response did not include image data.");
		}

		return {
			provider: this.id,
			model,
			imageBase64: inlineData.data,
			mimeType: inlineData.mimeType ?? inlineData.mime_type ?? "image/png",
		};
	}
}

export class OpenAIVisualProvider implements VisualProvider {
	readonly id = "openai" as const;
	readonly defaultModel = DEFAULT_OPENAI_IMAGE_MODEL;

	constructor(private readonly fetchImpl: FetchLike = fetch) {}

	async generateImage(request: VisualImageRequest): Promise<VisualImageResult> {
		const model = request.model?.trim() || this.defaultModel;
		const outputFormat = request.outputFormat ?? "png";
		const response = await this.fetchImpl("https://api.openai.com/v1/images/generations", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${request.apiKey}`,
			},
			body: JSON.stringify({
				model,
				prompt: request.prompt,
				n: 1,
				size: request.size ?? "1024x1024",
				quality: request.quality ?? "auto",
				output_format: outputFormat,
			}),
		});

		if (!response.ok) {
			throw new Error(`OpenAI image generation failed: ${response.status} ${await readError(response, request.apiKey)}`);
		}

		const json = (await response.json()) as any;
		const image = json?.data?.[0];
		const imageBase64 = image?.b64_json ?? image?.b64Json;
		if (!imageBase64) {
			throw new Error("OpenAI image generation response did not include image data.");
		}

		return {
			provider: this.id,
			model,
			imageBase64,
			mimeType: `image/${outputFormat}`,
			revisedPrompt: image.revised_prompt ?? image.revisedPrompt,
		};
	}
}

export function createVisualProvider(provider: VisualProviderId, fetchImpl?: FetchLike): VisualProvider {
	if (provider === "gemini") {
		return new GeminiVisualProvider(fetchImpl);
	}
	if (provider === "openai") {
		return new OpenAIVisualProvider(fetchImpl);
	}
	throw new Error(`Unknown visual provider: ${provider}`);
}
