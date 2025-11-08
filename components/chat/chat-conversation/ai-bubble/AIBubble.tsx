"use client";

import { ChatMessage } from "@/api/ollama";

type Props = {
  message: ChatMessage;
  currentModel: string;
};

const AIBubble = ({ message, currentModel }: Props) => {
  return (
    <div className="flex w-full justify-start mb-6">
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="text-xs text-gray-400 font-medium">AI</span>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg px-4 py-3">
          <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
            <span className="text-[10px] text-gray-600">
              via {currentModel}
            </span>

            <span className="text-[10px] text-gray-500">
              {message.timestamp.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AIBubble };
