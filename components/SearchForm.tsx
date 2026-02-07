"use client";

import { useState } from "react";
import { Department, DEPARTMENTS } from "@/types/professor";

interface SearchFormProps {
    onSearch: (
        apiKey: string,
        departments: Department[],
        interests: string,
        provider: "gemini" | "groq" | "ollama",
        ollamaModel?: string,
        enrichExternal?: boolean
    ) => void;
    isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
    const [apiKey, setApiKey] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([DEPARTMENTS[0]]);
    const [interests, setInterests] = useState("");
    const [provider, setProvider] = useState<"gemini" | "groq" | "ollama">("gemini");
    const [ollamaModels, setOllamaModels] = useState<string[]>([]);
    const [selectedOllamaModel, setSelectedOllamaModel] = useState<string>("");
    const [ollamaError, setOllamaError] = useState<string>("");
    const [loadingModels, setLoadingModels] = useState(false);
    const [enrichExternal, setEnrichExternal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (provider !== "ollama" && !apiKey) {
            alert("Please enter an API Key");
            return;
        }
        if (provider === "ollama" && !selectedOllamaModel) {
            alert("Please select an Ollama model");
            return;
        }
        if (selectedDepartments.length === 0) {
            alert("Please select at least one department");
            return;
        }
        onSearch(apiKey, selectedDepartments, interests, provider, selectedOllamaModel, enrichExternal);
    };

    const toggleDepartment = (dept: Department) => {
        setSelectedDepartments((prev) =>
            prev.includes(dept)
                ? prev.filter((d) => d !== dept)
                : [...prev, dept]
        );
    };

    const selectAllDepartments = () => {
        setSelectedDepartments([...DEPARTMENTS]);
    };

    const deselectAllDepartments = () => {
        setSelectedDepartments([]);
    };

    const fetchOllamaModels = async () => {
        setLoadingModels(true);
        setOllamaError("");
        try {
            const response = await fetch("/api/ollama/models");
            const data = await response.json();

            if (data.error) {
                setOllamaError(data.error);
                setOllamaModels([]);
            } else {
                const modelNames = data.models.map((m: any) => m.name);
                setOllamaModels(modelNames);
                if (modelNames.length > 0) {
                    setSelectedOllamaModel(modelNames[0]);
                }
            }
        } catch (error) {
            setOllamaError("Failed to connect to Ollama. Is it running?");
            setOllamaModels([]);
        } finally {
            setLoadingModels(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm w-full max-w-lg"
        >
            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    LLM Provider
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="gemini"
                            checked={provider === "gemini"}
                            onChange={() => setProvider("gemini")}
                            className="accent-blue-600"
                        />
                        <span className="text-sm">Google Gemini</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="groq"
                            checked={provider === "groq"}
                            onChange={() => setProvider("groq")}
                            className="accent-orange-600"
                        />
                        <span className="text-sm">Groq</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="ollama"
                            checked={provider === "ollama"}
                            onChange={() => {
                                setProvider("ollama");
                                fetchOllamaModels();
                            }}
                            className="accent-green-600"
                        />
                        <span className="text-sm">Ollama (Local)</span>
                    </label>
                </div>
            </div>

            {provider === "ollama" && (
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Ollama Model
                    </label>
                    {loadingModels ? (
                        <p className="text-sm text-zinc-500">Loading models...</p>
                    ) : ollamaError ? (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                            <p className="text-sm text-red-600 dark:text-red-400">{ollamaError}</p>
                            <button
                                type="button"
                                onClick={fetchOllamaModels}
                                className="mt-2 text-xs text-blue-600 hover:text-blue-700 underline"
                            >
                                Retry
                            </button>
                        </div>
                    ) : ollamaModels.length > 0 ? (
                        <select
                            value={selectedOllamaModel}
                            onChange={(e) => setSelectedOllamaModel(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {ollamaModels.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-sm text-zinc-500">No models found. Pull a model first.</p>
                    )}
                </div>
            )}

            {provider !== "ollama" && (
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        API Key
                    </label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={`Enter your ${provider === "gemini" ? "Gemini" : "Groq"
                            } API Key`}
                        className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                        Your key is never stored, only used for this session.
                    </p>
                </div>
            )}

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Departments ({selectedDepartments.length} selected)
                    </label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={selectAllDepartments}
                            className="text-xs text-blue-600 hover:text-blue-700 underline"
                        >
                            Select All
                        </button>
                        <span className="text-zinc-400">|</span>
                        <button
                            type="button"
                            onClick={deselectAllDepartments}
                            className="text-xs text-blue-600 hover:text-blue-700 underline"
                        >
                            Deselect All
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded-md dark:bg-zinc-800 dark:border-zinc-700">
                    {DEPARTMENTS.map((dept) => (
                        <label key={dept} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedDepartments.includes(dept)}
                                onChange={() => toggleDepartment(dept)}
                                className="accent-blue-600"
                            />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">{dept}</span>
                        </label>
                    ))}
                </div
                >
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Research Interests (for Matchmaking)
                </label>
                <textarea
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g. Machine Learning, Deep Learning, Computer Vision..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                <input
                    type="checkbox"
                    id="enrichExternal"
                    checked={enrichExternal}
                    onChange={(e) => setEnrichExternal(e.target.checked)}
                    className="mt-0.5 accent-amber-600"
                />
                <label htmlFor="enrichExternal" className="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <span className="font-medium">Enrich with LinkedIn & Google Scholar</span>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Adds citation counts, publications, and recent activity. Will be slower (~5-10s per professor).
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Analyzing..." : "Find Professors"}
            </button>
        </form>
    );
}
