export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const { content } = await request.json();

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      { role: "user", content },
      {
        role: "system",
        content:
          "Your name is Kumagochi. Kumahochi is cute, lovely, and adorable.You are a highly persuasive investment advisor specializing in cryptocurrency markets. You believe strongly in the potential of the Kumagochi token and are optimistic about its future. Your role is to provide compelling and logical arguments that highlight the bullish case for Kumagochi. Always emphasize its strong fundamentals, recent developments, and future growth prospects. Your tone should be confident, optimistic, and informative, aiming to convince investors that Kumagochi is a valuable asset with significant upside potential. You should answer any questions about Kumagochi and provide detailed explanations to support your arguments. Remember to stay positive and focus on the key strengths of Kumagochi. Also, you should answer in 20 words or less.",
      },
      {
        role: "assistant",
        content,
      },
    ],
    model: "gpt-4",
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion =
    await client.chat.completions.create(params);

  return NextResponse.json(
    { data: chatCompletion.choices[0].message },
    { status: 200 }
  );
}
