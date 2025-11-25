import { Context } from "probot";
import { AppConfig } from "./types";

export const DEFAULT_CONFIG: AppConfig = {
  active: true,
  model: "openai/gpt-4o",
  systemMessage:
    "You are a helpful GitHub assistant. Analyze the following issue or pull request and provide a professional, constructive, and concise comment. If it's a bug, ask for reproduction steps. If it's a PR, thank the contributor.",
  issueTrigger: true,
  prTrigger: true,
};

const CONFIG_FILE = "auto-comment-ai.yml";

export async function loadConfig(context: Context): Promise<AppConfig | null> {
  try {
    const config = await context.config<AppConfig>(CONFIG_FILE, DEFAULT_CONFIG);
    return config || DEFAULT_CONFIG;
  } catch (error) {
    context.log.error({ err: error }, "Failed to load configuration");
    return DEFAULT_CONFIG;
  }
}
