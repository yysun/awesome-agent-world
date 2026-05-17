---
name: ai-workspace
description: >-
  Create, review, audit, and validate AI workspaces for agent hosts such as
  Codex, Copilot, Gemini, and similar desktop or CLI runtimes. Use when the user
  asks to design an agent-ready repo, scaffold AGENTS.md and event handlers,
  create an API-backed or domain knowledge workspace, audit AGENTS.md or
  SKILL.md quality, or improve how a repo exposes behavior to coding agents.
---

# AI Workspace

Create or review AI workspaces operated by agent hosts and humans.

An AI workspace makes behavior visible through files:

- `AGENTS.md` or host-equivalent root instructions as the workspace contract;
- `data/` for layered durable knowledge state;
- `process/` for event handlers that create or update state;
- `output/` for generated human-facing views and deliverables;
- optional `skills/` for host-discoverable reusable workflows;
- optional `scripts/` only for deterministic logic that host tools cannot do
  well;
- a simple validation flow that proves the main event path works.

The default execution model borrows AppRun's event/data/handler shape:

```txt
event + current state -> event handler -> new or updated state
```

Events can come from user requests, cron/timer triggers, scheduled reviews, file
or data changes, API/webhook/input updates, validation runs, audit runs, or
manual operator decisions. Classify the event, load the smallest relevant
event handler defined under `process/`, read the necessary current state, perform
documented effects, then create or update state in `data/`, render `output/`, or
respond directly.

Prefer `AGENTS.md + data/ + process/ + output/` by default.

Add skills only when host skill discovery, reuse, packaging, or a triggerable
entry point is useful.

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

Choose the smallest structure that preserves the workspace contract.

Root/process workspace:

```txt
AGENTS.md
data/
process/
output/
```

Use this when root instructions, durable data, event handlers, and generated
outputs are enough.

API-backed workspace:

```txt
AGENTS.md
data/
process/api.yaml
process/api.md
process/<event-handler>.md
output/
```

Use this when event handlers call an external API as a documented effect.
Add `scripts/` only when `AGENTS.md` or `process/*.md` references them.

Optional skill wrapper:

```txt
skills/<skill-name>/SKILL.md
skills/<skill-name>/references/
skills/<skill-name>/scripts/
skills/<skill-name>/fixtures/
```

Use this only when a workflow benefits from host skill discovery, reuse,
packaging, or a triggerable entry point. Do not hide workspace event handlers
inside a skill folder.

Do not create `README.md`.
Use `AGENTS.md` and `process/*.md` for workspace contracts.

Use minimal generated docs:

- base `AGENTS.md` must describe only real workspace folders and handlers;
- add API rules only when API files are created;
- add script rules only when script files are created;
- do not mention `skills/`, `scripts/`, API files, docs, or optional outputs
  unless they exist and are part of the workspace contract.

## Workspace Contract

`AGENTS.md` is the always-on workspace contract: the root agreement that tells
an agent host what this workspace is for, where state lives, which handlers own
behavior, and what outputs or effects are allowed.

It must define:

- workspace purpose and non-goals;
- the workspace shape: `AGENTS.md + data/ + process/ + output/`;
- the execution model: `event + current state -> event handler -> new or
  updated state`;
- host assumptions;
- where durable knowledge, behavior rules, and generated views belong;
- how to choose an event handler;
- when handlers may write to `data/` or `output/`;
- external effect and write approval boundaries;
- validation expectations.

Host assumptions:

- the agent host can read workspace files;
- the agent host can write workspace files when requested or when required by
  the selected event handler;
- the agent host can create parent folders;
- the agent host can fetch web content when needed;
- the agent host can call documented tools and APIs when available.

Do not assume a database, background worker, web server, browser UI, or external
service unless the workspace explicitly documents it.

## Event Handlers

Event handlers are process files under `process/`.
They read current state from `data/`, perform documented effects, and produce
new or updated state, usually persisted back to `data/`. They may also render
human-facing output under `output/` or respond directly.

`process/` contains event handlers, not passive documentation.

Each handler should make these parts explicit:

- event sources, event names, or trigger language;
- required `data/` reads;
- allowed `data/` writes;
- state created or updated by the handler;
- allowed tool/API effects;
- output render path, if any;
- direct response behavior;
- validation checks;
- escalation or approval gates.

Use one handler per meaningful workflow boundary. Examples:

```txt
process/ingest.md
process/update.md
process/report.md
process/review.md
process/api.md
process/data.md
process/<object-type>.md
```

Do not create process files just to fill a tree. Create them when behavior,
state transitions, source policy, output rendering, or external effects need a
stable contract.

## Creation Flow

Treat natural-language creation requests as actionable.
If the request names the domain, use it.
Ask the domain question only when the domain is missing.

Before writing files:

- inspect existing repo conventions;
- identify the host or host family;
- define purpose and non-goals;
- state host capability assumptions;
- map common user requests into events;
- define event handlers for those events;
- ask what domain the knowledge base is for only if missing;
- allow the user to skip domain setup;
- define durable `data/` paths;
- define `output/` paths for generated reports, decks, reviews, or other
  deliverables;
- define report/deck trigger language and scope mapping when outputs matter;
- define the smallest useful validation flow.

When creating a knowledge base:

- use the same human language as the user's request;
- auto-detect vocabulary for category, layer, object type, and object ID labels;
- create `AGENTS.md`, `data/`, `process/`, and `output/`;
- create layer event handlers when a domain is known;
- create `process/data.md` with the object-first path formula;
- create a runtime handler when source-to-layer flow matters;
- create object-type handlers when object types are known;
- create seed knowledge files when source docs are domain-level, not
  object-level;
- create a reporting handler when users need natural-language reports, decks, or
  exportable summaries;
- create concrete object folders only for objects named by the user;
- do not invent object IDs just to fill the tree.

Use:

- `references/creation-rubric.md` for creation checks;
- `references/domain-knowledge-rubric.md` only when a domain is supplied;
- `templates/AGENTS.md` for root instructions, but adapt it to the workspace
  shape;
- `templates/api-guide.md` for API-backed process guidance;
- `templates/domain-knowledge-contract.md` for domain knowledge;
- `templates/data-contract.md` for knowledge folder contracts;
- `templates/runtime-process.md` for source-to-layer workflow handlers;
- `templates/object-process.md` for object-type handlers;
- `templates/reporting-process.md` for natural-language report/deck handlers;
- `templates/report-artifact.md` for readable reports;
- `templates/deck-outline.md` for deck-ready outlines;
- layer templates for semantic layer handlers.

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

- do not create layer event handlers.

If supplied, create domain-shaped handlers:

```txt
process/<memory-layer>.md
process/<tension-layer>.md
process/<insight-layer>.md
process/<action-layer>.md
```

Create `process/<runtime-layer>.md` only when source-to-layer flow matters.
Create `process/<object-folder>/<object-type>.md` only when object types are
known and need distinct rules.
Create `process/<reporting-layer>.md` when users can ask for reports,
presentations, reviews, summaries, or exportable status output in natural
language.

Layer meaning:

- `sources`: raw or summarized evidence with provenance.
- `memory`: durable object knowledge.
- `tension`: unresolved pressure, risk, contradiction, or opportunity.
- `insight`: current interpretation and consequence.
- `action`: local recommended next moves.

Use those English names as semantic defaults only.
In created workspaces, localize layer names, object types, categories, section
headings, and path segments to the user's detected language.

Keep a vocabulary map in `process/data.md` or the domain contract.
Use stable path names once chosen.

If source docs seed the domain but are not object instances, create a flat seed
knowledge path by default:

```txt
data/<localized-layer>.md
```

Mention that multiple knowledge bases are supported.
Use nested seed paths only when the user asks for multiple knowledge bases:

```txt
data/<localized-knowledge-base-a>/<localized-layer>.md
data/<localized-knowledge-base-b>/<localized-layer>.md
```

Each requested knowledge base needs:

- a stable localized name;
- source document rules;
- layer filename mapping;
- update and overwrite rules;
- routing rules for when to read it.

Do not invent an object ID for seed knowledge.

Actions are not external tasks or writes unless the user approves the exact
external write or the selected event handler explicitly permits the local write.

## Reporting And Output

Support natural-language reporting when the workspace has durable knowledge.

Users may ask for reports with phrases such as:

```txt
report the current status
make a presentation
汇报当前情况
做一份复盘
输出给业务看的 deck
```

Treat each report request as an event.
Map the event into an explicit scope before reading files:

- current status: latest maintained `current/` layers or seed knowledge;
- single object: one object type and object ID;
- object group: named objects, watchlists, cohorts, categories, or queues;
- date or period review: dated source and layer files for a time window;
- custom question: the minimum source and layer set needed to answer it.

If the scope is ambiguous, choose the smallest useful scope and state it.
Ask only when the report could materially change audience, object set, or
external write behavior.

Reports, decks, reviews, and summaries belong under `output/`.

Default paths:

```txt
output/reports/<yyyy>/<mm>/<dd>/<scope>.md
output/decks/<yyyy>/<mm>/<dd>/<scope>.md
```

Use repo-native export routes:

- Markdown report only when no export tooling exists.
- Marp/HTML/PDF when the repo already uses markdown slide export.
- PPTX when the workspace or host has a presentation runtime.
- Script-backed export only when a deterministic exporter exists or is created
  for a real reason.

Create matching process and template files when reporting is part of the
workspace contract:

```txt
process/<reporting-layer>.md
templates/report-artifact.md
templates/deck-outline.md
```

Reporting event handlers must define:

- natural-language trigger phrases;
- scope mapping rules;
- required source and layer reads for each scope;
- audience and visible-language rules;
- report/deck section order;
- `output/` path and format;
- validation checks for readability and generated files.

Do not let reporting become a detached summary. It must preserve the chain:

```txt
sources -> memory -> tension -> insight -> action -> output
```

## API Workspaces

For API-backed workspaces:

- use `process/api.yaml` as the route and schema source of truth;
- use `process/api.md` for auth, route selection, error handling, effects, and
  writes;
- create `.env.example` for required variable names when env vars are needed;
- add `.env` to `.gitignore` when local secrets are expected;
- do not create a real `.env` unless the user supplies non-secret values;
- load secrets from environment files, not chat history;
- never print or persist tokens or auth headers;
- require explicit approval before external writes unless the event handler
  explicitly documents a safe local write;
- save durable raw responses under a documented `data/` path.

Use scripts only when deterministic code is materially better than host tools,
such as pagination, joins, normalization, validation, artifact generation, or
repeated processing.

Do not require Python. Use the smallest runtime already natural to the repo.

## File Ownership

Workspace-level files:

- `AGENTS.md`: always-on workspace contract.
- `data/`: durable source evidence and knowledge state.
- `process/`: event handlers and workspace-level operating contracts.
- `process/<reporting-layer>.md`: report/deck scope mapping and render flow
  when output workflows exist.
- `output/`: generated human-facing views, deliverables, and scratch render
  targets.
- `output/reports/` and `output/decks/`: readable, exportable outputs when
  reporting is part of the workspace.
- `scripts/`: only when referenced by `AGENTS.md` or `process/*.md`.

Skill-level files:

- `skills/<skill-name>/SKILL.md`: triggerable workflow.
- `skills/<skill-name>/references/`: long skill guidance.
- `skills/<skill-name>/scripts/`: scripts referenced by that skill.
- `skills/<skill-name>/fixtures/`: optional examples or script inputs.

Do not move workspace-level process files or scripts into a skill folder.

Do not move skill-owned artifacts into the repo root.

Generated file maps must be exact.
Do not reference `skills/`, `scripts/`, `.docs/`, or `docs/` unless they exist
and are part of the workspace contract.
Do not create or reference `README.md`.

Create or reference source-doc folders only when the user supplies source docs,
asks for them, or the existing workspace already uses them.

If a folder is optional, omit it from generated docs by default.

## Script Rules

Scripts are behind-the-scenes implementation details.
Most workspaces should not need them.

Execution path:

```txt
event + current state -> event handler -> host tool call -> referenced script -> new or updated state
```

Users should not run scripts directly.

Scripts must:

- accept structured inputs;
- be deterministic where feasible;
- be host-invokable;
- document what is script-owned and what remains LLM-owned;
- document which handler invokes them.

## Data And Output Rules

For knowledge bases, use object-first data paths:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

Use dated folders only when the workspace needs history:

- source evidence changes over time;
- snapshots must be preserved;
- time windows affect interpretation;
- `current/` needs a traceable source snapshot.

If date tracking is not needed, use the stable seed path or `current/` path and
document why dated snapshots are omitted.

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
- whether date tracking is required;
- date source when dated folders are used;
- object type and ID source;
- detected language;
- vocabulary map;
- allowed layers;
- parent folder creation;
- overwrite or version rule.

For reports and decks, always define:

- natural-language trigger phrases;
- scope mapping;
- source/layer read set;
- output format;
- export chain;
- `output/` path;
- validation check.

## Review / Audit

Classify the target:

- file: one `AGENTS.md`, `SKILL.md`, prompt, script, or reference;
- process: one or more `process/` files;
- output flow: report/deck scope mapping, templates, and export chain;
- skill: one skill directory;
- workspace: full repo-level agent surface.

Inspect only what the target requires.

Use `references/audit-rubric.md` when it is relevant, but audit against this
workspace contract first.

Report findings first.

Audit for these workspace invariants:

- `AGENTS.md` defines `AGENTS.md + data/ + process/ + output/`;
- user requests, cron/timer triggers, scheduled reviews, data changes, API
  updates, validation runs, audit runs, and manual operator decisions are
  treated as events when they drive workspace behavior;
- `process/` files act as handlers, not generic docs;
- event handlers define event source or trigger language, data reads, state
  writes, effects, output paths, direct response behavior, and validation;
- durable knowledge is in `data/`;
- behavior rules are in `process/`;
- generated views and deliverables are in `output/`;
- external services are not assumed unless documented;
- external writes require explicit approval or a documented safe handler rule;
- file maps list only existing folders;
- validation proves an event-to-handler-to-state path, not just static
  structure.

Do not redesign unless the user asks.

## Validation

Validation is stronger than inspection.

Do not say validated unless behavior was checked.

Levels:

- structural: required files exist;
- contract: instructions, handlers, data paths, and output paths agree;
- execution: the main event ran through the selected event handler under
  `process/`;
- data: expected `data/` files were read or updated;
- output: expected `output/` files were created in the documented format and
  path;
- export: report/deck files were created in the documented export format and
  path.

Say:

- what was inspected;
- what event path was checked;
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
Event Model
Event Handlers
Data And Output Paths
Optional Skills
Validation Status
Remaining Gaps
```
