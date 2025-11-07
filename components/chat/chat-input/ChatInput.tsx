"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChatDetails } from "./chat-details/ChatDetails";
import { Send } from "lucide-react";

const ChatInput = () => {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <div className="w-full">
      <div className="flex items-end gap-x-3 mb-3">
        <Textarea
          placeholder="Ask, Search or Chat..."
          className="min-h-[40px] max-h-[400px] resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={1}
        />

        <Button className="h-[40px] w-[40px] bg-[#121212] border border-gray-600 cursor-pointer">
          <Send className="h-2 w-2 text-white" />
        </Button>
      </div>

      <ChatDetails prompt={prompt} />
    </div>
  );
};

export { ChatInput };
