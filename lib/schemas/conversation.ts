import { z } from "zod";

export const ConversationMetadataSchema = z.object({
  model: z.string(),
  provider: z.string(),
});

export type ConversationMetadata = z.infer<typeof ConversationMetadataSchema>;

export const CreateConversationInputSchema = z.object({
  title: z.string(),
  userId: z.string(),
  metadata: ConversationMetadataSchema.optional(),
});

export type CreateConversationInput = z.infer<
  typeof CreateConversationInputSchema
>;

export const UpdateConversationInputSchema = z.object({
  title: z.string().optional(),
  metadata: ConversationMetadataSchema.optional(),
});

export type UpdateConversationInput = z.infer<
  typeof UpdateConversationInputSchema
>;
