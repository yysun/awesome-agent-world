# AI Workspace Creation Rubric

Use this when creating or patching an AI workspace.

## 1. Scope

Required:

- name the workspace purpose;
- name what it must not do;
- name the target host or host family;
- state who makes final decisions.

Recommended:

- list common tasks;
- list durable outputs;
- list risks and escalation points.

Avoid:

- vague autonomy claims;
- hidden assumptions;
- broad agent behavior with no boundary.

## 2. Host Discovery

Required:

- root instructions the host can discover;
- one source of truth for always-on behavior;
- documented host capability assumptions.

Recommended:

- host bridge files only when needed;
- README entry point for humans;
- note when host conventions must be verified.

Avoid:

- duplicated root instructions;
- behavior stored only in chat;
- unsupported claims about a host.

## 3. Skills

Required:

- `SKILL.md` for each reusable workflow;
- strong frontmatter description;
- clear inputs, workflow, and outputs.

Recommended:

- `references/` for long guidance;
- `templates/` for reusable output shapes;
- `fixtures/` for examples and test data;
- `tests/` for script or contract checks.

Avoid:

- one huge skill for unrelated tasks;
- vague triggers;
- skill files scattered outside the skill folder.

## 4. Scripts

Required when:

- output must match a schema;
- transformation must be repeatable;
- scaffolding must be consistent;
- validation should not rely on model judgment.

Not required for:

- generic file reads;
- generic file writes;
- directory creation;
- generic web fetch.

Scripts must:

- stay behind the skill workflow;
- accept structured input;
- be host-invokable;
- keep tests and fixtures in the skill folder.

## 5. Artifacts

Required:

- canonical output location;
- path formula for nested layouts;
- overwrite or versioning rule;
- durable vs temporary distinction.

Recommended:

- slug rules;
- category allowlist;
- date source;
- index or manifest only when useful.

Avoid:

- ad hoc output folders;
- root-level skill test artifacts;
- overwriting without permission.

## 6. Validation

Required:

- at least one smoke flow;
- clear validation level;
- statement of unverified behavior.

Recommended:

- host-executable checks;
- script tests for deterministic logic;
- artifact contract checks.

Avoid:

- claiming validation after inspection only;
- asking users to run skill scripts directly;
- smoke flows that skip the main path.

## Verdict Scale

- strong: explicit, contained, discoverable, tested;
- workable: usable, but light on validation;
- fragile: unclear, scattered, or chat-dependent;
- overbuilt: more structure than the workflow justifies.
