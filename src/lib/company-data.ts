// ============================================
// FILTER-COMPATIBLE COMPANY DATA MODEL
// ============================================

export type Major = 'CS' | 'ECE' | 'EEE' | 'Core' | 'Math' | 'Finance';
export type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3';
export type LocationType = 'Remote' | 'On-site' | 'Hybrid';
export type CompanyType = 'Product' | 'Startup' | 'PSU' | 'Service';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type WLB = 'Green' | 'Yellow' | 'Red';
export type Learning = 'High' | 'Medium' | 'Low';
export type Level =
    | 'Internship' | 'Entry Level' | 'Mid Level' | 'Senior'
    | 'Staff' | 'Architect' | 'Expert'
    | 'GET' | 'Engineer' | 'Assistant Manager' | 'Senior Manager'
    | 'GT' | 'E1' | 'E2' | 'E3' | 'E4'
    | 'Scientist/Engineer-SC' | 'SD' | 'SE' | 'SF' | 'SG'
    | 'Design Trainee' | 'Probationary Officer' | 'Senior Engineer' | 'Construction Manager';


export interface Company {
    id: string;
    name: string;
    tier: Tier;
    majors: Major[];
    domains: string[];
    roleTypes: string[];
    location: LocationType;
    companyType: CompanyType;
    difficulty: Difficulty;
    internFriendly: boolean;
    levels?: Level[]; // Experience levels offered
    salary: {
        minLPA: number;
        maxLPA: number;
        inHandPercent: number;
    };
    culture: {
        wlb: WLB;
        learning: Learning;
    };
    description?: string;
    whyJoin?: string[];
    tags?: string[];
    detailedAnalysis?: {
        pros: string[];
        cons: string[];
        recentDevelopments: string[];
        highlight?: string;
    };
    internship?: {
        role: string;
        minStipend: number;
        maxStipend: number;
        duration?: string;
    };
    careersUrl?: string; // e.g. "https://careers.google.com/jobs"
    availableRoles?: { role: string; level: string; }[]; // Full-time roles offered
    internshipRoles?: string[]; // Internship role titles
}

export const TIER_TOOLTIPS: Record<Tier, string> = {
    'Tier 1': 'Elite / Highly competitive companies',
    'Tier 2': 'Strong product companies with good growth',
    'Tier 3': 'Intern-friendly / Growing firms'
};

// ============================================
// CS COMPANIES
// ============================================

const CS_TIER1: Company[] = [
    {
        id: 'google-india',
        name: 'Google India',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['AI/ML', 'Cloud', 'Systems', 'Backend'],
        roleTypes: ['SWE', 'Research', 'SRE'],
        internship: {
            role: "Software Engineering Intern",
            minStipend: 100000,
            maxStipend: 125000,
            duration: "10-12 Weeks"
        },
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        salary: { minLPA: 32, maxLPA: 60, inHandPercent: 65 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Search, cloud and ads. Top-tier pay and benefits.',
        whyJoin: ['Building Gemini & AI First Future', 'World-class engineering', 'Market-leading compensation (s. Levels.fyi)', 'High pay'],
        detailedAnalysis: {
            pros: [
                "**Engineering Heaven**: Access to internal tools (Borg, Blaze) and Gemini 1.5 Pro models.",
                "**Top Market Pay**: Levels.fyi data indicates L3 (Entry) starts ~₹35LPA TC.",
                "**Perks**: Free food, fertility assistance, and top-tier health insurance.",
                "**Internal Mobility**: Easy to switch teams after 18 months."
            ],
            cons: [
                "**Promotion Velocity**: Promotions have become significantly slower (Project 'Googler Reviews' impact). L4 to L5 is a bottleneck.",
                "**Bureaucracy**: Launching anything requires multiple approvals. Feature velocity can feel slow compared to startups.",
                "**Top-Down Culture**: Recent leadership changes have made it feel more corporate and less 'bottom-up' innovation driven."
            ],
            recentDevelopments: [
                "**Gemini Era**: Massive internal Pivot to AI. Almost every team is integrating LLMs. Great time to join if you want GenAI experience.",
                "**Layoffs & Efficiency**: 2024 saw silent layoffs and role eliminations. 'Resting and vesting' is dead.",
                "**AI Dominance**: Working on Copilot stack and Azure OpenAI Service is a resume goldmine.",
                "**Office Policy**: Strict 3 days/week in office mandate is being enforced via badge tracking."
            ],
            highlight: "Google is no longer the 'retirement home' for engineers. It's in wartime mode to fight OpenAI/Microsoft. Expect harder work but cutting-edge AI exposure."
        },
        careersUrl: 'https://www.google.com/about/careers/applications/jobs/results/?location=India',
        availableRoles: [
            { role: "L3 - Software Engineer", level: "Entry" },
            { role: "L4 - Software Engineer II", level: "Mid" },
            { role: "L5 - Senior Software Engineer", level: "Senior" },
            { role: "L6 - Staff Software Engineer", level: "Staff" },
            { role: "L7+ - Senior Staff+", level: "Senior Staff" }
        ],
        internshipRoles: ["Software Engineering Intern", "STEP Intern", "Research Intern", "Product Management Intern"]
    },
    {
        id: 'amazon',
        name: 'Amazon / AWS',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Cloud', 'Backend', 'Distributed Systems'],
        roleTypes: ['SDE', 'Backend', 'DevOps'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 26, maxLPA: 60, inHandPercent: 67 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Cloud, backend & systems. High scale engineering.',
        whyJoin: ['Bar Raiser Culture', 'Fast Promotion Velocity', 'Working on AWS Bedrock / Q'],
        careersUrl: 'https://www.amazon.jobs/en/locations/india',
        availableRoles: [
            { role: "SDE-1", level: "Entry" },
            { role: "SDE-2", level: "Mid" },
            { role: "SDE-3", level: "Senior" },
            { role: "Principal SDE", level: "Principal" },
            { role: "Senior Principal SDE", level: "Senior Principal" }
        ],
        internshipRoles: ["SDE Intern", "Applied Science Intern", "Software Development Engineer Intern"]
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Cloud', 'AI/ML', 'Enterprise'],
        roleTypes: ['SWE', 'AI/ML', 'Full-Stack'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 22, maxLPA: 50, inHandPercent: 68 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Enterprise software, cloud and AI.',
        whyJoin: ['Leading the AI Revolution (OpenAI)', 'Great WLB for Tier 1', 'ESOPs are liquid like cash'],
        careersUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=India',
        availableRoles: [
            { role: "Software Engineer (59)", level: "Entry" },
            { role: "Software Engineer II (60)", level: "Entry+" },
            { role: "Senior SWE (61)", level: "Mid" },
            { role: "Senior SWE (62)", level: "Senior" },
            { role: "Principal SWE (63)", level: "Principal" },
            { role: "Partner (64+)", level: "Partner" }
        ],
        internshipRoles: ["Software Engineering Intern", "Explore Intern", "PM Intern"]
    },
    {
        id: 'apple',
        name: 'Apple',
        tier: 'Tier 1',
        majors: ['CS', 'ECE'],
        domains: ['Systems', 'Silicon', 'Embedded'],
        roleTypes: ['SWE', 'Systems', 'Embedded'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: false,
        salary: { minLPA: 16, maxLPA: 40, inHandPercent: 73 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Consumer OS, silicon and systems teams.',
        whyJoin: ['Premium brand', 'Hardware-software integration', 'Top pay', 'Secretive but rewarding'],
        careersUrl: 'https://www.apple.com/careers/in/',
        availableRoles: [
            { role: "ICT2 - Software Engineer", level: "Entry" },
            { role: "ICT3 - Software Engineer", level: "Mid" },
            { role: "ICT4 - Senior Software Engineer", level: "Senior" },
            { role: "ICT5 - Staff Engineer", level: "Staff" }
        ],
        internshipRoles: ["Software Engineering Intern"]
    },
    {
        id: 'meta',
        name: 'Meta',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['AI/ML', 'Backend', 'Infrastructure'],
        roleTypes: ['SWE', 'AI/ML', 'Infra'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 20, maxLPA: 45, inHandPercent: 76 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Social, ads and large-scale ML systems.',
        whyJoin: ['Highest base salaries', 'Fast-paced culture', 'Great for infra roles'],
        careersUrl: 'https://www.metacareers.com/jobs/?location=India'
    },
    {
        id: 'netflix',
        name: 'Netflix',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Backend', 'Data', 'Streaming'],
        roleTypes: ['SWE', 'Backend', 'Data'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: false,
        salary: { minLPA: 25, maxLPA: 50, inHandPercent: 78 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Streaming infra and data-intensive systems.',
        whyJoin: ['Highest paying globally', 'Keeper test culture', 'Ultra selective'],
        careersUrl: 'https://jobs.netflix.com/search?location=Mumbai%2C%20India'
    },
    {
        id: 'stripe',
        name: 'Stripe',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Payments', 'Backend', 'Fintech'],
        roleTypes: ['SWE', 'Backend', 'Security'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 45, maxLPA: 60, inHandPercent: 60 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Financial infrastructure platform (Bangalore Office).',
        whyJoin: ['Top Tier Pay (₹50L+ Fresh)', 'Global Engineering Standards', 'High Talent Density'],
        detailedAnalysis: {
            pros: ["**Global Pay**: One of the highest payers in Bangalore.", "**Culture**: Writing-heavy, thoughtful engineering culture.", "**Office**: Beautiful office in RMZ Ecoworld."],
            cons: ["**Stock Heavy**: ~50% of CTC is RSU (Paper money until clear liquidity events).", "**Performance**: High bar, can be stressful to maintain."],
            recentDevelopments: ["Growing Bangalore team significantly."],
        },
        careersUrl: 'https://stripe.com/jobs/search?l=bengaluru-india'
    },
    {
        id: 'jane-street',
        name: 'Jane Street',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Quant', 'Trading', 'Systems'],
        roleTypes: ['Quant-Dev', 'SWE'],
        location: 'On-site', // Relocation likely
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 100, maxLPA: 200, inHandPercent: 80 }, // Converted
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Quant trading giant. Main offices: HK, London, NY. (No India Eng Office).',
        whyJoin: ['Highest Pay Globally', 'OCaml Mastery', 'Relocation to Global Hubs'],
        detailedAnalysis: {
            pros: ["**Math Heaven**: Best place for functional programming.", "**Compensation**: Unmatched globally."],
            cons: ["**No India Office**: Requires relocation to HK/London/NY.", "**Niche**: OCaml is rare outside JS."],
            recentDevelopments: ["Continuing to hire top IIT rankers for global roles."]
        },
        careersUrl: 'https://www.janestreet.com/join-jane-street/open-roles/'
    },
    {
        id: 'citadel',
        name: 'Citadel',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Quant', 'Trading', 'Systems'],
        roleTypes: ['Quant-Eng', 'SWE', 'Data'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 60, maxLPA: 120, inHandPercent: 50 }, // 50% Bonus
        culture: { wlb: 'Red', learning: 'High' },
        description: 'Market maker with office in Gurugram.',
        whyJoin: ['Top 0.1% Pay (₹1Cr+)', 'High Performance Culture', 'Gurugram Office'],
        detailedAnalysis: {
            pros: ["**Compensation**: ₹60L Base + 100% Bonus potential.", "**Speed**: Fast feedback loops."],
            cons: ["**WLB**: Intense trading hours.", "**Churn**: High turnover if not performing."],
            recentDevelopments: ["Expanding Gurugram engineering team."]
        },
        careersUrl: 'https://www.citadelsecurities.com/careers/open-opportunities/engineering/?location=Gurugram'
    },
    {
        id: 'openai',
        name: 'OpenAI',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['AI/ML', 'Research', 'Infrastructure'],
        roleTypes: ['ML Research', 'SWE', 'Infra'],
        location: 'Remote', // Or Relocation
        companyType: 'Startup',
        difficulty: 'Hard',
        internFriendly: false,
        salary: { minLPA: 50, maxLPA: 150, inHandPercent: 78 },
        culture: { wlb: 'Red', learning: 'High' },
        description: 'AI Research Lab (SF/London). No India Engineering Office yet.',
        whyJoin: ['Building AGI', 'History Defining Work', 'Relocation Opportunity'],
        careersUrl: 'https://openai.com/careers/search'
    },
    {
        id: 'nvidia-sw',
        name: 'NVIDIA (Software)',
        tier: 'Tier 1',
        majors: ['CS', 'ECE'],
        domains: ['AI/ML', 'GPU', 'Systems'],
        roleTypes: ['ML', 'SWE', 'GPU-Infra'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 20, maxLPA: 45, inHandPercent: 76 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'GPU software, ML libraries and developer tools.',
        whyJoin: ['AI hardware leader', 'CUDA expertise valuable', 'Great for ML engineers'],
        careersUrl: 'https://www.nvidia.com/en-in/about-nvidia/careers/'
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Cloud', 'Enterprise', 'CRM'],
        roleTypes: ['SWE', 'Backend', 'Product'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 30, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'CRM and enterprise SaaS platform.',
        whyJoin: ['Great WLB', 'Ohana culture', 'Stable and growing'],
        careersUrl: 'https://www.salesforce.com/company/careers/locations/india/'
    },
    {
        id: 'bloomberg',
        name: 'Bloomberg',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Fintech', 'Data', 'Backend'],
        roleTypes: ['SWE', 'Data', 'Backend'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 30, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Financial data terminals & analytics.',
        whyJoin: ['Finance + tech blend', 'Great WLB', 'Strong engineering culture'],
        careersUrl: 'https://www.bloomberg.com/company/careers/global-roles/working-at-bloomberg-in-mumbai-pune/'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Social', 'Data', 'AI/ML'],
        roleTypes: ['SWE', 'Data', 'ML'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 25, maxLPA: 80, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Professional networking platform.',
        whyJoin: ['Great WLB', 'Top-tier pay', 'Massive data scale'],
        careersUrl: 'https://careers.linkedin.com/'
    },
    {
        id: 'x-twitter',
        name: 'X (Twitter)',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Social', 'Systems', 'AI/ML'],
        roleTypes: ['SWE', 'ML', 'Backend'],
        internship: {
            role: "Software Engineering Intern",
            minStipend: 100000,
            maxStipend: 150000,
        },
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 30, maxLPA: 160, inHandPercent: 80 },
        culture: { wlb: 'Red', learning: 'High' },
        description: 'The "Everything App". High intensity engineering.',
        whyJoin: ['Rebuilding everything', 'High equity upside', 'Hardcore engineering'],
        careersUrl: 'https://twitter.wd5.myworkdayjobs.com/X'
    },
    {
        id: 'kognitos',
        name: 'Kognitos',
        tier: 'Tier 1', // Startups can be Tier 1 based on pay/talent
        majors: ['CS'],
        domains: ['AI/ML', 'Automation', 'GenAI'],
        roleTypes: ['SWE', 'ML'],
        internship: {
            role: "AI Engineering Intern",
            minStipend: 80000,
            maxStipend: 120000,
        },
        location: 'On-site',
        companyType: 'Startup',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 40, maxLPA: 120, inHandPercent: 85 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Generative AI for business automation.',
        whyJoin: ['Top paying startup in India', 'Cutting edge GenAI', 'Early stage equity'],
        careersUrl: 'https://www.kognitos.com/careers/'
    },
    {
        id: 'airbnb',
        name: 'Airbnb',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Cloud', 'Backend', 'Systems'],
        roleTypes: ['SDE', 'Cloud Support'],
        internship: {
            role: "SDE Intern",
            minStipend: 80000,
            maxStipend: 110000,
            duration: "6 Months / 2 Months"
        },
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 35, maxLPA: 100, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Global travel community marketplace.',
        whyJoin: ['Strong design culture', 'Great benefits', 'Global impact'],
        careersUrl: 'https://careers.airbnb.com/'
    },
    {
        id: 'goldman-sachs',
        name: 'Goldman Sachs',
        tier: 'Tier 1',
        majors: ['CS', 'Math', 'Finance'],
        domains: ['Fintech', 'Systems', 'Quant'],
        roleTypes: ['Analyst', 'Associate', 'Quant'],
        internship: {
            role: "Systems Intern / Quant Intern",
            minStipend: 150000,
            maxStipend: 200000,
            duration: "10 Weeks"
        },
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium', // Often mass hiring for analysts
        internFriendly: true,
        salary: { minLPA: 22, maxLPA: 45, inHandPercent: 85 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Global investment banking and securities.',
        whyJoin: ['Prestigious brand', 'High bonuses', 'Strong alumni network'],
        careersUrl: 'https://www.goldmansachs.com/worldwide/india/careers'
    },
    {
        id: 'prophecy',
        name: 'Prophecy',
        tier: 'Tier 1',
        majors: ['CS'],
        domains: ['Data', 'Low-Code', 'Cloud'],
        roleTypes: ['SWE', 'Platform'],
        location: 'On-site',
        companyType: 'Startup',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 30, maxLPA: 90, inHandPercent: 80 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Low-code data engineering platform.',
        whyJoin: ['High startup pay', 'Modern tech stack', 'Rapid growth'],
        careersUrl: 'https://www.prophecy.ai/careers'
    }
];

const CS_TIER2: Company[] = [
    {
        id: 'oracle',
        name: 'Oracle',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Cloud', 'Database', 'Enterprise'],
        roleTypes: ['MTS', 'SWE', 'Cloud'],
        internship: {
            role: "Project Intern",
            minStipend: 50000,
            maxStipend: 80000,
        },
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 16, maxLPA: 40, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Cloud infrastructure and database giant.',
        whyJoin: ['Stability', 'OCI is growing', 'Good WLB'],
        careersUrl: 'https://www.oracle.com/in/careers/'
    },
    {
        id: 'hackerrank',
        name: 'HackerRank',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['OS', 'Cloud', 'AI/ML', 'Gaming'],
        roleTypes: ['SWE', 'Product'],
        internship: {
            role: "Software Engineering Intern",
            minStipend: 125000,
            maxStipend: 150000,
            duration: "8-12 Weeks"
        },
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 18, maxLPA: 45, inHandPercent: 80 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Tech hiring platform for developers.',
        whyJoin: ['Top tech hiring platform', 'Strong engineering culture', 'Remote-friendly'],
        careersUrl: 'https://www.hackerrank.com/careers/'
    },
    {
        id: 'glance',
        name: 'Glance (InMobi)',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Mobile', 'AdTech', 'AI/ML'],
        roleTypes: ['SWE', 'Android', 'ML'],
        location: 'On-site',
        companyType: 'Startup', // Unicorn
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 20, maxLPA: 45, inHandPercent: 78 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Lock-screen content platform.',
        whyJoin: ['Unicorn startup', 'InMobi pedigree', 'Consumer-scale tech'],
        careersUrl: 'https://glance.com/careers'
    },
    {
        id: 'trellix',
        name: 'Trellix',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Security', 'Cybersecurity', 'Cloud'],
        roleTypes: ['SWE', 'Security Researcher'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 18, maxLPA: 40, inHandPercent: 80 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Cybersecurity and threat intelligence.',
        whyJoin: ['Cybersecurity leader', 'Good WLB', 'Learn security at scale'],
        careersUrl: 'https://careers.trellix.com/'
    },
    {
        id: 'adobe',
        name: 'Adobe',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['SaaS', 'Design Tools', 'Cloud'],
        roleTypes: ['SWE', 'Full-Stack', 'Cloud'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 20, maxLPA: 35, inHandPercent: 73 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Creative & document management software.',
        whyJoin: ['Creative Cloud Leader', 'Great WLB', 'Research Focus'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://careers.adobe.com/'
    },
    {
        id: 'atlassian',
        name: 'Atlassian',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['SaaS', 'Collaboration', 'Cloud'],
        roleTypes: ['SWE', 'Product', 'Cloud'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 35, maxLPA: 75, inHandPercent: 73 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Jira, Confluence — team collaboration tools.',
        whyJoin: ['Remote-First Forever', 'Great WLB', 'Top Compensation'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.atlassian.com/company/careers'
    },
    {
        id: 'uber',
        name: 'Uber',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Mobility', 'Backend', 'ML'],
        roleTypes: ['SWE', 'Backend', 'ML'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 30, maxLPA: 70, inHandPercent: 72 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Mobility, backend systems and market platforms.',
        whyJoin: ['High Scale Engineering', 'Top Tier Pay', 'Fast Paced'],
        careersUrl: 'https://www.uber.com/in/en/careers/',
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior', 'Staff'],
        internship: {
            role: "Software Engineer Intern",
            minStipend: 160000,
            maxStipend: 160000,
        },
    },
    {
        id: 'mongodb',
        name: 'MongoDB',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Database', 'Cloud', 'SaaS'],
        roleTypes: ['SWE', 'DB-Eng', 'SRE'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 30, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Document DB and developer platform.',
        whyJoin: ['Database Leader', 'Remote Friendly', 'Strong Engineering'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior', 'Staff'],
        careersUrl: 'https://www.mongodb.com/company/careers'
    },
    {
        id: 'zoho',
        name: 'Zoho',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['SaaS', 'Enterprise', 'CRM'],
        roleTypes: ['SWE', 'Full-Stack', 'Cloud'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 6, maxLPA: 18, inHandPercent: 78 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Indian enterprise SaaS with wide product suite.',
        whyJoin: ['Profitable Bootstrap', 'Rural Offices', 'Great Food'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.zoho.com/careers/'
    },
    {
        id: 'postman',
        name: 'Postman',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['DevTools', 'API', 'SaaS'],
        roleTypes: ['SWE', 'Platform', 'Product'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 10, maxLPA: 28, inHandPercent: 73 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'API development and collaboration platform.',
        whyJoin: ['API Platform Leader', 'Remote First', 'Global Impact'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior', 'Staff'],
        careersUrl: 'https://www.postman.com/company/careers/'
    },
    {
        id: 'browserstack',
        name: 'BrowserStack',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['DevTools', 'Testing', 'SaaS'],
        roleTypes: ['SWE', 'DevTools', 'SRE'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 24, inHandPercent: 76 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Cross-browser testing & dev tools.',
        whyJoin: ['SaaS Unicorn', 'Profitable', 'Scale Engineering'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.browserstack.com/careers'
    },
    {
        id: 'freshworks',
        name: 'Freshworks',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['SaaS', 'CRM', 'Enterprise'],
        roleTypes: ['SWE', 'Product', 'Cloud'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 6, maxLPA: 18, inHandPercent: 76 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Customer engagement & CRM SaaS from India.',
        whyJoin: ['SaaS Pioneer', 'Great Culture', 'Public Company'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.freshworks.com/company/careers/'
    },
    {
        id: 'shopify',
        name: 'Shopify',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['E-commerce', 'SaaS', 'Cloud'],
        roleTypes: ['SWE', 'Full-Stack', 'Backend'],
        location: 'Remote',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 20, maxLPA: 45, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'E-commerce platform for online stores.',
        whyJoin: ['Remote-First', 'Strong Engineering Culture', 'High Growth'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.shopify.com/careers'
    },
    {
        id: 'dropbox',
        name: 'Dropbox',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Cloud Storage', 'SaaS', 'Infrastructure'],
        roleTypes: ['SWE', 'Backend', 'Infrastructure'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 18, maxLPA: 40, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Cloud storage and file collaboration platform.',
        whyJoin: ['Distributed Systems', 'Great WLB', 'Strong Engineering'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.dropbox.com/jobs'
    },
    {
        id: 'snowflake',
        name: 'Snowflake',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Data Warehouse', 'Cloud', 'Analytics'],
        roleTypes: ['SWE', 'Data Engineer', 'Backend'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 25, maxLPA: 55, inHandPercent: 76 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Cloud data warehouse and analytics platform.',
        whyJoin: ['Data Infrastructure Leader', 'High Compensation', 'Cutting Edge'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.snowflake.com/en/company/careers/'
    },
    {
        id: 'databricks',
        name: 'Databricks',
        tier: 'Tier 2',
        majors: ['CS'],
        domains: ['Data', 'AI/ML', 'Analytics'],
        roleTypes: ['SWE', 'Data Engineer', 'ML Engineer'],
        location: 'Hybrid',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 28, maxLPA: 60, inHandPercent: 77 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Unified analytics platform built on Apache Spark.',
        whyJoin: ['Data + AI Leader', 'High Growth', 'Apache Spark Creators'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.databricks.com/company/careers/open-positions'
    },
];

const CS_TIER3: Company[] = [
    {
        id: 'paytm',
        name: 'Paytm',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['Fintech', 'Payments', 'Backend'],
        roleTypes: ['SWE', 'Backend', 'Payments'],
        location: 'On-site',
        companyType: 'Startup',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 70 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'Indian payments giant. Hiring scale has slowed post-2024.',
        whyJoin: ['High Scale Fintech', 'Building for 500M Indians', 'Impact at Scale'],
        detailedAnalysis: {
            pros: ["**Scale**: Handling billions of transactions.", "**Learning**: Great place to learn distributed systems at scale."],
            cons: ["**Regulatory Risks**: Recent RBI actions have caused uncertainty.", "**Culture**: Can be aggressive/sales-driven in some units."],
            recentDevelopments: ["Focusing on AI-led efficiency and core payments."]
        },
        careersUrl: 'https://paytm.com/careers'
    },
    {
        id: 'phonepe',
        name: 'PhonePe',
        tier: 'Tier 3',
        majors: ['CS', 'ECE', 'EEE'],
        domains: ['Fintech', 'Systems', 'Web'],
        roleTypes: ['Member Technical', 'FTE'],
        internship: {
            role: "System Engineer Intern",
            minStipend: 150000,
            maxStipend: 200000,
            duration: "6 Months"
        },
        location: 'On-site',
        companyType: 'Startup',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 22, maxLPA: 45, inHandPercent: 60 }, // significant stock component
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'UPI Leader. "Make Wealth" factory via ESOPs.',
        whyJoin: ['Consistent ESOP Buybacks', 'Tier-1 Peer Group', 'High Scale Systems'],
        detailedAnalysis: {
            pros: ["**Liquidity**: Annual buybacks make paper money real.", "**Scale**: 48% UPI market share."],
            cons: ["**Execution Heavy**: Constant feature shipping.", "**Office**: Strict 5-day office culture."],
            recentDevelopments: ["Focusing on profitability and new fintech verticals."]
        },
        careersUrl: 'https://www.phonepe.com/careers/'
    },
    {
        id: 'razorpay',
        name: 'Razorpay',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['Fintech', 'Payments', 'Backend'],
        roleTypes: ['SWE', 'Payments', 'Backend'],
        location: 'On-site',
        companyType: 'Startup',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 28, inHandPercent: 72 },
        culture: { wlb: 'Red', learning: 'High' }, // Shifted to Red/Yellow
        description: 'Payments infra. Culture shifted to high-performance/stress recently.',
        whyJoin: ['YCombinator Alumni', 'Fintech Innovation', 'Great Engineering'],
        detailedAnalysis: {
            pros: ["**Problem Statement**: Complex payment routing problems.", "**Brand**: Strong engineering brand in India."],
            cons: ["**Stress**: Recent reviews cite heavily increased pressure.", "**PIP Culture**: Performance bars have become rigid."],
            recentDevelopments: ["Management focus on efficiency and speed."]
        },
        careersUrl: 'https://razorpay.com/jobs/'
    },
    {
        id: 'groww',
        name: 'Groww',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['Fintech', 'Investment', 'Backend'],
        roleTypes: ['SWE', 'Backend', 'Data'],
        location: 'On-site',
        companyType: 'Startup',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 28, inHandPercent: 72 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Investment platform with product & data teams.',
        whyJoin: ['Fast Growing Fintech', 'Modern Tech Stack', 'Ownership'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://groww.in/careers'
    },
    {
        id: 'zerodha',
        name: 'Zerodha',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['Fintech', 'Trading', 'Backend'],
        roleTypes: ['SWE', 'Backend', 'Trading-Infra'],
        location: 'On-site', // Bangalore
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 30, inHandPercent: 88 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Bootstrapped brokerage. "WLB Gold Standard".',
        whyJoin: ['6 PM Sunset Rule (No Wknds)', 'Profitable & Stable', 'Tech Lean Team (<50 SDEs)'],
        detailedAnalysis: {
            pros: ["**Sanity**: Strict no-weekend work policy.", "**Density**: High talent density due to small team."],
            cons: ["**Hiring**: Extremely slow and selective.", "**Pace**: Might feel slow for adrenaline junkies."],
            recentDevelopments: ["Maintaining lean team despite market fluctuations."]
        },
        careersUrl: 'https://careers.zerodha.com/'
    },
    {
        id: 'cred',
        name: 'CRED',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['Fintech', 'Payments', 'Product'],
        roleTypes: ['SWE', 'Backend', 'Product'],
        location: 'On-site', // Bangalore
        companyType: 'Startup',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 35, maxLPA: 60, inHandPercent: 80 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Elite fintech club. "Design Mafia".',
        whyJoin: ['Top 1% Compensation', 'Aesthetic Obsession', 'High Status Peer Group'],
        detailedAnalysis: {
            pros: ["**Status**: High resume value.", "**Perks**: Premium Macbooks, office, and events."],
            cons: ["**Elitist**: Can feel exclusionary.", "**Grind**: High pressure for perfection."],
            recentDevelopments: ["Focusing on profitability and new fintech verticals."]
        },
        careersUrl: 'https://careers.cred.club/'
    },
    {
        id: 'meesho',
        name: 'Meesho',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['Ecommerce', 'Backend', 'Growth'],
        roleTypes: ['SWE', 'Backend', 'Growth'],
        location: 'Hybrid', // Flexi-Office (1 day/week)
        companyType: 'Startup',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 25, maxLPA: 50, inHandPercent: 70 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'MPL (Meesho Price Low) & Social Commerce. "Horizontal Culture".',
        whyJoin: ['Flat Hierarchy (No Sir/Ma\'am)', 'High Ownership', 'Scale Profiling'],
        detailedAnalysis: {
            pros: ["**Culture**: Very open and flat.", "**Growth**: Rapid sprint cycles."],
            cons: ["**RTO**: Ended 'Work From Anywhere'. Now Flexi-Office.", "**Frugality**: Increased focus on cost-cutting."],
            recentDevelopments: ["Shifted to 'Flexi-Office' model requiring Bangalore presence."]
        },
        careersUrl: 'https://meesho.jobs/'
    },
    {
        id: 'tcs-digital',
        name: 'TCS Digital',
        tier: 'Tier 3',
        majors: ['CS'],
        domains: ['IT Services', 'Consulting'],
        roleTypes: ['SWE', 'Full-Stack'],
        location: 'On-site',
        companyType: 'Service',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 7, maxLPA: 10, inHandPercent: 72 },
        culture: { wlb: 'Yellow', learning: 'Low' },
        description: 'IT services with higher-tier digital practice.',
        whyJoin: ['Digital Projects', 'Upskilling', 'Job Security'],
        levels: ['Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.tcs.com/careers/india'
    },
];

// ============================================
// ECE COMPANIES
// ============================================

const ECE_TIER1: Company[] = [
    {
        id: 'qualcomm',
        name: 'Qualcomm',
        tier: 'Tier 1',
        majors: ['ECE'],
        domains: ['Semiconductor', 'Embedded', 'VLSI', '5G'],
        roleTypes: ['Embedded', 'Firmware', 'VLSI', 'Hardware'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 16, maxLPA: 25, inHandPercent: 78 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Wireless leader. India hub >10k engineers.',
        whyJoin: ['SoC Design / 5G R&D', 'Strong Stocks (RSU)', 'Global Mobility'],
        detailedAnalysis: {
            pros: ["**Domain**: Best place for Wireless/Modem tech.", "**Stability**: Market leader status."],
            cons: ["**Role Risk**: Freshers often allotted Design Verification (DV) over Design.", "**WLB**: Intense during tape-outs."],
            recentDevelopments: ["Focusing on 6G and automotive chips."]
        },
        careersUrl: 'https://qualcomm.wd1.myworkdayjobs.com/External'
    },
    {
        id: 'texas-instruments',
        name: 'Texas Instruments',
        tier: 'Tier 1',
        majors: ['ECE', 'EEE'],
        domains: ['Analog', 'Embedded', 'Semiconductor'],
        roleTypes: ['Embedded', 'Analog', 'Firmware'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 20, maxLPA: 30, inHandPercent: 76 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Analog King. India is a primary design hub.',
        whyJoin: ['Analog Leader', 'Great WLB', 'Long Term Career'],
        detailedAnalysis: {
            pros: ["**Domain**: #1 in Analog chips.", "**Culture**: Very stable, low burn-out culture."],
            cons: ["**Growth**: Can be slower/linear compared to AI hardware hype.", "**Tech**: Less 'flashy' than digital."],
            recentDevelopments: ["Expanding into automotive PMICs."]
        },
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://careers.ti.com/india/'
    },
    {
        id: 'nvidia-hw',
        name: 'NVIDIA (Hardware)',
        tier: 'Tier 1',
        majors: ['ECE'],
        domains: ['GPU', 'VLSI', 'AI Hardware'],
        roleTypes: ['VLSI', 'Hardware', 'Verification'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 25, maxLPA: 35, inHandPercent: 76 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'GPU Computing Leader. India centers do Core Arch work.',
        whyJoin: ['AI Hardware King', 'Highest ECE Salaries', 'Core Architecture Roles'],
        detailedAnalysis: {
            pros: ["**Innovation**: Working on chips powering ChatGPT.", "**Stock**: Meteoric stick growth benefits employees."],
            cons: ["**Pressure**: High performance bar.", "**Entry**: Extremely competitive for freshers."],
            recentDevelopments: ["Massive hiring for Blackwell/Hopper architecture teams."]
        },
        careersUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite'
    },
    {
        id: 'intel',
        name: 'Intel',
        tier: 'Tier 1',
        majors: ['ECE'],
        domains: ['Semiconductor', 'VLSI', 'CPU'],
        roleTypes: ['VLSI', 'Hardware', 'Verification'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 15, maxLPA: 35, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'x86 chip pioneer with large India R&D.',
        whyJoin: ['CPU Pioneer', 'Great Benefits', 'Large Scale R&D'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.intel.com/content/www/us/en/jobs/locations/india.html'
    },
    {
        id: 'amd',
        name: 'AMD',
        tier: 'Tier 1',
        majors: ['ECE'],
        domains: ['Semiconductor', 'GPU', 'CPU'],
        roleTypes: ['VLSI', 'Hardware', 'Verification'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 15, maxLPA: 35, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'CPU/GPU competitor to Intel/NVIDIA.',
        whyJoin: ['High Growth', 'CPU + GPU', 'Strong Engineering'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.amd.com/en/corporate/careers.html'
    },
    {
        id: 'arm',
        name: 'ARM',
        tier: 'Tier 1',
        majors: ['ECE'],
        domains: ['CPU Architecture', 'Embedded', 'Mobile'],
        roleTypes: ['VLSI', 'Hardware', 'CPU Design'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 18, maxLPA: 40, inHandPercent: 76 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'CPU architecture leader for mobile processors.',
        whyJoin: ['Mobile Architecture', 'Global Impact', 'Research Focus'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://careers.arm.com/locations/india'
    },
    {
        id: 'broadcom',
        name: 'Broadcom',
        tier: 'Tier 1',
        majors: ['ECE'],
        domains: ['Networking', 'Semiconductor', 'VLSI'],
        roleTypes: ['VLSI', 'Hardware', 'Firmware'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 18, maxLPA: 40, inHandPercent: 75 },
        culture: { wlb: 'Yellow', learning: 'High' },
        description: 'Networking chips and semiconductor solutions.',
        whyJoin: ['Connectivity Leader', 'High Pay', 'Acquisition Growth'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.broadcom.com/company/careers'
    },
];

const ECE_TIER2: Company[] = [
    {
        id: 'synopsys',
        name: 'Synopsys',
        tier: 'Tier 2',
        majors: ['ECE'],
        domains: ['EDA', 'VLSI', 'Verification'],
        roleTypes: ['VLSI', 'EDA', 'Verification'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 15, maxLPA: 35, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'EDA tools leader for IC design.',
        whyJoin: ['EDA Market Leader', 'Deep Tech', 'Stable Career'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.synopsys.com/careers/global/south-asia/india.html'
    },
    {
        id: 'cadence',
        name: 'Cadence',
        tier: 'Tier 2',
        majors: ['ECE'],
        domains: ['EDA', 'VLSI', 'Analog'],
        roleTypes: ['VLSI', 'EDA', 'Analog'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 15, maxLPA: 35, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'EDA tools giant for analog/digital.',
        whyJoin: ['Design Automation', 'Innovation', 'Great Benefits'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.cadence.com/en_US/home/company/careers/india.html'
    },
    {
        id: 'micron',
        name: 'Micron',
        tier: 'Tier 2',
        majors: ['ECE'],
        domains: ['Memory', 'Semiconductor', 'DRAM'],
        roleTypes: ['VLSI', 'Hardware', 'Memory'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 30, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Memory chip maker — DRAM/SSD expertise.',
        whyJoin: ['Memory Innovation', 'Manufacturing Scale', 'Global Presence'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://in.micron.com/about/careers'
    },
    {
        id: 'nxp',
        name: 'NXP Semiconductors',
        tier: 'Tier 2',
        majors: ['ECE'],
        domains: ['Automotive', 'Embedded', 'NFC'],
        roleTypes: ['Embedded', 'Firmware', 'VLSI'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 28, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Automotive chips and NFC/security.',
        whyJoin: ['Automotive Tech', 'Secure IoT', 'European Culture'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.nxp.com/company/about-nxp/careers:CAREERS'
    },
    {
        id: 'bosch-ece',
        name: 'Bosch',
        tier: 'Tier 2',
        majors: ['ECE', 'EEE'],
        domains: ['Automotive', 'Embedded', 'MEMS'],
        roleTypes: ['Embedded', 'Firmware', 'Hardware'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 10, maxLPA: 25, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Automotive electronics and sensors.',
        whyJoin: ['Automotive Leader', 'German Engineering', 'Stability'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.bosch.in/careers/'
    },
];

const ECE_TIER3: Company[] = [
    {
        id: 'tata-elxsi',
        name: 'Tata Elxsi',
        tier: 'Tier 3',
        majors: ['ECE'],
        domains: ['Embedded', 'Automotive', 'Design'],
        roleTypes: ['Embedded', 'Firmware', 'Design'],
        location: 'On-site',
        companyType: 'Service',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 6, maxLPA: 15, inHandPercent: 72 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'Design & tech services for automotive.',
        whyJoin: ['Design Services', 'Automotive Focus', 'Tata Group'],
        levels: ['Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.tataelxsi.com/careers'
    },
    {
        id: 'ltts',
        name: 'L&T Technology Services',
        tier: 'Tier 3',
        majors: ['ECE', 'Core'],
        domains: ['Embedded', 'Engineering', 'Automotive'],
        roleTypes: ['Embedded', 'Design', 'Testing'],
        location: 'On-site',
        companyType: 'Service',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 6, maxLPA: 15, inHandPercent: 70 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'Engineering services across domains.',
        whyJoin: ['Multi-domain Exposure', 'Global Projects', 'L&T Brand'],
        levels: ['Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.ltts.com/careers'
    },
    {
        id: 'bel',
        name: 'BEL',
        tier: 'Tier 3',
        majors: ['ECE', 'EEE'],
        domains: ['Defense', 'Electronics', 'Communication'],
        roleTypes: ['Hardware', 'Embedded', 'RF'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 18, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Defense PSU for electronics.',
        whyJoin: ['National Service', 'Job Security', 'Defense Tech'],
        levels: ['Probationary Officer', 'Senior Engineer'],
        careersUrl: 'https://bel-india.in/careers/'
    },
];

// ============================================
// EEE COMPANIES
// ============================================

const EEE_TIER1: Company[] = [
    {
        id: 'siemens-energy',
        name: 'Siemens',
        tier: 'Tier 1',
        majors: ['EEE'],
        domains: ['Power', 'Automation', 'Energy'],
        roleTypes: ['Power Engineer', 'Control', 'Automation'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 72 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Global power and automation leader.',
        whyJoin: ['Energy Innovation', 'Global MNC', 'Great Training'],
        levels: ['GET', 'Engineer', 'Senior Engineer'],
        careersUrl: 'https://www.siemens-energy.com/global/en/company/jobs.html'
    },
    {
        id: 'abb',
        name: 'ABB',
        tier: 'Tier 1',
        majors: ['EEE'],
        domains: ['Power', 'Automation', 'Robotics'],
        roleTypes: ['Power Engineer', 'Automation', 'Control'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 72 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Swiss power & automation multinational.',
        whyJoin: ['Robotics Leader', 'Sustainable Tech', 'European Culture'],
        levels: ['GET', 'Engineer', 'Senior Engineer'],
        careersUrl: 'https://new.abb.com/careers/'
    },
    {
        id: 'schneider',
        name: 'Schneider Electric',
        tier: 'Tier 1',
        majors: ['EEE'],
        domains: ['Power', 'Energy Management', 'Automation'],
        roleTypes: ['Power Engineer', 'Automation', 'Energy'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 72 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'French energy management multinational.',
        whyJoin: ['Sustainability', 'Smart Grid focus', 'Great Culture'],
        levels: ['GET', 'Engineer', 'Senior Engineer'],
        careersUrl: 'https://www.se.com/in/en/about-us/careers/overview.jsp'
    },
];

const EEE_TIER2: Company[] = [
    {
        id: 'tata-power',
        name: 'Tata Power',
        tier: 'Tier 2',
        majors: ['EEE'],
        domains: ['Power', 'Energy', 'Renewables'],
        roleTypes: ['Power Engineer', 'Operations', 'Maintenance'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 7, maxLPA: 18, inHandPercent: 70 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Power utility with renewable focus.',
        whyJoin: ['Renewable Energy', 'Tata Ethics', 'Green Transition'],
        levels: ['GET', 'Assistant Manager', 'Senior Manager'],
        careersUrl: 'https://www.tatapower.com/careers/'
    },
    {
        id: 'lt-electrical',
        name: 'L&T Electrical',
        tier: 'Tier 2',
        majors: ['EEE'],
        domains: ['Power', 'Switchgear', 'Infrastructure'],
        roleTypes: ['Power Engineer', 'Design', 'Projects'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 70 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'Indian conglomerate with electrical division.',
        whyJoin: ['Core Engineering', 'Construction Giant', 'Nation Building'],
        levels: ['GET', 'Senior Engineer', 'Assistant Manager'],
        careersUrl: 'https://www.larsentoubro.com/corporate/careers/'
    },
];

const EEE_TIER3: Company[] = [
    {
        id: 'ntpc',
        name: 'NTPC',
        tier: 'Tier 3',
        majors: ['EEE'],
        domains: ['Power Generation', 'Energy'],
        roleTypes: ['Power Engineer', 'Operations', 'Maintenance'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 10, maxLPA: 22, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Largest power producer PSU.',
        whyJoin: ['Maharatna Status', 'Best in Class Pay', 'Campus Townships'],
        levels: ['E2', 'E3', 'E4'],
        careersUrl: 'https://careers.ntpc.co.in/'
    },
    {
        id: 'powergrid',
        name: 'Power Grid Corporation',
        tier: 'Tier 3',
        majors: ['EEE'],
        domains: ['Transmission', 'Grid', 'Power'],
        roleTypes: ['Power Engineer', 'Transmission', 'Operations'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 10, maxLPA: 22, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Transmission grid operator PSU.',
        whyJoin: ['Grid Management', 'Stable Career', 'Government Perks'],
        levels: ['Engineer'],
        careersUrl: 'https://www.powergrid.in/job-opportunities'
    },
    {
        id: 'bhel',
        name: 'BHEL',
        tier: 'Tier 3',
        majors: ['EEE', 'Core'],
        domains: ['Power Equipment', 'Manufacturing'],
        roleTypes: ['Power Engineer', 'Manufacturing', 'Design'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 18, inHandPercent: 72 },
        culture: { wlb: 'Green', learning: 'Low' },
        description: 'Maharatna PSU for power equipment.',
        whyJoin: ['Heavy Industries', 'Manufacturing Scale', 'Work Life Balance'],
        levels: ['Engineer'],
        careersUrl: 'https://careers.bhel.in/bhel/jsp/index.jsp'
    },
];

// ============================================
// CORE/MECHANICAL COMPANIES
// ============================================

const CORE_TIER1: Company[] = [
    {
        id: 'boeing',
        name: 'Boeing',
        tier: 'Tier 1',
        majors: ['Core'],
        domains: ['Aerospace', 'Manufacturing', 'Defense'],
        roleTypes: ['Mechanical', 'Design', 'Aerospace'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 10, maxLPA: 16, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Aerospace giant. Mix of IT/Analytics & Core Engineering.',
        whyJoin: ['Aviation Leader', 'Global Mobility', 'Job Stability'],
        detailedAnalysis: {
            pros: ["**Brand**: Strongest aerospace brand.", "**Stability**: Very safe job."],
            cons: ["**Bureaucracy**: Highly regulated, slow pace.", "**Role**: Many roles are IT/Support rather than core Aerodynamics."],
            recentDevelopments: ["Expanding BIETC Bangalore facility."]
        },
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://jobs.boeing.com/location/india-jobs/'
    },
    {
        id: 'airbus',
        name: 'Airbus',
        tier: 'Tier 1',
        majors: ['Core'],
        domains: ['Aerospace', 'Manufacturing', 'Design'],
        roleTypes: ['Mechanical', 'Design', 'Aerospace'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 12, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'European aerospace leader. Flight physics & structure design.',
        whyJoin: ['European Culture', 'Flight Physics', 'Great Perks (Travel)'],
        detailedAnalysis: {
            pros: ["**Culture**: Best-in-class WLB and European work ethic.", "**Perks**: Great travel benefits and insurance."],
            cons: ["**Salary**: Lower ceiling than Software/VLSI roles.", "**Pace**: Slow corporate agility."],
            recentDevelopments: ["Growing digital capabilities in Bangalore."]
        },
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior', 'Expert'],
        careersUrl: 'https://www.airbus.com/en/working-at-airbus-in-india'
    },
    {
        id: 'isro',
        name: 'ISRO',
        tier: 'Tier 1',
        majors: ['Core', 'ECE'],
        domains: ['Space', 'Aerospace', 'Research'],
        roleTypes: ['Scientist', 'Mechanical', 'Aerospace'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Hard',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 80 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'Indian space agency — Chandrayaan, Mangalyaan.',
        whyJoin: ['Space Exploration', 'National Pride', 'Scientific Research'],
        levels: ['Scientist/Engineer-SC', 'SD', 'SE', 'SF', 'SG'],
        careersUrl: 'https://www.isro.gov.in/Careers.html'
    },
];

const CORE_TIER2: Company[] = [
    {
        id: 'tata-motors',
        name: 'Tata Motors',
        tier: 'Tier 2',
        majors: ['Core'],
        domains: ['Automotive', 'Manufacturing', 'EV'],
        roleTypes: ['Mechanical', 'Design', 'Manufacturing'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 70 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'JLR parent with EV push.',
        whyJoin: ['Bar Raiser Culture', 'Fast Promotion Velocity', 'Working on AWS Bedrock / Q'],
        levels: ['GET'],
        careersUrl: 'https://www.tatamotors.com/careers/'
    },
    {
        id: 'mahindra',
        name: 'Mahindra & Mahindra',
        tier: 'Tier 2',
        majors: ['Core'],
        domains: ['Automotive', 'Tractors', 'Manufacturing'],
        roleTypes: ['Mechanical', 'Design', 'Manufacturing'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 70 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'SUV and tractor manufacturer.',
        whyJoin: ['Core Automotive', 'Off-road tech', 'Rise Philosophy'],
        levels: ['GET', 'Senior Manager'],
        careersUrl: 'https://www.mahindra.com/careers'
    },
    {
        id: 'bosch-auto',
        name: 'Bosch (Automotive)',
        tier: 'Tier 2',
        majors: ['Core'],
        domains: ['Automotive', 'Manufacturing', 'Components'],
        roleTypes: ['Mechanical', 'Design', 'Testing'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 10, maxLPA: 25, inHandPercent: 74 },
        culture: { wlb: 'Green', learning: 'High' },
        description: 'German automotive components leader.',
        whyJoin: ['Bosch Way', 'Precision Engineering', 'Automotive Future'],
        levels: ['Internship', 'Entry Level', 'Mid Level', 'Senior'],
        careersUrl: 'https://www.bosch.in/careers/'
    },
];

const CORE_TIER3: Company[] = [
    {
        id: 'lnt',
        name: 'Larsen & Toubro',
        tier: 'Tier 3',
        majors: ['Core'],
        domains: ['Infrastructure', 'Manufacturing', 'Construction'],
        roleTypes: ['Site Engineer', 'Design', 'Projects'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Medium',
        internFriendly: true,
        salary: { minLPA: 6, maxLPA: 15, inHandPercent: 68 },
        culture: { wlb: 'Yellow', learning: 'Medium' },
        description: 'EPC giant with infrastructure projects.',
        whyJoin: ['Mega Projects', 'Construction Leader', 'Field Exposure'],
        levels: ['GET', 'Construction Manager'],
        careersUrl: 'https://www.larsentoubro.com/corporate/careers/'
    },
    {
        id: 'tata-steel',
        name: 'Tata Steel',
        tier: 'Tier 3',
        majors: ['Core'],
        domains: ['Steel', 'Manufacturing', 'Metallurgy'],
        roleTypes: ['Mechanical', 'Metallurgy', 'Operations'],
        location: 'On-site',
        companyType: 'Product',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 72 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Steel pioneer with Jamshedpur base.',
        whyJoin: ['Steel Manufacturing', 'Legacy', 'Employee Care'],
        levels: ['GET', 'Senior Manager'],
        careersUrl: 'https://www.tatasteel.com/careers/'
    },
    {
        id: 'ongc',
        name: 'ONGC',
        tier: 'Tier 3',
        majors: ['Core'],
        domains: ['Oil & Gas', 'Energy', 'Exploration'],
        roleTypes: ['Mechanical', 'Petroleum', 'Operations'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 12, maxLPA: 25, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Oil & gas Maharatna PSU.',
        whyJoin: ['Energy Sector', 'Highest PSU Pay', 'Field Life'],
        levels: ['GT', 'E1', 'E2', 'E3', 'E4'],
        careersUrl: 'https://www.ongcindia.com/wps/wcm/connect/en/career/'
    },
    {
        id: 'hal',
        name: 'HAL',
        tier: 'Tier 3',
        majors: ['Core', 'ECE'],
        domains: ['Aerospace', 'Defense', 'Manufacturing'],
        roleTypes: ['Mechanical', 'Aerospace', 'Manufacturing'],
        location: 'On-site',
        companyType: 'PSU',
        difficulty: 'Easy',
        internFriendly: true,
        salary: { minLPA: 8, maxLPA: 20, inHandPercent: 75 },
        culture: { wlb: 'Green', learning: 'Medium' },
        description: 'Defense PSU for aircraft manufacturing.',
        whyJoin: ['Fighter Jets', 'Aviation Tech', 'Defense Service'],
        levels: ['Design Trainee', 'Engineer'],
        careersUrl: 'https://hal-india.co.in/Career/M__171'
    },
];

// ============================================
// EXPORT ALL COMPANIES
// ============================================

export const COMPANIES: Company[] = [
    ...CS_TIER1, ...CS_TIER2, ...CS_TIER3,
    ...ECE_TIER1, ...ECE_TIER2, ...ECE_TIER3,
    ...EEE_TIER1, ...EEE_TIER2, ...EEE_TIER3,
    ...CORE_TIER1, ...CORE_TIER2, ...CORE_TIER3,
];

// Get unique values for filters
export const ALL_DOMAINS = Array.from(new Set(COMPANIES.flatMap(c => c.domains))).sort();

// Simplified Domain Categories for Better Filtering
export const SIMPLIFIED_DOMAINS = [
    'Software Engineering',
    'AI/ML & Data',
    'Cloud & Infrastructure',
    'Finance & Trading',
    'Security',
    'Hardware & Semiconductors',
    'Mobile',
    'Product & Design',
    'Research',
    'Other'
] as const;

export const ALL_ROLE_TYPES = Array.from(new Set(COMPANIES.flatMap(c => c.roleTypes))).sort();
