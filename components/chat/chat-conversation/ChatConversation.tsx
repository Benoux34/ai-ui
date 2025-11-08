"use client";

import { ChatMessage } from "@/services/backend";
import { UserBubble } from "./user-bubble/UserBubble";
import { AIBubble } from "./ai-bubble/AIBubble";
import { useEffect, useRef } from "react";

type Props = {
  messages: ChatMessage[];
  currentModel: string;
  isLoading: boolean;
};

const ChatConversation = ({ messages, currentModel, isLoading }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto pt-8 pb-4">
      {messages.map((message) => {
        if (message.role === "user") {
          return <UserBubble key={message.id} message={message} />;
        }

        if (message.role === "assistant") {
          return (
            <AIBubble
              key={message.id}
              message={message}
              currentModel={currentModel}
              isLoading={isLoading}
            />
          );
        }

        if (message.role === "system") {
          return (
            <div key={message.id} className="flex justify-center mb-4">
              <div className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">
                {message.content}
              </div>
            </div>
          );
        }

        return null;
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export { ChatConversation };
