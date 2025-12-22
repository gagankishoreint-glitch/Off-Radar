import { ATS_MAPPING, ATSSystem } from './ats-data';

export interface ProjectDescriptor {
    title: string;
    tech: string[];
    description: string;
    rewriteSuggestion?: string;
}

export interface ExperienceDescriptor {
    role: string;
    company: string;
    duration: string;
    achievements: string[];
    gapAlert?: string;
}

export interface TechStackAnalysis {
    proficient: string[];
    familiar: string[];
    missing: string[];
}

export interface Recommendation {
    type: 'Critical' | 'Improvement' | 'Bonus';
    text: string;
    impact: number; // 0-100 influence on score
}

export interface AnalysisResult {
    score: number;
    matchRate: 'High' | 'Medium' | 'Low';
    foundKeywords: string[];
    missingKeywords: string[];
    sectionScore: number;
    formattingScore: number;
    feedback: string[];
    atsSystem: ATSSystem;

    // Advanced Insights
    projects: ProjectDescriptor[];
    experience: ExperienceDescriptor[];
    techStack: TechStackAnalysis;
    education: { found: boolean; degree?: string; major?: string };
    recommendations: Recommendation[];
}

export function analyzeResume(text: string, targetCompany: string, requiredKeywords: string[]): AnalysisResult {
    const lowerText = text.toLowerCase();

    // Default to 'Other' if company not in our specific map
    const company = ATS_MAPPING[targetCompany.toLowerCase()] || {
        name: targetCompany,
        ats: 'Other' as ATSSystem,
        strictness: 'Medium',
        parsingFocus: 'Keywords'
    };

    // --- 1. Keyword Analysis ---
    const foundKeywords = requiredKeywords.filter(k => lowerText.includes(k.toLowerCase()));
    const missingKeywords = requiredKeywords.filter(k => !lowerText.includes(k.toLowerCase()));

    const keywordScore = requiredKeywords.length > 0
        ? (foundKeywords.length / requiredKeywords.length) * 100
        : 100;

    // --- 2. Advanced Extraction Logic (Heuristic) ---

    // a. Projects Extraction
    // Look for a "Projects" header and try to parsing chunks after it
    // Simplistic heuristic: regex to find standard project section, then split by bullet points
    const projects: ProjectDescriptor[] = [];
    if (lowerText.includes('projects') || lowerText.includes('personal projects')) {
        // Mock extraction for MVP (Real NER would be used here)
        if (lowerText.includes('built') || lowerText.includes('developed') || lowerText.includes('created')) {
            projects.push({
                title: "Detected Project: Full Stack Application/Tool",
                tech: foundKeywords.slice(0, 3),
                description: "Extracted project using found keywords. Ensure impact metrics are quantifying this.",
                rewriteSuggestion: "Rewrite: 'Developed a high-performance application using [Tech], reducing load times by 40%.'"
            });
        }
    }

    // b. Experience Extraction
    const experience: ExperienceDescriptor[] = [];
    // Heuristic: Check for common job titles
    const commonTitles = ['software engineer', 'developer', 'intern', 'analyst', 'manager'];
    commonTitles.forEach(title => {
        if (lowerText.includes(title)) {
            // Only add if unique roughly
            if (!experience.some(e => e.role.toLowerCase().includes(title))) {
                experience.push({
                    role: title.charAt(0).toUpperCase() + title.slice(1),
                    company: "Detected Role",
                    duration: "Unknown Duration",
                    achievements: ["Achievement 1 detected", "Achievement 2 detected"],
                    gapAlert: lowerText.includes('impact') || lowerText.includes('%') ? undefined : "Missing quantified metrics (e.g. 'Improved X by Y%')"
                });
            }
        }
    });

    // c. Tech Stack Inference
    const techStack: TechStackAnalysis = {
        proficient: [],
        familiar: [],
        missing: missingKeywords
    };

    foundKeywords.forEach(k => {
        // Simple heuristic: if mentioned > 2 times, proficient
        const count = (lowerText.match(new RegExp(k.toLowerCase(), 'g')) || []).length;
        if (count >= 2) {
            techStack.proficient.push(k);
        } else {
            techStack.familiar.push(k);
        }
    });

    // d. Education
    const education = {
        found: /education|university|college|degree|bachelor|master|phd/i.test(lowerText),
        degree: /bachelor|master|phd/i.exec(lowerText)?.[0] || 'Degree Unspecified',
        major: /computer science|engineering|information technology/i.exec(lowerText)?.[0]
    };

    // --- 3. Formatting/Structure Checks ---
    let formattingScore = 100;
    const feedback: string[] = [];
    const recommendations: Recommendation[] = [];

    if (!education.found) {
        formattingScore -= 10;
        feedback.push("Missing 'Education' section.");
        recommendations.push({ type: 'Critical', text: "Add an Education section clearly listing your University and Degree.", impact: 10 });
    }

    // Project Gaps
    if (projects.length === 0) {
        formattingScore -= 15;
        feedback.push("No specific 'Projects' section detected. Projects are critical for junior/mid roles.");
        recommendations.push({ type: 'Critical', text: "Add a 'Notable Projects' section highlighting 2-3 complex builds.", impact: 20 });
    } else {
        const hasMetrics = /\d+%|\d+x|reduced|increased|saved/i.test(lowerText);
        if (!hasMetrics) {
            recommendations.push({ type: 'Improvement', text: "Quantify your project impact. Don't just say 'Built X', say 'Built X handling 10k users'.", impact: 15 });
        }
    }

    // Keyword Gaps
    if (missingKeywords.length > 0) {
        recommendations.push({
            type: 'Critical',
            text: `Missing critical keywords for this role: ${missingKeywords.slice(0, 3).join(', ')}. ATS will filter you out.`,
            impact: 25
        });
    }

    // --- 4. Score Calculation ---
    // Weighted scoring: Skills (40%), Experience/Projects (40%), Formatting (20%)
    const weightedKeywordScore = keywordScore * 0.4;
    const weightedContentScore = (Math.min(projects.length * 20, 60) + (education.found ? 20 : 0) + (experience.length > 0 ? 20 : 0)) * 0.4;
    const weightedFormatScore = formattingScore * 0.2;

    const totalScore = Math.round(weightedKeywordScore + weightedContentScore + weightedFormatScore);

    // ATS Specific feedback
    if (company.ats === 'Workday' || company.ats === 'Taleo') {
        feedback.push(`ATS Alert: ${company.name} uses ${company.ats} (High Strictness). Avoid columns/tables.`);
    }

    return {
        score: Math.min(Math.max(totalScore, 0), 100), // Clamp 0-100
        matchRate: totalScore > 80 ? 'High' : totalScore > 60 ? 'Medium' : 'Low',
        foundKeywords,
        missingKeywords,
        sectionScore: Math.round(weightedContentScore * 2.5),
        formattingScore,
        feedback,
        atsSystem: company.ats,
        projects,
        experience,
        techStack,
        education,
        recommendations: recommendations.sort((a, b) => b.impact - a.impact)
    };
}
