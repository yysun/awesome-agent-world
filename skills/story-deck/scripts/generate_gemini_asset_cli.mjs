#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { generateGeminiAssets } from "./gemini_asset_lib.mjs";

function usage() {
  console.error(
    [
      "Usage:",
      "  node scripts/generate_gemini_asset_cli.mjs \\",
      "    --input /path/to/deck.json \\",
      "    --out-dir /path/to/output-dir",
      "",
      "Input JSON format:",
      "  {",
      '    "style": "shared style prompt applied to every slide",',
      '    "slides": [{"name":"01-cover","prompt":"..."}]',
      "  }",
      "",
      "Optional:",
      "  --primary-model <model-id>",
      "  --fallback-model <model-id>",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    const value = argv[index + 1];

    if (token === "--input") {
      parsed.inputPath = value;
      index += 1;
      continue;
    }

    if (token === "--out-dir") {
      parsed.outDir = value;
      index += 1;
      continue;
    }

    if (token === "--primary-model") {
      parsed.primaryModel = value;
      index += 1;
      continue;
    }

    if (token === "--fallback-model") {
      parsed.fallbackModel = value;
      index += 1;
      continue;
    }

    if (token === "--help" || token === "-h") {
      parsed.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  return parsed;
}

async function readInput(inputPath) {
  const resolvedPath = path.resolve(process.cwd(), inputPath);
  const raw = await fs.readFile(resolvedPath, "utf8");
  const input = JSON.parse(raw);

  if (!input?.style || typeof input.style !== "string" || !input.style.trim()) {
    throw new Error('Input JSON must include a non-empty "style" string.');
  }

  if (!Array.isArray(input.slides) || input.slides.length === 0) {
    throw new Error('Input JSON must include a non-empty "slides" array.');
  }

  for (const slide of input.slides) {
    if (!slide?.name || !slide?.prompt) {
      throw new Error('Each slide must include "name" and "prompt".');
    }
  }

  return { style: input.style, slides: input.slides };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    usage();
    process.exit(0);
  }

  if (!args.inputPath || !args.outDir) {
    usage();
    throw new Error("Missing required arguments: --input and --out-dir.");
  }

  const { style, slides } = await readInput(args.inputPath);
  const results = await generateGeminiAssets({
    slides,
    style,
    outDir: args.outDir,
    primaryModel: args.primaryModel,
    fallbackModel: args.fallbackModel,
  });

  for (const result of results) {
    console.log(`saved ${result.filePath} via ${result.model}`);
  }
}

await main();
