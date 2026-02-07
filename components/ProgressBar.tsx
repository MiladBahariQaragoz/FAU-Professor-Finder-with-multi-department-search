"use client";

interface ProgressBarProps {
    current: number;
    total: number;
    stage: string;
}

export function ProgressBar({ current, total, stage }: ProgressBarProps) {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <div className="w-full max-w-2xl space-y-3">
            <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                    {getStageName(stage)}
                </span>
                <span className="text-zinc-500 text-xs">
                    {current} / {total} professors
                </span>
            </div>

            <div className="relative w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-500">
                <span>{percentage}% Complete</span>
                {total > 0 && current < total && (
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                        Processing...
                    </span>
                )}
            </div>
        </div>
    );
}

function getStageName(stage: string): string {
    switch (stage) {
        case "scraping":
            return "Scraping Website";
        case "scraped":
            return "Scrape Complete";
        case "parsing":
            return "Parsing Data";
        case "parsed":
            return "Ready to Analyze";
        case "analyzing":
            return "Analyzing Professors";
        case "complete":
            return "Complete";
        default:
            return "Initializing";
    }
}
