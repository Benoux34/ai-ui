"use client";

import { useState, useCallback } from "react";
import {
  ChatMessage,
  OllamaChatMessage,
  sendChatMessage,
  streamChatMessage,
} from "@/api/ollama";

export function useChat(model: string) {
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
        let assistantContent = "";

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        const ollamaMessages: OllamaChatMessage[] = [
          ...messages.map(({ role, content }) => ({ role, content })),
          { role: userMessage.role, content: userMessage.content },
        ];

        for await (const chunk of streamChatMessage(model, ollamaMessages)) {
          assistantContent += chunk;

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              content: assistantContent,
            };
            return newMessages;
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [model, messages]
  );

  const sendMessageSync = useCallback(
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
        const ollamaMessages: OllamaChatMessage[] = [
          ...messages.map(({ role, content }) => ({ role, content })),
          { role: userMessage.role, content: userMessage.content },
        ];

        const response = await sendChatMessage(model, ollamaMessages);

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [model, messages]
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
    sendMessageSync,
    clearMessages,
  };
}
