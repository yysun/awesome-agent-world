---
name: react-app
description: >
  Use when creating, modifying, refactoring, reviewing, or organizing a React web app that uses
  Tailwind or utility-first CSS. Trigger for requests involving React pages, routes, layouts,
  components, feature UI, styling systems, app shells, frontend folder structure, UI architecture,
  import boundaries, thin routes, component placement, or avoiding catch-all folders such as
  `components` and `lib`. Especially relevant when deciding whether code belongs in foundations,
  primitives, patterns, features, pages, shell, or shared utilities.
---

# React Tailwind Layered Web

Use this skill to keep React + Tailwind apps organized around clear ownership, thin route composition, and one-way imports.

## Core Rules

- Inspect the existing project first: routing framework, `src/` tree, import aliases, Tailwind setup, component conventions, and test scripts.
- Keep the top-level router thin.
- Keep route files thin; they should mostly compose shell, page, and feature workspaces.
- Keep domain contracts explicit; do not invent browser-only domain behavior when ownership belongs to shared contracts or the backend.
- Prefer the lowest valid layer; do not promote code upward just because it might be reused later.
- Do not create or grow catch-all folders like `components` or `lib` when a clearer layer exists.
- Match existing naming, exports, aliases, and test patterns unless they violate the boundaries below.

## Layer Map

| Layer | Purpose | Allowed contents | Disallowed contents |
|---|---|---|---|
| `src/foundations/` | Visual foundations | design tokens, Tailwind imports, base styles | React components, domain logic |
| `src/primitives/` | Generic UI controls | buttons, inputs, cards, form controls | business logic, API calls |
| `src/patterns/` | Reusable UI compositions | headers, panels, form sections, list shells | business logic, API calls |
| `src/features/` | Domain UI and behavior | product-specific views, hooks, state, feature composition | generic shared UI that belongs lower |
| `src/pages/` | Route entry points | page orchestration, route-level assembly | deep feature logic, generic UI libraries |
| `src/shell/` | App framing | layout chrome, providers, navigation shell | feature-owned domain behavior |
| `src/shared/` | Sidecar shared code | API clients, schemas, helpers, generic utilities | UI-layer imports |

## Placement Rules

Use this decision order for new files and moved code:

1. If it is styles, tokens, or Tailwind/base CSS only, place it in `src/foundations/`.
2. If it is a generic standalone control, place it in `src/primitives/`.
3. If it is a reusable UI composition built from primitives, place it in `src/patterns/`.
4. If it knows about a product domain, workflow, or business state, place it in `src/features/`.
5. If it only wires routes, page assembly, or app framing, place it in `src/pages/` or `src/shell/`.
6. If it is non-UI shared logic, place it in `src/shared/`.

When in doubt, keep code in the owning feature first and only extract downward once it is clearly generic.

## Import Rules

Keep imports one-way. Higher layers may import lower layers; lower layers must not import higher layers.

```text
foundations <- primitives <- patterns <- features <- pages
foundations <- primitives <- patterns <- features <- shell
shared -> usable by any layer
```

Enforce these constraints:
- `foundations` imports from no app UI layer.
- `primitives` may import `foundations` and `shared`.
- `patterns` may import `foundations`, `primitives`, and `shared`.
- `features` may import `patterns`, lower UI layers, and `shared`.
- `pages` and `shell` may compose feature work, but must not own feature logic.
- `shared` must never import from UI layers.
- No layer may import from `pages`.
- Avoid lateral imports between unrelated features; use explicit shared contracts or keep the code inside the owning feature.

Follow the host project's existing import style. Do not introduce aliases just for this skill.

## React + Tailwind Guidance

- Use function components.
- Prefer Tailwind utilities with `className` extension points.
- Establish a clear visual direction early and preserve it.
- Use existing primitives and patterns before creating new ones.
- Keep accessibility attributes, focus states, loading states, empty states, and error states with the owning component or feature.
- Keep typography consistent:
  - `text-xs`: labels, badges, metadata, uppercase markers
  - `text-sm`: body copy, helper text, inputs, buttons, small headings
  - `text-base`: section and component titles
  - `text-lg`: page titles and prominent headings
  - `text-2xl`: stat values

## Working Sequence

For each requested change:

1. Start from the user-facing outcome.
2. Identify the owning route, shell, feature, or shared contract.
3. Place each new file in the lowest valid layer.
4. Extract repeated generic UI downward into `primitives` or `patterns`.
5. Keep domain behavior in `features` and shared contracts in `src/shared/` or the backend/service layer.
6. Keep pages and routing code thin.
7. Update nearby barrels/index files only when the host project already uses them.
8. Add the required source-file header block to every source file you create or edit when the host project requires it.
9. Run the narrowest useful UI validation: typecheck, lint, unit tests, component tests, or browser/e2e checks as appropriate.

## Done Check

Before finishing:

- New code sits in the correct layer.
- Imports follow the allowed boundaries.
- Router and route files remain thin.
- Domain behavior stays in `features` or shared/server-owned contracts.
- Styling stays consistent with the chosen visual direction.
- New UI includes necessary loading, empty, error, disabled, and responsive states for the requested workflow.
- Normal UI validation for the host app has been run, or the reason it could not be run is stated.
