import { NextRequest, NextResponse } from "next/server";
import Replicate, { WebhookEventType } from "replicate";
import { Anthropic } from "@anthropic-ai/sdk";

// Define the type for the request body
type RequestBody = {
  companyName: string;
  companyDescription: string;
  services: Service[];
  promotions: Promotion[];
};

type Service = {
  title: string;
  description: string;
  price: number;
};

type Promotion = {
  description: string;
  isOngoing: boolean;
  startDate?: string;
  endDate?: string;
};

// Define the type for the prediction options
type PredictionOptions = {
  version: string;
  input: { prompt: string };
  webhook?: string;
  webhook_events_filter?: WebhookEventType[];
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY as string,
});

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "The ANTHROPIC_API_KEY environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  try {
    const body: RequestBody = await request.json();
    const { companyName, companyDescription, services, promotions } = body;

    // Prepare the content for the Anthropic API
    const content = `
    Company Name: ${companyName}
    Company Description: ${companyDescription}
    Services: ${services
      .map((s: Service) => `${s.title} - ${s.description} ($${s.price})`)
      .join(", ")}
    Promotions: ${promotions
      .map(
        (p: Promotion) =>
          `${p.description} (${
            p.isOngoing ? "Ongoing" : `From ${p.startDate} to ${p.endDate}`
          })`
      )
      .join(", ")}
    `;

    // Generate an image prompt based on the company details
    const imagePromptResponse = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 100,
      temperature: 0.7,
      system:
        "You are an expert at creating prompts for image generation AI. Create a vivid, detailed prompt for an image that represents the essence of the company and its services. The prompt should be suitable for generating an engaging social media image. Try to create the prompt in a way that the resulting image is photo-realistic, looks real.",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });

    let imagePrompt = "";
    for (const block of imagePromptResponse.content) {
      if (block.type === "text") {
        imagePrompt += block.text;
      }
    }

    if (!imagePrompt) {
      throw new Error(
        "No image prompt generated from the Anthropic API response"
      );
    }

    const options: PredictionOptions = {
      version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
      input: { prompt: imagePrompt },
    };

    if (WEBHOOK_HOST) {
      options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
      options.webhook_events_filter = ["start", "completed"];
    }

    // Create a prediction using Replicate
    const prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(
      {
        prediction,
        imagePrompt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error processing request",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}