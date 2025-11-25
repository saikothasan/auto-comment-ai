import { AIRequestMessage, AIResponse } from "./types";

const AI_API_URL = "https://models.github.ai/inference/chat/completions";

/**
 * Calls the GitHub Models Inference API
 */
export async function generateAIResponse(
  systemMessage: string,
  userMessage: string,
  model: string,
  logger: any
): Promise<string | null> {
  const token = process.env.AI_TOKEN;

  if (!token) {
    logger.error("Missing AI_TOKEN in environment variables.");
    return null;
  }

  const payload = {
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ] as AIRequestMessage[],
    temperature: 1,
    top_p: 1,
    model: model,
  };

  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(
        `AI API Error (${response.status}): ${response.statusText} - ${errorText}`
      );
      return null;
    }

    const data = (await response.json()) as AIResponse;
    return data.choices[0]?.message?.content || null;
  } catch (error) {
    logger.error({ err: error }, "Failed to fetch from AI API");
    return null;
  }
}
