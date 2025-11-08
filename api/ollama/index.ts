export { ollamaClient } from "./client";

export type {
  OllamaModelsResponse,
  OllamaModelDetails,
  ChatMessage,
  OllamaChatMessage,
  OllamaChatRequest,
  OllamaChatStreamChunk,
  OllamaChatResponse,
  OllamaGenerateRequest,
  OllamaGenerateResponse,
} from "./entities";

export { checkOllamaHealth } from "./health/check-ollama-health";
export { getOllamaVersion } from "./health/get-ollama-version";

export { getOllamaModels } from "./models/get-ollama-models";
export { getOllamaModelDetails } from "./models/get-ollama-model-details";

export { generateText } from "./generate/generate-text";
export { generateStream } from "./generate/generate-stream";

export { sendChatMessage } from "./chat/SendChatMessage";
export { streamChatMessage } from "./chat/StreamChatMessage";
export { streamSimplePrompt } from "./chat/StreamSimplePrompt";
