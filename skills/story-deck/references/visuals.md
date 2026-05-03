# Visuals Reference

Use this reference when visual recommendations, image generation briefs, or generated bitmap assets are needed.

## Visual Recommendation Rules

- One visual per slide.
- The visual supports the selected framework's storyline.
- For SCR, the visual is the main Dash: it proves the Dot/action title or resolves the slide's question.
- For BBP, the visual carries the visual track of the storyboard and works with the spoken narration.
- Every visual should behave like the scene image: it carries the gap, contrast, proof, before/after, or decision moment.
- Specify: type, composition, encoding, focal point, and how it advances the story.
- Generic descriptions like "bar chart" or "process diagram" are unfinished.
- If data is missing, propose a concrete placeholder and note the gap in speaker notes as `Evidence gap:`.
- Do not use bullets, text boxes, three-column layouts, or decorative visuals to carry meaning.
- Visual recommendations can be specific; bitmap image generation briefs should stay lightweight and let the image model solve the composition.

## Bitmap Generation Boundary

Use image generation only for bitmap assets where precise labels are not required:

- Metaphoric openers
- Customer/user scenes
- Future-state concepts
- Section dividers
- Simple illustrations

Never use image generation for charts, diagrams, matrices, timelines, roadmaps, org charts, or annotated screenshots. Those require precise labels, numbers, and editability.

If the visual is not a bitmap asset, omit the `Image Generation Brief` field entirely.

## Strong CLI Rule

When bitmap assets are requested or needed, use the bundled CLI:

```bash
scripts/generate_gemini_asset_cli.mjs --input deck.json --out-dir <path>
```

Do not search the project for another image script. Do not create a new image-generation script. This CLI is bundled with the skill, and the agent host resolves the skill-relative `scripts/` path.

Do not preflight, inspect, or ask the user to confirm image API keys before running the CLI. The CLI owns credential validation and error reporting.

If the CLI is unavailable or fails, report the blocker and do not invent a replacement script.

Input format:

```json
{
  "style": "<shared style prompt>",
  "slides": [
    {"name": "01-cover", "prompt": "..."}
  ]
}
```

Rules:

- Use one shared `"style"` value for all slides in a deck. Put consistency rules there, especially titleless/no-text behavior.
- If the target Marp/PPTX deck uses a non-white slide background color, replace `plain white background` in the default style with that exact color name or hex value so generated images blend with the deck.
- Each slide's `Image Generation Brief` becomes the `"prompt"` value for that slide in `deck.json`.
- Name each slide entry `{slide-number}-{short-slug}`, e.g. `"01-cover"`, `"03-market-shift"`.
- Generated bitmap assets must be saved and referenced with `.png`, `.jpg`, or `.jpeg`.
- The helper uses the returned image MIME type: `image/jpeg` becomes `.jpg`, `image/png` becomes `.png`, and unknown image MIME types default to `.png`.

## Image Generation Brief Writing

Write each slide's image brief as the essence of the visual, not a detailed painting instruction. Nano Banana should choose the best composition inside the shared style.

Each brief should include only:

- The slide's core idea or tension
- The audience shift this image should create
- The scene role or emotional job
- The deck-wide metaphor or world this image should stay inside
- Any essential constraint or avoid, only when needed

Before writing a bitmap brief, translate the slide idea into a simple metaphor, analogy, or familiar everyday phenomenon. Prefer instantly legible worlds such as a bridge, funnel, flywheel, traffic jam, relay race, iceberg, compass, control tower, workshop bench, garden, queue, launchpad, or lighthouse.

The brief should name the metaphor and desired takeaway, then stop. Do not prescribe exact layout, camera angle, object count, arrow count, or where each element goes unless the user explicitly asks for that control.

Keep the deck-wide metaphor consistent across slides. Individual slide scenes may vary, but they should feel like they belong to the same world and support the selected Story Thesis.

Use light humor or a small human moment only when it clarifies the idea. Avoid generic corporate abstractions such as dashboards, network nodes, floating icons, repeated mini cards, and decorative puzzle pieces unless that is clearly the simplest metaphor.

Bitmap images are titleless. Never ask for a headline, title, caption, banner text, chart title, watermark, or large display text inside the image. Slide titles belong in the deck layout, outside the generated image. If labels are necessary, use only one to four tiny, short labels and apply that rule consistently across all generated images.

## Default Bitmap Style Prompt

Use this exact `"style"` value in `deck.json` unless the user asks for a different style:

```text
Polished executive sketchnote in a whiteboard explainer aesthetic, business presentation quality, not childish. Express the idea through a simple metaphor, analogy, or familiar everyday scene that reads instantly and feels lightly human. Clean black outlines, playful marker lettering, soft blue green yellow pink accents, plain white background, 16:9 landscape composition. Titleless image: no headline, no title text, no captions, no banners, no chart titles, no watermark. Simple and spacious: one central idea, 3 to 5 major elements maximum, one large focal diagram preferred, bigger shapes, fewer labels, shorter arrows, very little text inside the image, only one to four tiny short labels when necessary. Preserve clear negative space so the slide reads instantly from a distance. Avoid dense dashboards, crowded boards, repeated mini cards, tiny details, generic corporate icons, and decorative clutter.
```

For decks with a known slide background, modify only the background phrase. Example: replace `plain white background` with `solid #F7F4ED background` or `solid deep navy background`.

## Freeform Style Translations

| User says | Translate to `"style"` prompt |
|-----------|-------------------------------|
| "sketch" | Hand-drawn pencil sketch, loose confident lines, minimal shading, white background, professional illustration quality. |
| "watercolor" | Soft watercolor illustration, gentle color washes, loose edges, white paper texture, light and airy mood. |
| "cinematic" | Cinematic photography, shallow depth of field, moody color grade, strong directional light, anamorphic feel. |
| "flat design" | Flat vector illustration, solid colors, no gradients or shadows, bold geometric shapes, clean white background. |
| "dark / dark mode" | Dark background photography or illustration, deep navy or charcoal tones, light subject, high contrast, sleek and modern. |
| "minimalist" | Ultra-minimal composition, single centered subject, vast negative space, monochrome or two-color palette, no decoration. |
| anything else | Ask the user for a 1-2 sentence visual mood description, then translate it using: rendering technique · line quality · color approach · background. |
