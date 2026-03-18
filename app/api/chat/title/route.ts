import { TITLE_PROMPT } from "@/lib/ai/title";
import { conversationRepository } from "@/lib/db";
import { generateText } from "ai";
import { ollama } from "ai-sdk-ollama";
import { getSession } from "@/lib/auth/server";

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { conversationId, prompt, provider } = await request.json();

    if (!conversationId || !prompt) {
      return new Response(JSON.stringify({ error: "Missing conversationId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { text: title } = await generateText({
      model: ollama("ministral-3:3b"),
      system: TITLE_PROMPT,
      prompt,
    });

    await conversationRepository.update(conversationId, { title });

    return Response.json({ title }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to generate title" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
