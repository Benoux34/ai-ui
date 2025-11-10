export { backendClient } from "./lib/backend-client";

export { useChat } from "./hooks/use-chat";

export { getOllamaModels } from "./actions/models.actions";

export { checkOllamaHealth } from "./actions/health.actions";

export { streamChatMessage } from "./actions/chat.actions";

export type {
  OllamaModel,
  OllamaModelsResponse,
  HealthCheckResponse,
} from "./types/ollama.types";

export type {
  ChatMessage,
  OllamaChatMessage,
  ChatStreamChunk,
  WebSource,
  ResponseMetadata,
} from "./types/chat.types";
