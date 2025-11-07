"use server";

import { ollamaClient } from "../client";
import { OllamaGenerateRequest } from "../entities";

const generateText = (prompt: string, model: string) => {
  return ollamaClient.post<OllamaGenerateRequest, { response: string }>(
    "/api/generate",
    {
      model,
      prompt,
      stream: false,
    }
  );
};

export { generateText };
