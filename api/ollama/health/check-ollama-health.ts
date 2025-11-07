import { ollamaClient } from "../client";

const checkOllamaHealth = async (): Promise<boolean> => {
  try {
    await ollamaClient.get("/api/version");

    return true;
  } catch {
    return false;
  }
};

export { checkOllamaHealth };
