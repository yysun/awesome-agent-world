---
name: notebooklm
description: Use this skill for NotebookLM tasks to create notebooks, add sources, query content, and generate artifacts through the NotebookLM CLI.
---

# NotebookLM Skill

## When to use

Use this skill when the user asks to:
- create/manage NotebookLM notebooks
- add URLs/files/YouTube sources
- summarize or query notebook content
- generate/download NotebookLM artifacts

## Runtime rules (required)

1. Always use `shell_cmd` with tokenized arguments:
   - `command` must be one executable token (`"notebooklm"`)
   - pass all flags/args in `parameters`
   - never pass a full command line string in `command`

2. Prefer structured output whenever IDs are needed:
   - use `--json` for `create`, `list`, and other parse-sensitive steps.

3. Do not invent IDs or titles:
   - use values only from the most recent successful tool result.
   - if a reported ID conflicts with tool output, correct it immediately.

4. Before any notebook-scoped command, establish context:
   - `notebooklm use <notebook_id>` immediately after create/select.
   - if available, also pass explicit notebook flag (`--notebook <id>` / `-n <id>`).

5. If output says `No notebook specified`, run `notebooklm use <id>` and retry once.

6. If auth errors occur, run:
   - `notebooklm auth check`
   - `notebooklm login` if needed.

## Tool loop contract (required)

- If there are pending sources to add, the assistant MUST emit exactly one `shell_cmd` tool call in each continuation turn.
- Do not emit progress-only narration between source-add steps.
- Plain-text-only turns are allowed only when:
  - all planned source-add steps are complete (final summary), or
  - there is a blocker/error that prevents the next tool call.

Forbidden pattern:
- `I added one source. Now adding the next.` without a `tool_calls` action in the same turn.

## Continuation guard (important)

- Do not end with narration-only future intent unless a real `tool_calls` action is emitted in the same assistant turn.
- If no tool call can be emitted yet, state the blocker explicitly instead of promising the next step.

## Canonical command patterns

```bash
notebooklm list --json
notebooklm create "<title>" --json
notebooklm use <notebook_id>
notebooklm source add "<url-or-path>"
notebooklm source list --json
notebooklm ask "<question>" --json
```

## shell_cmd call shape (must follow)

```json
{"command":"notebooklm","parameters":["create","Agent Skills Research","--json"]}
```

## Required workflow: create notebook and add sources

1. Run `notebooklm create "<title>" --json`.
2. Parse notebook ID from tool output (`notebook.id` or top-level `id`).
3. Run `notebooklm use <id>`.
4. Add each source with `notebooklm source add <url-or-path> --notebook <id>`.
5. For multiple sources, keep the tool loop active and emit the next add call immediately after each successful result.
6. Optionally verify using `notebooklm source list --json`.
7. Report concise results (notebook id, successful adds, failures).

## Safety

- Ask before destructive operations (delete) or expensive long-running generation when user intent is unclear.
- Do not claim success unless confirmed by tool output.
