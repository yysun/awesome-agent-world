# AI Workspace Creation Rubric

Use this when creating or patching an AI workspace.

## 1. Scope

Required:

- purpose;
- non-goals;
- target host or host family;
- final decision owner;
- durable outputs.

Recommended:

- common tasks;
- risks and escalation points;
- optional domain knowledge question.

Avoid:

- vague autonomy claims;
- behavior stored only in chat;
- broad workspace rules with no boundary.

Use the user's language.
If the request is in Chinese, write the workspace contracts in Chinese.
If the request is in English, write them in English.
Auto-detect vocabulary for categories, object types, and layers.
Use English only when the user asks or the existing repo already does.

## 2. Architecture

Choose the smallest working shape.

Root/process workspace:

- `AGENTS.md`;
- `process/`;
- `data/` or `artifacts/`.

API-backed workspace:

- `AGENTS.md`;
- `process/api.yaml`;
- `process/api.md`;
- `data/`.

Optional skill wrapper:

- `skills/<skill-name>/SKILL.md`;
- skill-owned references, scripts, and fixtures.

Avoid:

- requiring skills when `AGENTS.md + process/` is enough;
- hiding workspace contracts inside skills;
- duplicating root instructions across host files.
- generated file maps that mention non-existing folders.
- base `AGENTS.md` templates with optional sections left in place.

## 3. Process Contracts

Create `process/` files when behavior is complex.

Use process files for:

- API access;
- auth and secret handling;
- write gates;
- domain knowledge layers;
- artifact lifecycle;
- refresh rules.

Avoid:

- inventing API routes;
- leaving write approval in prose only;
- mixing facts, judgment, and action in one contract.

## 4. Domain Knowledge

Ask:

```txt
What domain should this knowledge base serve?
```

Allow `skip`.
Do not ask again if the request already names the domain.

If skipped:

- do not create layer process files.

If supplied, create:

- `AGENTS.md`;
- `process/`;
- `data/`;
- `artifacts/`;
- localized layer process files;
- `process/data.md` with the object-first path formula;
- a vocabulary map for semantic layer meanings;
- domain artifact contract;
- TTL and frontmatter rules.

Create concrete object folders only for objects named by the user.
Do not invent object IDs.

Use:

- `domain-knowledge-rubric.md`;
- `templates/domain-knowledge-contract.md`;
- layer process templates.

Avoid:

- generic layer language;
- synthesis without source evidence;
- actions that silently become external tasks.

## 5. Scripts

Scripts are optional.
Most workspaces should not need scripts.

Use scripts for:

- schemas;
- validation;
- normalization;
- artifact generation;
- repeated structured processing.

Do not use scripts for:

- generic file reads;
- generic file writes;
- directory creation only;
- generic web fetch.

Do not create Python scripts by default.
Use the smallest runtime already natural to the repo.

Location:

- root `scripts/` for scripts referenced by `AGENTS.md` or `process/*.md`;
- skill `scripts/` for scripts referenced only by that skill.

Do not mention `scripts/` in generated docs unless the folder exists.

## 6. Skills

Skills are optional.

Create a skill only when:

- host skill discovery is useful;
- the workflow is reusable across contexts;
- packaging or sharing matters;
- a triggerable entry point helps.

Avoid:

- creating a skill by default;
- one huge skill for unrelated work;
- vague frontmatter descriptions;
- root-level skill artifacts.
- mentioning `skills/` in generated docs when no skill folder exists.

## 7. Generated Docs

Required:

- file maps list only folders that exist;
- API sections appear only when API files exist;
- script sections appear only when scripts exist;
- no `README.md` is created.

Avoid:

- references to `.docs/` or `docs/` unless those folders exist;
- references to `skills/` unless a skill wrapper exists;
- references to `scripts/` unless scripts exist.

## 8. Artifacts

Required:

- canonical output location;
- path formula;
- overwrite or versioning rule;
- durable vs temporary distinction.

For knowledge bases, prefer:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

Avoid:

- ad hoc output folders;
- ambiguous `category.md` layer names;
- English path segments in a non-English workspace;
- overwriting without permission.

## 9. Validation

Required:

- simple host-executable validation flow;
- validation level;
- unverified gaps.

Avoid:

- claiming validation after inspection only;
- asking users to run scripts directly;
- validation that skips the main path.

## Verdict

- strong: explicit, contained, discoverable, validated;
- workable: usable, but light on validation;
- fragile: unclear, scattered, or chat-dependent;
- overbuilt: more structure than the workflow justifies.
