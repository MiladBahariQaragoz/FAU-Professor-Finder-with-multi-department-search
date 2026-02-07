"use client";

import { useState, useEffect, useRef } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ProfessorCard } from "@/components/ProfessorCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ProgressLog } from "@/components/ProgressLog";
import { Department, Professor } from "@/types/professor";

type ProfessorWithStatus = Professor & {
    status?: "pending" | "analyzing" | "analyzed" | "filtered";
};

type ProgressLogEntry = {
    timestamp: string;
    stage: string;
    message: string;
};

export default function Home() {
    const [professors, setProfessors] = useState<ProfessorWithStatus[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState({ current: 0, total: 0, stage: "" });
    const [logs, setLogs] = useState<ProgressLogEntry[]>([]);
    const [currentlyAnalyzing, setCurrentlyAnalyzing] = useState<number | null>(null);
    const [hasInterests, setHasInterests] = useState(false);

    const eventSourceRef = useRef<EventSource | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

    const addLog = (stage: string, message: string) => {
        setLogs((prev) => [...prev, { timestamp: new Date().toISOString(), stage, message }]);
    };

    const handleStop = () => {
        // Abort the fetch request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Cancel the stream reader
        if (readerRef.current) {
            readerRef.current.cancel();
        }

        setLoading(false);
        addLog("cancelled", "Operation cancelled by user");
    };

    const handleSearch = async (
        apiKey: string,
        departments: Department[],
        interests: string,
        provider: "gemini" | "groq" | "ollama",
        ollamaModel?: string,
        enrichExternal?: boolean
    ) => {
        setLoading(true);
        setError(null);
        setProfessors([]);
        setLogs([]);
        setProgress({ current: 0, total: 0, stage: "" });
        setHasInterests(!!interests.trim());

        // Close any existing EventSource
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        try {
            // We'll use fetch with streaming instead of EventSource for POST
            const response = await fetch("/api/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    departments,
                    apiKey,
                    provider,
                    userInterests: interests,
                    ollamaModel,
                    enrichExternal,
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                throw new Error("Failed to start scraping");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error("No response body");
            }

            readerRef.current = reader;

            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            handleStreamEvent(data);
                        } catch (e) {
                            console.error("Failed to parse SSE:", e);
                        }
                    }
                }
            }

            setLoading(false);
        } catch (err: any) {
            // Don't show error if it was aborted by user
            if (err.name === 'AbortError') {
                setLoading(false);
                return;
            }
            setError(err.message);
            setLoading(false);
            addLog("error", err.message);
        }
    };

    const handleStreamEvent = (data: any) => {
        const { event, data: eventData } = data;

        switch (event) {
            case "progress":
                const { stage, message, current, total } = eventData;
                addLog(stage, message);
                if (current !== undefined && total !== undefined) {
                    setProgress({ current, total, stage });
                } else {
                    setProgress((prev) => ({ ...prev, stage }));
                }
                break;

            case "professors_list":
                // Display all professors immediately with "pending" status
                const initialProfs: ProfessorWithStatus[] = eventData.professors.map(
                    (prof: any) => ({
                        ...prof,
                        status: "pending",
                        research_interests: [],
                    })
                );
                setProfessors(initialProfs);
                setProgress((prev) => ({ ...prev, total: initialProfs.length, current: 0 }));
                break;

            case "professor_analyzed":
                const { professor, index } = eventData;

                // Update the professor at this index
                setProfessors((prev) => {
                    const updated = [...prev];
                    const analyzedProf: ProfessorWithStatus = {
                        ...professor,
                        status: "analyzed",
                    };

                    // If has interests and score is too low, mark for filtering
                    if (hasInterests && (professor.relevance_score || 0) < 3) {
                        analyzedProf.status = "filtered";

                        // Remove after animation completes
                        setTimeout(() => {
                            setProfessors((p) => p.filter((_, i) => i !== index));
                        }, 500);
                    }

                    updated[index] = analyzedProf;
                    return updated;
                });

                setCurrentlyAnalyzing(null);
                setProgress((prev) => ({ ...prev, current: index + 1 }));
                break;

            case "error":
                setError(eventData.message);
                addLog("error", eventData.message);
                setLoading(false);
                break;
        }
    };

    // Mark currently analyzing professor
    useEffect(() => {
        if (progress.current < progress.total && progress.stage === "analyzing") {
            const nextIndex = progress.current;
            setProfessors((prev) => {
                const updated = [...prev];
                if (updated[nextIndex] && updated[nextIndex].status === "pending") {
                    updated[nextIndex] = { ...updated[nextIndex], status: "analyzing" };
                }
                return updated;
            });
            setCurrentlyAnalyzing(nextIndex);
        }
    }, [progress.current, progress.total, progress.stage]);

    return (
        <main className="flex min-h-screen flex-col items-center p-8 bg-zinc-50 dark:bg-black">
            <div className="z-10 max-w-5xl w-full flex flex-col items-center gap-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                        FAU Professor Finder
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
                        Find your perfect research supervisor at the Technical Faculty using AI-powered search.
                    </p>
                </div>

                <SearchForm onSearch={handleSearch} isLoading={loading} />

                {error && (
                    <div className="w-full max-w-lg p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="w-full flex flex-col items-center gap-6">
                        <div className="w-full max-w-2xl flex flex-col gap-4">
                            <ProgressBar
                                current={progress.current}
                                total={progress.total}
                                stage={progress.stage}
                            />
                            <button
                                onClick={handleStop}
                                className="self-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="6" y="6" width="12" height="12" strokeWidth="2" />
                                </svg>
                                Stop
                            </button>
                        </div>
                        <ProgressLog logs={logs} />
                    </div>
                )}

                {professors.length > 0 && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {professors.map((prof, i) => (
                            <ProfessorCard key={i} professor={prof} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
