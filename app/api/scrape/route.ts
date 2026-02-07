import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { Department } from "@/types/professor";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Map departments to their URL
const DEPARTMENT_URLS: Record<Department, string> = {
    "Artificial Intelligence": "https://www.aibe.tf.fau.de/team/members/",
    "Chemical and Biological Engineering": "https://www.cbi.tf.fau.de/department/lehrstuehle-und-professuren/",
    "Electrical Engineering": "https://www.ee.tf.fau.de/department/lehrstuehle/",
    "Computer Science": "https://www.fau.de/department/informatik/lehrstuehle/",
    "Mechanical Engineering": "https://www.department.mb.tf.fau.de/department-maschinenbau/lehrstuehle-und-professuren/",
    "Materials Science": "https://www.mat.tf.fau.de/department/lehrstuehle/",
};

// Schema for a single professor
const SingleProfessorSchema = z.object({
    name: z.string(),
    department: z.string(),
    email: z.string().optional(),
    website: z.string().optional(),
    research_interests: z.array(z.string()),
    bio_summary: z.string().optional(),
    relevance_score: z.number().optional().describe("Score 0-10 based on user interests"),
    citations: z.number().optional(),
    publications: z.number().optional(),
    h_index: z.number().optional(),
});

// Schema for the full list
const ProfessorListSchema = z.object({
    professors: z.array(
        z.object({
            name: z.string(),
            department: z.string(),
        })
    ),
});

function sendEvent(controller: ReadableStreamDefaultController, event: string, data: any) {
    const message = `data: ${JSON.stringify({ event, data, timestamp: new Date().toISOString() })}\n\n`;
    controller.enqueue(new TextEncoder().encode(message));
}

export async function POST(req: NextRequest) {
    const { departments, apiKey, provider, userInterests, ollamaModel, enrichExternal } = await req.json();

    // Validation
    if (!departments || departments.length === 0 || (!apiKey && provider !== "ollama")) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (provider === "ollama" && !ollamaModel) {
        return new Response(JSON.stringify({ error: "Ollama model must be selected" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Create streaming response
    const stream = new ReadableStream({
        async start(controller) {
            try {
                // 1. Scrape all departments concurrently
                sendEvent(controller, "progress", { stage: "scraping", message: `Scraping ${departments.length} department(s)...` });

                const browser = await puppeteer.launch({ headless: true });

                const scrapingPromises = departments.map(async (department: Department, index: number) => {
                    sendEvent(controller, "progress", {
                        stage: "scraping",
                        message: `Scraping ${department}... (${index + 1}/${departments.length})`
                    });

                    const page = await browser.newPage();
                    const url = DEPARTMENT_URLS[department];

                    await page.setUserAgent(
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                    );

                    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

                    const content = await page.evaluate(() => {
                        const scripts = document.querySelectorAll('script, style, nav, footer, header');
                        scripts.forEach(script => script.remove());
                        return document.body.innerText;
                    });

                    await page.close();

                    return { department, content: content.substring(0, 50000) };
                });

                const scrapedData = await Promise.all(scrapingPromises);
                await browser.close();

                // Merge all scraped content
                const mergedContent = scrapedData.map(d => `=== ${d.department} ===\n${d.content}`).join("\n\n");

                sendEvent(controller, "progress", {
                    stage: "scraped",
                    message: `Successfully scraped ${departments.length} department(s)`,
                });

                // 2. Extract professor names first
                sendEvent(controller, "progress", { stage: "parsing", message: "Extracting professor list..." });

                let model;
                if (provider === "gemini") {
                    const google = createGoogleGenerativeAI({ apiKey });
                    model = google("models/gemini-1.5-flash-latest");
                } else if (provider === "groq") {
                    const groq = createOpenAI({
                        baseURL: 'https://api.groq.com/openai/v1',
                        apiKey,
                    });
                    model = groq("llama-3.3-70b-versatile");
                } else if (provider === "ollama") {
                    const ollama = createOpenAI({
                        baseURL: 'http://localhost:11434/v1',
                        apiKey: 'ollama',
                        fetch: (url, options) => {
                            return fetch(url, {
                                ...options,
                                signal: AbortSignal.timeout(300000),
                            });
                        },
                    });
                    model = ollama(ollamaModel);
                }

                const listResult = await generateObject({
                    model,
                    schema: ProfessorListSchema,
                    prompt: `Extract a list of professor names and their departments from this text. Just names and departments.\n\n${mergedContent}`,
                });

                const professorList = listResult.object.professors;

                // Deduplicate professors by name
                const uniqueProfessors = Array.from(
                    new Map(professorList.map(p => [p.name.toLowerCase(), p])).values()
                );

                sendEvent(controller, "progress", {
                    stage: "parsed",
                    message: `Found ${uniqueProfessors.length} unique professors`,
                });

                // Send the raw list
                sendEvent(controller, "professors_list", { professors: uniqueProfessors });

                // 3. Analyze each professor
                for (let i = 0; i < uniqueProfessors.length; i++) {
                    const prof = uniqueProfessors[i];
                    sendEvent(controller, "progress", {
                        stage: "analyzing",
                        message: `Analyzing ${prof.name}... (${i + 1}/${uniqueProfessors.length})`,
                        current: i,
                        total: uniqueProfessors.length,
                    });

                    try {
                        const detailPrompt = `
You are analyzing a professor from a university website.

Professor: ${prof.name}
Department: ${prof.department}

From the following text, extract ONLY information about this specific professor:
- Email (if available)
- Website URL (if available)
- Research Interests (as a list of 3-5 tags)
- A brief 1-sentence bio summary

${userInterests ? `
CRITICAL: The user is looking for a supervisor with these interests: "${userInterests}".
Rate this professor from 0-10 on relevance to these interests.
` : `Set 'relevance_score' to 0.`}

Text Content:
${mergedContent}
                        `;

                        const detailResult = await generateObject({
                            model,
                            schema: SingleProfessorSchema,
                            prompt: detailPrompt,
                        });

                        let professor = detailResult.object;

                        // TODO: External enrichment will go here
                        if (enrichExternal) {
                            sendEvent(controller, "progress", {
                                stage: "analyzing",
                                message: `Enriching ${prof.name} with external data...`,
                            });
                            // Add 2s delay to show it's working
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            // Placeholder: add mock data for now
                            professor.citations = Math.floor(Math.random() * 5000);
                            professor.publications = Math.floor(Math.random() * 100);
                            professor.h_index = Math.floor(Math.random() * 50);
                        }

                        sendEvent(controller, "professor_analyzed", { professor, index: i });
                    } catch (err) {
                        console.error(`Error analyzing professor ${prof.name}:`, err);
                        sendEvent(controller, "professor_analyzed", {
                            professor: { ...prof, research_interests: [], relevance_score: 0 },
                            index: i,
                        });
                    }
                }

                sendEvent(controller, "progress", {
                    stage: "complete",
                    message: `✨ Analysis complete! Processed ${uniqueProfessors.length} professors.`,
                });

                controller.close();
            } catch (error: any) {
                console.error("Processing error:", error);
                sendEvent(controller, "error", { message: error.message });
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}
