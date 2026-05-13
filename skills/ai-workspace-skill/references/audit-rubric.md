# Skill-Based AI Workspace Audit Rubric

Use this rubric when reviewing a workspace whose operating contract is a
skill, not root `AGENTS.md`.

## Critical Findings

Report as critical when:

- the workspace claims to be skill-based but required behavior only exists in
  root `AGENTS.md` or unreferenced process files;
- the workspace writes durable `data/` without `process/` contracts for layer
  semantics, object rules, or source-to-layer flow;
- source evidence rules are missing and the workflow can invent durable facts;
- data paths do not identify object type, object ID, date, or layer where those
  dimensions matter;
- actions can become external writes without explicit approval;
- scripts can mutate external systems or leak secrets without guardrails;
- validation status is claimed without checks.
- report/deck output is claimed but no artifact exists at a documented path.

## Major Findings

Report as major when:

- the skill trigger description is too weak or generic to activate reliably;
- `SKILL.md` references files that do not exist;
- references contain workflow-critical rules but `SKILL.md` does not tell the
  host when to load them;
- process files exist but `SKILL.md` does not tell the host when to load them;
- layer semantics are blurred, such as mixing sources, memory, tension,
  insight, and action in one undifferentiated file;
- `current/` files are updated without a rule for dated history or source
  traceability;
- scripts own business judgment instead of deterministic work;
- reporting requests do not map to an explicit scope before files are read;
- report/deck export format or artifact path is undocumented;
- templates contain conclusions instead of output shape.

## Minor Findings

Report as minor when:

- names are inconsistent but the workflow is still understandable;
- optional folders exist but are not yet used;
- examples are thin;
- validation is structural only and does not exercise scripts or artifacts;
- report format is vague but does not block operation.

## Positive Signals

Credit the workspace when:

- `SKILL.md` is a compact controller and longer rules live in references;
- `process/` owns workspace-local method contracts and `SKILL.md` routes to
  them explicitly;
- trigger contexts match real user language;
- source, memory, tension, insight, and action are clearly separated;
- object-first paths are used where the domain has durable objects;
- seed knowledge paths are used for domain-level source material;
- scripts accept structured inputs and write documented outputs;
- natural-language report requests map to current status, single object,
  object group, period review, or custom question;
- report and deck artifacts preserve sources, memory, tension, insight, and
  action;
- export routes fit the repo's runtime and produce documented files;
- every final report says what changed, what was checked, and what remains
  uncertain.

## Audit Output

Use this structure:

```txt
Summary
Scope
Inspected Files
Findings
Gaps
Validation Status
Recommended Next Steps
```

Lead with findings. Do not hide defects under a general summary.
