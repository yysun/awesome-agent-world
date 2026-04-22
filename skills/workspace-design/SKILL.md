---
name: workspace-design
description: Design or review business operation pages, workbenches, and review or follow-up pages as task-centric workspaces. Use when working from requirement docs, business workflows, wireframes, screenshots, HTML, or frontend page proposals.
---

# Workspace Design

## Goal

Design pages as workspaces where the user first understands the current situation, then narrows into real work, and then acts on real objects directly. Do not let the page collapse into an admin-console pattern where the user filters records first and only acts afterward.

Keep this order in mind:

1. Establish the current situation
2. Narrow into the right work pool
3. Land on real objects quickly
4. Support action in the most suitable view

When rules conflict, use this priority:

1. Keep the output structurally complete
2. Satisfy the hard rules
3. Preserve the workspace hierarchy when it matters
4. Replace generic labels with business language
5. Add explanation or examples last

## Parse The Input First

Before producing the solution, extract:

- Role
- Primary goal
- High-frequency actions
- Risks or exceptions
- Core objects
- Work rhythm
- Key stages or handoff points
- Whether the work is queue-driven, category-driven, or mixed
- Whether mobile drill-down, responsive behavior, routing, or browser history matters for this task
- Problems in the current page, if a current page exists

If information is missing:

- Make 1 to 5 minimal assumptions
- Put them in `0. Assumptions`
- Do not fall back to vague principles

## Choose The Mode

### Generate Mode

Use this when the user provides requirements, a PRD, a workflow, a role goal, or a verbal description.

### Review Mode

Use this when the user provides a screenshot, wireframe, HTML, an existing page proposal, or explicitly asks whether something feels like a workspace.

In review mode:

1. Judge whether the current design is closer to a workspace or an admin console
2. Identify structural problems
3. Propose a full workspace-oriented redesign

Do not stop at criticism. Always produce a concrete redesign.

## Default Structural Pattern

Prefer this as the default pattern unless the task clearly needs another layout.

```text
Page title + one-line positioning + global quick actions
Situation card strip
Optional page-level filters / scope controls

Two-column workspace:
Left: Level 1 ALL + work categories OR Level 2 Back + task queue
Main: category work view OR Back + task detail / action surface
Optional right drawer
```

### Meaning Of The Areas

- The top establishes the situation instead of starting with a large table
- The left column is a hierarchical work finder, not app navigation
- The left column should move quickly from category scope to concrete tasks
- The main column is the real workspace surface
- The right drawer is optional and only carries secondary context

## Responsive, Mobile, And Routing

Use this section only when the task involves responsive behavior, mobile flow, routing, browser history, or implementation details that depend on navigation structure.

### Desktop

Prefer a 2-column workspace:

- Left: hierarchical finder
- Main: workspace surface
- Right drawer: optional only

### Mobile

Do not try to preserve side-by-side panes.

Serialize the same hierarchy into drill-down screens:

```text
Categories -> Tasks -> Task -> Subtasks / Operation
```

### Routing Model

Treat the workspace as a navigable hierarchy:

```text
workspace -> scope -> task -> step
```

How this hierarchy is expressed depends on platform and app conventions:

- Path segments
- Query state
- In-app navigation state
- Native stack navigation

Browser back or in-app back should follow this hierarchy when routing is part of the task.

## Hard Rules

Apply these in both generate mode and review mode:

1. Do not start the page from a table
2. Do not use titles like `Manage X`
3. Do not make filters the main character of the page
4. Do not turn summary cards into decoration without action value
5. Do not assume every object belongs in a list
6. Do not force frequent page jumps to handle details on desktop
7. The page should immediately answer "what is happening now and what should I do first?"
8. The left side is not app navigation; it is a staged work finder that should land on a real task queue quickly
9. Queue entry points are not filters
10. The main work area must support direct progress on the core action
11. A list inside the main work area is acceptable when it is a subtask list, child-item list, or working list inside the selected task
12. The drawer is optional and only carries supporting context, secondary actions, and supplemental information
13. Prefer business action language and business object language for page names, queue names, and card names
14. If queue groups exist, derive them from workflow, risk, time pressure, or handoff logic rather than generic placeholders
15. Whether the left side is one level or two levels, it should land on actionable objects quickly rather than staying at pure categories
16. If the left side is interpreted as pure navigation, the design is drifting away from a workspace
17. Do not make both columns become nested generic lists; at least one state of the main column must behave like a real workspace surface
18. If mobile behavior matters, convert the hierarchy into drill-down screens rather than squeezing both columns into narrow panes
19. If routing or browser history matters, preserve meaningful navigation state such as scope, task, and major operation step
20. If routing is used, keep incidental UI state such as drawer open state, splitter width, or minor local toggles out of the URL unless the task explicitly requires otherwise

## Design Rules

### 1. Page Positioning

Prefer to provide:

- Page title
- One-line positioning statement

Requirements:

- Let the title describe an action, not a module
- Prefer verb-led titles
- Let the positioning statement explain who uses the workspace, what goal it serves, and what risks or exceptions it should surface quickly

### 2. Situation Cards

Situation cards establish the current situation. They are not decorative totals.

Requirements:

- Usually design 4 to 6 cards
- Every card should drill into real work
- Every card should reflect at least one of risk, trend, or urgency

For each card, explain:

- Name
- Why it matters
- Which scope, queue, view, or result set it drills into
- Which operating period it represents

Good candidates:

- Work due today
- Near-timeout items
- High-risk objects
- Current bottlenecks
- Completion rate this week
- Capacity pressure
- Upcoming expirations

Avoid:

- Static totals with no action value
- Global KPIs unrelated to the page’s job
- Pure BI-style statistics

### 3. Left Column: Hierarchical Work Finder

The left column is not ordinary sidebar navigation. It is a staged work finder.

Prefer two levels when the user first needs a work scope and then a concrete queue.

#### Two-Level Pattern

```text
Level 1: ALL + work categories
Level 2: Back + task queue
```

This is the default pattern when:

- The user first needs to choose a work pool
- Different work pools have different rhythms
- The task queue should not be confused with app navigation
- The main area needs more width for actual operation

#### One-Level Pattern

```text
Task queue only
```

This fits when:

- The user mainly works through one object pool
- Category switching is infrequent
- Priority can be expressed through ordering, status, or time pressure

#### Requirements

- Land on a concrete task queue quickly
- Treat categories as entry points, not final destinations
- If you use a two-level left column, the level-1 view should be brief and clearly transitional
- The task queue must contain real work objects, not issue taxonomy pretending to be a queue
- Queue items should answer "what exact thing can I work on now?"

Prefer deriving category entry points from:

- Workflow stage
- Risk type
- Time window
- Approval or handoff step
- Recovery or escalation path
- Ownership

Only use generic labels like these when nothing more specific is available:

- To handle
- Risks
- Follow-ups

For each left-column entry point, explain:

- Why it exists
- What work enters it
- What the task queue looks like after entering it
- What state the main work area enters after selecting a task

Task queue items should usually include:

- Object title
- Current status
- Time pressure
- Next action

### 4. Filters

Filters are optional. Depending on the case, use no filters, one filter layer, or two filter layers. The key question is whether the filters actually help move work forward.

Use this decision logic:

- If the system can already push the relevant tasks clearly and the page goal is narrow, use no filters
- If only page-wide scope needs to change, use one filter layer
- If both page scope and main-area presentation need independent control, use two filter layers

Page-level filters define whole-page context across the workspace. Use them only for conditions that truly change the available work pool, such as:

- Time
- Organization, region, campus, or project
- Owner
- Search within the current page

Rules:

- If it changes the left-side task pool, it belongs here
- Usually show 0 to 4 of them
- Keep them few and strong

Main-column local filters only change the main work area, such as:

- View switch
- Sort
- Grouping
- High-risk only
- Incomplete only

Rules:

- Only change the main work area
- Do not secretly rebuild the left-side task pool
- They can be more detailed, but should not take over the page
- Omit them when the main work area is already clear enough

Decision rule:

- Changes the left task pool -> page-level filter
- Only changes the main view -> local filter
- Neither is needed -> no filter

Do not disguise business tasks as top-bar filters. Labels such as `To handle`, `Overdue and incomplete`, or `High risk` usually belong in the left-side work finder or queue.

### 5. Main Work Area

The main column is the real workspace surface.

In the 2-column pattern, the main column normally has two major states:

#### State A: Category Work View

After entering a category, the main area may show a category-level workspace such as:

- Cards
- List
- Board
- Timeline
- Calendar
- Mixed view

This is appropriate when the selected work pool benefits from a structured operational view.

#### State B: Task Detail / Action Surface

After selecting a task, the main area should become a task-oriented surface such as:

- Detail view
- Form flow
- Mixed view
- Cards with direct actions
- Child-item or subtask list

First decide whether the user is advancing one object or screening a batch of objects.

If the user is advancing one object, prefer:

- Detail view
- Form flow
- Cards
- Mixed view
- Child-item or subtask list when needed

If the user is screening a batch, prefer:

- List
- Board
- Card wall
- Chart plus risk list
- Timeline or calendar when time structure matters

These situations usually should not default to a plain list:

- Shift and staffing allocation
- Time scheduling
- On-site execution
- Single-object handling
- Risk judgment

Make these clear:

- Default view
- Switchable views
- Focus object or focus task
- Core actions that can be completed on the page
- Whether the page is in category-work-view state or task-action-surface state

### 6. Lists Inside The Main Surface

A list inside the main action surface is valid when it helps complete the selected task.

Good uses:

- Subtasks
- Child records
- Checklist steps
- Exceptions inside the selected case
- Related people, lessons, or contract lines that must be handled as part of the current task

Avoid using the main area as just another generic queue unless the job really is batch screening.

### 7. Right Drawer

The drawer is auxiliary, not the main flow, and it is optional.

Suitable content:

- Rule explanation
- History
- Notes
- Related objects
- Candidate options
- Secondary actions
- Risk explanation

Not suitable:

- The full primary flow
- A whole complex subsystem
- Core handling actions that belong in the main work area

Explain:

- Whether a drawer is needed at all
- When it opens
- What it contains
- Which secondary actions can be completed there
- Why those items belong in the drawer instead of the main area

### 8. Width, Splitter, And Responsiveness

Use this section only when the task requires layout implementation detail or responsive behavior.

Prefer a 2-column desktop layout with a user-resizable splitter.

Default guidance:

- Left column: about 25% to 30%
- Main column: about 70% to 75%
- A strong starting point is around 30 / 70

Implementation guidance:

- Prefer min/max widths over strict percentages
- Left column often works well around 320px to 380px on desktop
- Main area should remain dominant

Splitter guidance:

- Allow user resizing on desktop
- Use min/max guardrails
- Remember the user preference when possible
- Do not put splitter position in browser history

Responsive guidance:

- Desktop: 2-column layout
- Narrow desktop / tablet: keep the main area dominant; reduce or collapse the left column if needed
- Mobile: serialize the same hierarchy into drill-down screens

### 9. Routing And Browser History

Use this section only when the task requires routing, deep linking, browser history, or shareable navigation state.

Treat the workspace as a navigable hierarchy:

```text
workspace -> scope -> task -> step
```

Routing rules:

- `workspace` = workspace root
- `scope` = selected category or work pool
- `task` = selected work object
- `step` = major operation step or subtask flow

Back behavior should normally be:

```text
step -> task -> scope -> workspace
```

Push history when:

- Entering a scope
- Opening a task
- Entering a major operation step
- Switching to a different task or scope

Use replace or local state when:

- Correcting an invalid route
- Restoring a default subview
- Opening or closing an optional drawer
- Changing splitter width
- Changing minor local display controls

Deep-link rules:

- Routes should be directly openable when routing is part of the task
- Invalid scope should fall back to workspace root
- Invalid task should fall back to scope
- Invalid step should fall back to task
- Use replace for corrective fallbacks

View-mode rule:

- Put major shareable view modes such as `cards`, `list`, `board`, `timeline`, or `calendar` in shareable state only when they meaningfully change the page
- Keep minor UI toggles local

## Anti-Patterns

If any of these dominate the page, it likely behaves more like an admin console or a fake workspace:

- A giant table is the first thing visible
- The top area is crowded with filters
- The left side is a module tree or app navigation sidebar
- The left side shows issue categories only, and the main area becomes just a list of tasks in that category
- The main area is just an enlarged list with row-end actions
- Most actions are row-end buttons
- Cards only show numbers and do not connect to work
- The drawer is only a detail dump
- The system never pushes relevant work, so the user must search first
- Mobile tries to preserve desktop columns instead of using drill-down
- Browser back breaks the work hierarchy or exits the page unexpectedly

## Output Protocol

Use this structure by default. Merge or reorder sections when that produces a better result.

### 0. Assumptions

Only include this when information is missing.

### 1. Page Positioning

- Page title
- One-line positioning statement

### 2. Situation Cards

Usually list 4 to 6 cards. For each card include:

- Name
- Why it changes priority
- Where it drills down
- Which operating period it represents

### 3. Left Column Structure

- Whether it is one level or two levels
- If two levels, define:
  - Level 1: ALL + work categories
  - Level 2: Back + task queue
- Task queue item pattern

For each entry point, explain:

- Why it exists
- What work enters it
- What the task queue looks like
- What main-area state follows after selecting a task

### 4. Filters And Quick Actions

- Whether filters are needed
- Page-level filters
- Main-column local filters
- Advanced filters
- Quick actions

Also explain:

- How the default context is established
- Why you chose no filters, one filter layer, or two filter layers
- Which page-level filters show by default, if any
- Which local filters show by default, if any

### 5. Main Work Area

- Category work view
- Task detail / action surface
- Default view
- Switchable views
- Focus object or focus task
- Actions that can be completed directly on the page
- Whether lists inside the main surface are subtasks, child-item lists, or batch screens
- Why this view fits the work best

### 6. Right Drawer

- Whether it is needed
- When it opens
- What it contains
- Actions available there
- Why it belongs there

### 7. Mobile Drill-Down (when needed)

Only include this when the task involves responsive behavior, mobile flow, or explicit mobile requirements.

Describe the mobile sequence, normally:

- Categories
- Tasks
- Task
- Subtasks / operation

Explain:

- Which levels collapse together
- Which actions remain on the task screen
- Which actions deserve a deeper operation step

### 8. Routing And History (when needed)

Only include this when the task involves routing, browser history, deep linking, or shareable navigation state.

Describe:

- Route hierarchy: workspace -> scope -> task -> step
- Which states go into shareable navigation state
- Which states stay local
- Back behavior
- Any major query or view state

## Review Mode Additions

In review mode, add these before `1. Page Positioning`:

### Current Judgment

- The current design is closer to: workspace / admin console / mixed but drifting

### Main Problems

- Usually list 3 to 8 concrete problems
- Point to structure, rhythm, action flow, queue meaning, view choice, filter layering, and, when relevant, mobile or routing behavior
- It is valid to point out that the left side is being read as navigation instead of a work finder
- It is valid to point out that filters were added even though the page does not need them
- Avoid vague criticism

Then provide the redesign and cover the core structure above.

## Language Guidance

Prefer:

- Business action language
- Business object language
- Time-pressure language
- Risk language
- Queue language that sounds like work, not modules

Avoid:

- Field language
- Database language
- Generic system labels
- App-navigation language when you really mean work scopes

Prefer phrasing like:

- Awaiting review
- Blocked
- Expires within 7 days
- More input needed
- Ready to publish
- Attendance exceptions
- Renewal actions
- Contracts awaiting confirmation

Avoid phrasing like:

- Status = pending
- Priority = high
- Type = normal
- Manage contracts
- Student module

## Completion Standard

The result is complete only when all of these are true:

- The page name describes an action rather than a module
- The top area establishes the situation and connects to real work
- The left side acts as a staged work finder rather than app navigation
- The left structure is chosen appropriately as one level or two levels and lands on actionable objects quickly
- Queue entry points come from workflow, risk, time pressure, or handoff logic
- The filter strategy is appropriate, including no filters, one filter layer, or two filter layers
- The main work area supports direct progress on the core action
- Lists inside the main area are justified as batch screens or subtask / child-item working lists
- The drawer remains auxiliary and optional
- When mobile behavior is part of the task, it is handled as drill-down rather than squeezed desktop columns
- When routing or browser history is part of the task, they support the hierarchy of workspace -> scope -> task -> step
- The page clearly moves away from the admin-console pattern of filters, tables, and row actions
- The output covers the key page structure and design decisions, plus mobile or routing behavior only when relevant
