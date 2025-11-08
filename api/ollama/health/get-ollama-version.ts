import { ollamaClient } from "..";

const getOllamaVersion = async (): Promise<string | null> => {
  try {
    const data = await ollamaClient.get<{ version: string }>("/api/version");

    return data.version;
  } catch {
    return null;
  }
};

export { getOllamaVersion };
