"use client";

import { ChatConversation } from "@/components/chat/chat-conversation/ChatConversation";
import { ChatInput } from "@/components/chat/chat-input/ChatInput";
import { useModel } from "@/contexts/model-context";
import { useChat } from "@/services/backend";
import { useState } from "react";

export default function Chat() {
  const [isWeb, setIsWeb] = useState<boolean>(false);
  const [isRag, setIsRag] = useState<boolean>(false);

  const { currentModel } = useModel();
  const { messages, sendMessage, isLoading } = useChat(currentModel);

  return (
    <div className="w-full h-screen flex flex-col p-8">
      <ChatConversation
        messages={messages}
        currentModel={currentModel}
        isLoading={isLoading}
      />

      <ChatInput
        currentModel={currentModel}
        onSend={sendMessage}
        disabled={isLoading}
        isWeb={isWeb}
        setIsWeb={setIsWeb}
        isRag={isRag}
        setIsRag={setIsRag}
      />
    </div>
  );
}
