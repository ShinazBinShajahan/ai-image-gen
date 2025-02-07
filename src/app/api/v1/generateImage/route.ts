import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

// Initialize Hugging Face Inference with your API token
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

export async function POST(request: Request) {
    try {
        // Parse the request body
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Use the Stable Diffusion model to generate an image
        const response = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-2',
            inputs: prompt,
        });

        // Convert the image to a base64 string
        const imageBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString('base64');

        // Return the base64 image as JSON
        return NextResponse.json({ image: base64Image }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
}