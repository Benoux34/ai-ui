"use client";

import { formatMessageTime } from "@/lib/date";
import { ChatMessage } from "@/services/backend";
import { Loader2 } from "lucide-react";
import { AIBubbleHeader } from "./header/AIBubbleHeader";
import { AIBubbleSources } from "./sources/AIBubbleSources";

type Props = {
  message: ChatMessage;
  currentModel: string;
  isLoading: boolean;
};

const AIBubble = ({ message, currentModel, isLoading }: Props) => {
  const showOnlyLoader: boolean = isLoading && !message.content;

  return (
    <div className="flex w-full justify-start mb-6">
      <div className="max-w-[80%]">
        <AIBubbleHeader message={message} />

        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg overflow-hidden">
          <div className="px-4 py-3">
            {showOnlyLoader ? (
              <div className="flex items-center gap-x-2">
                <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />

                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap break-words">
                  l&apos;IA ({currentModel}) réfléchit...
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
                {message.content}
              </p>
            )}
          </div>

          {message.sources && <AIBubbleSources message={message} />}

          <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#2d2d2d]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600">
                via {currentModel}
              </span>

              {!isLoading && (
                <span className="text-[10px] text-gray-500">
                  {formatMessageTime(message.timestamp)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AIBubble };
