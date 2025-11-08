"use client";

import { formatMessageTime } from "@/lib/date";
import { ChatMessage } from "@/services/backend";
import { Loader2 } from "lucide-react";

type Props = {
  message: ChatMessage;
  currentModel: string;
  isLoading: boolean;
};

const AIBubble = ({ message, currentModel, isLoading }: Props) => {
  const showOnlyLoader = isLoading && !message.content;

  return (
    <div className="flex w-full justify-start mb-6">
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="text-xs text-gray-400 font-medium">AI</span>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg px-4 py-3">
          {showOnlyLoader ? (
            <div className="flex items-center gap-x-2">
              <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />

              <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap break-words">
                l&apos;IA ({currentModel}) gamberge un peu, parce que tu fais
                sérrer la tête...
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
            <span className="text-[10px] text-gray-600">
              via {currentModel}
            </span>

            <span className="text-[10px] text-gray-500">
              {formatMessageTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AIBubble };
