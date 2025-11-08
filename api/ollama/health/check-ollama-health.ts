import { ollamaClient } from "..";

const checkOllamaHealth = async (): Promise<boolean> => {
  try {
    await ollamaClient.get("/api/version");

    return true;
  } catch {
    return false;
  }
};

export { checkOllamaHealth };
