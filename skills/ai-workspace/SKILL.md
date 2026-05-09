---
name: ai-workspace
description: >-
  Create, review, audit, and validate AI workspaces for agent hosts such as
  Codex, Copilot, Gemini, and similar desktop or CLI runtimes. Use when the user
  asks to design an agent-ready repo, scaffold AGENTS.md and process contracts,
  create an API-backed or domain knowledge workspace, audit AGENTS.md or
  SKILL.md quality, or improve how a repo exposes behavior to coding agents.
---

# AI Workspace

Create or review workspaces operated by agent hosts and humans.

An AI workspace makes behavior visible through files:

- `AGENTS.md` or host-equivalent root instructions;
- `process/` contracts for workspace-level workflows;
- optional `skills/` for host-discoverable reusable workflows;
- optional `scripts/` only for deterministic logic that host tools cannot do well;
- durable `data/`, `artifacts/`, or `outputs/`;
- a simple validation flow.

Prefer `AGENTS.md + process/` by default.

Add skills only when host skill discovery is useful.

## Mode

Classify the request first:

- Create: design, scaffold, patch, or improve a workspace.
- Review/audit: inspect and report gaps. Stay read-only.
- Validate: run or describe checks and say what passed.

Mixed request order:

1. Review current state.
2. Explain gaps.
3. Edit only the requested parts.

## Architecture Choice

Choose the smallest structure that works.

Root/process workspace:

```txt
AGENTS.md
process/
data/ or artifacts/
```

Use this when `AGENTS.md` and process files are enough.

API-backed workspace:

```txt
AGENTS.md
process/api.yaml
process/api.md
data/
```

Use this when the workspace calls an external API.
Add `scripts/` only when `AGENTS.md` or `process/*.md` references them.

Optional skill wrapper:

```txt
skills/<skill-name>/SKILL.md
skills/<skill-name>/references/
skills/<skill-name>/scripts/
skills/<skill-name>/fixtures/
```

Use this only when a workflow benefits from host skill discovery,
reuse, packaging, or a triggerable entry point.

Do not create `README.md`.
Use `AGENTS.md` and `process/*.md` for workspace contracts.

Use minimal generated docs:

- base `AGENTS.md` must not mention skills, scripts, API files, or docs;
- add API rules only when API files are created;
- add script rules only when script files are created.

## Creation Flow

Treat natural-language creation requests as actionable.
If the request names the domain, use it.
Ask the domain question only when the domain is missing.

Before writing files:

- inspect existing repo conventions;
- identify the host or host family;
- define purpose and non-goals;
- state host capability assumptions;
- ask what domain the knowledge base is for only if missing;
- allow the user to skip domain setup;
- define durable artifact paths;
- define the smallest useful validation flow.

When creating a knowledge base:

- use the same human language as the user's request;
- auto-detect vocabulary for category, layer, object type, and object ID labels;
- create `AGENTS.md`, `process/`, `data/`, and `artifacts/`;
- create layer process files when a domain is known;
- create `process/data.md` with the object-first path formula;
- create concrete object folders only for objects named by the user;
- do not invent object IDs just to fill the tree.

Use:

- `references/creation-rubric.md` for creation checks;
- `references/domain-knowledge-rubric.md` only when a domain is supplied;
- `templates/AGENTS.md` for root instructions;
- `templates/api-guide.md` for API-backed process guidance;
- `templates/domain-knowledge-contract.md` for domain knowledge;
- `templates/data-contract.md` for knowledge folder contracts;
- layer templates for the semantic layers below.

Do not create generic file I/O or web-fetch scripts.
Do not create Python scripts by default.
Use the host's file, shell, and web tools unless a script adds real value.

## Domain Knowledge

Ask:

```txt
What domain should this knowledge base serve?
```

Accept a domain or `skip`.

If the user already supplied a domain, do not ask again.

If skipped:

- do not create layer process files.

If supplied, create domain-shaped contracts:

```txt
process/<memory-layer>.md
process/<tension-layer>.md
process/<insight-layer>.md
process/<action-layer>.md
```

Layer meaning:

- `memory`: durable object knowledge.
- `tension`: unresolved pressure, risk, contradiction, or opportunity.
- `insight`: current interpretation and consequence.
- `action`: local recommended next moves.

Use those English names as semantic defaults only.
In created workspaces, localize layer names, object types, categories,
section headings, and path segments to the user's detected language.

Keep a vocabulary map in `process/data.md` or the domain contract.
Use stable path names once chosen.

Actions are not external tasks or writes unless the user approves the exact
external write.

## API Workspaces

For API-backed workspaces:

- use `process/api.yaml` as the route and schema source of truth;
- use `process/api.md` for auth, route selection, error handling, and writes;
- load secrets from environment files, not chat history;
- never print or persist tokens or auth headers;
- require explicit approval before external writes;
- save durable raw responses under a documented `data/` path.

Use scripts only when deterministic code is materially better than host tools,
such as pagination, joins, normalization, validation, artifact generation, or
repeated processing.

Do not require Python. Use the smallest runtime already natural to the repo.

## File Ownership

Workspace-level files:

- `AGENTS.md`: always-on host instructions.
- `process/`: workspace-level operating contracts.
- `scripts/`: only when referenced by `AGENTS.md` or `process/*.md`.
- `data/`, `artifacts/`, `outputs/`: durable or generated outputs.

Skill-level files:

- `skills/<skill-name>/SKILL.md`: triggerable workflow.
- `skills/<skill-name>/references/`: long skill guidance.
- `skills/<skill-name>/scripts/`: scripts referenced by that skill.
- `skills/<skill-name>/fixtures/`: optional examples or script inputs.

Do not move workspace-level process files or scripts into a skill folder.

Do not move skill-owned artifacts into the repo root.

Generated file maps must be exact.
Do not reference `skills/`, `scripts/`, `.docs/`, or `docs/`
unless they exist and are part of the workspace contract.
Do not create or reference `README.md`.

If a folder is optional, omit it from generated docs by default.

## Script Rules

Scripts are behind-the-scenes implementation details.
Most workspaces should not need them.

Execution path:

```txt
user intent -> host -> LLM -> host tool call -> referenced script
```

Users should not run scripts directly.

Scripts must:

- accept structured inputs;
- be deterministic where feasible;
- be host-invokable;
- document what is script-owned and what remains LLM-owned.

## Artifact Rules

For knowledge bases, use object-first paths:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

Required semantic layers:

```txt
sources
memory
tension
insight
action
```

Localize filenames for those meanings unless the user or existing repo uses
English.

Do not use:

```txt
data/<object>/<yyyy>/<mm>/<dd>/<localized-category>.md
```

That path loses object type, object ID, and layer meaning.

If category is needed, treat it as a view:

```txt
data/<localized-category>/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
```

Always define:

- path formula;
- date source;
- object type and ID source;
- detected language;
- vocabulary map;
- allowed layers;
- parent folder creation;
- overwrite or version rule.

## Review / Audit

Classify the target:

- file: one `AGENTS.md`, `SKILL.md`, prompt, script, or reference;
- process: one or more `process/` files;
- skill: one skill directory;
- workspace: full repo-level agent surface.

Inspect only what the target requires.

Use `references/audit-rubric.md`.

Report findings first.

Do not redesign unless the user asks.

## Validation

Validation is stronger than inspection.

Do not say validated unless behavior was checked.

Levels:

- structural: required files exist;
- contract: instructions and artifacts agree;
- execution: the main host flow ran;
- artifact: outputs match the documented contract.

Say:

- what was inspected;
- what ran;
- what passed;
- what remains unverified.

## Reports

Audit report:

```txt
Summary
Scope
Inspected Files
Findings
Gaps
Validation Status
Recommended Next Steps
```

Creation report:

```txt
Summary
Files Created Or Changed
Host Capability Assumptions
Workspace Layout
Process Contracts
Optional Skills
Validation Status
Remaining Gaps
```
