import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_API_URL;

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (body.stream !== false) {
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  // Si pas de streaming
  const data = await response.json();
  return Response.json(data);
}
