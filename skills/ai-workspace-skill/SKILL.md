---
name: ai-workspace-skill
description: >-
  Scaffold, review, audit, and validate skill-based AI workspaces for agent
  hosts. Use when the user wants an AI workspace built around SKILL.md plus
  event handlers, references, templates, scripts, data, and output
  instead of AGENTS.md; when they want knowledge distillation workflows
  packaged as a reusable skill; or when they want to convert an AGENTS.md
  workspace pattern into a skill-owned workspace.
---

# AI Workspace Skill

Create or review AI workspaces whose workspace contract is a skill.

This skill is for the skill-based version of an AI workspace:

- `SKILL.md` is the triggerable workspace contract.
- `data/` holds durable source evidence and state.
- `process/` holds event handlers that create or update state.
- `output/` holds generated reports, decks, reviews, and other deliverables.
- `references/` holds long contracts, rubrics, source policy, and domain rules.
- `templates/` holds reusable output skeletons.
- `scripts/` exists only for deterministic work the host should not improvise.

The default execution model borrows AppRun's event/data/handler shape:

```txt
event + current state -> event handler -> new or updated state
```

Events can come from user requests, cron/timer triggers, scheduled reviews, file
or data changes, API/webhook/input updates, validation runs, audit runs, or
manual operator decisions. Classify the event, load the smallest relevant event
handler defined under `process/`, read the necessary current state, perform
documented effects, then create or update state in `data/`, render `output/`, or
respond directly.

Do not default to `AGENTS.md`.
Use `AGENTS.md` only as source material, compatibility glue, or an explicit
user-requested wrapper.

## Mode

Classify the request first:

- Scaffold: create a new skill-based AI workspace.
- Improve: patch an existing skill workspace.
- Audit: inspect and report gaps. Stay read-only.
- Validate: run checks and say exactly what passed.
- Convert: translate an AGENTS.md/process workspace into a skill-owned
  workspace shape.

Mixed request order:

1. Inspect the target repo and nearby examples.
2. Decide the skill workspace shape.
3. Explain material gaps or tradeoffs.
4. Edit only skill-owned files unless the user requested repo-level changes.

## Architecture

Choose the smallest skill-based workspace that works.

Minimal skill workspace:

```txt
.agents/skills/<workspace-skill>/SKILL.md
process/
data/
output/
```

Use this when the workflow is simple, but durable data still needs an explicit
workspace event handler.

Reference-backed knowledge workspace:

```txt
.agents/skills/<workspace-skill>/SKILL.md
.agents/skills/<workspace-skill>/references/audit-rubric.md
.agents/skills/<workspace-skill>/templates/
process/<memory-layer>.md
process/<tension-layer>.md
process/<insight-layer>.md
process/<action-layer>.md
process/<runtime-layer>.md
process/<object-folder>/<object-type>.md
data/<knowledge-base>/<layer>.md
output/
```

Use this for knowledge distillation, review workflows, recurring analysis, or
domain work where the workspace should look like the PMS pattern but be
triggered by a skill instead of root `AGENTS.md`.

Extended package with skill-owned references:

```txt
.agents/skills/<workspace-skill>/SKILL.md
.agents/skills/<workspace-skill>/references/workflow-contract.md
.agents/skills/<workspace-skill>/references/source-policy.md
.agents/skills/<workspace-skill>/references/validation.md
.agents/skills/<workspace-skill>/templates/
process/
data/
output/
```

Use this when some rules are portable skill guidance while `process/` remains
the workspace-local event-handler layer.

Script-backed skill workspace:

```txt
.agents/skills/<workspace-skill>/SKILL.md
.agents/skills/<workspace-skill>/references/
.agents/skills/<workspace-skill>/templates/
.agents/skills/<workspace-skill>/scripts/
.agents/skills/<workspace-skill>/tests/
process/
data/
output/
```

Use this only when deterministic code adds real value: API ingest, validation,
normalization, ranking, rendering, conversion, or repeatable output creation.

Catalog/distribution variant:

```txt
skills/<workspace-skill>/SKILL.md
skills/<workspace-skill>/references/
skills/<workspace-skill>/templates/
skills/<workspace-skill>/scripts/
```

Use this when the workspace skill is meant to be installed or reused across
repositories. Keep repo-specific `data/` and `output/` outside the packaged
skill unless the user explicitly wants fixtures or sample data bundled.

## Placement

Prefer `.agents/skills/<workspace-skill>/` for a workspace-local skill.

Use `skills/<workspace-skill>/` when the repo is a skill catalog or the user
wants an installable package.

Use `$CODEX_HOME/skills/<workspace-skill>/` only for a local user skill.

Do not invent a second convention when the target repo already has one.

## Scaffolding Flow

Treat natural-language creation requests as actionable.

Before writing files:

- inspect existing skill folders and workspace files;
- identify the target host or host family;
- identify the domain, user role, recurring workflow, and output needs;
- map common triggers into events;
- define event handlers for those events;
- define the knowledge distillation chain;
- define source evidence rules and freshness rules;
- define `process/` event handlers;
- define `data/` paths and current-vs-history behavior;
- define `output/` paths;
- define report/deck trigger language, scope mapping, and export routes when
  users need readable outputs;
- decide which references and templates are needed;
- decide whether scripts are justified;
- define validation checks.

Ask only when the missing answer changes ownership, external writes, or the
domain itself. Otherwise make a narrow assumption and scaffold.

## Knowledge Distillation

Default chain:

```txt
sources -> memory -> tension -> insight -> action
```

Layer meanings:

- `sources`: raw or summarized evidence with provenance.
- `memory`: durable facts, state, and reusable object knowledge.
- `tension`: unresolved pressure, contradiction, risk, or opportunity.
- `insight`: current interpretation and consequence.
- `action`: local recommended next moves or decision options.

Localize layer names when the workspace language is not English.

Use object-first storage when the domain has stable objects:

```txt
data/<object-type>/<object-id>/<yyyy>/<mm>/<dd>/<layer>.md
data/<object-type>/<object-id>/current/<layer>.md
```

Use seed knowledge storage when the source is domain-level rather than
object-level:

```txt
data/<knowledge-base>/<layer>.md
```

Do not invent object IDs to fill a tree.

Use dated folders when history matters: snapshots, daily reviews, external
state changes, source freshness, or decision replay.

Use `current/` when future runs must reload the maintained state quickly.

Actions are local recommendations unless the user approves a specific external
write.

## Event Handlers

Both `ai-workspace` and `ai-workspace-skill` may create PMS-style `process/`
and `data/` folders.

For this skill, `process/` is not an AGENTS.md substitute. It is the
workspace-local event-handler layer that the skill loads and applies.

Event handlers are process files under `process/`.
They read current state from `data/`, perform documented effects, and produce
new or updated state, usually persisted back to `data/`. They may also render
human-facing output under `output/` or respond directly.

Each handler should define:

- event sources, event names, or trigger language;
- required `data/` reads;
- allowed `data/` writes;
- state created or updated by the handler;
- allowed tool/API effects;
- output render path, if any;
- direct response behavior;
- validation checks;
- escalation or approval gates.

Default event-handler layout:

```txt
process/<memory-layer>.md
process/<tension-layer>.md
process/<insight-layer>.md
process/<action-layer>.md
process/<runtime-layer>.md
process/<object-folder>/<object-type>.md
```

Use localized names when the workspace language is not English, as in:

```txt
process/知识.md
process/张力.md
process/判断.md
process/动作.md
process/运行.md
process/对象/学生.md
```

Create `process/<runtime-layer>.md` when source-to-layer flow matters.

Create `process/<object-folder>/<object-type>.md` when object types have
distinct rules, triggers, boundaries, or action logic.

Create API event-handler files only when the workspace ingests external systems:

```txt
process/api.yaml
process/api.md
```

Use `process/api.yaml` for route and schema truth.
Use `process/api.md` for auth, route selection, error handling, and write
boundaries.

Use `templates/process-contract.md` from this skill when creating process
files, then adapt it into an event handler for the domain.

## Reporting And Output

Skill-based workspaces should support natural-language reporting when the
domain has durable knowledge or recurring review outputs.

Users may ask with phrases such as:

```txt
report the current status
make a deck
create a review report
汇报当前情况
做一份复盘
输出给业务看的 deck
```

Treat each reporting request as an event.
Map every request to an explicit scope before reading files:

- current status: latest maintained `current/` layers or seed knowledge;
- single object: one object type and object ID;
- object group: named objects, category, watchlist, cohort, or work queue;
- period review: dated source and layer files for a date or window;
- custom question: the minimum source and layer set needed to answer it.

If the scope is ambiguous, choose the smallest useful scope and state the
assumption. Ask only when the audience, object set, export format, or external
write behavior would materially change.

Reporting remains part of the distillation chain:

```txt
sources -> memory -> tension -> insight -> action -> output
```

Default output paths:

```txt
output/reports/<yyyy>/<mm>/<dd>/<scope>.md
output/decks/<yyyy>/<mm>/<dd>/<scope>.md
```

Use the export route that fits the repo:

- Markdown report when no export tooling exists.
- Marp/HTML/PDF when the repo already uses markdown slide export.
- PPTX when the host has a presentation runtime.
- Script-backed export only when deterministic export is part of the workspace.

Create these workspace files when reporting is part of the contract:

```txt
process/<reporting-layer>.md
templates/report-artifact.md
templates/deck-outline.md
```

`SKILL.md` must tell the host when to load the reporting event handler and which
templates to use for report or deck output.

Use `templates/reporting-process.md`, `templates/report-artifact.md`, and
`templates/deck-outline.md` from this skill when scaffolding those files.

## Skill Package Files

Every scaffolded skill workspace needs a `SKILL.md`.

`SKILL.md` must define:

- trigger contexts;
- purpose and non-goals;
- host tool assumptions;
- workflow modes;
- required references to load;
- event handlers to load;
- source and evidence rules;
- durable data paths;
- output paths;
- script use and script boundaries;
- validation flow;
- final report expectations.

Use `templates/skill-workspace-SKILL.md` as a starting point, then adapt it to
the domain. Do not leave placeholder language in generated skills.

## References

Create references when the workflow has rules that should not bloat
`SKILL.md` and should travel with the skill package.

Recommended references:

```txt
references/workflow-contract.md
references/source-policy.md
references/validation.md
```

Add domain-specific references when the guidance is portable across
workspaces:

```txt
references/object-types.md
references/playbooks.md
references/api-ingest.md
references/presentation-contract.md
```

In `SKILL.md`, list each reference and say when to load it.

Do not create vague reference files such as `notes.md` or `misc.md`.

Use `references/audit-rubric.md` from this skill when reviewing generated
skill workspaces.

## Templates

Templates are useful here because skill-based AI workspaces repeat the same
output contracts.

Create only templates that the workflow will actually use.

Common templates:

```txt
templates/layer.md
templates/run-summary.md
templates/review-report.md
templates/presentation-outline.md
templates/report-artifact.md
templates/deck-outline.md
```

Templates should define output shape, not business conclusions.

Use `templates/knowledge-layer.md` from this skill when creating layer files or
domain-specific layer templates.

Use `templates/process-contract.md` from this skill when creating workspace
event handlers.

Use `templates/reporting-process.md` from this skill when creating a reporting
event handler.

## Scripts

Scripts are optional.

Create scripts only for deterministic work:

- API pagination and joins;
- schema validation;
- fixture-based output validation;
- snapshot normalization;
- ranking or scoring with explicit inputs;
- export, rendering, or conversion;
- smoke tests.

Do not create scripts for:

- prompt routing;
- business judgment;
- natural-language interpretation;
- generic file reads or writes;
- web fetching that host tools can do directly.

Scripts must:

- accept structured inputs;
- write only documented outputs;
- fail with actionable messages;
- avoid secrets in logs;
- use environment variables for credentials;
- avoid external writes without explicit user approval;
- use the smallest runtime natural to the repo.

If scripts exist, add fixtures or tests when behavior is non-trivial.

## Converting From AGENTS.md Workspaces

Use AGENTS-based workspaces as source material, not as the target form.

When converting:

- extract always-on root policy into skill trigger and workflow rules;
- preserve useful `process/` files as workspace-local event handlers;
- translate only portable process guidance into skill-owned `references/`;
- translate repeated output shapes into `templates/`;
- keep durable data paths if they already work;
- keep API route/schema truth in a reference or script-owned schema only when
  the API belongs to the skill workflow;
- remove root-only assumptions that make the skill non-portable;
- state what remains repo-owned.

Do not pretend conversion is lossless. A skill triggers when selected; it does
not automatically govern every agent turn unless the host loads it.

## Audit

Classify the target:

- skill package;
- skill-based workspace;
- knowledge distillation workflow;
- script-backed workflow;
- AGENTS-to-skill conversion.

Inspect only what the target requires.

Use `references/audit-rubric.md`.

Report findings first, ordered by severity.

Check:

- the workspace is skill-based, not secretly dependent on root `AGENTS.md`;
- trigger description is strong and specific;
- `SKILL.md` names all required references and templates;
- `SKILL.md` names the event-handler files it depends on;
- referenced files exist;
- process files exist, act as event handlers, and match the data layout;
- events from user requests, cron/timer triggers, scheduled reviews, data
  changes, API updates, validation runs, audit runs, and manual operator
  decisions are routed to handlers when they drive workspace behavior;
- reporting requests map to explicit scopes;
- deck/report export paths and formats are documented;
- layer semantics are clear;
- source evidence rules prevent invented facts;
- `data/` paths are object-first or seed-knowledge paths, not vague buckets;
- current and dated history behavior is explicit;
- actions are not external writes without approval;
- scripts have structured inputs and do not own judgment;
- validation can actually be run.

Do not redesign unless the user asks.

## Validation

Validation is stronger than inspection.

Structural checks:

```txt
test -f <skill-path>/SKILL.md
test -d process
test -d data || test -d <documented-data-path>
test -d output || test -d <documented-output-path>
```

Contract checks:

- frontmatter has `name` and `description`;
- every referenced file exists;
- optional directories are documented only when present;
- event handlers match layer names and object types;
- data and output paths match `SKILL.md`;
- report/deck templates and export routes match event handlers;
- layer names are stable;
- external-write approvals are explicit.

Script checks:

- run smoke tests or fixture tests when scripts exist;
- invoke each host-facing script with `--help` or a harmless fixture;
- verify generated outputs land in documented paths.

Do not say validated unless checks actually ran.

Say:

- what was inspected;
- what event path was checked;
- what ran;
- what passed;
- what remains unverified.

## Reports

Scaffold report:

```txt
Summary
Files Created Or Changed
Architecture Choice
Skill Layout
Knowledge Distillation Chain
Event Handlers
Data And Output Paths
Reporting And Output
References
Templates
Scripts
Validation Status
Remaining Gaps
```

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
