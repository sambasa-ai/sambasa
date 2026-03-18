import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import { ChatRequest } from "@/lib/chat";
import { ConversationMetadataSchema } from "@/lib/schemas/conversation";
import { v4 as uuid } from "uuid";
import { getSession } from "@/lib/auth/server";
import { modelProvider } from "@/lib/ai";

import prisma from "@/lib/prisma";
import { conversationRepository } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { message, model, provider, id }: ChatRequest = await request.json();

    const metadata = ConversationMetadataSchema.parse({ model, provider });

    const conversation = await conversationRepository.findById(id);

    const userId = session.user.id;

    if (!conversation) {
      await prisma.conversation.upsert({
        where: { id },
        update: {},
        create: {
          id,
          title: "",
          userId: userId,
          metadata,
        },
      });
    }

    const messageHistory = await prisma.message.findMany({
      where: { conversationId: id },
      select: { id: true, parts: true, role: true, metadata: true },
      orderBy: { createdAt: "asc" },
    });

    const parsedMessageHistory: UIMessage[] = messageHistory.map((msg) => ({
      id: msg.id,
      role: msg.role.toLowerCase() as "user" | "assistant",
      metadata:
        typeof msg.metadata === "string"
          ? JSON.parse(msg.metadata)
          : msg.metadata,
      parts: typeof msg.parts === "string" ? JSON.parse(msg.parts) : msg.parts,
    }));

    await prisma.message.upsert({
      where: { id: message.id },
      update: {},
      create: {
        id: message.id,
        parts: JSON.stringify(message.parts),
        role: "USER",
        conversationId: id,
        parentId: "",
      },
    });

    const stream = createUIMessageStream({
      async execute({ writer }) {
        const result = streamText({
          model: modelProvider({ model: model, provider: provider }),
          messages: await convertToModelMessages([
            ...parsedMessageHistory,
            message,
          ]),
          onFinish: async (result) => {},
        });
        writer.merge(result.toUIMessageStream());
      },
      generateId: uuid,
      onFinish: async ({ responseMessage }) => {
        await prisma.message.upsert({
          where: { id: responseMessage.id },
          update: {},
          create: {
            id: responseMessage.id,
            parts: JSON.stringify(responseMessage.parts),
            role: "ASSISTANT",
            conversationId: id,
            parentId: message.id,
          },
        });
      },
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    return Response.json(
      { message: "An unexpected error occured" },
      { status: 500 },
    );
  }
}
