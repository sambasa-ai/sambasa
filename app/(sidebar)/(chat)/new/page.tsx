import { ChatPage } from "@/components/chat-page";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export default async function NewPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) redirect("/login");

  const conversationId = uuid();

  return <ChatPage conversationId={conversationId} />;
}
