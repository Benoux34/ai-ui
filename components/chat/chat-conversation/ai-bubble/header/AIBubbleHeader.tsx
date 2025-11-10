import { ChatMessage } from "@/services/backend";
import { Globe } from "lucide-react";

type Props = {
  message: ChatMessage;
};

const AIBubbleHeader = ({ message }: Props) => {
  return (
    <div className="flex items-center gap-2 mb-2 px-1">
      <span className="text-xs text-gray-400 font-medium">AI</span>
      {message.sources && (
        <div className="flex items-center gap-1 text-[10px] text-blue-400">
          <Globe className="h-3 w-3" />
          <span>
            {message.sources.length} source
            {message.sources.length > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export { AIBubbleHeader };
