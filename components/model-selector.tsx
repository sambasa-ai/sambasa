"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import type { AllModels, ModelProviders } from "@/lib/providers";
import { ProviderLabels, AvailableModels } from "@/lib/providers";
import { Bot } from "lucide-react";

import { OpenAI, Anthropic } from "@lobehub/icons";
import { useConversation } from "@/hooks/use-conversation";
import { useRouter } from "next/navigation";

function ProviderIcon({ provider }: { provider: ModelProviders }) {
  if (provider === "openai") return <OpenAI />;
  else if (provider === "anthropic") return <Anthropic />;
  else return <Bot />;
}

export default function ModelSelector() {
  const { model, setModel, provider, setProvider, messageLength } =
    useConversation();

  const router = useRouter();

  async function handleModelChange(
    newModel: AllModels,
    newProvider: ModelProviders,
  ) {
    if (messageLength > 0) {
      setModel(newModel);
      setProvider(newProvider);
      router.push(`/new`);
    } else {
      setModel(newModel);
      setProvider(newProvider);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="">
          {AvailableModels[provider][model]}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48" align="start">
        <DropdownMenuGroup>
          {Object.keys(AvailableModels).map((key) => (
            <DropdownMenuSub key={key}>
              <DropdownMenuSubTrigger>
                <ProviderIcon provider={key} />
                {ProviderLabels[key]}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-48">
                  {Object.keys(AvailableModels[key]).map((modelKey) => (
                    <DropdownMenuCheckboxItem
                      key={modelKey}
                      onClick={() => handleModelChange(modelKey, key)}
                      checked={modelKey === model}
                    >
                      {AvailableModels[key][modelKey]}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
