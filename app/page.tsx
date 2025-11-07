import { ChatInput } from "@/components/chat/chat-input/ChatInput";

export default function Chat() {
  return (
    <div className="w-full h-screen flex flex-col p-8">
      <div className="flex-1">{/* Ton contenu de chat */}</div>
      <ChatInput />
    </div>
  );
}
