"use client";

import { createContext, useContext, useState } from "react";
import { AllModels, ModelProviders } from "@/lib/providers";

interface ConversationContextValue {
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
  model: AllModels;
  setModel: (model: AllModels) => void;
  provider: ModelProviders;
  setProvider: (provider: ModelProviders) => void;
  title: string;
  setTitle: (title: string) => void;
  messageLength: number;
  setMessageLength: (length: number) => void;
}

const ConversationContext = createContext<ConversationContextValue | null>(
  null,
);

export function ConversationProvider({
  children,
  conversationId: initialConversationId = null,
  model: initialModel = "gpt-4.1-mini",
  title: initialTitle = "",
}: {
  children: React.ReactNode;
  conversationId?: string | null;
  model?: AllModels;
  title?: string;
}) {
  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId,
  );

  // console.log(conversationId);
  const [model, setModel] = useState<AllModels>(initialModel);
  const [provider, setProvider] = useState<ModelProviders>("openai");
  const [title, setTitle] = useState<string>(initialTitle);
  const [messageLength, setMessageLength] = useState<number>(0);

  return (
    <ConversationContext.Provider
      value={{
        conversationId,
        setConversationId,
        model,
        setModel,
        provider,
        setProvider,
        title,
        setTitle,
        messageLength,
        setMessageLength,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation(): ConversationContextValue {
  const ctx = useContext(ConversationContext);

  if (!ctx)
    throw new Error(
      "useConversation must be used within a ConversationProvider",
    );

  return ctx;
}
