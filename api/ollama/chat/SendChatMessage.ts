import { OllamaChatMessage, streamChatMessage } from "..";

export async function sendChatMessage(
  model: string,
  messages: OllamaChatMessage[]
): Promise<string> {
  let fullResponse = "";

  for await (const chunk of streamChatMessage(model, messages)) {
    fullResponse += chunk;
  }

  return fullResponse;
}
