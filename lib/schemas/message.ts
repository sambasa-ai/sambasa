import { z } from "zod"

export const MessageMetadataSchema = z.object({}).passthrough().optional()

export type MessageMetadata = z.infer<typeof MessageMetadataSchema>

export const CreateMessageInputSchema = z.object({
  conversationId: z.string(),
  role: z.enum(["USER", "ASSISTANT"]),
  parts: z.unknown(),
  parentId: z.string(),
  metadata: MessageMetadataSchema,
})

export type CreateMessageInput = z.infer<typeof CreateMessageInputSchema>

export const UpdateMessageInputSchema = z.object({
  parts: z.unknown().optional(),
  metadata: MessageMetadataSchema,
})

export type UpdateMessageInput = z.infer<typeof UpdateMessageInputSchema>
