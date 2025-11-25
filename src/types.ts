// src/types.ts

export interface AppConfig {
  /** Enable or disable the bot globally */
  active: boolean;
  /** The model to use (e.g., "openai/gpt-4o", "meta/llama-3-70b-instruct") */
  model: string;
  /** The system prompt defining the bot's personality */
  systemMessage: string;
  /** Trigger on new issues? */
  issueTrigger: boolean;
  /** Trigger on new pull requests? */
  prTrigger: boolean;
}

export interface AIRequestMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}
