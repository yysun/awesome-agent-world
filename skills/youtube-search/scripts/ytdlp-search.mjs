#!/usr/bin/env node
import { spawn } from "node:child_process";

function die(msg) {
  process.stderr.write(msg + "\n");
  process.exit(2);
}

function getArg(name, def = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : def;
}

function clampInt(value, min, max, fallback) {
  const n = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function trunc(s, max) {
  if (!s) return "";
  s = String(s);
  return s.length <= max ? s : s.slice(0, max - 1) + "…";
}

const q = getArg("q");
if (!q) die('Usage: node scripts/ytdlp-search.mjs --q "<keywords>" [--n 5]');

const n = clampInt(getArg("n", "5"), 1, 20, 5); // max 20 items
const searchUrl = `ytsearch${n}:${q}`;

// Minimal upstream output: flat + print only title & webpage_url
const args = [
  "--flat-playlist",
  "--no-warnings",
  "--no-progress",
  "--print",
  "%(title)s\t%(webpage_url)s",
  searchUrl,
];

const p = spawn("yt-dlp", args, { stdio: ["ignore", "pipe", "pipe"] });

// Keep subprocess buffers bounded too
const MAX_SUBPROC_OUT = 16_000; // plenty for 20 lines
const MAX_SUBPROC_ERR = 1_000;  // keep tiny

let out = "";
let err = "";

p.stdout.on("data", (d) => {
  out += d;
  if (out.length > MAX_SUBPROC_OUT) {
    err += "\n[wrapper] subproc stdout too large; aborting.";
    try { p.kill("SIGKILL"); } catch {}
  }
});

p.stderr.on("data", (d) => {
  err += d;
  if (err.length > MAX_SUBPROC_ERR) err = err.slice(-MAX_SUBPROC_ERR);
});

p.on("close", (code) => {
  const lines = out
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Build results with conservative truncation so JSON stays small.
  // (Further trimmed below if still > 2KB.)
  let results = [];
  for (const line of lines) {
    const [nameRaw, urlRaw] = line.split("\t");
    const name = trunc(nameRaw?.trim(), 80);
    const url = trunc(urlRaw?.trim(), 220);
    if (!name || !url) continue;
    results.push({ name, url });
    if (results.length >= 20) break;
  }

  // Only include stderr on failure to save tokens.
  const base = code === 0
    ? { ok: true, results }
    : { ok: false, results, stderr: trunc(err.trim(), 400) };

  // Hard cap final JSON to 2000 bytes by dropping items, then truncating more if needed.
  const MAX_JSON_BYTES = 2000;

  const fit = () => {
    let json = JSON.stringify(base);
    if (Buffer.byteLength(json, "utf8") <= MAX_JSON_BYTES) return json;

    // Drop results until it fits
    while (base.results.length > 0) {
      base.results.pop();
      json = JSON.stringify(base);
      if (Buffer.byteLength(json, "utf8") <= MAX_JSON_BYTES) return json;
    }

    // Still too big? (likely stderr) truncate more aggressively
    if (base.stderr) base.stderr = trunc(base.stderr, 120);
    json = JSON.stringify(base);

    // Absolute last resort: remove stderr
    if (Buffer.byteLength(json, "utf8") > MAX_JSON_BYTES && base.stderr) {
      delete base.stderr;
      json = JSON.stringify(base);
    }
    return json;
  };

  const payload = fit();
  process.stdout.write(payload);
  process.exit(code ?? 1);
});