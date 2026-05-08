---
name: <skill-name>
description: >-
  <what this skill does>. Use when the user asks for <trigger phrases>,
  <task contexts>, or <expected workflow>.
---

# <Skill Name>

Use this skill to <job>.

## Inputs

- <required input>;
- <optional input>.

## Outputs

- <output file or response>;
- <artifact path, if any>.

## Workflow

1. Confirm the task scope.
2. Read only the needed files.
3. Use references only when needed.
4. Run scripts only through host tool calls.
5. Write outputs to the documented path.
6. Report what changed and what was verified.

## References

- `references/<file>.md`: use when <condition>.

## Scripts

- `scripts/<script>`: host-invoked for <deterministic job>.

Users should not run scripts directly.

## Validation

Run:

```txt
<host-executable smoke flow>
```

Report unverified behavior.
