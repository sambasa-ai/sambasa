import type { LanguageModel, UIMessage } from "ai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  id: string;
  message: UIMessage;
  model: string;
  provider: string;
}
