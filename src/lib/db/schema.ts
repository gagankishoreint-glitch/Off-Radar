// Firestore Database Schema Definitions
// Defines all collection structures and TypeScript types

import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// ============================================
// USER COLLECTION
// ============================================

export interface UserProfile {
    id: string; // Firebase Auth UID
    email: string;
    displayName?: string;
    photoURL?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;

    // Career Preferences
    preferences?: {
        salaryWeight: number; // 0-1
        learningWeight: number;
        wlbWeight: number;
        brandWeight: number;
        riskTolerance: number;
    };

    // Subscription/Usage
    plan?: 'free' | 'premium';
    aiCreditsUsed?: number;
    aiCreditsLimit?: number;
}

export const UserProfileSchema = z.object({
    email: z.string().email(),
    displayName: z.string().optional(),
    photoURL: z.string().url().optional(),
    preferences: z.object({
        salaryWeight: z.number().min(0).max(1),
        learningWeight: z.number().min(0).max(1),
        wlbWeight: z.number().min(0).max(1),
        brandWeight: z.number().min(0).max(1),
        riskTolerance: z.number().min(0).max(1),
    }).optional(),
    plan: z.enum(['free', 'premium']).optional(),
});

// ============================================
// RESUME COLLECTION
// ============================================

export interface Resume {
    id: string;
    userId: string;
    fileName: string;
    uploadedAt: Timestamp;

    // Extracted content
    rawText: string;

    // AI Analysis results (cached)
    analysis?: {
        skills: {
            proficient: string[];
            familiar: string[];
        };
        projects: Array<{
            title: string;
            tech: string[];
            description: string;
            suggestion?: string;
        }>;
        experience: Array<{
            role: string;
            company: string;
            achievements: string[];
        }>;
        education: {
            degree?: string;
            major?: string;
            institution?: string;
        };
        atsScore: number;
        suggestions: Array<{
            type: 'critical' | 'improvement' | 'bonus';
            text: string;
            impact: number;
        }>;
        analyzedAt: Timestamp;
    };
}

// ============================================
// OFFER COLLECTION
// ============================================

export interface StoredOffer {
    id: string;
    userId: string;
    company: string;
    role: string;
    ctc: number;
    location: string;
    type: 'internship' | 'fte';
    workMode: 'remote' | 'hybrid' | 'onsite';

    // Optional breakdown
    base?: number;
    stocks?: number;
    joiningBonus?: number;

    // AI-generated insights (cached)
    aiInsights?: {
        careerFitScore: number;
        pros: string[];
        cons: string[];
        recommendation: string;
        analyzedAt: Timestamp;
    };

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ============================================
// CHAT SESSION COLLECTION
// ============================================

export interface ChatSession {
    id: string;
    userId: string;
    title: string; // Auto-generated from first message
    createdAt: Timestamp;
    updatedAt: Timestamp;

    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: Timestamp;
    }>;

    // Context for RAG
    context?: {
        resumeIds?: string[];
        offerIds?: string[];
    };
}

// ============================================
// ANALYSIS HISTORY COLLECTION
// ============================================

export interface AnalysisHistory {
    id: string;
    userId: string;
    type: 'resume' | 'offer_comparison' | 'career_advice';
    input: any; // Store input parameters
    output: any; // Store AI response
    creditsUsed: number;
    createdAt: Timestamp;
}

// ============================================
// COLLECTION NAMES (Constants)
// ============================================

export const COLLECTIONS = {
    USERS: 'users',
    RESUMES: 'resumes',
    OFFERS: 'offers',
    CHAT_SESSIONS: 'chat_sessions',
    ANALYSIS_HISTORY: 'analysis_history',
    PAGES: 'pages', // Existing workspace pages
    BLOCKS: 'blocks', // Existing workspace blocks
} as const;

// ============================================
// HELPER TYPES
// ============================================

export type Collection = typeof COLLECTIONS[keyof typeof COLLECTIONS];

// Firestore document with ID
export type WithId<T> = T & { id: string };
