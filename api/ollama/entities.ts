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

type OllamaGenerateRequest = {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
  };
};

export type { OllamaModelsResponse, OllamaModelDetails, OllamaGenerateRequest };
