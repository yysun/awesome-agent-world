# Memory Process

Use the user's workspace language for headings, filenames, and path segments.
`memory` is the semantic layer name, not a required English filename.

## Purpose

Create durable knowledge about a domain object.

Memory answers:

- what is becoming true?
- what should affect future decisions?

## Inputs

Allowed inputs:

- source evidence;
- existing current memory layer file;
- dated memory snapshots;
- user-provided facts for this run.

Do not use unsupported chat history as evidence.

## Rules

- Store only stable, reusable knowledge.
- Prefer repeated or strong evidence.
- Do not turn every event into memory.
- Do not store guesses as memory.
- State why it matters in the domain.

## Output

```md
## Memory

- ...

## Evidence

- ...

## Domain Relevance

- ...

## Confidence

High | Medium | Low

## Review Notes

- ...
```

## TTL

Default TTL: `P30D`.
