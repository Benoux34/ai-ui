import { ChatMessage } from "@/services/backend";
import { ExternalLink, Globe } from "lucide-react";

type Props = {
  message: ChatMessage;
};

const AIBubbleSources = ({ message }: Props) => {
  return (
    <div className="px-4 py-3 bg-[#151515] border-t border-[#2d2d2d]">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-3.5 w-3.5 text-blue-400" />
        <span className="text-xs font-medium text-gray-400">Sources web</span>
      </div>

      <div className="space-y-2">
        {message.sources &&
          message.sources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 p-2 rounded bg-[#1a1a1a] border border-[#2d2d2d] hover:border-blue-500/50 transition-colors"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium mt-0.5">
                {source.id}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-gray-300 group-hover:text-blue-400 transition-colors line-clamp-1 font-medium">
                    {source.title}
                  </p>
                  <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
                <p className="text-[10px] text-gray-600 line-clamp-1 mt-0.5">
                  {source.url}
                </p>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export { AIBubbleSources };
