"use client";

import { ChatMessage } from "@/api/ollama";

type Props = {
  message: ChatMessage;
};

const UserBubble = ({ message }: Props) => {
  return (
    <div className="flex w-full justify-end mb-6">
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-2 px-1 justify-end">
          <span className="text-xs text-gray-400 font-medium">YOU</span>
        </div>

        <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg px-4 py-3">
          <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>

          <div className="flex justify-end border-t border-gray-600 mt-2 pt-2">
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

export { UserBubble };
