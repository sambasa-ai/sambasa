import prisma from "@/lib/prisma";
import { Conversation, Message } from "@/generated/prisma/client";
import {
  CreateConversationInput,
  UpdateConversationInput,
} from "@/lib/schemas/conversation";

export type { CreateConversationInput, UpdateConversationInput };
export type ConversationWithMessages = Conversation & {
  messages: {
    id: string;
    metadata: unknown;
    role: string;
    parts: unknown;
  }[];
};

export const conversationRepository = {
  async create(input: CreateConversationInput): Promise<Conversation> {
    return prisma.conversation.create({
      data: {
        title: input.title,
        userId: input.userId,
        metadata: input.metadata ?? undefined,
      },
    });
  },

  async update(
    conversationId: string,
    input: UpdateConversationInput,
  ): Promise<Conversation> {
    return prisma.conversation.update({
      where: { id: conversationId },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.metadata !== undefined && { metadata: input.metadata }),
      },
    });
  },

  async delete(conversationId: string): Promise<Conversation> {
    return prisma.conversation.delete({
      where: { id: conversationId },
    });
  },

  async findById(conversationId: string): Promise<Conversation | null> {
    return prisma.conversation.findUnique({
      where: { id: conversationId },
    });
  },

  async findByIdWithMessages(
    conversationId: string,
  ): Promise<ConversationWithMessages | null> {
    return prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          select: { id: true, metadata: true, role: true, parts: true },
        },
      },
    });
  },

  async findByIdAndUserId(
    conversationId: string,
    userId: string,
  ): Promise<Conversation | null> {
    return prisma.conversation
      .findUnique({
        where: { id: conversationId },
      })
      .then((conv) => (conv?.userId === userId ? conv : null));
  },

  async findByUserId(userId: string): Promise<Conversation[]> {
    return prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  },

  async recentChats(userId: string) {
    return prisma.conversation.findMany({
      where: { userId },
      select: { title: true, id: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  },
};
