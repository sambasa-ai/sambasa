"use client";

import { memo } from "react";
import { useConversation } from "@/hooks/use-conversation";

function PureChatHeader({ isNew }: { isNew?: boolean }) {
  const { title } = useConversation();

  return (
    <header className="w-full flex gap-4 sticky top-0 px-4 z-50 py-3 bg-background">
      {!isNew && <p>{title}</p>}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.isNew === nextProps.isNew;
});
