"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { RecentHistoryProvider } from "@/hooks/use-recent-history";
import { ConversationProvider } from "@/hooks/use-conversation";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <ConversationProvider>
          <RecentHistoryProvider>{children}</RecentHistoryProvider>
        </ConversationProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
