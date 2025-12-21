export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type EmploymentType = 'internship' | 'fte';

export interface Offer {
    id: string;
    company: string;
    role: string;
    ctc: number; // e.g. 2000000 for 20LPA
    location: string;
    type: EmploymentType;
    workMode: WorkMode;
    // Optional detailed breakdown
    base?: number;
    stocks?: number; // ESOPs/RSUs
    joiningBonus?: number;
}

export type InsightType = 'red-flag' | 'green-flag' | 'neutral' | 'hidden-truth';

export interface RealityInsight {
    type: InsightType;
    title: string;
    content: string;
    source?: string; // e.g. "r/developersIndia", "Glassdoor"
}
