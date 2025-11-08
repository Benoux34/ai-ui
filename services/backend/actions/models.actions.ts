"use server";

import { backendClient, OllamaModelsResponse } from "..";

export async function getOllamaModels(): Promise<OllamaModelsResponse> {
  try {
    return await backendClient.get<OllamaModelsResponse>("/api/v1/models");
  } catch (error) {
    console.error("[getOllamaModels] Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch models"
    );
  }
}
