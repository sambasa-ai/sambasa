"use client";

import type { UIMessage } from "ai";
import { Loader2 } from "lucide-react";

export function UserMessage({ msg }: { msg: UIMessage }) {
  return (
    <div className="flex gap-2 group justify-end">
      <div className="max-w-3/4 flex flex-col gap-2 rounded-lg px-4 py-2 whitespace-pre-wrap bg-muted text-primary">
        {msg.parts.length > 0 ? (
          msg.parts.map((part, idx) => {
            if (part.type === "text") {
              return <div key={idx}>{part.text}</div>;
            }
            return null;
          })
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </div>
    </div>
  );
}
