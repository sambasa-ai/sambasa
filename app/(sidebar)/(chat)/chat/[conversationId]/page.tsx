import type { ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import { ChatPage } from "@/components/chat-page";
import { ConversationNotFound } from "@/components/conversation-not-found";
import { getSession } from "@/lib/auth/server";
import { conversationRepository } from "@/lib/db";

export async function generateMetadata(
  props: PageProps<"/chat/[conversationId]">,
  parent: ResolvingMetadata,
) {
  const { conversationId } = await props.params;
  return {
    title: `${conversationId} | Sambasa`,
  };
}

export default async function Page(props: PageProps<"/chat/[conversationId]">) {
  const { conversationId } = await props.params;
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const conversation = await conversationRepository.findByIdAndUserId(
    conversationId,
    session.user.id,
  );

  if (!conversation) {
    return <ConversationNotFound />;
  }

  return <ChatPage conversationId={conversationId} />;
}
