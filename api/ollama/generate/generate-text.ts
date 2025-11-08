"use server";

import { ollamaClient, OllamaGenerateRequest } from "..";

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
