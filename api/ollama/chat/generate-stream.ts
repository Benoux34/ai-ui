import { ollamaClient } from "../client";

const generateStream = (prompt: string, model: string) => {
  return ollamaClient.stream("/api/generate", {
    model,
    prompt,
    stream: true,
  });
};

export { generateStream };
