---
name: ai-workspace
description: >-
  Create, review, audit, and validate AI workspaces for agent hosts such as
  Codex, Copilot, Gemini, and similar desktop or CLI runtimes. Use when the user
  asks to design an agent-ready repo, scaffold host-discovered instructions,
  review workspace structure, audit AGENTS.md or SKILL.md quality, validate
  progressive skill disclosure, or improve how a repo exposes behavior to coding
  agents.
---

# AI Workspace

Create or review workspaces operated by agent hosts and humans.

Make behavior explicit in files the host can discover:

- root instructions;
- skills;
- bundled references;
- deterministic scripts;
- durable artifacts;
- smoke flows.

Prefer visible contracts over hidden chat behavior.

## Modes

Classify intent first.

- Create: design, scaffold, implement, fix, patch, or improve.
- Review/audit: inspect, critique, assess, or find gaps.
- Validate: prove the workspace works by running checks.

Rules:

- Create mode may edit files.
- Review/audit mode is read-only by default.
- Validation mode must say what actually ran.
- Mixed requests run in this order: review, explain gaps, then edit only
  what the user asked to change.

## Host Contract

Assume the host provides basic tools:

- read workspace files;
- write workspace files when requested;
- create parent folders for nested outputs;
- fetch web content when needed;
- run skill-owned scripts for deterministic work.

Do not create generic file I/O or web-fetch scripts.

Script execution path:

```txt
user intent -> host -> LLM -> host tool call -> skill-owned script
```

Users should not invoke skill scripts directly.

## Workspace Model

A strong AI workspace has six layers:

- Host rules: `AGENTS.md` or host equivalent.
- Skills: triggered task workflows with progressive disclosure.
- Deterministic support: scripts, schemas, templates, validators.
- Durable artifacts: predictable outputs, logs, memory, reports.
- Docs: entry points, examples, plans, operating notes.
- Verification: smoke flows and host-executed validation.

Call out missing layers directly.

## Create

Before writing files:

- inspect the existing repo layout;
- follow existing host conventions;
- define what the workspace is for;
- define what it must not do;
- state host capability assumptions;
- define durable artifact paths;
- define the smallest useful smoke flow.

Baseline layout:

```txt
AGENTS.md
README.md
.docs/
data/ or artifacts/
skills/<skill-name>/SKILL.md
skills/<skill-name>/references/
skills/<skill-name>/scripts/
skills/<skill-name>/tests/
skills/<skill-name>/fixtures/
skills/<skill-name>/templates/
```

Use another skill directory only when the repo or host already has one.

Creation rules:

- Use `references/creation-rubric.md`.
- Use templates from `templates/` when helpful.
- Add skills only for repeated workflows.
- Keep skill-owned artifacts inside the skill folder.
- Add scripts only for deterministic domain logic.
- Add a host-executable smoke or validation flow.

## Review / Audit

First classify the target:

- file: one `AGENTS.md`, `SKILL.md`, prompt, script, or reference;
- skill: one skill directory;
- workspace: the full repo-level agent surface.

Inspect only what the target requires.

Use `references/audit-rubric.md`.

Report findings first.

Do not turn an audit into a redesign unless the user asks.

## Validate

Validation is stronger than inspection.

Do not say validated unless behavior was checked.

Validation levels:

- structural: required files and folders exist;
- contract: instructions, skills, scripts, and artifacts agree;
- execution: smoke flows or tests ran;
- artifact: outputs match the documented contract.

Say what ran, what passed, and what remains unverified.

## Skill Rules

For `SKILL.md` files:

- Put trigger conditions in frontmatter `description`.
- Keep the body focused on workflow and contracts.
- Move long checklists into `references/`.
- Move reusable examples into `templates/` or `fixtures/`.
- Explain why a rule matters when it affects judgment.

## Script Rules

Scripts are implementation details behind skills.

Use scripts for:

- validation;
- transformation;
- scaffolding;
- normalization;
- schema checks;
- repeatable report generation.

Do not use scripts for:

- generic file reads;
- generic file writes;
- directory creation only;
- generic web fetch;
- user-facing entry points.

Scripts must:

- accept structured inputs;
- be deterministic where feasible;
- be host-invokable;
- keep tests and fixtures inside the skill folder;
- document what is script-owned vs LLM-owned.

## Artifact Rules

LLM file tools can handle nested paths when rules are explicit.

For complex paths, define:

- path formula;
- date rule;
- allowed categories;
- slug rule;
- parent-folder rule;
- overwrite rule.

Example:

```txt
Path: data/YYYY-MM-DD/<category>/<feature>.md
Date: local run date unless user provides one
Category: research, audit, plan, decision
Feature: lowercase kebab-case task name
Before write: create parent folder
Overwrite: never overwrite; append -2, -3, etc.
```

Use a script only for stateful or cross-file path logic.

## Containment

Skill-owned artifacts stay inside the skill folder.

This includes:

- tests;
- fixtures;
- expected outputs;
- generated examples;
- schemas;
- templates;
- validators;
- script output folders.

Root `data/`, `artifacts/`, `.docs/`, and `README.md` are for
workspace-level outputs and human entry points.

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
Skill Artifacts
Validation Status
Remaining Gaps
```

## Quick Checks

Creation is complete only when the workspace has:

- host-discovered root instructions;
- documented host assumptions;
- at least one well-triggered skill, if needed;
- contained skill artifacts;
- durable artifact paths;
- a README or equivalent entry point;
- a smoke or validation path.

Validation is complete only when you know:

- what was inspected;
- what ran;
- what passed;
- what remains unverified.
