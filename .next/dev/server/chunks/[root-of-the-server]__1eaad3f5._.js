module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/professorlist/web/app/api/scrape/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$puppeteer$29$__ = __turbopack_context__.i("[externals]/puppeteer [external] (puppeteer, esm_import, [project]/Documents/professorlist/web/node_modules/puppeteer)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f40$ai$2d$sdk$2f$google$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/professorlist/web/node_modules/@ai-sdk/google/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/professorlist/web/node_modules/@ai-sdk/openai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/professorlist/web/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Documents/professorlist/web/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$puppeteer$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$puppeteer$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
// Map departments to their URL
const DEPARTMENT_URLS = {
    "Artificial Intelligence": "https://www.aibe.tf.fau.de/team/members/",
    "Chemical and Biological Engineering": "https://www.cbi.tf.fau.de/department/lehrstuehle-und-professuren/",
    "Electrical Engineering": "https://www.ee.tf.fau.de/department/lehrstuehle/",
    "Computer Science": "https://www.fau.de/department/informatik/lehrstuehle/",
    "Mechanical Engineering": "https://www.department.mb.tf.fau.de/department-maschinenbau/lehrstuehle-und-professuren/",
    "Materials Science": "https://www.mat.tf.fau.de/department/lehrstuehle/"
};
// Schema for a single professor
const SingleProfessorSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    research_interests: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()),
    bio_summary: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    relevance_score: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().describe("Score 0-10 based on user interests"),
    citations: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    publications: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    h_index: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
});
// Schema for the full list
const ProfessorListSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    professors: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        department: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    }))
});
function sendEvent(controller, event, data) {
    const message = `data: ${JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString()
    })}\n\n`;
    controller.enqueue(new TextEncoder().encode(message));
}
async function POST(req) {
    const { departments, apiKey, provider, userInterests, ollamaModel, enrichExternal } = await req.json();
    // Validation
    if (!departments || departments.length === 0 || !apiKey && provider !== "ollama") {
        return new Response(JSON.stringify({
            error: "Missing required fields"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    if (provider === "ollama" && !ollamaModel) {
        return new Response(JSON.stringify({
            error: "Ollama model must be selected"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    // Create streaming response
    const stream = new ReadableStream({
        async start (controller) {
            try {
                // 1. Scrape all departments concurrently
                sendEvent(controller, "progress", {
                    stage: "scraping",
                    message: `Scraping ${departments.length} department(s)...`
                });
                const browser = await __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$puppeteer$29$__["default"].launch({
                    headless: true
                });
                const scrapingPromises = departments.map(async (department, index)=>{
                    sendEvent(controller, "progress", {
                        stage: "scraping",
                        message: `Scraping ${department}... (${index + 1}/${departments.length})`
                    });
                    const page = await browser.newPage();
                    const url = DEPARTMENT_URLS[department];
                    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
                    await page.goto(url, {
                        waitUntil: "networkidle2",
                        timeout: 60000
                    });
                    const content = await page.evaluate(()=>{
                        const scripts = document.querySelectorAll('script, style, nav, footer, header');
                        scripts.forEach((script)=>script.remove());
                        return document.body.innerText;
                    });
                    await page.close();
                    return {
                        department,
                        content: content.substring(0, 50000)
                    };
                });
                const scrapedData = await Promise.all(scrapingPromises);
                await browser.close();
                // Merge all scraped content
                const mergedContent = scrapedData.map((d)=>`=== ${d.department} ===\n${d.content}`).join("\n\n");
                sendEvent(controller, "progress", {
                    stage: "scraped",
                    message: `Successfully scraped ${departments.length} department(s)`
                });
                // 2. Extract professor names first
                sendEvent(controller, "progress", {
                    stage: "parsing",
                    message: "Extracting professor list..."
                });
                let model;
                if (provider === "gemini") {
                    const google = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f40$ai$2d$sdk$2f$google$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGoogleGenerativeAI"])({
                        apiKey
                    });
                    model = google("models/gemini-1.5-flash-latest");
                } else if (provider === "groq") {
                    const groq = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOpenAI"])({
                        baseURL: 'https://api.groq.com/openai/v1',
                        apiKey
                    });
                    model = groq("llama-3.3-70b-versatile");
                } else if (provider === "ollama") {
                    const ollama = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOpenAI"])({
                        baseURL: 'http://localhost:11434/v1',
                        apiKey: 'ollama',
                        fetch: (url, options)=>{
                            return fetch(url, {
                                ...options,
                                signal: AbortSignal.timeout(300000)
                            });
                        }
                    });
                    model = ollama(ollamaModel);
                }
                const listResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateObject"])({
                    model,
                    schema: ProfessorListSchema,
                    prompt: `Extract a list of professor names and their departments from this text. Just names and departments.\n\n${mergedContent}`
                });
                const professorList = listResult.object.professors;
                // Deduplicate professors by name
                const uniqueProfessors = Array.from(new Map(professorList.map((p)=>[
                        p.name.toLowerCase(),
                        p
                    ])).values());
                sendEvent(controller, "progress", {
                    stage: "parsed",
                    message: `Found ${uniqueProfessors.length} unique professors`
                });
                // Send the raw list
                sendEvent(controller, "professors_list", {
                    professors: uniqueProfessors
                });
                // 3. Analyze each professor
                for(let i = 0; i < uniqueProfessors.length; i++){
                    const prof = uniqueProfessors[i];
                    sendEvent(controller, "progress", {
                        stage: "analyzing",
                        message: `Analyzing ${prof.name}... (${i + 1}/${uniqueProfessors.length})`,
                        current: i,
                        total: uniqueProfessors.length
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
                        const detailResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$professorlist$2f$web$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateObject"])({
                            model,
                            schema: SingleProfessorSchema,
                            prompt: detailPrompt
                        });
                        let professor = detailResult.object;
                        // TODO: External enrichment will go here
                        if (enrichExternal) {
                            sendEvent(controller, "progress", {
                                stage: "analyzing",
                                message: `Enriching ${prof.name} with external data...`
                            });
                            // Add 2s delay to show it's working
                            await new Promise((resolve)=>setTimeout(resolve, 2000));
                            // Placeholder: add mock data for now
                            professor.citations = Math.floor(Math.random() * 5000);
                            professor.publications = Math.floor(Math.random() * 100);
                            professor.h_index = Math.floor(Math.random() * 50);
                        }
                        sendEvent(controller, "professor_analyzed", {
                            professor,
                            index: i
                        });
                    } catch (err) {
                        console.error(`Error analyzing professor ${prof.name}:`, err);
                        sendEvent(controller, "professor_analyzed", {
                            professor: {
                                ...prof,
                                research_interests: [],
                                relevance_score: 0
                            },
                            index: i
                        });
                    }
                }
                sendEvent(controller, "progress", {
                    stage: "complete",
                    message: `✨ Analysis complete! Processed ${uniqueProfessors.length} professors.`
                });
                controller.close();
            } catch (error) {
                console.error("Processing error:", error);
                sendEvent(controller, "error", {
                    message: error.message
                });
                controller.close();
            }
        }
    });
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1eaad3f5._.js.map