
export type ATSSystem = 'Workday' | 'Greenhouse' | 'Lever' | 'Taleo' | 'iCIMS' | 'Google Hire (Internal)' | 'Amazon Internal' | 'Microsoft Dynamics' | 'Other';

export interface CompanyATSProfile {
    name: string;
    ats: ATSSystem;
    description: string;
    strictness: 'High' | 'Medium' | 'Low'; // Workday/Taleo = High, Greenhouse/Lever = Medium
    parsingFocus: 'Keywords' | 'Semantic' | 'Formatting';
}

export const ATS_MAPPING: Record<string, CompanyATSProfile> = {
    'google': {
        name: 'Google',
        ats: 'Google Hire (Internal)',
        description: 'Uses advanced internal AI to semantic match projects and leadership principles.',
        strictness: 'High',
        parsingFocus: 'Semantic'
    },
    'amazon': {
        name: 'Amazon',
        ats: 'Amazon Internal',
        description: 'Heavily keyword focused. Scans specifically for "Leadership Principles" (e.g. Ownership, Dive Deep).',
        strictness: 'High',
        parsingFocus: 'Keywords'
    },
    'microsoft': {
        name: 'Microsoft',
        ats: 'Microsoft Dynamics',
        description: 'Integrates with LinkedIn data. Values standard formatting and skill density.',
        strictness: 'Medium',
        parsingFocus: 'Keywords'
    },
    'netflix': {
        name: 'Netflix',
        ats: 'Lever',
        description: 'Focuses on "culture memo" alignment. Lever parses clean text well, but prefers concise resumes.',
        strictness: 'Medium',
        parsingFocus: 'Semantic'
    },
    'apple': {
        name: 'Apple',
        ats: 'Taleo',
        description: 'Legacy enterprise system. Very strict on formatting (avoid tables/columns). Exact keyword matching.',
        strictness: 'High',
        parsingFocus: 'Formatting'
    },
    'meta': {
        name: 'Meta',
        ats: 'Workday',
        description: 'Enterprise grade. Strict parsing. Favors standard chronological layouts.',
        strictness: 'High',
        parsingFocus: 'Formatting'
    },
    'uber': {
        name: 'Uber',
        ats: 'iCIMS',
        description: 'High volume processor. Keyword density is critical.',
        strictness: 'Medium',
        parsingFocus: 'Keywords'
    },
    'dropbox': {
        name: 'Dropbox',
        ats: 'Greenhouse',
        description: 'Modern, user-friendly ATS. Good at parsing PDFs, focuses on "impact" verbs.',
        strictness: 'Low',
        parsingFocus: 'Semantic'
    },
    'shopify': {
        name: 'Shopify',
        ats: 'Greenhouse', // Often uses SmartRecruiters or Greenhouse
        description: 'Values portfolio links and project descriptions over buzzwords.',
        strictness: 'Low',
        parsingFocus: 'Semantic'
    },
    'stripe': {
        name: 'Stripe',
        ats: 'Greenhouse',
        description: 'Modern flow. Looks for specific engineering keywords (Ruby, API design).',
        strictness: 'Medium',
        parsingFocus: 'Keywords'
    },
    'razorpay': {
        name: 'Razorpay',
        ats: 'Greenhouse',
        description: 'Standard modern parsing. Good with standard layouts.',
        strictness: 'Medium',
        parsingFocus: 'Keywords'
    }
};

export const COMMON_ATS_FAILURES = {
    'Workday': ['Tables', 'Columns', 'Graphics', 'Header/Footer text', 'Non-standard fonts'],
    'Taleo': ['Generic filenames', 'Missing dates', 'Complex tables', 'PDF layers'],
    'Greenhouse': ['Keyword stuffing (penalized)', 'Broken links'],
    'Lever': ['Unclear timeline', 'Missing contact info']
};
