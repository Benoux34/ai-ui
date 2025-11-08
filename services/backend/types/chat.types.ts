export type OllamaChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
};

export type ChatStreamChunk = {
  content?: string;
  error?: string;
};

export type OllamaChatResponse = {
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
