"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>AI Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description..."
          style={{
            padding: "10px",
            width: "300px",
            marginBottom: "20px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {image && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Image:</h2>
          <img
            src={`data:image/png;base64,${image}`}
            alt="Generated"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}
