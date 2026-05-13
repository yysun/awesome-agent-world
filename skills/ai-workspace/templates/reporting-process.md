# Reporting Process

## Purpose

Map natural-language report or deck requests into a clear workspace scope,
read the right knowledge layers, and produce readable exportable artifacts.

## Trigger Language

Treat these as reporting requests:

- report the current status
- make a presentation
- create a review deck
- summarize for leadership
- 汇报当前情况
- 做一份复盘
- 输出 deck

## Scope Mapping

Map the request before reading files:

- `current-status`: latest maintained `current/` layers or seed knowledge.
- `single-object`: one object type and object ID.
- `object-group`: named objects, category, queue, watchlist, or cohort.
- `period-review`: dated source and layer files for a date or time window.
- `custom-question`: minimum evidence set needed to answer the request.

If the scope is ambiguous, use the smallest useful scope and state the
assumption. Ask only when the audience, object set, or external write behavior
would materially change.

## Required Reads

For each selected object or knowledge base, read the available chain:

```txt
sources -> memory -> tension -> insight -> action
```

Prefer `current/` for current status.
Prefer dated folders for period reviews.
Use seed knowledge paths when the source is domain-level rather than
object-level.

## Output Paths

Markdown report:

```txt
artifacts/reports/<yyyy>/<mm>/<dd>/<scope>.md
```

Deck source:

```txt
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.md
```

Exported deck files, when tooling exists:

```txt
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.html
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.pdf
artifacts/decks/<yyyy>/<mm>/<dd>/<scope>.pptx
```

Use only the formats supported by the repo or host.

## Export Chain

Choose the repo-native path:

- Markdown-only when no export tooling exists.
- Marp to HTML/PDF when markdown slide export is already used.
- PPTX when the host has a presentation runtime.
- Script-backed export only when a deterministic exporter exists or is created
  for a real reason.

Report exactly which source file produced which exported files.

## Quality Rules

- Keep visible language appropriate for the audience.
- Preserve evidence, tension, judgment, and action as separate ideas.
- Do not invent missing facts to make a report feel complete.
- Prefer fewer, clearer pages over exhaustive dumps.
- Move low-value technical method details to an appendix or omit them.

## Validation

Before claiming success, check:

- the scope is stated;
- required source/layer files were read or missing files were reported;
- the artifact exists at the documented path;
- exported files exist when export was requested;
- report/deck content is readable for the target audience.
