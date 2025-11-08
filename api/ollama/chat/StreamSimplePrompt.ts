import { streamChatMessage } from "./StreamChatMessage";

export async function* streamSimplePrompt(
  model: string,
  prompt: string
): AsyncGenerator<string, void, unknown> {
  yield* streamChatMessage(model, [
    {
      role: "user",
      content: prompt,
    },
  ]);
}
