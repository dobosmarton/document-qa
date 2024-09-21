import { NextRequest, NextResponse } from "next/server";

import { getChatEngine } from "@/lib/ai-engine";

import { bodySchema, Message } from "./schema";
import { iteratorToStream } from "./iteratorToStream";

const isMessageFromUser = (message: Message | undefined): message is Message & { role: "user" } =>
  message?.role === "user";

const chat = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { messages } = bodySchema.parse(body);
    const lastMessage = messages.pop();

    if (!isMessageFromUser(lastMessage)) {
      return NextResponse.json(
        {
          error: "Last message must be from user",
        },
        { status: 400 }
      );
    }

    const chatEngine = await getChatEngine({ chatHistory: messages });

    const chatResponse = await chatEngine.chat({
      message: lastMessage.content,
      stream: true,
    });

    return new Response(iteratorToStream(chatResponse), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};

export const POST = chat;
