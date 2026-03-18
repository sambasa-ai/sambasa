import { conversationRepository } from "@/lib/db";
import { getSession } from "@/lib/auth/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const conversations = await conversationRepository.recentChats(userId);

    return Response.json(conversations);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch conversations" },
      { status: 500 },
    );
  }
}
