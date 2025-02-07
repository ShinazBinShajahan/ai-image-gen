# AI Image Generator

![AI Image Generator](https://img.shields.io/badge/Powered%20by-Hugging%20Face-blue) ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)

A simple web application that generates images based on text prompts using Hugging Face's pre-trained models (e.g., Stable Diffusion). Built with Next.js for the frontend and backend, this project allows users to input a description and generate corresponding AI-generated images.

## Features

- **Text-to-Image Generation**: Enter a text prompt, and the AI will generate an image based on your description.
- **Simple UI**: A clean and user-friendly interface for generating images.
- **Powered by Hugging Face**: Utilizes Hugging Face's `diffusers` library and pre-trained models like Stable Diffusion.
- **Backend API**: The image generation logic is handled via a Next.js API route.

## Demo

You can try out the live demo here: [Live Demo Link](#) *(Replace with your deployed URL if applicable)*

![Demo Screenshot](demo-screenshot.png) *(Add a screenshot of your app in action)*

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Hugging Face account and API token

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shinazbinshajahan/ai-image-gen.git
   cd ai-image-gen
2. Install dependencies:
   ```bash
   npm install

---

### **3. Create `.env.local`**

3. Create a `.env.local` file in the root directory and add your Hugging Face API token:
   ```bash
   touch .env.local

---
### **4. Start the Development Server**

```markdown
4. Start the development server:
   ```bash
   npm run dev

### Usage

1. Enter a text description in the input field (e.g., "a futuristic city").
2. Click the "Generate Image" button.
3. Wait for the AI to generate the image based on your prompt.
4. The generated image will appear below the input field.
