"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getOllamaModels } from "@/services/backend";

const STORAGE_KEY = "ollama-selected-model";

type ModelContextType = {
  currentModel: string;
  setCurrentModel: (model: string) => void;
  availableModels: string[];
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [currentModel, setCurrentModelState] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchModels = useCallback(async () => {
    try {
      const response = await getOllamaModels();

      const modelNames = response.models.map((model) => model.name);

      if (modelNames.length === 0) {
        console.warn("⚠️ No models available on Ollama server");
        return;
      }

      setAvailableModels(modelNames);

      const savedModel =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;

      if (savedModel && modelNames.includes(savedModel)) {
        setCurrentModelState(savedModel);
      } else {
        const defaultModel = modelNames[0];
        setCurrentModelState(defaultModel);

        if (typeof window !== "undefined")
          localStorage.setItem(STORAGE_KEY, defaultModel);
      }
    } catch (err) {
      console.error("❌ [ModelProvider] Failed to fetch models:", err);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) fetchModels();
  }, [mounted, fetchModels]);

  const setCurrentModel = useCallback((model: string) => {
    if (!model) {
      console.warn("⚠️ [setCurrentModel] Attempted to set empty model");
      return;
    }

    setCurrentModelState(model);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, model);
  }, []);

  if (!mounted) {
    return (
      <ModelContext.Provider
        value={{
          currentModel: "",
          setCurrentModel: () => {},
          availableModels: [],
        }}
      >
        {children}
      </ModelContext.Provider>
    );
  }

  return (
    <ModelContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        availableModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (!context) throw new Error("useModel must be used within ModelProvider");
  return context;
}
