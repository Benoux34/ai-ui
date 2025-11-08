type OllamaModel = {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    parameter_size: string;
    quantization_level: string;
  };
};

type OllamaModelsResponse = {
  models: OllamaModel[];
};

type OllamaModelDetails = {
  modelfile: string;
  parameters: string;
  template: string;
  details: {
    parent_model: string;
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

type OllamaChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type OllamaChatRequest = {
  model: string;
  messages: OllamaChatMessage[];
  stream: boolean;
};

type OllamaChatStreamChunk = {
  model: string;
  created_at: string;
  message: {
    role: "assistant";
    content: string;
  };
  done: boolean;
};

type OllamaChatResponse = {
  model: string;
  created_at: string;
  message: {
    role: "assistant";
    content: string;
  };
  done: true;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  eval_count: number;
  eval_duration: number;
};

type OllamaGenerateRequest = {
  model: string;
  prompt: string;
  stream: boolean;
};

type OllamaGenerateResponse = {
  response: string;
  done: boolean;
};

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
};
