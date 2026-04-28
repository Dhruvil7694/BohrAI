import test from "node:test";
import assert from "node:assert/strict";

import {
	DEFAULT_GEMINI_IMAGE_MODEL,
	DEFAULT_OPENAI_IMAGE_MODEL,
} from "../src/visuals/config.js";
import {
	GeminiVisualProvider,
	OpenAIVisualProvider,
	type FetchLike,
} from "../src/visuals/providers.js";

test("GeminiVisualProvider posts generateContent request and reads inline image data", async () => {
	const calls: Array<{ url: string; init: RequestInit }> = [];
	const fetchImpl: FetchLike = async (url, init) => {
		calls.push({ url: String(url), init: init ?? {} });
		return new Response(
			JSON.stringify({
				candidates: [
					{
						content: {
							parts: [
								{ text: "created" },
								{ inlineData: { mimeType: "image/png", data: "aW1hZ2U=" } },
							],
						},
					},
				],
			}),
			{ status: 200, headers: { "content-type": "application/json" } },
		);
	};

	const provider = new GeminiVisualProvider(fetchImpl);
	const result = await provider.generateImage({
		prompt: "Create a precise flowchart",
		apiKey: "gemini-key",
	});

	assert.equal(result.provider, "gemini");
	assert.equal(result.model, DEFAULT_GEMINI_IMAGE_MODEL);
	assert.equal(result.mimeType, "image/png");
	assert.equal(result.imageBase64, "aW1hZ2U=");
	assert.match(calls[0]!.url, /gemini-2\.5-flash-image:generateContent/);
	assert.match(calls[0]!.url, /key=gemini-key/);
	assert.deepEqual(JSON.parse(String(calls[0]!.init.body)), {
		contents: [{ parts: [{ text: "Create a precise flowchart" }] }],
	});
});

test("OpenAIVisualProvider posts image generation request and reads base64 image data", async () => {
	const calls: Array<{ url: string; init: RequestInit }> = [];
	const fetchImpl: FetchLike = async (url, init) => {
		calls.push({ url: String(url), init: init ?? {} });
		return new Response(
			JSON.stringify({
				data: [{ b64_json: "aW1hZ2U=", revised_prompt: "revised flowchart prompt" }],
			}),
			{ status: 200, headers: { "content-type": "application/json" } },
		);
	};

	const provider = new OpenAIVisualProvider(fetchImpl);
	const result = await provider.generateImage({
		prompt: "Create a precise flowchart",
		apiKey: "openai-key",
		size: "1536x1024",
		quality: "medium",
	});

	assert.equal(result.provider, "openai");
	assert.equal(result.model, DEFAULT_OPENAI_IMAGE_MODEL);
	assert.equal(result.mimeType, "image/png");
	assert.equal(result.imageBase64, "aW1hZ2U=");
	assert.equal(result.revisedPrompt, "revised flowchart prompt");
	assert.equal(calls[0]!.url, "https://api.openai.com/v1/images/generations");
	assert.equal((calls[0]!.init.headers as Record<string, string>).Authorization, "Bearer openai-key");
	assert.deepEqual(JSON.parse(String(calls[0]!.init.body)), {
		model: "gpt-image-1.5",
		prompt: "Create a precise flowchart",
		n: 1,
		size: "1536x1024",
		quality: "medium",
		output_format: "png",
	});
});

test("visual providers surface provider errors without leaking API keys", async () => {
	const fetchImpl: FetchLike = async () =>
		new Response(JSON.stringify({ error: { message: "bad key openai-key" } }), { status: 401 });

	const provider = new OpenAIVisualProvider(fetchImpl);

	await assert.rejects(
		() => provider.generateImage({ prompt: "x", apiKey: "openai-key" }),
		(error: Error) => {
			assert.match(error.message, /OpenAI image generation failed: 401/);
			assert.ok(!error.message.includes("openai-key"));
			return true;
		},
	);
});
