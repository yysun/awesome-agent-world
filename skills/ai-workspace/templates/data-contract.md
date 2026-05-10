# Data Contract

Use the same human language as the user's workspace request.
Auto-detect vocabulary for category, object type, and layer names.
Create this contract as `process/data.md`.

## Purpose

The `data/` folder stores durable knowledge artifacts for:

- <domain>

## Object-First Paths

Use dated snapshots when history, audit trail, or time windows matter:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

Use only `current/` when latest state is enough:

```txt
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

Use seed knowledge paths only for domain-level source docs that are not object
instances. For one knowledge base, use flat layer files:

```txt
data/<localized-layer>.md
```

Mention that multiple knowledge bases are supported.
Use nested seed paths only when the user asks for multiple knowledge bases:

```txt
data/<localized-knowledge-base-a>/<localized-layer>.md
data/<localized-knowledge-base-b>/<localized-layer>.md
```

For each requested knowledge base, define:

- scope;
- authoritative sources;
- layer filename mapping;
- read routing;
- update rule.

Document why no object ID is used.

## Date Tracking

State whether dated folders are required.

Use dated folders when:

- source evidence changes over time;
- snapshots must be preserved;
- time windows affect interpretation;
- `current/` needs traceable history.

If omitted, explain why stable or current-only paths are enough.

## Vocabulary

Map semantic layer meanings to local filenames:

- sources: `<localized-sources-layer>.md`
- memory: `<localized-memory-layer>.md`
- tension: `<localized-tension-layer>.md`
- insight: `<localized-insight-layer>.md`
- action: `<localized-action-layer>.md`

Object types, categories, headings, and path segments use the detected
workspace language.

## Folder Creation

Create parent folders when writing an artifact.
Create concrete object folders only when the object ID is known.

Do not invent object IDs.
Do not use:

```txt
data/<object>/<yyyy>/<mm>/<dd>/<localized-category>.md
```

That path loses object type, object ID, and layer meaning.

## Current Files

`current/` contains the latest approved layer files.

Expired `current/` files are historical context only.
