class OllamaClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_OLLAMA_API_URL || "http://guts.local:11434";

    if (!process.env.NEXT_PUBLIC_OLLAMA_API_URL)
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

  private async *readStream<T>(
    stream: ReadableStream<Uint8Array>
  ): AsyncGenerator<T, void, unknown> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            yield JSON.parse(line) as T;
          } catch {}
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Stream pour chat
   */
  async stream<T>(
    endpoint: string,
    data: unknown
  ): Promise<AsyncGenerator<T, void, unknown>> {
    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    return this.readStream<T>(response.body);
  }
}

export const ollamaClient = new OllamaClient();
