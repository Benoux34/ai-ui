class OllamaClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_API_URL || "http://localhost:11434";

    if (!process.env.OLLAMA_API_URL)
      console.warn(
        "⚠️ OLLAMA_API_URL not set, using default: http://localhost:11434"
      );
  }

  /**
   * Méthode GET générique
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok)
      throw new Error(`Ollama API error (GET ${endpoint}): ${response.status}`);

    return response.json();
  }

  /**
   * Méthode POST générique
   */
  async post<T, R = unknown>(endpoint: string, body: T): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok)
      throw new Error(
        `Ollama API error (POST ${endpoint}): ${response.status}`
      );

    return response.json();
  }

  /**
   * Stream pour chat
   */
  async stream<T>(endpoint: string, body: T): Promise<ReadableStream> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body)
      throw new Error(`Ollama stream error: ${response.status}`);

    return response.body;
  }
}

export const ollamaClient = new OllamaClient();
