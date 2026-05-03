---
name: story-deck
description: Use when user needs to plan, storyboard, review, critique, or rewrite a presentation outline or slide deck, including SCR presentations, BBP/Beyond Bullet Points presentations, scene-based decks, headline development, bitmap visual generation, and handoffs to Markdown, Marp, or PPTX production.
---

# Story Deck Strategist

Build persuasive presentation storyboards using one selected framework. Do not teach SCR or BBP back to the user; use the framework as an output contract and focus on the user's storyline, titles, visuals, notes, and artifacts.

## Core Contract

**Framework selection**
- Default to **SCR** when the user does not name a framework.
- Use **BBP** only when the user asks for BBP, Beyond Bullet Points, Atkinson-style, visual story, or persuasive visual storyboard.
- Do not mix SCR and BBP unless the user explicitly asks to combine them.

**Mandatory behavior**
- Select the central Story Thesis before creating slides.
- Build one deck-wide arc. Each slide is one scene beat, not a mini deck.
- In BBP mode, shape the natural business argument before assigning BBP labels.
- Show a slide-title approval list before detailed storyboard work.
- Run the Title Refinement Pass before showing that approval list.
- Keep evidence precise; never invent metrics, quotes, customer facts, or financial figures.
- Label support claims in notes: `Fact:` · `Assumption:` · `Inference:` · `Evidence gap:`

**Artifact behavior**
- Auto-save Markdown for full storyboards, visual-first rewrites, critiques with reworked storyboards, Marp drafts, PPTX handoffs, and any explicit save/export request.
- If the user asks for visuals/images/assets, use the bundled visual CLI. Do not search for another image script and do not create one.

## Reference Loading

Read only what the request needs:

- Slide-title approval, quick outline, full storyboard, critique, rewrite, Marp, or PPTX: `references/headlines.md`
- Full storyboard, critique, rewrite, Marp, or PPTX: `references/story-scenes.md`
- SCR mode: `references/scr.md`
- BBP mode: `references/bbp.md`
- Bitmap visuals or generated image assets: `references/visuals.md`
- Markdown save, Marp, PPTX, or finished deck handoff: `references/handoff.md`

## Output Depth

- **Quick outline:** slide-title list only: `{#}. [{label}] {Title}`
- **Full storyboard:** Step 4 title approval, then Step 5 detailed storyboard
- **Critique existing deck:** Step 2 thesis, Step 3 ideal storyline, then Step 6 critique
- **Visual-first rewrite:** full storyboard with visual recommendations and bitmap briefs where applicable

## Workflow

### Step 0 - Context Discovery

Scan the working directory only when the user references the current project, provides local files, or asks to use repository context. Otherwise prioritize the supplied topic, pasted material, or external brief.

Use discovery to infer topic/product, audience, objective, source evidence, likely storyline, and artifact target. Do not ask for information already supplied or discoverable.

### Step 1 - Intake

If audience, goal, and output mode are clear, state assumptions and proceed. If key details are unclear, ask up to 3 questions:

| # | Question | Options |
|---|----------|---------|
| 1 | Who is this for? | Executives / Board · Investors · Sales / Prospects · Internal team |
| 2 | What should it achieve? | Get approval · Persuade / drive adoption · Inform or explain · Support evaluation |
| 3 | What output do you need? | Quick outline · Full storyboard · Critique existing deck · Visual-first rewrite |

If the topic, organization, product, or decision is still unclear, ask for that specifically.

### Step 2 - Story Thesis Discovery

Before creating slides, select the central thesis:

```text
Story Thesis: [One memorable business claim that anchors the deck.]
Audience Shift: [What the audience believes before vs. after.]
Core Tension: [The gap or conflict that creates momentum.]
Deck Metaphor: [Optional: one consistent metaphor/world for generated visuals.]
```

If the user asked for a finished artifact, choose the strongest thesis from context, state it as an assumption, and continue to the slide-title approval gate. Finished artifacts are two-turn by default unless the user explicitly says to skip title approval. If the request is exploratory and the thesis is genuinely ambiguous, propose 2-3 options and ask the user to pick one.

### Step 3 - Framework Storyline

Use the selected framework reference as the contract:

- SCR: use `references/scr.md` for SCQA, Pyramid, dot-dash, and slide labels.
- BBP: first run the BBP Flow Shaping Pass in `references/bbp.md`, then map the natural business flow into Act I/II/III, anchors/explanation/backup, and slide labels.

In BBP mode, output `Natural Business Flow -> BBP Label Mapping` before the formal BBP storyline. Output the framework storyline only once, then continue to Step 4. For critique-only requests, go to Step 6 after establishing the ideal storyline.

### Step 4 - Slide Title Confirmation Gate

Before working on slide details, propose the slide sequence as titles only and ask for approval. Do not continue to the detailed storyboard until the user approves the title list.

Before showing the title list, run the Title Refinement Pass in `references/headlines.md`. Present the refined titles, not the weaker first draft.

```text
Proposed Slide Titles:
1. [Framework label] [Plain-language title / headline]
2. [Framework label] [Plain-language title / headline]
3. [Framework label] [Plain-language title / headline]
...
```

Rules:
- Titles must reflect the Story Thesis, framework storyline, and deck-wide arc.
- In BBP mode, labels are metadata. Do not let `Hook`, `Relevance`, `Challenge`, or `Anchor` force a weaker sequence than the business argument wants.
- Use domain nouns, concrete contrast, and business consequences.
- For SCR, titles are Dots/action-title claims, not topics.
- For BBP, titles are reveal headlines that make the next scene necessary.
- In BBP Act II, anchors are arguments, not product history.
- For finished artifacts such as Marp, PPTX, or generated visuals, pause here by default. Continue only after title approval, or immediately if the user explicitly said to skip the title gate.
- Ask: "Approve these slide titles before I build the detailed storyboard?"
- For quick outlines, stop here unless the user asks for details.

### Step 5 - Detailed Storyboard

After title approval, produce each slide using this structure:

```text
Slide [#]: [Framework label]
Title: [Approved title, adjusted only if needed.]
Scene Role: [Establishes, reveals, sharpens, proves, turns, contrasts, resolves, or lands.]
Emotional Job: [Recognition | concern | surprise | urgency | confidence | clarity | commitment.]
Bridge to Next: [Question, tension, or curiosity this slide creates.]
Visual Recommendation: [Specific visual, chart, diagram, or bitmap role; explain how it advances the story.]
Image Generation Brief: [Only for bitmap visuals. Essence idea only; let the image model decide composition.]
Speaker Notes:
- Presenter Script: [2-5 natural spoken sentences.]
- Support: [Facts, assumptions, inferences, evidence gaps, chart notes, or caveats.]
```

Keep charts, timelines, matrices, precise diagrams, and annotated screenshots editable; do not turn them into bitmap prompts.

### Step 6 - Critique Mode

When the user provides an existing deck, slide list, or draft outline:

```text
Narrative Diagnosis: [Where the selected framework storyline is strong, weak, missing, or out of order.]
Highest-Impact Fixes: [Prioritized by persuasion value - max 5 fixes.]
Reworked Title List: [Use Step 4 structure when useful.]
Reworked Storyboard: [Use Step 5 structure when useful.]
```

Default to SCR if no framework is named. Compare the draft against the selected Story Thesis and ideal framework storyline.

### Step 7 - Artifact Handoff

If the user asks for a file, Marp, PPTX, generated visuals, or finished deck, do not stop at chat-only output. Read `references/handoff.md`.

## Bitmap Visual Generation

When bitmap assets are requested or needed, read `references/visuals.md`.

Use this bundled CLI. Do not search for another image script. Do not create a new script. Do not preflight image API keys; the CLI owns credential validation and error reporting.

```bash
scripts/generate_gemini_asset_cli.mjs --input deck.json --out-dir <path>
```

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
- Each storyboard `Image Generation Brief` becomes a slide `"prompt"` in `deck.json`.
- Name each entry `{slide-number}-{short-slug}`, e.g. `"01-cover"`, `"03-market-shift"`.
- Generated bitmap assets must be saved and referenced with `.png`, `.jpg`, or `.jpeg`.
- If the CLI is unavailable or fails, report the blocker and do not invent a replacement script.

## Quality Bar

Before finalizing, confirm:

- [ ] Framework is explicit; SCR is default only when no framework is named.
- [ ] Story Thesis was selected before slides were created.
- [ ] Title approval gate completed before detailed storyboard work.
- [ ] BBP Flow Shaping Pass completed before title refinement when BBP is selected.
- [ ] Title Refinement Pass completed before the approval list.
- [ ] SCR dot-dash or BBP three-act contract was followed.
- [ ] Each slide has one scene beat, scene role, emotional job, bridge, visual recommendation, and speakable notes.
- [ ] Titles are concrete, readable, domain-specific, and not generic corporate filler.
- [ ] Unsupported claims are labeled `Assumption:` or `Evidence gap:`.
- [ ] Bitmap assets use the bundled CLI, titleless shared style, and lightweight image briefs.
