---
name: <workspace-skill-name>
description: >-
  Use when the user asks to <primary workflow>, <alternate workflow>, or
  maintain the <domain> AI workspace. This skill runs the <domain> knowledge
  distillation workflow and should be used even when the user does not say
  "skill" but asks for the workspace output.
---

# <Workspace Skill Title>

Use this skill for <domain> knowledge distillation and workspace maintenance.

## Purpose

This workspace turns source evidence into durable knowledge:

```txt
sources -> memory -> tension -> insight -> action
```

It is not for:

- inventing missing facts;
- writing to external systems without explicit approval;
- bypassing the source policy.

## Host Assumptions

The host can:

- read and write workspace files;
- create parent directories;
- search files;
- fetch source material when the user asks or provides permission;
- run referenced scripts when scripts exist.

## Storage

Process contracts:

```txt
process/<memory-layer>.md
process/<tension-layer>.md
process/<insight-layer>.md
process/<action-layer>.md
process/<runtime-layer>.md
process/<object-folder>/<object-type>.md
```

Dated object path:

```txt
data/<object-type>/<object-id>/<yyyy>/<mm>/<dd>/<layer>.md
```

Current maintained path:

```txt
data/<object-type>/<object-id>/current/<layer>.md
```

Seed knowledge path:

```txt
data/<knowledge-base>/<layer>.md
```

Artifacts path:

```txt
artifacts/<artifact-type>/<yyyy>/<mm>/<dd>/
```

Report path:

```txt
artifacts/reports/<yyyy>/<mm>/<dd>/<scope>.md
```

Deck path:

```txt
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.md
```

## Load Rules

Load these when the workspace includes skill references:

- `references/workflow-contract.md`
- `references/source-policy.md`

Load process files by artifact:

- memory: `process/<memory-layer>.md`
- tension: `process/<tension-layer>.md`
- insight: `process/<insight-layer>.md`
- action: `process/<action-layer>.md`
- full run: `process/<runtime-layer>.md`
- object-specific work: `process/<object-folder>/<object-type>.md`
- report or deck output: `process/<reporting-layer>.md`

Load when validating:

- `references/validation.md`

Load templates only when writing matching artifacts.

## Workflow

1. Classify the request.
2. Identify object type, object ID, date, and source scope.
3. Load existing `current/` layers when they exist.
4. Gather or read source evidence.
5. Write or update `sources`.
6. Distill durable `memory`.
7. Identify active `tension`.
8. Produce current `insight`.
9. Produce local recommended `action`.
10. When the user asks for a report or deck, map the request to a scope and
    write the artifact under `artifacts/reports/` or `artifacts/decks/`.
11. Report files changed, key judgment, evidence gaps, exports, and validation
    status.

## Reporting

Treat natural-language requests such as `report the current status`, `make a
deck`, `汇报当前情况`, or `输出给业务看的 deck` as reporting requests.

Map each request to one scope:

- `current-status`
- `single-object`
- `object-group`
- `period-review`
- `custom-question`

Use `templates/report-artifact.md` for reports.
Use `templates/deck-outline.md` for decks.
Use the repo-native export path: markdown, Marp HTML/PDF, PPTX, or a documented
script-backed exporter.

## Rules

- Keep facts and interpretation separate.
- Do not invent missing source evidence.
- Preserve provenance in source and memory layers.
- Keep actions as recommendations unless the user approves an external write.
- Update dated files before `current/` files when history is required.
- Do not use scripts for business judgment.

## Validation

Minimum structural check:

```txt
test -f .agents/skills/<workspace-skill-name>/SKILL.md
test -d process
test -d data
test -d artifacts
```

Do not say validated unless the checks ran.

## Final Report

Include:

- files created or changed;
- objects and dates covered;
- sources used;
- top tensions and insights;
- recommended actions;
- report/deck artifacts and exports produced;
- validation status;
- remaining uncertainty.
