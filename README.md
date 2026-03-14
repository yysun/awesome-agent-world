# Awesome Agent World

This repository stores "worlds", "agents", and "skills" for the Agent World app. The recommended organization places each world, agent, or skill in its own folder at the repository root, using the item's ID as the folder name so the app can import by path or URL.

## How to Use

In the Agent World App, import items from this repository by pointing the importer at the folder for a world, agent, or skill. Examples:

- Import a world by path: `worlds/infinite-etude`
- Import a world by GitHub URL: `https://github.com/yysun/awesome-agent-world/tree/main/worlds/infinite-etude`
- Import a skill by path: `skills/music-to-svg`
- Import an agent by path: `agents/madame-pedagogue`

Steps:
1. Click the "Import" button in the app.
2. Enter the repository path (examples above) or the full GitHub URL to the folder you want to import.

## Recommended Repository Layout

Organize the repository root with three top-level folders: `worlds`, `agents`, and `skills`. Each item gets its own folder named with the item's ID.

Example layout:

```
worlds/
	infinite-etude/               # world id: infinite-etude
		config.json
		setup-agents.ts
		agents/                     # optional per-world agent overrides/definitions
			madame-pedagogue/         # agent id: madame-pedagogue
				config.json
				memory.json
				system-prompt.md
			maestro-composer/

agents/                         # standalone agents (can also live under a world)
	madame-pedagogue/             # agent id: madame-pedagogue
		config.json
		memory.json
		system-prompt.md

skills/
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

## Examples

| Type | Name | Path |
| ---- | ---- | ---- |
| World | Infinite Etude | [worlds/infinite-etude](worlds/infinite-etude) |
| Agent | Madame Pedagogue | [agents/madame-pedagogue](agents/madame-pedagogue) |
| Skill | Music → SVG | [skills/music-to-svg](skills/music-to-svg) |

## Contributing

If you'd like to add a world, agent, or skill:

1. Fork this repository and create a new branch.
2. Export your item from the Agent World App and add it to the appropriate top-level folder in your fork: `worlds/`, `agents/`, or `skills/`. Name the folder with the item's ID (for example `worlds/my-cool-world`).
3. Update this README (if desired) with a row in the Examples table for visibility.
4. Commit and push your changes to your fork.
5. Open a pull request against this repository's `main` branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

