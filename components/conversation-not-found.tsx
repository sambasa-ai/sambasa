import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ConversationNotFound() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Chat not found</h1>
        <p className="text-muted-foreground">
          The conversation you&#39;re looking for doesn&#39;t exist or you don&#39;t have
          access to it.
        </p>
        <Button asChild>
          <Link href="/new">Start a new chat!</Link>
        </Button>
      </div>
    </div>
  );
}
