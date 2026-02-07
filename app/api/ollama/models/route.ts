import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch available models from Ollama
        const response = await fetch("http://localhost:11434/api/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Ollama models");
        }

        const data = await response.json();

        // Extract model names from the response
        const models = data.models?.map((model: any) => ({
            name: model.name,
            size: model.size,
            modified: model.modified_at,
        })) || [];

        return NextResponse.json({ models });
    } catch (error: any) {
        console.error("Error fetching Ollama models:", error);
        return NextResponse.json(
            {
                error: "Could not connect to Ollama. Make sure Ollama is running locally.",
                models: []
            },
            { status: 503 }
        );
    }
}
