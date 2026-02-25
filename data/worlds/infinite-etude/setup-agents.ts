/**
 * Infinite-Etude Setup Script
 *
 * Purpose:
 * - Bootstrap the Infinite-Etude world and its three demo agents.
 * - Support both sqlite and file storage modes for demo validation.
 *
 * Key Features:
 * - Creates world when missing; updates agents when already present.
 * - Loads agent prompts from prompt files colocated with world data.
 * - Falls back to default agent mappings if config does not define agents.
 *
 * Notes on implementation:
 * - This is a demo fixture bootstrap path and remains opt-in.
 *
 * Recent Changes:
 * - 2026-02-20: Added default agent fallback when config.json omits `agents`.
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

// Opik integration demo fixture: user-agent world bootstrap for scenario/eval validation.
type ConfigAgent = {
  name: string;
  type: string;
  provider?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  promptFile: string;
};

type WorldConfig = {
  name: string;
  description?: string;
  agents?: ConfigAgent[];
};

const DEFAULT_AGENTS: ConfigAgent[] = [
  {
    name: 'Maestro Composer',
    type: 'composer',
    promptFile: 'prompts/maestro-composer.md',
  },
  {
    name: 'Madame Pedagogue',
    type: 'pedagogue',
    promptFile: 'prompts/madame-pedagogue.md',
  },
  {
    name: 'Monsieur Engraver',
    type: 'engraver',
    promptFile: 'prompts/monsieur-engraver.md',
  },
];

function parseArg(name: string): string | undefined {
  const idx = process.argv.findIndex((arg) => arg === name);
  if (idx === -1) {
    return undefined;
  }
  return process.argv[idx + 1];
}

async function main(): Promise<void> {
  const storageType = (parseArg('--storage') || process.env.AGENT_WORLD_STORAGE_TYPE || 'sqlite').trim();
  const configPath = parseArg('--config') || 'data/worlds/infinite-etude/config.json';

  if (storageType !== 'sqlite' && storageType !== 'file') {
    throw new Error(`Unsupported storage type: ${storageType}. Use sqlite or file.`);
  }

  process.env.AGENT_WORLD_STORAGE_TYPE = storageType;
  console.log(`Using storage type: ${storageType}`);

  if (storageType === 'sqlite' && !process.env.AGENT_WORLD_SQLITE_DATABASE) {
    process.env.AGENT_WORLD_SQLITE_DATABASE = './data/database.db';
  }

  if (storageType === 'file' && !process.env.AGENT_WORLD_DATA_PATH) {
    process.env.AGENT_WORLD_DATA_PATH = './data/worlds';
  }

  const absoluteConfig = path.resolve(process.cwd(), configPath);
  if (!fs.existsSync(absoluteConfig)) {
    throw new Error(`Config file not found: ${absoluteConfig}`);
  }

  const config = JSON.parse(fs.readFileSync(absoluteConfig, 'utf-8')) as WorldConfig;
  const agents = Array.isArray(config.agents) && config.agents.length > 0
    ? config.agents
    : DEFAULT_AGENTS;

  const [{ createWorld, createAgent, updateAgent }, { LLMProvider }, { toKebabCase }] = await Promise.all([
    import('../../../core/managers.js'),
    import('../../../core/types.js'),
    import('../../../core/utils.js'),
  ]);

  let worldId = toKebabCase(config.name);

  try {
    const created = await createWorld({
      name: config.name,
      description: config.description || 'Infinite Etude demo world',
    });
    if (created?.id) {
      worldId = created.id;
    }
    console.log(`World ready: ${worldId}`);
  } catch (error) {
    console.log(`World already exists, using: ${worldId}`);
  }

  for (const agent of agents) {
    const promptPath = path.resolve(path.dirname(absoluteConfig), agent.promptFile);
    if (!fs.existsSync(promptPath)) {
      throw new Error(`Prompt file not found: ${promptPath}`);
    }
    const systemPrompt = fs.readFileSync(promptPath, 'utf-8').trim();
    const params = {
      name: agent.name,
      type: agent.type || 'default',
      provider: (agent.provider as any) || LLMProvider.OLLAMA,
      model: agent.model || 'qwen2.5:14b',
      temperature: agent.temperature ?? 0.4,
      maxTokens: agent.maxTokens ?? 2048,
      systemPrompt,
    };

    const agentId = toKebabCase(agent.name);

    try {
      await createAgent(worldId, params);
      console.log(`Created agent: ${agent.name}`);
    } catch {
      await updateAgent(worldId, agentId, params);
      console.log(`Updated agent: ${agent.name}`);
    }
  }

  console.log('Infinite Etude setup completed.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
