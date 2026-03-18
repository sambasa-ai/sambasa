import { getSession } from "@/lib/auth/server";
import { conversationRepository } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id: conversationId } = await params;

    const conversation =
      await conversationRepository.findByIdWithMessages(conversationId);

    if (!conversation) {
      return new Response(JSON.stringify({ error: "Conversation not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(conversation, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch conversation" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
