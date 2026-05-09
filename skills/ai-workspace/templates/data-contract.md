# Data Contract

Use the same human language as the user's workspace request.
Auto-detect vocabulary for category, object type, and layer names.
Create this contract as `process/data.md`.

## Purpose

The `data/` folder stores durable knowledge artifacts for:

- <domain>

## Object-First Paths

Use:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

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
