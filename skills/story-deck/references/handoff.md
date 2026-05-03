# Artifact Handoff Reference

Use this reference when the user asks to save, create Markdown, generate Marp, produce PPTX, create visuals, or deliver a finished deck artifact.

## Default Chat Output

If the user asks for a quick outline, short critique, or exploratory planning without requesting a file, output in chat only at the depth set by the output mode.

Include image generation briefs only for bitmap visuals. Omit them for charts, diagrams, tables, matrices, timelines, and screenshots.

## Saved Markdown

Auto-save Markdown for:

- Full storyboard
- Visual-first rewrite
- Critique with reworked storyboard
- Marp draft
- PPTX handoff
- Any request to save, export, draft a document, or create a reusable deck brief

Do not auto-save quick outlines, short critiques, or exploratory planning unless the user asks.

Filename:

- Derive from deck topic, product, audience, or purpose using lowercase kebab-case ending in `.md`.
- Example: `agent-world-investor-deck.md`
- Use `story-deck.md` only when no topic is available.

Location:

- Save near source material if an obvious output directory exists.
- Otherwise save in the current working directory.

Markdown structure:

- Title
- Selected framework
- Audience/objective assumptions
- Framework storyline
- Slide storyboard
- Visual asset plan
- Evidence gaps
- Next steps

## Marp

If the user asks for Marp, Markdown slides, HTML slides, or a presentation that can be rendered from Markdown:

- Produce Marp-compatible Markdown.
- Use `---` slide separators.
- If the deck uses a background color, pass that color into bitmap image generation style before generating image assets.
- Put each slide's headline as the first heading.
- Keep on-slide content minimal.
- Put presenter script and support under Marp speaker notes using `<!-- ... -->` comments.
- Reference generated bitmap assets with relative paths only after creating or naming the asset files.
- Do not force dense charts or precise diagrams into image generation briefs; describe them as editable chart/diagram specs for the Marp authoring step.

## PPTX

If the user asks for PowerPoint, PPTX, a finished deck, or editable slides:

- Use `story-deck` as the narrative and visual-planning stage.
- If a presentation/PPTX-generation skill or tool is available, invoke it to build the `.pptx`.
- If no PPTX-generation skill or tool is available, save the Markdown storyboard plus asset paths, chart/diagram specs, speaker notes, and evidence gaps as a handoff package, and clearly state that PPTX generation was not available in the current environment.

Include in any handoff:

- Selected framework
- Framework storyline
- Full storyboard
- Selected Style
- Asset paths
- Chart/diagram specs
- Speaker notes
- Evidence gaps

## Handoff Packet Contract

When handing to another deck production skill or tool, pass a structured packet with these fields:

```yaml
selected_framework: SCR | BBP
story_thesis: string
audience: string
objective: string
style: string
slide_titles:
  - number: number
    label: string
    title: string
storyboard:
  - number: number
    label: string
    title: string
    scene_role: string
    emotional_job: string
    bridge_to_next: string
    visual_recommendation: string
    image_generation_brief: string | null
    speaker_notes: string
visual_asset_plan: string
bitmap_asset_paths:
  - string
editable_visual_specs:
  - string
speaker_notes:
  - string
evidence_gaps:
  - string
```

If bitmap assets are needed, generate them before or during the PPTX build and pass the saved file paths into the presentation workflow.

If the PPTX uses a slide background color, pass that color into bitmap image generation style before generating image assets.

Keep charts, timelines, matrices, diagrams, and annotated screenshots editable in PPTX rather than generating them as bitmap images.
