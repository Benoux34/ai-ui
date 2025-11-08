"use server";

import { backendClient, OllamaChatMessage, ChatStreamChunk } from "..";

export async function streamChatMessage(
  model: string,
  messages: OllamaChatMessage[]
): Promise<AsyncGenerator<string, void, unknown>> {
  return (async function* () {
    try {
      const stream = await backendClient.stream<ChatStreamChunk>(
        "/api/v1/chat",
        {
          model,
          messages,
          stream: true,
        }
      );

      for await (const chunk of stream) {
        if (chunk.error) throw new Error(chunk.error);

        if (chunk.content) yield chunk.content;
      }
    } catch (error) {
      console.error("[streamChatMessage] Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to stream chat"
      );
    }
  })();
}

export async function sendChatMessage(
  model: string,
  messages: OllamaChatMessage[]
): Promise<string> {
  try {
    const response = await backendClient.post<
      {
        model: string;
        messages: OllamaChatMessage[];
        stream: boolean;
      },
      {
        message: { content: string };
      }
    >("/api/v1/chat", {
      model,
      messages,
      stream: false,
    });

    return response.message.content;
  } catch (error) {
    console.error("[sendChatMessage] Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send chat message"
    );
  }
}
