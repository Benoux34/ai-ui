"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChatDetails } from "./chat-details/ChatDetails";
import { Loader2, Send } from "lucide-react";
import { onClickSend, onKeyDown } from "./utils";

type Props = {
  currentModel: string;
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
};

const ChatInput = ({ currentModel, onSend, disabled }: Props) => {
  const [prompt, setPrompt] = useState<string>("");

  const handleSend = onClickSend(prompt, setPrompt, onSend, disabled);
  const handleKeyDown = onKeyDown(handleSend);

  return (
    <div className="w-full">
      <div className="flex items-end gap-x-3 mb-3">
        <Textarea
          placeholder="Ask, Search or Chat... (Ctrl+Enter to send)"
          className="min-h-[40px] max-h-[400px] resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />

        <Button
          className="h-[40px] w-[40px] bg-[#121212] border border-gray-600 cursor-pointer"
          onClick={handleSend}
          disabled={disabled || !prompt.trim()}
        >
          {disabled ? (
            <Loader2 className="h-4 w-4 text-white animate-spin" />
          ) : (
            <Send className="h-4 w-4 text-white" />
          )}
        </Button>
      </div>

      <ChatDetails prompt={prompt} currentModel={currentModel} />
    </div>
  );
};

export { ChatInput };
