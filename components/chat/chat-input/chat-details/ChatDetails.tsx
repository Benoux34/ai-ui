import { cn } from "@/lib/utils";
import { Database, Globe, Sparkles, Zap } from "lucide-react";
import { CheckOllamaHealth } from "./check-ollama-health/CheckOllamaHealth";

type Props = {
  prompt: string;
  currentModel: string;
  isWeb: boolean;
  isRag: boolean;
};

const ChatDetails = ({ prompt, currentModel, isWeb, isRag }: Props) => {
  const charCount = prompt.length;
  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const lines = prompt.split("\n").length;
  const estimatedTokens = Math.ceil(charCount / 4);

  return (
    <div className="flex items-center justify-between text-xs text-[#858585]">
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "transition-colors",
            charCount > 3500 && "text-orange-500",
            charCount >= 4000 && "text-red-500"
          )}
        >
          {charCount} chars
        </span>

        {wordCount > 0 && (
          <>
            <span className="text-[#3d3d3d]">•</span>
            <span>
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
          </>
        )}

        {lines > 1 && (
          <>
            <span className="text-[#3d3d3d]">•</span>
            <span>
              {lines} {lines === 1 ? "line" : "lines"}
            </span>
          </>
        )}

        {estimatedTokens > 0 && (
          <>
            <span className="text-[#3d3d3d]">•</span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />~{estimatedTokens} tokens
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <CheckOllamaHealth />

        {isWeb && (
          <>
            <span className="text-[#3d3d3d]">•</span>

            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-600/10 border border-blue-400/20 text-blue-400">
              <Globe className="h-3 w-3" />
              <span className="font-medium">Web Enhanced</span>
              <Sparkles className="h-2.5 w-2.5 animate-pulse" />
            </span>
          </>
        )}

        {isRag && (
          <>
            <span className="text-[#3d3d3d]">•</span>

            <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-600/10 border border-purple-400/20 text-purple-400">
              <Database className="h-3 w-3" />
              <span className="font-medium">RAG</span>
              <Sparkles className="h-2.5 w-2.5 animate-pulse" />
            </span>
          </>
        )}

        <span className="text-[#3d3d3d]">•</span>

        <span className="font-medium">{currentModel}</span>
      </div>
    </div>
  );
};

export { ChatDetails };
