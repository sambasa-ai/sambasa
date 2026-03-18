"use client";

import { memo, useMemo } from "react";
import { useConversation } from "@/hooks/use-conversation";

function PureChatHeader({ isNew }: { isNew?: boolean }) {
  const { title } = useConversation();
  const memoizedTitle = useMemo(() => title, [title]);

  return (
    <header className="w-full flex gap-4 sticky top-0 px-4 py-3 bg-background">
      {!isNew && <p>{memoizedTitle}</p>}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.isNew === nextProps.isNew;
});
