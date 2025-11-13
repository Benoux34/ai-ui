"use server";

import { backendClient, HealthCheckResponse } from "..";

export async function checkOllamaHealth(): Promise<boolean> {
  try {
    const response = await backendClient.get<HealthCheckResponse>(
      "/api/v1/health"
    );

    return (
      response.status === "healthy" &&
      response.services.ollama.status === "connected"
    );
  } catch (error) {
    console.error("[checkOllamaHealth] Error:", error);
    return false;
  }
}
