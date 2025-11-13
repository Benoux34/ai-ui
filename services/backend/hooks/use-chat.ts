"use client";

import { useState, useCallback } from "react";
import {
  streamChatMessage,
  ChatMessage,
  OllamaChatMessage,
  WebSource,
} from "..";

export function useChat(model: string, isWeb: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      setIsLoading(true);
      setError(null);

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          sources: undefined,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        const ollamaMessages: OllamaChatMessage[] = [
          ...messages.map(({ role, content }) => ({ role, content })),
          { role: userMessage.role, content: userMessage.content },
        ];

        let assistantContent = "";
        let sources: WebSource[] | undefined;

        const stream = await streamChatMessage(model, ollamaMessages, isWeb);

        for await (const chunk of stream) {
          if (chunk.content) assistantContent += chunk.content;

          if (chunk.sources) sources = chunk.sources;

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              timestamp: new Date(),
              content: assistantContent,
              sources: sources,
            };
            return newMessages;
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        console.error("[useChat] Error:", err);
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [model, messages, isWeb]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
