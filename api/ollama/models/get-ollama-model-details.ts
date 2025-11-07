"use server";

import { ollamaClient } from "../client";
import { OllamaModelDetails } from "../entities";

const getOllamaModelDetails = async (
  modelName: string
): Promise<OllamaModelDetails | null> => {
  try {
    return await ollamaClient.post<{ name: string }, OllamaModelDetails>(
      "/api/show",
      { name: modelName }
    );
  } catch (error) {
    console.error(`Failed to get details for ${modelName}:`, error);

    return null;
  }
};

export { getOllamaModelDetails };
