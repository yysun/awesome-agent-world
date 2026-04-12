# Awesome Agent World

This repository stores "worlds", "agents", and "skills" for the [Agent World app](https://github.com/yysun/agent-world). The recommended organization places each world, agent, or skill in its own folder at the repository root, using the item's ID as the folder name so the app can import by path or URL.

## How to Use

In the Agent World App, import items from this repository by pointing the repo as yysun@awesome-agent-world and a world, agent, or skill. 

Example import paths:

- `worlds/infinite-etude`
- `agents/copilot`
- `skills/git-wiki`
- `skills/music-to-svg`


## Worlds
| Name | Description | Path |
| ---- | ----------- | ---- |
| Infinite Etude | Generative sight-reading trainer workspace with a composer, pedagogue, and engraver pipeline for playable sheet music exercises. | `worlds/infinite-etude` |
| run-check | Two-agent execution-and-review world that runs a task with a `runner` agent and validates the result with a `checker` agent. | `worlds/run-check` |

## Agents
| Name | Description | Path |
| ---- | ----------- | ---- |
| codex | Thin proxy agent that forwards user requests to Codex CLI in the current working directory. | `agents/codex` |
| copilot | Thin proxy agent that forwards user requests to GitHub Copilot CLI with tool access enabled. | `agents/copilot` |
| gemini | Thin proxy agent that forwards user requests to Gemini CLI in the current working directory. | `agents/gemini` |


## Skills
| Name | Description | Path |
| ---- | ----------- | ---- |
| git-wiki | Builds and maintains a local code-project wiki under `.wiki` using the current git-tracked repository as the source of truth. | `skills/git-wiki` |
| music-to-svg | Converts a MusicXML file into markdown-embedded SVG score output using the repository converter script. | `skills/music-to-svg` |
| notebooklm | Creates and manages NotebookLM notebooks, adds sources, queries notebook content, and generates artifacts through the NotebookLM CLI. | `skills/notebooklm` |
| playwright-cli | Automates browser navigation, interaction, screenshots, and data extraction with Playwright CLI. | `skills/playwright-cli` |
| youtube-search | Searches YouTube by keyword and returns structured video results using the included `yt-dlp` helper script. | `skills/youtube-search` |

## Install Skills

Install any individual skill from this repository with `npx skills add <repo> --skill <skill-id>`.

```bash
npx skills add yysun/awesome-agent-world --skill git-wiki
npx skills add yysun/awesome-agent-world --skill music-to-svg
npx skills add yysun/awesome-agent-world --skill notebooklm
npx skills add yysun/awesome-agent-world --skill playwright-cli
npx skills add yysun/awesome-agent-world --skill youtube-search
```


## Repository Layout

The repository root has three top-level folders: `worlds`, `agents`, and `skills`. Inside the folders each item gets its own folder named with the item's ID.

Example layout:

```
worlds/
	infinite-etude/               # world id: infinite-etude
		README.md
		config.json
		prompts/                    # optional world-level prompt assets
			monsieur-engraver.md
		setup-agents.ts
		agents/                     # optional per-world agent overrides/definitions
			maestro-composer/         # agent id: maestro-composer
				config.json
				system-prompt.md
			madame-pedagogue/         # agent id: madame-pedagogue
				config.json
				system-prompt.md
			monsieur-engraver/        # agent id: monsieur-engraver
				config.json
				system-prompt.md
	run-check/                    # world id: run-check
		config.json
		mcp.json
		agents/
			runner/
				config.json
				memory.json
				system-prompt.md
			checker/
				config.json
				memory.json
				system-prompt.md
		chats/                      # optional persisted chat transcripts
		events/                     # optional persisted event logs

agents/                         # standalone agents (can also live under a world)
	madame-pedagogue/             # agent id: madame-pedagogue
		config.json
		system-prompt.md

skills/
	git-wiki/                     # skill id: git-wiki
		SKILL.md
	music-to-svg/                 # skill id: music-to-svg
		README.md
		requirements.txt
		scripts/
			convert.py
		tests/

README.md
LICENSE
```

Notes:
- The folder name is the canonical ID used for imports (`worlds/<id>`, `agents/<id>`, `skills/<id>`).
- Worlds can contain an `agents/` subfolder for agents specific to that world; standalone agents may live under the top-level `agents/` folder.
- Worlds may also include supporting files such as their own `README.md`, setup scripts, and prompt assets.
- Some worlds also persist runtime artifacts such as `chats/`, `events/`, agent `memory.json`, or `mcp.json` alongside their configuration.


## Contributing

If you'd like to add a world, agent, or skill:

1. Fork this repository and create a new branch.
2. Export your item from the Agent World App and add it to the appropriate top-level folder in your fork: `worlds/`, `agents/`, or `skills/`. Name the folder with the item's ID (for example `worlds/my-cool-world`).
3. Update this README (if desired) with a row in the catalog tables for visibility.
4. Commit and push your changes to your fork.
5. Open a pull request against this repository's `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
