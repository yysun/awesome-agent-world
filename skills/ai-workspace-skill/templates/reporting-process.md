# Reporting Process

## Purpose

Map natural-language report and deck requests into an explicit workspace
scope, read the correct knowledge layers, and produce readable exportable
artifacts.

## Trigger Language

Treat these as reporting requests:

- report the current status
- make a deck
- create a review report
- summarize for leadership
- 汇报当前情况
- 做一份复盘
- 输出给业务看的 deck

## Scope Mapping

Map before reading files:

- `current-status`: latest maintained `current/` layers or seed knowledge.
- `single-object`: one object type and object ID.
- `object-group`: named objects, category, queue, watchlist, or cohort.
- `period-review`: dated source and layer files for a date or time window.
- `custom-question`: minimum evidence set needed to answer the request.

If the scope is ambiguous, choose the smallest useful scope and state the
assumption. Ask only when the audience, object set, export format, or external
write behavior would materially change.

## Required Reads

Read the available chain for the selected scope:

```txt
sources -> memory -> tension -> insight -> action
```

Prefer `current/` for current status.
Prefer dated folders for period reviews.
Use seed knowledge paths for domain-level source material.

## Output Paths

Markdown report:

```txt
artifacts/reports/<yyyy>/<mm>/<dd>/<scope>.md
```

Deck source:

```txt
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.md
```

Exported files, when tooling exists:

```txt
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.html
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.pdf
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.pptx
```

Use only formats supported by the repo, host, or documented scripts.

## Export Chain

Choose one:

- Markdown-only report.
- Marp markdown to HTML/PDF.
- Host presentation runtime to PPTX.
- Script-backed export through a documented deterministic script.

State which source file produced which export files.

## Quality Rules

- Use visible language appropriate for the audience.
- Keep evidence, tension, judgment, and action distinct.
- Do not invent facts to make a report feel complete.
- Prefer clear decision pages over exhaustive dumps.
- Move method detail to an appendix or omit it.

## Validation

Before claiming success, check:

- the scope is stated;
- required source/layer files were read or missing files were reported;
- report or deck source exists at the documented path;
- exported files exist when export was requested;
- output is readable for the target audience.
