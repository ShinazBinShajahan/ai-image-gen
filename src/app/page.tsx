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
		<div style={styles.container}>
			<h1 style={styles.title}>AI Image Generator</h1>
			<form onSubmit={handleSubmit} style={styles.form}>
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Enter a description..."
					style={styles.input}
				/>
				<button
					type="submit"
					disabled={loading}
					style={{
						...styles.button,
						...(loading && styles.buttonDisabled),
					}}
				>
					{loading ? <span style={styles.spinner}></span> : "Generate Image"}
				</button>
			</form>
			{image && (
				<div style={styles.imageContainer}>
					<h2 style={styles.subtitle}>Generated Image:</h2>
					<img
						src={`data:image/png;base64,${image}`}
						alt="Generated"
						style={styles.image}
					/>
				</div>
			)}
		</div>
	);
}

const styles = {
	container: {
		padding: "40px",
		textAlign: "center",
		fontFamily: "'Roboto', sans-serif",
		backgroundColor: "#f9fafb",
		minHeight: "100vh",
	},
	title: {
		fontSize: "2.5rem",
		fontWeight: 700,
		color: "#1f2937",
		marginBottom: "30px",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	input: {
		padding: "15px",
		width: "350px",
		fontSize: "1rem",
		borderRadius: "8px",
		border: "1px solid #d1d5db",
		outline: "none",
		transition: "border-color 0.3s ease",
		color: "#1f2937",
		marginBottom: "20px",
		"&:focus": {
			borderColor: "#0070f3",
			color: "#1f2937",
		},
	},
	button: {
		padding: "12px 24px",
		backgroundColor: "#0070f3",
		color: "#fff",
		fontSize: "1rem",
		fontWeight: 600,
		border: "none",
		borderRadius: "8px",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
		"&:hover": {
			backgroundColor: "#005bb5",
		},
	},
	buttonDisabled: {
		backgroundColor: "#cbd5e1",
		cursor: "not-allowed",
	},
	spinner: {
		display: "inline-block",
		width: "20px",
		height: "20px",
		border: "3px solid rgba(255, 255, 255, 0.3)",
		borderTopColor: "#fff",
		borderRadius: "50%",
		animation: "spin 1s linear infinite",
	},
	imageContainer: {
		marginTop: "40px",
	},
	subtitle: {
		fontSize: "1.5rem",
		fontWeight: 600,
		color: "#1f2937",
		marginBottom: "20px",
	},
	image: {
		maxWidth: "100%",
		height: "auto",
		borderRadius: "10px",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
	},
};
