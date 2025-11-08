export { backendClient } from "./lib/backend-client";

export { useChat } from "./hooks/use-chat";

export { getOllamaModels } from "./actions/models.actions";

export { checkOllamaHealth } from "./actions/health.actions";

export { streamChatMessage, sendChatMessage } from "./actions/chat.actions";

export type {
  OllamaModel,
  OllamaModelsResponse,
  HealthCheckResponse,
} from "./types/ollama.types";

export type {
  ChatMessage,
  OllamaChatMessage,
  ChatStreamChunk,
  OllamaChatResponse,
} from "./types/chat.types";
