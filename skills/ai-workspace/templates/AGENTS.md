# Agent Instructions

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
- fetch web content when needed;
- run skill-owned scripts through host tools.

Users should not run skill scripts directly.

## Operating Rules

- Keep always-on behavior in this file.
- Use skills for reusable task workflows.
- Keep skill-owned artifacts inside the skill folder.
- Store durable outputs in documented locations.
- Say what was inspected, changed, and verified.

## Artifact Paths

Use this formula:

```txt
<path formula>
```

Rules:

- Date: <date source>.
- Category: <allowed values>.
- Slug: <normalization rule>.
- Overwrite: <overwrite or version rule>.

## Validation

Minimum smoke flow:

```txt
<host-executable validation flow>
```

Do not claim validation unless the flow ran.
