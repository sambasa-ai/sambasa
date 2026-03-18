"use client";

import type { ModelProviders } from "@/lib/providers";
import type { UIMessage } from "ai";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Markdown } from "./markdown";
import { useState } from "react";
import { Check } from "lucide-react";

export function AssistantMessage({
  msg,
  provider,
}: {
  msg: UIMessage;
  provider: ModelProviders;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = msg.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex gap-2 group justifsy-start">
      <div className="flex flex-col w-full gap-2">
        {msg.parts.length > 0 ? (
          msg.parts.map((part, idx) => {
            if (part.type === "text") {
              return <Markdown key={idx}>{part.text}</Markdown>;
            }
            return null;
          })
        ) : (
          <div className="flex flex-col w-full gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[75%] h-4" />
          </div>
        )}
        <div className="flex flex-1 gap-2 invisible group-hover:visible">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={copied ? true : false}
          >
            {copied ? (
              <Check className="w-3 h-3 stroke-green-500" />
            ) : (
              <Copy className="w-3 h-3 stroke-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
