"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { getOllamaModels } from "@/api/ollama";

const STORAGE_KEY = "ollama-selected-model";

type ModelContextType = {
  currentModel: string;
  setCurrentModel: (model: string) => void;
  availableModels: string[];
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const initialModelRef = useRef<string | null>(null);

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [currentModel, setCurrentModelState] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    initialModelRef.current = saved;

    if (saved) setCurrentModelState(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchModels = async () => {
      try {
        const models = await getOllamaModels();
        setAvailableModels(models);

        const savedModel = initialModelRef.current;

        if (savedModel && models.includes(savedModel))
          setCurrentModelState(savedModel);
        else {
          const defaultModel = models[0] || "No models available";
          setCurrentModelState(defaultModel);
          localStorage.setItem(STORAGE_KEY, defaultModel);
          initialModelRef.current = defaultModel;
        }
      } catch (error) {
        console.error("❌ Failed to fetch models:", error);
        setAvailableModels([]);
      }
    };

    fetchModels();
  }, [mounted]);

  const setCurrentModel = (model: string) => {
    setCurrentModelState(model);
    localStorage.setItem(STORAGE_KEY, model);
    initialModelRef.current = model;
  };

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
  if (!context) {
    throw new Error("useModel must be used within ModelProvider");
  }
  return context;
}
