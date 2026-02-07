export interface Professor {
    name: string;
    department: string;
    email?: string;
    website?: string;
    research_interests: string[];
    relevance_score?: number;
    bio_summary?: string;
    citations?: number;
    publications?: number;
    h_index?: number;
}

export type Department =
    | "Artificial Intelligence"
    | "Chemical and Biological Engineering"
    | "Electrical Engineering"
    | "Computer Science"
    | "Mechanical Engineering"
    | "Materials Science";

export const DEPARTMENTS: Department[] = [
    "Artificial Intelligence",
    "Chemical and Biological Engineering",
    "Electrical Engineering",
    "Computer Science",
    "Mechanical Engineering",
    "Materials Science",
];
