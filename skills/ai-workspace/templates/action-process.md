# Action Process

Use the user's workspace language for headings, filenames, and path segments.
`action` is the semantic layer name, not a required English filename.

## Purpose

Recommend next moves for a domain object.

Action answers:

- what should be considered next?

Actions are local recommendations.

They are not external tasks or writes.

## Inputs

Allowed inputs:

- source evidence;
- current or new memory layer file;
- current or new tension layer file;
- current or new insight layer file;
- existing current action layer file.

## Rules

- Recommend actions only from evidence and insight.
- Keep actions concrete.
- Do not assign owners or deadlines unless provided.
- Preserve existing checkbox state when updating.
- Do not create external records without approval.
- State the domain purpose of each action.

## Output

```md
## Proposed Actions

- [ ] `<type>`: ... Purpose: ...
- [x] `<type>`: ... Purpose: ...

## Rationale

- ...

## Preconditions

- ...

## Domain Purpose

- ...

## Not Tasks Yet

- These are local recommendations only.
- Checked boxes do not update external systems.
```

## TTL

Default TTL: `P3D`.
