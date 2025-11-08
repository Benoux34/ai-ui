"use client";

import { ChatConversation, ChatInput } from "@/components/chat";
import { useChat } from "@/hooks/ollama/useChat";
import { useModel } from "@/contexts/model-context";

export default function Chat() {
  const { currentModel } = useModel();
  const { messages, isLoading, error, sendMessage } = useChat(currentModel);

  return (
    <div className="w-full h-screen flex flex-col p-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 mb-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <ChatConversation messages={messages} currentModel={currentModel} />

      <ChatInput
        currentModel={currentModel}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
}
