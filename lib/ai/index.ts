import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { AllModels } from "../providers";
import { LanguageModel } from "ai";

type Provider = "anthropic" | "openai";

interface ModelProvider {
  model: string;
  provider: string;
}

export const modelProvider = ({
  model,
  provider,
}: ModelProvider): LanguageModel => {
  switch (provider) {
    case "anthropic":
      return anthropic(model);
    case "openai":
      return openai(model);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};

export const titleModelProvider = ({ provider }: { provider: string }) => {
  switch (provider) {
    case "anthropic":
      return anthropic("claude-haiku-4-5");
    case "openai":
      return openai("gpt-5-mini");
  }
};
