import { Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  prompt: string;
  currentModel: string;
};

const ChatDetails = ({ prompt, currentModel }: Props) => {
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
        <span className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          Ready
        </span>

        <span className="text-[#3d3d3d]">•</span>

        <span className="font-medium">{currentModel}</span>
      </div>
    </div>
  );
};

export { ChatDetails };
