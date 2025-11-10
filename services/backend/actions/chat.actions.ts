"use server";

import { backendClient, OllamaChatMessage, ChatStreamChunk } from "..";

export async function streamChatMessage(
  model: string,
  messages: OllamaChatMessage[],
  isWeb: boolean
): Promise<AsyncGenerator<ChatStreamChunk, void, unknown>> {
  return (async function* () {
    try {
      const stream = await backendClient.stream<ChatStreamChunk>(
        "/api/v1/chat",
        {
          model,
          messages,
          stream: true,
          isWeb,
        }
      );

      for await (const chunk of stream) {
        if (chunk.error) throw new Error(chunk.error);

        yield chunk;
      }
    } catch (error) {
      console.error("[streamChatMessage] Error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to stream chat"
      );
    }
  })();
}
