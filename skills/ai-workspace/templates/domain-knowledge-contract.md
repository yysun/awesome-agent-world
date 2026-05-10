# Domain Knowledge Contract

Use the same human language as the user's workspace request.
Auto-detect vocabulary for category, object type, and layer names.

## Domain

This knowledge base serves:

- <domain>

It supports decisions about:

- <decision>;
- <decision>.

It must not:

- <non-goal>;
- <unsafe behavior>.

## Objects

Object types:

- <localized-object-type>;
- <localized-object-type>.

Object ID source:

- <source of stable IDs>.

## Evidence

Allowed sources:

- <source type>;
- <source type>.

Dated raw evidence path, when needed:

```txt
data/<source-kind>/<yyyy>/<mm>/<dd>/<slug>.json
```

Use dated raw evidence paths only when source evidence changes over time.
For static source docs, document stable source paths instead:

```txt
<stable-source-path>
```

Do not synthesize from unsupported chat history.

## Layer Paths

Use dated object-first paths when history, audit trail, or time windows matter:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-sources-layer>.md
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-memory-layer>.md
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-tension-layer>.md
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-insight-layer>.md
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-action-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-memory-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-tension-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-insight-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-action-layer>.md
```

Use only `current/` when latest state is enough.
Document the date-tracking decision in `process/data.md`.

Do not use `data/<object>/<yyyy>/<mm>/<dd>/<localized-category>.md`.
Create concrete object folders only when object IDs are known.
Document the formula in `process/data.md`.

If category is needed, treat it as a view before object type:

```txt
data/<localized-category>/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
```

## Vocabulary

Map semantic layer meanings to local filenames:

- sources: `<localized-sources-layer>.md`
- memory: `<localized-memory-layer>.md`
- tension: `<localized-tension-layer>.md`
- insight: `<localized-insight-layer>.md`
- action: `<localized-action-layer>.md`

## Frontmatter

Object layer files must include:

- `object_type`
- `object_id`
- `layer`
- `generated_at`
- `source_date`
- `ttl`
- `expires_at`
- `status`
- `source_files`

Use localized values for `object_type` and `layer`.

Seed layer files without object IDs must include:

- `layer`
- `generated_at`
- `source_date`
- `ttl`
- `expires_at`
- `status`
- `source_files`

## TTL

- sources layer: no TTL
- memory layer: `P30D`
- tension layer: `P7D`
- insight layer: `P7D`
- action layer: `P3D`

Expired `current/` files are historical context only.
