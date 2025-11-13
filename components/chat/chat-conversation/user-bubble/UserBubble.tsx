"use client";

import { formatMessageTime } from "@/lib/date";
import { ChatMessage } from "@/services/backend";
import { UserBubbleHeader } from "./header/UserBubbleHeader";

type Props = {
  message: ChatMessage;
};

const UserBubble = ({ message }: Props) => {
  return (
    <div className="flex w-full justify-end mb-6">
      <div className="max-w-[80%]">
        <UserBubbleHeader />

        <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg overflow-hidden">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>

          <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#2d2d2d]">
            <div className="flex items-center justify-end">
              <span className="text-[10px] text-gray-500">
                {formatMessageTime(message.timestamp)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserBubble };
