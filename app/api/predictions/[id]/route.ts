import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

// Define the type for the prediction object
type Prediction = {
  id: string;
  version: string;
  urls: {
    get: string;
    cancel: string;
  };
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  input: Record<string, unknown>;
  output: unknown;
  error: string | null;
  logs: string;
  metrics: Record<string, unknown>;
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  const prediction = (await replicate.predictions.get(id)) as Prediction;

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction);
}
