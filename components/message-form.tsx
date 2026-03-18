"use client";

import { ArrowUp, AudioLines, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UIMessage } from "ai";
import { v4 as uuid } from "uuid";
import { UseChatHelpers } from "@ai-sdk/react";
import { useState } from "react";
import { useConversation } from "@/hooks/use-conversation";
import { useRouter } from "next/navigation";
import { useRecentHistory } from "@/hooks/use-recent-history";
import ModelSelector from "@/components/model-selector";

interface MessageFormProps {
  sendMessage: UseChatHelpers<UIMessage>["sendMessage"];
  status: UseChatHelpers<UIMessage>["status"];
  conversationId: string;
  isNew: boolean;
}

export function MessageForm({
  sendMessage,
  status,
  conversationId,
  isNew,
}: MessageFormProps) {
  const [input, setInput] = useState("");
  const { addNewChat } = useRecentHistory();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || status === "streaming") return;

    const messageId = uuid();

    const message: UIMessage = {
      id: messageId,
      role: "user",
      parts: [
        {
          type: "text",
          text: input,
        },
      ],
    };

    sendMessage(message);
    setInput("");

    if (isNew) {
      const response = await fetch("/api/chat/title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, prompt: trimmed }),
      });
      if (response.ok) {
        const { title } = await response.json();
        addNewChat(conversationId, title);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-secondary rounded-2xl flex flex-1"
    >
      <div className="flex flex-col gap-3 px-5 py-4 w-full">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How can I help you today?"
          className="flex-1 focus:outline-none field-sizing-content overflow-y-auto max-h-96 resize-none"
        />
        <div className="w-full flex justify-between gap-3">
          <ModelSelector />
          <Button
            type="submit"
            size="icon"
            variant="outline"
            disabled={status === "streaming"}
            className="rounded-full"
          >
            {status === "streaming" ? (
              <Square className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
