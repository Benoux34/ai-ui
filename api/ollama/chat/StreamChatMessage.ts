import { OllamaChatMessage, OllamaChatStreamChunk, ollamaClient } from "..";

export async function* streamChatMessage(
  model: string,
  messages: OllamaChatMessage[]
): AsyncGenerator<string, void, unknown> {
  const stream = await ollamaClient.stream<OllamaChatStreamChunk>(
    "/api/ollama",
    {
      model,
      messages,
      stream: true,
    }
  );

  for await (const chunk of stream) {
    if (chunk.message?.content) {
      yield chunk.message.content;
    }
  }
}
