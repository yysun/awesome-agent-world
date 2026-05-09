# Domain Knowledge Rubric

Use this when creating a domain knowledge base.

Use the domain from the user's creation request when present.
Ask for the domain only when it is missing.
Write contracts in the same human language as the request.
Auto-detect vocabulary for categories, object types, and layers.

Allow:

- a specific domain;
- a short business context;
- "skip".

If skipped, do not create domain layers.

Create `process/data.md` with the object-first path formula.
Create concrete object folders only when object IDs are known.
Do not invent object IDs.

Use English layer names only as semantic defaults.
In created files, localize layer names and path segments unless the user asks
for English or the repo already uses English.

## 1. Domain Boundary

Required:

- domain name;
- object types;
- source evidence;
- decisions the knowledge should support;
- non-goals.

Examples:

- CRM: accounts, contacts, opportunities.
- Education: students, parents, classes, campuses.
- Property: tenants, leases, buildings, work orders.
- Support: customers, tickets, incidents, products.

Avoid:

- generic summaries;
- memory with no decision purpose;
- layers based only on chat history.

## 2. Layers

Create four default layers.

Memory:

- durable object knowledge;
- stable patterns;
- evidence-backed facts;
- reusable future context.

Tension:

- unresolved pressure;
- contradiction;
- risk;
- opportunity;
- decision friction.

Insight:

- current interpretation;
- business meaning;
- consequence;
- confidence.

Action:

- recommended next moves;
- preconditions;
- local checkbox tracking;
- no external write without approval.

## 3. Evidence

Required:

- allowed source types;
- raw evidence storage path;
- source files in frontmatter;
- rule against unsupported inference.

Recommended:

- source snapshot layer;
- source date;
- refresh rule for stale evidence.

## 4. Artifact Contract

Required path shape:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

Use object-first paths.

Do not use:

```txt
data/<object>/<yyyy>/<mm>/<dd>/<localized-category>.md
```

That path makes the layer ambiguous.

If category is needed, treat it as a view:

```txt
data/<localized-category>/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
```

Required semantic layers:

- sources;
- memory;
- tension;
- insight;
- action.

Document the localized filename for each semantic layer.

## 5. Frontmatter

Require:

- `object_type`
- `object_id`
- `layer`
- `generated_at`
- `source_date`
- `ttl`
- `expires_at`
- `status`
- `source_files`

## 6. TTL Defaults

Use these unless the domain needs different lifetimes:

- sources layer: no TTL
- memory layer: `P30D`
- tension layer: `P7D`
- insight layer: `P7D`
- action layer: `P3D`

Expired `current/` files are historical context only.

Refresh evidence before relying on them.

## 7. Action Safety

Actions are recommendations.

They are not external tasks, tickets, notes, or writes.

Before any external write:

- show the exact write request;
- ask for explicit approval;
- send only after approval;
- report the confirmed result.

## 8. Quality Bar

Strong:

- domain-shaped;
- evidence-backed;
- decision-oriented;
- durable where appropriate;
- explicit about uncertainty.

Weak:

- generic summary;
- unsupported judgment;
- no TTL;
- no source path;
- no action boundary.
