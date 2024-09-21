"use client";

import { useChat } from "ai/react";
import { ChatInput } from "./ui/chat-input";
import { ChatMessages } from "./ui/chat-messages";
import { BoxLayout } from "./ui/box-layout";

export default function Chat() {
  const { messages, input, isLoading, handleSubmit, handleInputChange } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  return (
    <BoxLayout>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </BoxLayout>
  );
}
