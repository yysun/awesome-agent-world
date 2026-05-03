import fs from "node:fs/promises";
import path from "node:path";

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY or GOOGLE_API_KEY in environment.");
  }

  return apiKey;
}

async function callModel({ model, prompt, apiKey }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${text}`);
  }

  return response.json();
}

function findImagePart(json) {
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  return parts.find((part) => part.inlineData?.data);
}

function buildPrompt(style, prompt) {
  return `${style.trim()} ${prompt.trim()}`.trim();
}

function extensionForMimeType(mimeType) {
  const normalizedMimeType = (mimeType || "").toLowerCase();

  if (normalizedMimeType === "image/jpeg" || normalizedMimeType === "image/jpg") {
    return ".jpg";
  }

  if (normalizedMimeType === "image/png") {
    return ".png";
  }

  return ".png";
}

export async function generateGeminiAssets({
  slides,
  style,
  outDir,
  primaryModel = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image-preview",
  fallbackModel = process.env.GEMINI_IMAGE_FALLBACK_MODEL || "gemini-2.5-flash-image",
}) {
  const apiKey = getApiKey();
  const resolvedOutDir = path.resolve(process.cwd(), outDir);

  await fs.mkdir(resolvedOutDir, { recursive: true });

  const results = [];

  for (const slide of slides) {
    const combinedPrompt = buildPrompt(style, slide.prompt);
    let json;
    let imagePart;
    let selectedModel = primaryModel;

    try {
      json = await callModel({
        model: primaryModel,
        prompt: combinedPrompt,
        apiKey,
      });
      imagePart = findImagePart(json);
    } catch (error) {
      json = { error: String(error) };
    }

    if (!imagePart) {
      selectedModel = fallbackModel;
      json = await callModel({
        model: fallbackModel,
        prompt: combinedPrompt,
        apiKey,
      });
      imagePart = findImagePart(json);
    }

    if (!imagePart) {
      throw new Error(
        `No image returned for ${slide.name}: ${JSON.stringify(json).slice(0, 1200)}`,
      );
    }

    const bytes = Buffer.from(imagePart.inlineData.data, "base64");
    const mimeType = imagePart.inlineData.mimeType || imagePart.inlineData.mime_type;
    const filePath = path.join(resolvedOutDir, `${slide.name}${extensionForMimeType(mimeType)}`);
    await fs.writeFile(filePath, bytes);

    results.push({
      name: slide.name,
      prompt: slide.prompt,
      model: selectedModel,
      mimeType,
      filePath,
    });
  }

  return results;
}
