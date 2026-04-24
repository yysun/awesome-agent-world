# Awesome Agent World

Awesome Agent World is a catalog of reusable assets for the [Agent World app](https://github.com/yysun/agent-world): complete `worlds`, standalone `agents`, and installable `skills`. Each importable item lives in its own folder named after its canonical ID so it can be referenced directly by path.

This repository also includes supporting material such as datasets, generated outputs, slide work, and scratch projects used to develop or demonstrate those assets.

## Quick Start

In Agent World, import from the GitHub repository `yysun/awesome-agent-world` and point at the asset path you want.

Example import paths:

- `worlds/infinite-etude`
- `worlds/run-check`
- `agents/copilot`
- `skills/git-wiki`
- `skills/music-to-svg`

Install an individual skill from this repository with:

```bash
npx skills add yysun/awesome-agent-world --skill git-wiki
npx skills add yysun/awesome-agent-world --skill music-to-svg
npx skills add yysun/awesome-agent-world --skill notebooklm
npx skills add yysun/awesome-agent-world --skill playwright-cli
npx skills add yysun/awesome-agent-world --skill presentation-strategist
npx skills add yysun/awesome-agent-world --skill react-app
npx skills add yysun/awesome-agent-world --skill workspace-design
npx skills add yysun/awesome-agent-world --skill youtube-search
```

## Catalog

### Worlds

| Name | Description | Path |
| ---- | ----------- | ---- |
| Infinite Etude | Generative sight-reading trainer workspace with a composer, pedagogue, and engraver pipeline for playable music exercises. | `worlds/infinite-etude` |
| run-check | Execution-and-review world that runs a user request with a `runner` agent and checks the result against the requirements. | `worlds/run-check` |

### Agents

| Name | Description | Path |
| ---- | ----------- | ---- |
| codex | Proxy agent that forwards the user request to Codex CLI in the current working directory. | `agents/codex` |
| copilot | Proxy agent that forwards the user request to GitHub Copilot CLI with tool access enabled. | `agents/copilot` |
| gemini | Proxy agent that forwards the user request to Gemini CLI in the current working directory. | `agents/gemini` |

### Skills

| Name | Description | Path |
| ---- | ----------- | ---- |
| git-wiki | Builds and maintains a local code-project wiki under `.wiki` using git-tracked repository content as the source of truth. | `skills/git-wiki` |
| music-to-svg | Converts MusicXML into markdown-embedded SVG output using the repository converter script. | `skills/music-to-svg` |
| notebooklm | Creates and manages NotebookLM notebooks, adds sources, queries content, and generates artifacts through the NotebookLM CLI. | `skills/notebooklm` |
| playwright-cli | Automates browser navigation, interaction, screenshots, and data extraction with Playwright CLI. | `skills/playwright-cli` |
| presentation-strategist | Plans, storyboards, critiques, and rewrites presentation outlines and slide decks. | `skills/presentation-strategist` |
| react-app | Creates, refactors, reviews, and organizes React web apps that use Tailwind or utility-first CSS. | `skills/react-app` |
| workspace-design | Designs or reviews business operation pages as task-centric workspaces instead of generic admin consoles. | `skills/workspace-design` |
| youtube-search | Searches YouTube by keyword and returns structured video results using the included `yt-dlp` helper script. | `skills/youtube-search` |

## Repository Layout

Importable assets live under `worlds/`, `agents/`, and `skills/`. The folder name is the canonical ID used for imports such as `worlds/<id>`, `agents/<id>`, and `skills/<id>`.

```text
worlds/
	infinite-etude/
		config.json
		README.md
		setup-agents.ts
		agents/
		prompts/
	run-check/
		config.json
		mcp.json
		agents/
		chats/
		events/

agents/
	codex/
		config.json
		memory.json
		system-prompt.md
	copilot/
		config.json
		memory.json
		system-prompt.md
	gemini/
		config.json
		memory.json
		system-prompt.md

skills/
	git-wiki/
		SKILL.md
	music-to-svg/
		README.md
		requirements.txt
		scripts/
		tests/
	notebooklm/
		SKILL.md
	playwright-cli/
		SKILL.md
		references/
	presentation-strategist/
		SKILL.md
	react-app/
		SKILL.md
	workspace-design/
		SKILL.md
	youtube-search/
		SKILL.md
		scripts/
```

Notes:

- Worlds may contain world-specific agents, prompt assets, setup scripts, and persisted runtime artifacts.
- Standalone agents live under `agents/` and typically provide `config.json`, `system-prompt.md`, and optional `memory.json`.
- Skills live under `skills/` and usually expose a `SKILL.md` contract plus any helper scripts, tests, or reference material they need.

## Supporting Directories

The repository root also contains supporting material that is not itself imported as Agent World assets:

- `datasets/` shared evaluation or robustness datasets.
- `output/` generated documents, slide tooling, and rendered artifacts.
- `slides/` presentation source material, builds, previews, and verification assets.
- `tmp/` scratch workspaces and in-progress presentation projects.

## Contributing

If you want to add or update a world, agent, or skill:

1. Fork this repository and create a branch.
2. Add the item under the appropriate top-level folder: `worlds/`, `agents/`, or `skills/`.
3. Name the folder with the canonical ID you expect users to import.
4. Include the item's config and prompt files, plus a `README.md` or `SKILL.md` when the asset needs usage guidance.
5. Update the catalog tables in this README so the asset is discoverable.
6. Open a pull request against `main`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
