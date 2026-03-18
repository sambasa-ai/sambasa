"use client";

import { useConversation } from "@/hooks/use-conversation";
import Messages from "@/components/messages/index";
import { ChatHeader } from "@/components/chat-header";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { MessageForm } from "@/components/message-form";
import { usePathname } from "next/navigation";
import { UIMessage } from "ai";

interface ChatPageProps {
  conversationId: string;
}

export function ChatPage({ conversationId }: ChatPageProps) {
  const {
    model,
    provider,
    setConversationId,
    setMessageLength,
    setTitle,
    setProvider,
    setModel,
  } = useConversation();
  const pathname = usePathname();
  const isNew = pathname !== `/chat/${conversationId}`;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(!isNew);

  const conversationRef = useRef({ model, provider });

  useEffect(() => {
    conversationRef.current = { model, provider };
  }, [model, provider]);

  const { messages, sendMessage, status, setMessages } = useChat({
    id: conversationId,
    transport: new DefaultChatTransport({
      api: `/api/chat/completion`,
      prepareSendMessagesRequest(request) {
        if (pathname !== `/chat/${conversationId}`) {
          window.history.replaceState({}, "", `/chat/${conversationId}`);
        }

        const lastMessage = request.messages.at(-1);

        return {
          body: {
            id: request.id,
            message: lastMessage,
            model: conversationRef.current.model,
            provider: conversationRef.current.provider,
            ...request.body,
          },
        };
      },
    }),
  });

  useEffect(() => {
    setConversationId(conversationId);
    if (!isNew) {
      async function getConversation() {
        try {
          const response = await fetch(`/api/chat/${conversationId}`);
          if (response.ok) {
            const conversation = await response.json();
            if (conversation.messages) {
              const parsedMessages = conversation.messages.map(
                (msg: UIMessage) => ({
                  id: msg.id,
                  role: msg.role,
                  metadata:
                    typeof msg.metadata === "string"
                      ? JSON.parse(msg.metadata)
                      : msg.metadata,
                  parts:
                    typeof msg.parts === "string"
                      ? JSON.parse(msg.parts)
                      : msg.parts,
                }),
              );

              setMessages(parsedMessages);
            }
            if (conversation.metadata) {
              setProvider(conversation.metadata.provider);
              setModel(conversation.metadata.model);
            }
            setTitle(conversation.title);
          }
        } catch (error) {
          console.error("Failed to fetch conversation:", error);
        } finally {
          setIsLoadingMessages(false);
        }
      }

      getConversation();
    }
  }, [
    conversationId,
    isNew,
    setMessages,
    setConversationId,
    setTitle,
    setProvider,
    setModel,
  ]);

  useEffect(() => {
    setMessageLength(messages.length);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, setMessageLength]);

  return (
    <>
      <ChatHeader isNew={isNew} />
      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 flex-col max-w-3xl mx-auto">
          {isLoadingMessages ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-muted-foreground">Loading messages...</div>
            </div>
          ) : (
            <Messages
              messages={messages}
              messagesEndRef={messagesEndRef}
              provider={provider}
            />
          )}
        </div>
        <div className="sticky w-full bottom-10 z-10">
          <MessageForm
            sendMessage={sendMessage}
            status={status}
            conversationId={conversationId}
            isNew={isNew}
          />
        </div>
      </div>
      <div ref={messagesEndRef} />
    </>
  );
}
