const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";

class BackendClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = BACKEND_BASE_URL;

    if (!process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL) {
      console.warn("⚠️ BASE URL not set");
    }
  }

  async stream<T>(
    endpoint: string,
    body: Record<string, any>
  ): Promise<AsyncGenerator<T, void, unknown>> {
    const self = this;

    return (async function* () {
      const response = await fetch(`${self.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Response body is null");
      }

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data) {
              try {
                yield JSON.parse(data) as T;
              } catch (e) {
                console.warn("[stream] Failed to parse JSON:", data);
              }
            }
          }
        }
      }
    })();
  }

  async post<TBody, TResponse>(
    endpoint: string,
    body: TBody
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return response.json();
  }
}

export const backendClient = new BackendClient();
