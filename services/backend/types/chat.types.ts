export type OllamaChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  sources?: WebSource[];
};

export type ChatStreamChunk = {
  content?: string;
  sources?: WebSource[];
  done?: boolean;
  error?: string;
};

export type WebSource = {
  id: number;
  title: string;
  url: string;
  content: string;
};

export type ResponseMetadata = {
  web_search_used: boolean;
  sources_count?: number;
  rag_used?: boolean;
  response_time_ms?: number;
};
