import { Professor } from "@/types/professor";
import { ExternalLink, Mail, Loader2 } from "lucide-react";

interface ProfessorCardProps {
    professor: Professor & { status?: "pending" | "analyzing" | "analyzed" | "filtered" };
}

export function ProfessorCard({ professor }: ProfessorCardProps) {
    const isFiltering = professor.status === "filtered";
    const isAnalyzing = professor.status === "analyzing";
    const isPending = professor.status === "pending";

    return (
        <div
            className={`flex flex-col p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 
            ${isFiltering ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            ${isPending ? "animate-pulse" : ""}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {professor.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-md">
                            {professor.department}
                        </span>
                        {(professor.citations || professor.publications || professor.h_index) && (
                            <span className="text-xs text-amber-600 dark:text-amber-400">
                                ✨ Enriched
                            </span>
                        )}
                    </div>
                </div>
                {isAnalyzing && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Loader2 size={14} className="animate-spin text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                            Analyzing...
                        </span>
                    </div>
                )}
                {isPending && !isAnalyzing && (
                    <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Pending
                        </span>
                    </div>
                )}
                {professor.status === "analyzed" && professor.relevance_score !== undefined && professor.relevance_score > 0 && (
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                            {professor.relevance_score}
                        </span>
                    </div>
                )}
            </div>

            {(professor.citations || professor.publications || professor.h_index) && (
                <div className="flex gap-4 mb-4 text-xs">
                    {professor.citations !== undefined && (
                        <div className="flex items-center gap-1">
                            <span className="text-zinc-500 dark:text-zinc-400">📚</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">{professor.citations.toLocaleString()} citations</span>
                        </div>
                    )}
                    {professor.publications !== undefined && (
                        <div className="flex items-center gap-1">
                            <span className="text-zinc-500 dark:text-zinc-400">📄</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">{professor.publications} papers</span>
                        </div>
                    )}
                    {professor.h_index !== undefined && (
                        <div className="flex items-center gap-1">
                            <span className="text-zinc-500 dark:text-zinc-400">🎯</span>
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">h-index: {professor.h_index}</span>
                        </div>
                    )}
                </div>
            )}

            {professor.bio_summary && (
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-3">
                    {professor.bio_summary}
                </p>
            )}

            {professor.research_interests && professor.research_interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {professor.research_interests.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {(professor.website || professor.email) && (
                <div className="mt-auto flex gap-4 text-sm">
                    {professor.website && (
                        <a
                            href={professor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ExternalLink size={16} />
                            Profile
                        </a>
                    )}
                    {professor.email && (
                        <a
                            href={`mailto:${professor.email}`}
                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <Mail size={16} />
                            Contact
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
