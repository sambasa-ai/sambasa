"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

import Link from "next/link";
import { RecentChat, useRecentHistory } from "@/hooks/use-recent-history";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useEffect, memo } from "react";
import type { Dispatch } from "react";
import { toast } from "sonner";

function PureChatHistoryItem({
  chat,
  isActive,
  setRecentChats,
}: {
  chat: RecentChat;
  isActive: boolean;
  setRecentChats: Dispatch<SetStateAction<RecentChat[]>>;
}) {
  return (
    <SidebarMenuItem
      key={chat.id}
      className={`group/chat rounded-md pl-2 hover:bg-muted/90 ${isActive ? "bg-muted" : ""}`}
      data-type="chat"
    >
      <div className="flex gap-4 items-center">
        <Link href={`/chat/${chat.id}`} className="truncate flex-1">
          {chat.title}
        </Link>

        <AlertDialogDestructive
          conversationId={chat.id}
          setRecentChats={setRecentChats}
        />
      </div>
    </SidebarMenuItem>
  );
}

const ChatHistoryItem = memo(PureChatHistoryItem, (prevProps, nextProps) => {
  return (
    prevProps.chat.id === nextProps.chat.id &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.setRecentChats === nextProps.setRecentChats
  );
});

export function AlertDialogDestructive({
  conversationId,
  setRecentChats,
}: {
  conversationId: string;
  setRecentChats: Dispatch<SetStateAction<RecentChat[]>>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function deleteConversation() {
    const response = await fetch("/api/chat", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete conversation");
    }

    toast.info("Chat has been deleted", { position: "top-right" });

    if (pathname === `/chat/${conversationId}`) {
      router.push("/new");
    }

    setRecentChats((prev) => prev.filter((chat) => chat.id !== conversationId));
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-1 has-[>svg]:p-2 group-hover/chat:opacity-100 opacity-0"
        >
          <Trash2Icon className="w-1 h-1" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteConversation} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function RecentChats() {
  const { recentChats, isLoading, setRecentChats, refreshHistory } =
    useRecentHistory();

  const pathname = usePathname();

  useEffect(() => {
    refreshHistory();
  }, []);

  return (
    <SidebarGroup className="group-data-[state=collapsed]:hidden animate-in fade-in duration-500">
      <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 3 }).map((_, i) => (
            <SidebarMenuItem key={`skeleton-${i}`}>
              <Skeleton className="h-8 w-full" />
            </SidebarMenuItem>
          ))
        ) : recentChats.length === 0 ? (
          <SidebarMenuItem>
            <span className="text-sm text-muted-foreground">
              No recent chats available
            </span>
          </SidebarMenuItem>
        ) : (
          recentChats.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              chat={chat}
              isActive={pathname === `/chat/${chat.id}`}
              setRecentChats={setRecentChats}
            />
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
