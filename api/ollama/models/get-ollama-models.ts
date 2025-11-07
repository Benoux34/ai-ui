"use server";

import { ollamaClient } from "../client";
import { OllamaModelsResponse } from "../entities";

const getOllamaModels = async (): Promise<string[]> => {
  try {
    const data = await ollamaClient.get<OllamaModelsResponse>("/api/tags");

    return data.models.map((model) => model.name);
  } catch (error) {
    console.error("Failed to fetch Ollama models:", error);

    return ["Failed to fetch Ollama models"];
  }
};

export { getOllamaModels };
