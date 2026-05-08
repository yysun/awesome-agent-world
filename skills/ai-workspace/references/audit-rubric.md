# AI Workspace Audit Rubric

Use this for review, audit, or validation.

## Scope

Classify the target:

- file: one `AGENTS.md`, `SKILL.md`, prompt, script, or reference;
- skill: one skill directory;
- workspace: full repo-level agent surface.

Do not expand scope unless the file's claims require evidence.

## 1. Purpose

Check for:

- workspace purpose;
- explicit non-goals;
- final decision owner;
- safety boundary.

Red flags:

- autonomy is overstated;
- recommendation vs execution is unclear;
- risky domains have no abstain/escalation rule.

## 2. Host Discovery

Check for:

- host-discovered root instructions;
- README or human entry point;
- skills in the repo or host convention;
- host capability assumptions;
- one source of truth.

Red flags:

- behavior only exists in chat;
- host bridge files duplicate each other;
- skill triggers are vague;
- no obvious entry point.

## 3. Skill Design

Check for:

- strong frontmatter description;
- clear inputs and outputs;
- progressive disclosure;
- references loaded only when needed;
- templates for repeated outputs;
- tests and fixtures inside the skill folder.

Red flags:

- giant monolithic skill body;
- vague trigger language;
- hidden repo knowledge;
- skill artifacts leak to root.

## 4. Scripts

Check for:

- scripts only when deterministic value exists;
- structured inputs;
- host-invokable entry points;
- tests and fixtures in the skill folder;
- clear LLM-owned vs script-owned work.

Red flags:

- generic file I/O wrappers;
- generic web-fetch wrappers;
- user-facing script instructions;
- freeform chat input;
- no validation for generated artifacts.

## 5. Artifacts

Check for:

- canonical output location;
- path formula for nested layouts;
- date, category, slug, and collision rules;
- durable vs temporary distinction;
- reviewable history.

Red flags:

- ad hoc output folders;
- implied but unwritten path rules;
- overwrite behavior is unclear;
- naming differs across similar outputs.

## 6. Validation

Check for:

- runnable smoke flow;
- host-executable validation;
- tests for core contracts;
- explicit unverified gaps.

Red flags:

- "validated" means inspection only;
- smoke flow skips the main path;
- no host-executable path proves behavior.

## Report

Include:

- target type;
- files inspected;
- findings ordered by severity;
- structural vs behavioral gaps;
- strongest verification level;
- smallest useful next changes.

Severity:

- critical: unsafe, misleading, or nonfunctional;
- major: key workflow, discovery, or validation gap;
- minor: clarity, consistency, or maintenance issue.

Verdict:

- strong: explicit, testable, discoverable, validated;
- workable: usable, but light on validation;
- fragile: inconsistent or chat-dependent;
- unsafe: misleading, unbounded, or unverifiable.
