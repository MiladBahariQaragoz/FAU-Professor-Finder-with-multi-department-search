"use client";

interface ProgressLog {
    timestamp: string;
    stage: string;
    message: string;
}

interface ProgressLogProps {
    logs: ProgressLog[];
}

export function ProgressLog({ logs }: ProgressLogProps) {
    return (
        <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-zinc-400 font-mono">Progress Log</span>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto font-mono text-xs space-y-1">
                {logs.length === 0 ? (
                    <p className="text-zinc-500">Waiting to start...</p>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="flex gap-3 text-zinc-300">
                            <span className="text-zinc-600">
                                {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                            <span className={getStageColor(log.stage)}>
                                {getStageIcon(log.stage)}
                            </span>
                            <span className="flex-1">{log.message}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function getStageIcon(stage: string): string {
    switch (stage) {
        case "scraping":
            return "🔍";
        case "scraped":
            return "✅";
        case "parsing":
            return "📋";
        case "parsed":
            return "✅";
        case "analyzing":
            return "🤖";
        case "complete":
            return "✨";
        case "cancelled":
            return "⏹️";
        default:
            return "ℹ️";
    }
}

function getStageColor(stage: string): string {
    switch (stage) {
        case "scraped":
        case "parsed":
        case "complete":
            return "text-green-400";
        case "scraping":
        case "parsing":
        case "analyzing":
            return "text-blue-400";
        case "cancelled":
            return "text-yellow-400";
        default:
            return "text-zinc-400";
    }
}
