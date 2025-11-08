export type OllamaModel = {
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

export type OllamaModelsResponse = {
  models: OllamaModel[];
};

export type HealthCheckResponse = {
  status: "healthy" | "degraded" | "unhealthy";
  environment: string;
  services: {
    ollama: {
      status: "connected" | "disconnected";
      models_count: number;
    };
    database: {
      status: string;
    };
    redis: {
      status: string;
    };
  };
};
