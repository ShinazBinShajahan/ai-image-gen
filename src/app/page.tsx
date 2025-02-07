/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
	const [prompt, setPrompt] = useState("");
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/v1/generateImage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt }),
			});

			const data = await response.json();

			if (response.ok) {
				setImage(data.image);
			} else {
				alert("Failed to generate image");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
			<div className="max-w-4xl mx-auto px-4 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
						AI Image Generator
					</h1>
					<p className="text-gray-400 text-lg">
						Transform your ideas into stunning images using AI
					</p>
				</div>

				<form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
					<div className="flex flex-col sm:flex-row gap-4">
						<input
							type="text"
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder="Describe the image you want to generate..."
							className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-500 text-white"
						/>
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-3 bg-blue-600 rounded-lg font-medium transition-colors
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
						>
							{loading ? (
								<>
									<Loader2 className="w-5 h-5 mr-2 animate-spin" />
									Generating...
								</>
							) : (
								"Generate Image"
							)}
						</button>
					</div>
				</form>

				{image && (
					<div className="bg-gray-800 rounded-xl p-6 shadow-xl">
						<h2 className="text-xl font-semibold mb-4">Generated Image:</h2>
						<div className="relative aspect-square max-w-2xl mx-auto overflow-hidden rounded-lg">
							<img
								src={`data:image/png;base64,${image}`}
								alt="AI Generated"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
