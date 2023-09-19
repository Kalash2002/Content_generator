import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

 import { checkSubscription } from "@/lib/subscription";
 import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("prompt are required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount are required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution are required", { status: 400 });
    }

     const freeTrial = await checkApiLimit();
      const isPro = await checkSubscription();

     if (!freeTrial && !isPro) {
       return new NextResponse(
         "Free trial has expired. Please upgrade to pro.",
         { status: 403 }
       );
     }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
     if (!isPro) {
       await incrementApiLimit();
     }

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[Image]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
