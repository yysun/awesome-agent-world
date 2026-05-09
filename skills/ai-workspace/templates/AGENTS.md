# Agent Instructions

Remove optional sections that do not apply.
Use the same human language as the user's workspace request.
Auto-detect vocabulary for category, object type, and layer names.

## Purpose

This workspace is for:

- <primary use case>;
- <secondary use case>.

It must not:

- <non-goal>;
- <unsafe or out-of-scope behavior>.

## Host Assumptions

The agent host can:

- read workspace files;
- write workspace files when requested;
- create parent folders;
- fetch web content when needed.

## Operating Rules

- Keep always-on behavior in this file.
- Use `process/` for workspace-level workflow contracts.
- Do not reference folders that do not exist.
- Store durable outputs in documented locations.
- Say what was inspected, changed, and verified.

## File Map

List only folders that exist in this workspace.

- `process/`: workspace-level operating contracts.
- `data/`: durable source evidence and knowledge artifacts.
- `artifacts/`: generated deliverables and scratch output.

## Domain Knowledge

Domain setup:

- <domain name | skipped>

If a domain is supplied, use these layers:

- `memory`: durable object knowledge.
- `tension`: unresolved pressure, risk, or opportunity.
- `insight`: current interpretation and consequence.
- `action`: local recommended next moves.

Localize layer filenames and section headings to the user's language.
Keep the semantic meaning above.

Layer process files:

- `process/<localized-memory-layer>.md`
- `process/<localized-tension-layer>.md`
- `process/<localized-insight-layer>.md`
- `process/<localized-action-layer>.md`

Actions are local recommendations unless the user approves an external write.

## Artifact Paths

Knowledge paths:

```txt
data/<localized-object-type>/<object-id>/<yyyy>/<mm>/<dd>/<localized-layer>.md
data/<localized-object-type>/<object-id>/current/<localized-layer>.md
```

## Validation

Minimum validation flow:

```txt
<host-executable validation flow>
```

Do not claim validation unless the flow ran.
