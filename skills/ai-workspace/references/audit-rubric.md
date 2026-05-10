# AI Workspace Audit Rubric

Use this for review, audit, or validation.

## Scope

Classify target:

- file;
- process contract;
- skill directory;
- full workspace.

Inspect only what the target requires.

## 1. Purpose

Check:

- purpose;
- non-goals;
- decision owner;
- safety boundary.

Red flags:

- autonomy is overstated;
- execution vs recommendation is unclear;
- risk has no escalation path.

## 2. Architecture

Check:

- root instructions are host-discovered;
- process contracts exist for complex behavior;
- skills are optional, not forced;
- one source of truth exists;
- generated file maps list only existing folders.

Red flags:

- behavior only exists in chat;
- workspace contracts are hidden in a skill;
- duplicate root instructions conflict;
- no obvious entry point.
- docs reference missing `skills/`, `scripts/`, `.docs/`, or `docs/`.

## 3. Process Contracts

Check:

- API contract exists when routes or fields matter;
- auth and secret handling are explicit;
- external writes require approval;
- evidence storage is documented;
- process files separate fact, judgment, and action.

Red flags:

- routes or fields are invented;
- secrets may be printed or stored;
- write gate is missing;
- process rules live only in root prose.

## 4. Domain Knowledge

Check when present:

- domain is named;
- language and vocabulary are detected from the user's request;
- categories, object types, and layers use that vocabulary;
- source evidence is defined;
- `memory`, `tension`, `insight`, `action` layers exist;
- runtime or ingest flow exists when source-to-layer flow matters;
- object-type contracts exist when object types have different rules;
- date tracking rule is explicit;
- dated paths exist when history or snapshots matter;
- `current/` paths exist when latest state matters;
- seed knowledge path is documented when no object ID is appropriate;
- single seed knowledge uses flat `data/<layer>.md`;
- multiple seed knowledge bases appear only when requested;
- TTL and frontmatter rules exist;
- actions are local recommendations by default.

Red flags:

- layers exist without a domain;
- memory is generic summary;
- object-specific rules are buried in `AGENTS.md`;
- domain-level seed knowledge uses fake object IDs;
- single seed knowledge is unnecessarily nested;
- multi-KB layout appears without a user request;
- multiple seed knowledge bases overlap without routing rules;
- dated folders are used without a history need;
- dated folders are missing when snapshots are required;
- insight is treated as fact;
- action silently becomes an external task;
- expired `current/` files are treated as fresh.
- English path segments are forced in a non-English workspace.

## 5. Scripts

Check only when scripts exist or are referenced:

- scripts add deterministic value;
- scripts accept structured input;
- scripts are host-invokable;
- root scripts are referenced by `AGENTS.md` or `process/*.md`;
- skill scripts are referenced only by that skill.

Red flags:

- generic file I/O wrappers;
- generic web-fetch wrappers;
- Python scripts created by default;
- user-facing script instructions;
- workspace scripts hidden in a skill folder.

## 6. Skills

Check when present:

- strong frontmatter description;
- clear inputs and outputs;
- focused workflow;
- progressive disclosure;
- skill-owned artifacts stay in the skill folder.

Red flags:

- skill exists without a discovery reason;
- vague trigger language;
- giant monolithic body;
- hidden repo knowledge.

Do not require a skill when `AGENTS.md + process/` is enough.

## 7. Artifacts

Check:

- canonical output location;
- path formula;
- object type, object ID, and layer rules;
- localized vocabulary map;
- overwrite or versioning rule;
- durable vs temporary distinction;
- reviewable history.

Red flags:

- ad hoc output folders;
- ambiguous category/layer names;
- knowledge paths omit object identity;
- overwrite behavior is unclear.

## 8. Validation

Check:

- simple validation flow exists;
- strongest validation level is stated;
- unverified gaps are named.

Red flags:

- "validated" means inspection only;
- validation skips the main path;
- no host-executable path proves behavior.

## Report

Include:

- target type;
- files inspected;
- findings by severity;
- structural vs behavioral gaps;
- validation level;
- smallest useful next changes.

Severity:

- critical: unsafe, misleading, or nonfunctional;
- major: key workflow, discovery, or validation gap;
- minor: clarity, consistency, or maintenance issue.

Verdict:

- strong: explicit, discoverable, validated;
- workable: usable, light on validation;
- fragile: inconsistent or chat-dependent;
- unsafe: misleading, unbounded, or unverifiable.
