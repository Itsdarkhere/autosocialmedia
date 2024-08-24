import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  Promotion,
  Service,
} from "@/components/CompanyDashboard/CompanyDashboard";

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

    return NextResponse.json(
      {
        success: true,
        message: "Social media post and image generated successfully",
        post: generatedPost,
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
