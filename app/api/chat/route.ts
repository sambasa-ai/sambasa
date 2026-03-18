import { getSession } from "@/lib/auth/server";
import { conversationRepository } from "@/lib/db";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id: userId } = session.user;
    const { conversationId }: { conversationId: string } = await request.json();

    if (!conversationId) {
      return new Response(JSON.stringify({ error: "Missing conversationId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const conversation = await conversationRepository.findById(conversationId);

    if (!conversation || conversation.userId !== userId) {
      return new Response(
        JSON.stringify({ error: "Unauthorised to delete this conversation" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await conversationRepository.delete(conversationId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete conversation" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
