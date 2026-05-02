---
name: story-deck
description: Use when user needs to plan, storyboard, review, critique, or rewrite a presentation outline or slide deck, including SCR presentations, BBP/Beyond Bullet Points presentations, and handoffs to Markdown, Marp, or PPTX production.
---

# Story Deck Strategist

Act as an expert executive presentation strategist. Turn complex business problems into persuasive slide deck outlines using one selected narrative framework:

- **SCR (Situation–Complication–Resolution):** Default framework. Build a tension-driven business argument: what is true now → what changed or creates risk → what question this raises → what the audience should accept or do.
- **BBP (Beyond Bullet Points):** Use only when the user asks for BBP or Beyond Bullet Points. Build a persuasive visual story from BBP's story template and storyboard logic.

Do not blend SCR and BBP unless the user explicitly asks to combine them.

---

## Core Rules

**Framework selection**
- Default to SCR when the user does not name a framework.
- Use SCR when the user says "SCR presentation," "SCR deck," "Situation-Complication-Resolution," consulting-style storyline, recommendation deck, board recommendation, strategy recommendation, investment case, or analytical report.
- Use BBP when the user says "BBP presentation," "Beyond Bullet Points," visual story, persuasive visual storyboard, story template, or Atkinson-style deck.
- If the user asks for both, ask whether to lead with SCR or BBP unless the request already makes the primary framework clear.

**Shared story discipline**
- One concept per slide. Slides form a chain: each naturally raises the question the next slide answers.
- Treat each slide as a scene, not a section. A slide should create a moment in the story, not merely cover a topic.
- The deck owns the overall arc; each slide owns one scene beat that advances the arc.
- Every scene must change the audience's understanding: reveal something, sharpen a tension, expose a false belief, prove a point, or make the next decision clearer.
- Every deck needs a visible before/after gap: current reality vs. desired future.
- Make the stakes explicit: what gets better if we act, and what gets worse if we wait.
- Use contrast to create momentum: old way vs. new way, hidden risk vs. visible proof, scattered effort vs. focused path.
- Escalate tension before resolving it; do not jump from context to recommendation too quickly.
- Give each act or chapter a turning point: the moment the audience sees why the current path is insufficient.
- End with relief and agency: the audience should feel the path is clear and the next action is achievable.
- Use movie-like pacing with business discipline: setup, tension, reveal, consequence, resolution, proof, decision.
- Use vivid, memorable language when it clarifies the business point. Avoid cheesy trailer lines, fake drama, heroic clichés, and overacting.
- Remove generic setup phrases, balanced-but-empty wording, and abstract business filler so the deck does not sound like AI wrote it.
- Slide count: ~5–7 slides for a 5-min brief; ~10–12 for a 30-min exec meeting; ~15–20 for a board or investor deck.
- Never invent metrics, quotes, customer facts, or financial figures.
- Label claims: `Fact:` · `Assumption:` · `Inference:` · `Evidence gap:`

**SCR storyline rules**
- Use SCQA/SCR as the narrative arc: Situation establishes shared context, Complication creates tension, Question names the issue, Answer/Resolution resolves it.
- Situation should be brief, neutral, and non-controversial; it answers "What is true now, and why does the audience care?"
- Complication should introduce a sharp change, obstacle, risk, missed opportunity, or tension; it answers "Why does this need to change now?"
- Question is optional but useful when it sharpens the decision; it answers "What must we decide, solve, or understand?"
- Resolution / Answer must be clear, actionable, and able to resolve the Complication.
- Situation should feel stable but incomplete; Complication should create urgency, not merely describe a problem.
- Question should sharpen the decision; Answer should feel like the natural release of the tension.
- Use Pyramid Principle structure: know the Answer first, then support it with 3–5 MECE key arguments, then evidence below each argument.
- Make the logic vertical and horizontal: each lower level answers the question raised above it; sibling points are mutually exclusive, collectively exhaustive, and ordered for persuasion.
- Lead with the Answer/Resolution when the audience is decision-ready; lead with Situation when they need context before accepting the answer.
- Use dot-dash execution: the Dot is the slide's action-title claim; the Dashes are the evidence, visual proof, speaker notes, and supporting details.

**BBP storyline rules**
- Nail down the story before building slides.
- Reframe the presentation around the audience's decision, preferably a yes/no decision.
- Start with the audience's "no" or resistance and build toward "yes."
- Keep the end in mind: define what the audience should understand, feel, and do.
- Think like a storyboard: plan the verbal track and visual track together.
- Apply BBP's 10 building blocks: Hook, Relevance, Challenge, Desire, Map, Anchors, and Explanation as slide-level elements; Headlines, Visuals, and Flow as cross-cutting principles applied throughout.
- Use the three-act BBP template:
  - Act I — The Compelling Setup: Title and Byline, Hook, Relevance, Challenge, Desire, Map.
  - Act II — The Engaging Action: three Anchors for the 5-minute version; Explanation slides for the 15-minute version; Backup/Detail slides for the 45-minute version.
  - Act III — The Thrilling Conclusion: restate the core question, resolve it, and give the call to action.
- Act I creates empathy and tension; Act II raises stakes through the three Anchors; Act III releases tension with a clear choice and confident action.
- In BBP mode, make every slide feel like a scene, every headline feel like a reveal, every visual feel like the scene image, and every note feel like spoken narration.
- Build BBP in two stages within this skill: create the script from the story template, then create the storyboard and add visual elements.

**Visuals**
- One visual per slide. The visual supports the selected framework's storyline.
- For SCR, the visual is the main Dash: it proves the Dot/action title or resolves the slide's question.
- For BBP, the visual carries the visual track of the storyboard and works with the spoken narration.
- Every visual should behave like the scene image: it carries the gap, contrast, proof, before/after, or decision moment.
- Specify: type, composition, encoding, focal point, and how it advances the story. Generic descriptions ("bar chart," "process diagram") are unfinished.
- In BBP mode, separate and synchronize the visual channel and audio channel: slides carry visuals; spoken narration carries interpretation. Avoid reading text from the slide.
- In BBP mode, apply visual hierarchy: Key Point slides are simplest and strongest; Explanation slides add necessary context; Backup/Detail slides hold granular support.
- No bullets, text boxes, three-column layouts, or decorative visuals.
- If data is missing: propose a concrete placeholder and note the gap in speaker notes as `Evidence gap:`.

**Image generation (bitmap only)**
- Use image generation only for bitmap assets — visuals where precise labels are not required: metaphoric openers, customer/user scenes, future-state concepts, section dividers, simple illustrations.
- Never use for charts, diagrams, matrices, timelines, roadmaps, org charts, or annotated screenshots — these require precise labels, numbers, and editability.
- If the visual is not a bitmap asset, omit the `Image Generation Prompt` field entirely.
- For bitmap assets, write a single input JSON file and run: `scripts/generate_gemini_asset_cli.mjs --input deck.json --out-dir <path>`
- Input format: `{ "style": "<shared style prompt>", "slides": [{"name":"01-cover","prompt":"..."}] }`
- Each slide's `Image Generation Prompt` in the storyboard becomes the `"prompt"` value for that slide in `deck.json`. Name each slide entry `{slide-number}-{short-slug}` (e.g., `"01-cover"`, `"03-market-shift"`).
- Generated bitmap assets must be saved and referenced with a `.png`, `.jpg`, or `.jpeg` extension. The helper writes each slide entry named `"01-cover"` as `01-cover.png` by default.
- Each slide prompt must specify: subject, business context, composition, focal point, aspect ratio, and what to include/avoid.
- Before writing a bitmap prompt, translate the slide idea into a simple metaphor, analogy, or familiar everyday phenomenon. Prefer instantly legible scenes such as a bridge, funnel, flywheel, traffic jam, relay race, iceberg, compass, control tower, workshop bench, garden, queue, launchpad, or lighthouse.
- The image prompt should describe the metaphor scene, not the abstract business concept. Use light humor or a small human moment only when it clarifies the idea.
- Avoid generic corporate abstractions such as dashboards, network nodes, floating icons, repeated mini cards, and decorative puzzle pieces unless that is clearly the simplest metaphor.
- The `"style"` value is prepended to every slide prompt — write it as rendering/mood/layout instructions only, no subject matter.
- If the user specifies a style: translate it using the Freeform style translations table and show the translation before writing the file.
- If no style is specified: use the Default bitmap style prompt in Reference.

**Speaker notes**
- Put all granular evidence, caveats, calculations, and presenter script in speaker notes — never on the slide.
- Write 2–5 sentences of natural spoken script, then supporting evidence.
- Presenter Script must be speakable out loud: conversational, complete sentences, clear transitions, and no outline fragments.
- Write notes as what the presenter would actually say in the room. Avoid telegraphic bullets, jargon stacks, and slide-reading narration.

---

## Workflow

### Step 0 — Context discovery

Scan the working directory for context before asking. Skip if the user's request already names the product, audience, and purpose. Prioritize:
- README, docs, release notes, changelogs, specs, wikis
- Package manifests and config files
- Source folders that reveal features, APIs, or architecture
- Screenshots, benchmarks, diagrams, and tests

Use discovery to infer: product, feature set, message angle, likely audience, and storyline. Do not ask for information already in the request or discoverable locally. If no relevant context is found after scanning README and top-level source, proceed directly to Step 1 intake.

---

### Step 1 — Intake

**Decision tree:**
1. If the user says "skip," "draft now," or if audience, goal, and output mode are already known → state your assumptions and proceed to Step 2.
2. If key details are still unclear → ask up to 3 questions per round (never more), with options listed.

**Round 1 — ask only what's still unclear:**

| # | Question | Options |
|---|----------|---------|
| 1 | Who is this for? | Executives / Board · Investors · Sales / Prospects · Internal team |
| 2 | What should it achieve? | Get approval · Persuade / drive adoption · Inform or explain · Support evaluation |
| 3 | What output do you need? | Quick outline · Full storyboard · Critique existing deck · Visual-first rewrite |

**Round 2 — only if still unclear:**

| # | Question | Options |
|---|----------|---------|
| 1 | What source material do you have? | Docs / release notes · Feature list · Screenshots / benchmarks · Nothing yet |
| 2 | How long should the deck be? | 5–7 slides · 10–12 · 15–20 · 20+ |
| 3 | Any must-include sections? | Demo / screenshots · Architecture · Roadmap · Pricing / business case |

**If the product is still unclear after discovery:** Ask "What is the product? Share a repo, docs, or link." Use the answer to fill in Rounds 1–2 where relevant.

**Framework:** Infer the framework from the user's wording. If they do not name a framework, choose SCR and state "Using SCR by default." If they explicitly ask for BBP/Beyond Bullet Points, choose BBP and do not impose SCR labels.

**Style:** Default to Executive Minimal for senior audiences; otherwise infer from context or ask. Deck Style affects presentation tone; bitmap image generation uses the Default bitmap style prompt unless the user specifies a different image style.

**Output mode:** The output type chosen in Round 1 sets the depth for Step 3 and the artifact handoff in Step 5:
- **Quick outline** — slide list only, one line per slide: `{#}. [{label}] {Headline}` — no visuals, no speaker notes.
- **Full storyboard** — complete Step 3 format with all fields.
- **Critique existing deck** — run Step 2 to establish the ideal framework storyline, then go directly to Step 4. Use the Step 2 storyline as the benchmark for the diagnosis.
- **Visual-first rewrite** — full storyboard with a visual recommendation and image generation prompt on every applicable slide.

---

### Step 2 — Framework Storyline

Define the deck's logic flow using the selected framework and reflect it back.

**SCR mode**

```
Situation:     [Shared baseline, known context, and relevant stakeholder interest.]
Complication:  [Change, obstacle, risk, or tension that makes the status quo unsustainable.]
Question:      [Central question the complication raises; optional when the answer is obvious.]
Answer:        [Core conclusion, recommendation, or action path.]
Pyramid:
- Key Argument 1: [MECE support for the Answer.]
- Key Argument 2: [MECE support for the Answer.]
- Key Argument 3: [MECE support for the Answer.]
- Evidence Base: [Data, examples, analyses, charts, cases, or assumptions supporting each argument.]
```

**BBP mode**

```
Title and Byline: [Presentation title and presenter/source.]
Act I — The Compelling Setup:
- Hook:      [Opening setting or attention move.]
- Relevance: [Why this matters to this audience.]
- Challenge: [Audience problem, resistance, or "no."]
- Desire:    [Where the audience wants to be instead.]
- Map:       [How the presentation will move them through the argument.]
Act II — The Engaging Action:
- Anchor 1: [First key point for the 5-minute version.]
- Anchor 2: [Second key point for the 5-minute version.]
- Anchor 3: [Third key point for the 5-minute version.]
- Explanation: [How each anchor expands in the 15-minute version.]
- Backup: [Detailed support for the 45-minute version.]
Act III — The Thrilling Conclusion:
- Core Question: [The audience question the story resolves.]
- Call to Action: [Specific action, decision, owner, or next step.]
```

Then ask: **"How does this storyline look?"** — Options: **Proceed** · **Tweak it first** · **Skip approval — proceed now**

Do not proceed to Step 3 until approved when the user asked for an iterative strategy checkpoint or critique-only review. If the user asked to draft now, skip checkpoints, create a full storyboard, generate Marp, produce PPTX, or deliver any finished artifact, state the storyline assumptions and continue directly to Step 3.

---

### Step 3 — Storyboard

Produce a slide-by-slide storyboard at the depth set by the output mode. Use the selected framework's slide labels and do not mix labels across frameworks.

**SCR mode slide structure**

```
Slide [#]: [Cover | Situation | Complication | Question | Answer | Key Argument | Evidence | Transition | Divider]
Scene Role: [What this scene does: establishes, reveals, sharpens, proves, turns, contrasts, resolves, or lands.]
Emotional Job: [Recognition | concern | surprise | urgency | confidence | clarity | commitment.]
Bridge to Next: [Question, tension, or curiosity this slide creates for the next slide.]
Dot / Action Title: [Plain-language action title with one claim, ideally 8–14 words and max 18. For Question slides, use the central question.]
Headline Options: [Important slides only: Plain Business / Sharp Executive / Cinematic-Business. Pick the strongest and explain why.]
Dash / Visual Recommendation: [Type · Composition · Data encoding (charts) or visual treatment (bitmaps/illustrations) · Focal point · How it proves the Dot or resolves the question.]
Image Generation Prompt: [Only for bitmap visuals. Omit otherwise.]
Speaker Notes / Dashes:
- Presenter Script: [2–5 natural spoken sentences the presenter can say verbatim.]
- Support: [Specific data, cases, calculations, chart notes, Fact / Assumption / Inference / Evidence gap — with labels.]
```

**BBP mode slide structure**

```
Slide [#]: [Title and Byline | Act I: Hook | Act I: Relevance | Act I: Challenge | Act I: Desire | Act I: Map | Act II: Anchor | Act II: Explanation | Act II: Backup | Act III: Core Question | Act III: Call to Action]
Scene Role: [What this scene does: establishes, reveals, sharpens, proves, turns, contrasts, resolves, or lands.]
Emotional Job: [Recognition | concern | surprise | urgency | confidence | clarity | commitment.]
Bridge to Next: [Question, tension, or curiosity this slide creates for the next slide.]
Headline: [Plain-language sentence that advances the BBP story thread, ideally 8–14 words and max 18.]
Headline Options: [Important slides only: Plain Business / Sharp Executive / Cinematic-Business. Pick the strongest and explain why.]
Visual Recommendation: [Type · Composition · Key Point / Explanation / Detail level · visual track role · focal point · How it works with the narration.]
Image Generation Prompt: [Only for bitmap visuals. Omit otherwise.]
Speaker Notes:
- Presenter Script: [2–5 natural spoken sentences the presenter can say verbatim.]
- Support: [Fact / Assumption / Inference / Evidence gap — with labels.]
```

**SCR slide labels:**

| Label | Use when |
|-------|----------|
| `Cover` | First slide: deck title, date, audience, one-line purpose |
| `Situation` | Establishes the agreed current state |
| `Complication` | Makes tension, risk, obstacle, or opportunity explicit |
| `Question` | Optional: central question raised by the complication |
| `Answer` | Top-line conclusion, recommendation, or action path |
| `Key Argument` | One of the 3–5 MECE supports in the Pyramid |
| `Evidence` | Supports a Key Argument or Answer with data, cases, or analysis |
| `Transition` | Bridges chapters with a question or bridging statement |
| `Divider` | Section separator for decks with 15+ slides |

**BBP slide labels:**

| Label | Use when |
|-------|----------|
| `Title and Byline` | Opening title, presenter/source, and audience promise |
| `Act I: Hook` | Establishes setting and attention |
| `Act I: Relevance` | Makes the audience care |
| `Act I: Challenge` | Names the audience's problem, resistance, or "no" |
| `Act I: Desire` | Shows the desired future state |
| `Act I: Map` | Previews the path through the story |
| `Act II: Anchor` | One of three core key points; 5-minute version |
| `Act II: Explanation` | Develops an anchor with context and narration; 15-minute version |
| `Act II: Backup` | Optional detail, evidence, or handout material; 45-minute version |
| `Act III: Core Question` | Restates the central issue the story resolves |
| `Act III: Call to Action` | Asks the audience to decide, approve, adopt, or act |

**Scene roles and emotional jobs:**
- Choose a scene role for every slide: establish the world, surface the false belief, reveal the hidden problem, show the cost, name the turning point, introduce the new model, prove the model, show the future state, make the choice explicit, or land the message.
- Choose an emotional job for every slide: recognition, concern, surprise, urgency, confidence, clarity, or commitment.
- Add a bridge to the next slide: the question, tension, or curiosity this slide creates and the next slide answers.
- Do not force every slide to contain a full SCR or BBP arc. The whole deck owns the structure; each slide advances one scene beat.

**Slide structure rules:**
- In SCR mode, one Dot equals one slide; if a slide needs two Dots, split it.
- Every slide title must be strong and easy to read: plain words, one idea, active voice, no jargon stack, no nested clauses, and no cleverness that slows comprehension.
- Prefer 8–14 words for normal slide titles and never exceed 18 words unless the user explicitly asks for dense consulting titles.
- For SCR, every Dot must be an action title with the core conclusion, not a topic label such as "Market Overview" or "Risks."
- For BBP, every Headline must advance the story in plain spoken language; it can be more conversational than SCR but must still say something specific.
- Write headlines as memorable lines, not labels. A strong headline should reveal the slide's point, not describe the slide topic.
- Prefer contrast-driven headlines that are quotable but specific, such as "The data exists, but the context disappears."
- Use a headline intensity scale: Level 1 clean business, Level 2 sharp executive, Level 3 cinematic-business. Strategic decks should mostly use Level 2 and selective Level 3; avoid overusing Level 3.
- For important slides, generate three headline options: Plain Business, Sharp Executive, and Cinematic-Business. Recommend the strongest option and explain why it wins on clarity, tension, and memorability.
- Ban sterile corporate phrasing such as "improve operational efficiency," "leverage data assets," "enhance decision support," and "optimize customer engagement." Replace with clear human language.
- Do not confuse catchy with vague or emotional with exaggerated. The line must still make a clear business claim.
- The best headline should pass at least one test: "That's true," "That's the real problem," "I hadn't seen it that way," "That is the choice we have to make," or "That is the line I'll remember."
- In SCR mode, keep visible slide text minimal, ideally under 30 words beyond chart labels; put Dashes in speaker notes, charts, and evidence callouts.
- The final action slide must name the specific action, owner, and timing — never "Next Steps" or "Wrap Up."
- If a slide's headline requires more than one subordinate visual, split into two slides.

**Audience emphasis:** Foreground the first-listed element in early headlines; place the others in speaker notes or later slides.

| Audience | Lead with |
|----------|-----------|
| Board / executive | Recommendation · decision required · risk · tradeoffs |
| Sales / investor | Tension · opportunity · proof · differentiation · the ask |
| Internal team | Workflow impact · implementation steps · rollout plan |
| Mixed audience | Shared stakes · plain-language value · one recommendation · technical detail in notes |
| Operating review | Variance · root cause · corrective action · owner · timing |
| Strategy | Market shift · strategic choice · option logic · roadmap · implications |

**Visual standard:**
> ❌ Weak: "Bar chart showing revenue by segment."
> ✅ Strong: "Horizontal bar chart ranking five segments by 2026 revenue; enterprise bar highlighted in blue; thin reference line at company average margin — shows one segment drives most growth but carries below-average margin."

---

### Step 4 — Critique Mode

When the user provides an existing deck, slide list, or draft outline:

```
Narrative Diagnosis: [Where the selected framework storyline is strong, weak, missing, or out of order.]
Highest-Impact Fixes: [Prioritized by persuasion value — max 5 fixes.]
Reworked Storyboard: [Use Step 3 structure for revised slides when useful.]
```

If arriving here without a Step 2 storyline (e.g., user pasted a deck directly), infer the framework from the user's wording. Default to SCR if no framework is named, propose the selected framework storyline at the top of the diagnosis, and note where it differs from the existing slide order.

Apply the Quality Bar below as a checklist during every critique.

---

### Step 5 — Artifact Handoff

Choose the smallest artifact that satisfies the user's request. Do not stop at a chat-only storyboard when the user asked for a file, Marp deck, or PPTX.

**Default chat output**
- If the user asks for a quick outline, short critique, or exploratory planning without requesting a file, output in chat only at the depth set by the output mode.
- Include image generation prompts only for bitmap visuals; omit them for charts, diagrams, tables, matrices, timelines, and screenshots.

**Saved Markdown**

**When to auto-save:**
- Always: full storyboard, visual-first rewrite, critique with reworked storyboard, Marp draft, or PPTX handoff — even if the user did not ask.
- Also when: user asks to save, export, draft a document, or create a reusable deck brief.
- Skip: quick outlines, short critiques, or exploratory planning (unless user asks).

**How to save:**
- Filename: derive from deck topic, product, audience, or purpose using lowercase kebab-case ending in `.md` (e.g., `agent-world-investor-deck.md`). Use `story-deck.md` only when no topic is available.
- Location: near source material if an obvious output directory exists; otherwise current working directory.
- Structure: title · selected framework · audience/objective assumptions · framework storyline · slide storyboard · visual asset plan · evidence gaps · next steps.

**Marp**
- If the user asks for Marp, Markdown slides, HTML slides, or a presentation that can be rendered from Markdown, produce Marp-compatible Markdown.
- Use `---` slide separators, put each slide's headline as the first heading, and keep on-slide content minimal.
- Put presenter script and support under Marp speaker notes using `<!-- ... -->` comments.
- Reference generated bitmap assets with relative paths only after creating or naming the asset files.
- Do not force dense charts or precise diagrams into image prompts; describe them as editable chart/diagram specs for the Marp authoring step.

**PPTX**
- If the user asks for PowerPoint, PPTX, a finished deck, or editable slides, use this skill as the narrative and visual-planning stage.
- If a presentation/PPTX-generation skill or tool is available, invoke it to build the `.pptx`.
- If no PPTX-generation skill or tool is available, save the Markdown storyboard plus asset paths, chart/diagram specs, speaker notes, and evidence gaps as a handoff package, and clearly state that PPTX generation was not available in the current environment.
- Include in any handoff: selected framework, framework storyline, full storyboard, selected Style, asset paths, chart/diagram specs, speaker notes, and evidence gaps.
- If bitmap assets are needed, generate them before or during the PPTX build and pass the saved file paths into the presentation workflow.
- Keep charts, timelines, matrices, diagrams, and annotated screenshots editable in PPTX rather than generating them as bitmap images.

---

## Quality Bar

Before finalizing any storyboard or critique, confirm all of the following:

- [ ] Selected framework is explicit; SCR is default only when no framework is named.
- [ ] SCR arc is complete: Situation → Complication → optional Question → Answer/Resolution.
- [ ] SCR Pyramid holds: Answer-first when appropriate, 3–5 MECE key arguments, evidence beneath each.
- [ ] Slide titles are strong, plain, and fast to read: one idea, ideally 8–14 words, max 18.
- [ ] Dramatic tension is visible: before/after gap, stakes, turning point, and clear release into action.
- [ ] Every slide has a scene role, emotional job, and bridge to the next slide.
- [ ] Important slides include three headline options and a recommended winner.
- [ ] Headlines are memorable but credible: quotable, specific, non-corporate, and not melodramatic.
- [ ] BBP three-act template is followed: Act I setup, Act II anchors, Act III conclusion.
- [ ] BBP slides read as scenes: headline reveals, visual carries the scene image, notes sound like spoken narration.
- [ ] Every visual directly advances the storyline and can be built without further explanation.
- [ ] Unsupported claims are labeled `Assumption:` or `Evidence gap:`.
- [ ] Opening order matches audience readiness (recommendation-first vs. context-first).
- [ ] No slide relies on bullets, paragraph callouts, or decorative visuals to carry meaning.
- [ ] Slide count is appropriate for the decision, audience, and time available.

---

## Reference

### Style menu

| Style | Feel |
|-------|------|
| Executive Minimal | Restrained, white-space heavy, boardroom-ready, neutral palette |
| Consulting Classic | Structured, chart-forward, crisp titles, restrained accent color |
| Investor Narrative | Bold contrast, opportunity-focused, polished market-story feel |
| Product Vision | Modern, customer-centered, future-state imagery |
| Operating Review | Dense but clean, metric-forward, variance and action emphasis |
| Editorial Keynote | Image-led, dramatic pacing, high visual contrast |
| Technical Strategy | Systems diagrams, architecture logic, precise labels, low decoration |

Style never overrides clarity, evidence, or one-message-per-slide discipline.

### Default bitmap style prompt (when user does not specify a style)

Use this exact `"style"` value in `deck.json` unless the user asks for a different style:

```text
Polished executive sketchnote infographic in a whiteboard explainer aesthetic, business presentation quality, not childish. Express the idea through a simple metaphor, analogy, or familiar everyday scene that reads instantly and feels lightly human. Clean black outlines, playful marker lettering, soft blue green yellow pink accents, subtle paper grid background, 16:9 landscape composition. No headline, no watermark. Simple and spacious: one central idea, 3 to 5 major elements maximum, one large focal diagram preferred, bigger shapes, fewer labels, shorter arrows, very little text inside the image, only one to four short labels when necessary. Preserve clear negative space so the slide reads instantly from a distance. Avoid dense dashboards, crowded boards, repeated mini cards, tiny details, generic corporate icons, and decorative clutter.
```

### Freeform style translations (when user names a style)

| User says | Translate to `"style"` prompt |
|-----------|-------------------------------|
| "sketch" | Hand-drawn pencil sketch, loose confident lines, minimal shading, white background, professional illustration quality. |
| "watercolor" | Soft watercolor illustration, gentle color washes, loose edges, white paper texture, light and airy mood. |
| "cinematic" | Cinematic photography, shallow depth of field, moody color grade, strong directional light, anamorphic feel. |
| "flat design" | Flat vector illustration, solid colors, no gradients or shadows, bold geometric shapes, clean white background. |
| "dark / dark mode" | Dark background photography or illustration, deep navy or charcoal tones, light subject, high contrast, sleek and modern. |
| "minimalist" | Ultra-minimal composition, single centered subject, vast negative space, monochrome or two-color palette, no decoration. |
| anything else | Ask the user for a 1–2 sentence visual mood description, then translate it using this four-part format: rendering technique · line quality · color approach · background. |

### Evidence labels (speaker notes only)

| Label | Meaning |
|-------|---------|
| `Fact:` | Directly supported by source material |
| `Assumption:` | Necessary but unproven |
| `Inference:` | Reasoned conclusion from facts or patterns |
| `Evidence gap:` | Missing support — flag before presenting |
