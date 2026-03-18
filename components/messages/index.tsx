"use client";

import { ModelProviders } from "@/lib/providers";
import { RefObject } from "react";
import { UIMessage } from "ai";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";
import { useMemo } from "react";

interface MessagesProps {
  messages: UIMessage[];
  provider: ModelProviders;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function Messages({
  messages,
  provider,
  messagesEndRef,
}: MessagesProps) {
  const renderedMessages = useMemo(
    () =>
      messages.map((msg) => {
        return msg.role.toLowerCase() === "user" ? (
          <UserMessage key={msg.id} msg={msg} />
        ) : (
          <AssistantMessage key={msg.id} msg={msg} provider={provider} />
        );
      }),
    [messages, provider],
  );

  return (
    <div className="flex-1 flex flex-col w-3xl pt-6 pb-16 gap-y-10">
      {renderedMessages}
      <div ref={messagesEndRef} />
    </div>
  );
}
