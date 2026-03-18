"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

export interface RecentChat {
  id: string;
  title: string;
}

interface RecentHistoryContextValue {
  recentChats: RecentChat[];
  setRecentChats: Dispatch<SetStateAction<RecentChat[]>>;
  isLoading: boolean;
  refreshHistory: () => Promise<void>;
  addNewChat: (conversationId: string, title: string) => void;
}

const RecentHistoryContext = createContext<RecentHistoryContextValue | null>(
  null,
);

export function RecentHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshHistory = async () => {
    try {
      const response = await fetch("/api/chat/recent");
      if (response.ok) {
        const data = await response.json();
        setRecentChats(data);
      }
      if (isLoading) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch recent chats:", error);
    }
  };

  const addNewChat = (conversationId: string, title: string) => {
    setRecentChats((prev) => [{ id: conversationId, title }, ...prev]);
  };

  // Fetch from API on mount
  // useEffect(() => {
  //   async function fetchRecentChats() {
  //     try {
  //       const response = await fetch("/api/chat/recent");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setRecentChats(data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch recent chats:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchRecentChats();
  // }, []);

  return (
    <RecentHistoryContext.Provider
      value={{
        recentChats,
        isLoading,
        setRecentChats,
        refreshHistory,
        addNewChat,
      }}
    >
      {children}
    </RecentHistoryContext.Provider>
  );
}

export function useRecentHistory(): RecentHistoryContextValue {
  const ctx = useContext(RecentHistoryContext);

  if (!ctx)
    throw new Error(
      "useRecentHistory must be used within a RecentHistoryProvider",
    );

  return ctx;
}
