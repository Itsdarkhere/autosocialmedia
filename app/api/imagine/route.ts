import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import Replicate from "replicate";
import {
  Promotion,
  Service,
} from "@/components/CompanyDashboard/CompanyDashboard";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});
const anthropic = new Anthropic();

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
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

    // Call the Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0.7,
      system:
        "You are a social media marketing expert. Create an engaging social media post for the company based on the provided information. The post should be catchy, informative, and encourage user engagement. Keep it under 280 characters for Twitter compatibility. INCLUDE ONLY WHAT IS GOING ONTO THE POST ITSELF, NO JARGON.",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    });

    // Extract the generated post from the response
    let generatedPost = "";
    for (const block of response.content) {
      if ("type" in block && block.type === "text") {
        generatedPost += block.text;
      }
    }

    console.log("POST: ", generatedPost);
    if (!generatedPost) {
      throw new Error("No text content found in the Anthropic API response");
    }

    // Generate an image prompt based on the company details
    const imagePromptResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
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
      if ("type" in block && block.type === "text") {
        imagePrompt += block.text;
      }
    }

    if (!imagePrompt) {
      throw new Error(
        "No image prompt generated from the Anthropic API response"
      );
    }

    // Generate an image using Replicate
    const imageOutput = await replicate.run("black-forest-labs/flux-pro", {
      input: { prompt: imagePrompt },
    });

    console.log("IMAGE: ", imageOutput);

    return NextResponse.json(
      {
        success: true,
        message: "Social media post and image generated successfully",
        post: generatedPost,
        imageUrl: Array.isArray(imageOutput) ? imageOutput[0] : imageOutput,
      },
      { status: 200 }
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
