import { Dispatch, KeyboardEvent, SetStateAction } from "react";

const onClickSend = (
  prompt: string,
  setPrompt: Dispatch<SetStateAction<string>>,
  onSend: (message: string) => Promise<void>,
  disabled?: boolean
) => {
  return async () => {
    if (!prompt.trim() || disabled) return;

    await onSend(prompt);
    setPrompt("");
  };
};

const onKeyDown = (handleSend: () => Promise<void>) => {
  return (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      e.preventDefault();
      handleSend();
    }
  };
};

export { onClickSend, onKeyDown };
