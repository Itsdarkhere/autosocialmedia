import { NextResponse } from "next/server";
import Replicate from "replicate";
const path = require('path');
import { promises as fs } from 'fs';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});
interface TrainingInput {
  input_images: string;
  steps: number;
  lora_rank: number;
  batch_size: number;
  autocaption: boolean;
  trigger_word: string;
  learning_rate: number;
}

interface ModelCreationParams {
  visibility: "private" | "public";
  hardware: string;
  description: string;
}

export async function POST(request: Request) {
  try {
    // Parse the incoming form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      throw new Error("No file uploaded");
    }

    console.log("File received:", file.name, "Size:", file.size);

    // Check file extension
    if (!file.name.toLowerCase().endsWith(".zip")) {
      throw new Error("Uploaded file must be a ZIP archive");
    }

    // Check file size
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 100 MB
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds the maximum limit of 100 MB");
    }

    // Create a new model
    const modelParams: ModelCreationParams = {
      visibility: "private",
      hardware: "gpu-t4",
      description: "A fine-tuned FLUX.1 model",
    };

    console.log("Creating model with params:", JSON.stringify(modelParams));
    const model = await replicate.models.create(
      process.env.REPLICATE_USERNAME!,
      `flux-${Date.now()}`,
      modelParams
    );

    console.log("Model created:", model.name);
    console.log(
      "Model URL:",
      `https://replicate.com/${model.owner}/${model.name}`
    );

    const filePath = path.join(process.cwd(), 'ig.zip');
    const fileData = await fs.readFile(filePath);

    // Prepare training input
    const trainingInput: TrainingInput = {
      input_images: "https://ik.imagekit.io/s93qwyistj0/ig_90oy-VigY.zip?updatedAt=1724435165455",
      steps: 1000,
      lora_rank: 16,
      batch_size: 1,
      autocaption: true,
      trigger_word: "BIIIBBOOK",
      learning_rate: 0.0004,
    };

    console.log(
      "Preparing training with input:",
      JSON.stringify({ ...trainingInput, input_images: "ReadStream" })
    );

    console.log(`destination: ${model.owner}/${model.name}`);

    // Start the training process
    console.log("Initiating training...");
    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "1296f0ab2d695af5a1b5eeee6e8ec043145bef33f1675ce1a2cdb0f81ec43f02",
      {
        input: trainingInput,
        destination: `${model.owner}/${model.name}`,
      }
    );

    console.log("Training initiated:", training.id);
    console.log("Training status:", training.status);

    return NextResponse.json(
      {
        success: true,
        message: "Training initiated successfully",
        data: {
          modelName: model.name,
          modelUrl: `https://replicate.com/${model.owner}/${model.name}`,
          trainingStatus: training.status,
          trainingUrl: `https://replicate.com/p/${training.id}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error initiating training:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error initiating training",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
