// Demo AI Client - Provides realistic mock responses when real AI not configured
// This allows full demonstration of AI features without credentials

interface MockAnalysisResult {
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
}

class DemoAIClient {
    /**
     * Generate demo resume analysis
     */
    async analyzeResume(resumeText: string): Promise<MockAnalysisResult> {
        // Simulate API delay
        await this.delay(800);

        // Extract some basic info from resume text
        const lowerText = resumeText.toLowerCase();
        const skills = this.extractSkillsFromText(lowerText);

        return {
            skills: {
                proficient: skills.slice(0, 5),
                familiar: skills.slice(5, 10),
            },
            projects: [
                {
                    title: 'Full-Stack Web Application',
                    tech: ['React', 'Node.js', 'MongoDB'],
                    description: 'Built a comprehensive web platform with authentication and real-time features',
                    suggestion: 'Add specific metrics: "Developed a web app serving 10,000+ users with 99.9% uptime"',
                },
                {
                    title: 'AI/ML Project',
                    tech: ['Python', 'TensorFlow', 'Scikit-learn'],
                    description: 'Implemented machine learning models for data analysis',
                    suggestion: 'Quantify results: "Built ML models achieving 95% accuracy on dataset of 50K samples"',
                },
            ],
            experience: [
                {
                    role: 'Software Engineer Intern',
                    company: 'Tech Company',
                    achievements: [
                        'Developed features used by thousands of users',
                        'Improved application performance',
                        'Collaborated with cross-functional teams',
                    ],
                },
            ],
            education: {
                degree: 'Bachelor of Technology',
                major: 'Computer Science',
                institution: 'University',
            },
            atsScore: 78,
            suggestions: [
                {
                    type: 'critical',
                    text: 'Add quantifiable metrics to achievements (e.g., "Improved performance by 40%")',
                    impact: 25,
                },
                {
                    type: 'improvement',
                    text: 'Include specific technologies in project descriptions',
                    impact: 15,
                },
                {
                    type: 'bonus',
                    text: 'Add relevant certifications or courses to strengthen your profile',
                    impact: 10,
                },
            ],
        };
    }

    /**
     * Generate demo offer comparison
     */
    async compareOffers(offer1: any, offer2: any): Promise<any> {
        await this.delay(600);

        const winner = offer1.ctc > offer2.ctc ? 'offer1' : 'offer2';

        return {
            winner,
            reasoning: `Based on a comprehensive analysis of salary, learning opportunities, work-life balance, and long-term growth potential, ${winner === 'offer1' ? offer1.company : offer2.company} emerges as the stronger choice for early career development.`,
            offer1Pros: [
                `Higher base salary: ₹${offer1.ctc.toLocaleString('en-IN')}`,
                'Strong brand recognition in the industry',
                'Excellent learning opportunities with senior engineers',
                'Structured career progression path',
            ],
            offer1Cons: [
                'May have higher workload expectations',
                'Less flexibility in role compared to smaller companies',
                'Slower decision-making due to company size',
            ],
            offer2Pros: [
                'More hands-on experience and ownership',
                'Faster career growth potential',
                'Direct exposure to senior leadership',
                'Greater impact on product direction',
            ],
            offer2Cons: [
                `Lower initial compensation: ₹${offer2.ctc.toLocaleString('en-IN')}`,
                'Higher risk factor',
                'May lack structured mentorship programs',
            ],
            longTermImpact: `For a 3-5 year career outlook, ${winner === 'offer1' ? offer1.company : offer2.company} provides better positioning for future opportunities. The experience gained will be highly valuable in the tech industry, with strong exit opportunities to top-tier companies or startups.`,
            recommendation: `Choose ${winner === 'offer1' ? offer1.company : offer2.company} if you prioritize ${winner === 'offer1' ? 'stability, brand value, and structured growth' : 'rapid learning, ownership, and entrepreneurial experience'}. Both are solid choices, but ${winner === 'offer1' ? offer1.company : offer2.company} slightly edges out for your career stage.`,
        };
    }

    /**
     * Generate demo chat response
     */
    async chat(message: string, context?: any): Promise<string> {
        await this.delay(500);

        const lowerMessage = message.toLowerCase();

        // Context-aware responses
        if (lowerMessage.includes('google') || lowerMessage.includes('startup')) {
            return `Great question! When comparing Google vs a startup:

**Google offers:**
- World-class engineering culture and mentorship
- Competitive compensation with strong equity packages
- Better work-life balance typically
- Brand value that opens future doors

**Startups offer:**
- Faster learning curve and more ownership
- Direct impact on product and company direction
- Potential for higher equity upside (but riskier)
- Broader exposure across the tech stack

For fresh graduates, I generally recommend starting at an established company like Google to build strong fundamentals, then moving to startups after 2-3 years when you have solid skills. However, if you're highly entrepreneurial and comfortable with risk, a well-funded early-stage startup can be incredibly valuable.

What's more important to you right now - stability and learning from the best, or ownership and rapid growth?`;
        }

        if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return `For a strong resume that passes ATS systems:

**Critical elements:**
1. **Quantify everything**: "Improved performance by 40%" not just "Improved performance"
2. **Keywords**: Match the job description - if they say "React", use "React" not just "JavaScript frameworks"
3. **ATS-friendly format**: Avoid tables, columns, graphics - stick to clean text
4. **Action verbs**: "Built", "Developed", "Led", "Achieved" - show impact

**Common mistakes:**
- Generic descriptions without metrics
- Missing technical keywords
- Poor formatting that ATS can't parse
- No clear achievements, just responsibilities

Would you like me to review a specific section of your resume?`;
        }

        if (lowerMessage.includes('salary') || lowerMessage.includes('ctc') || lowerMessage.includes('negotiate')) {
            return `Salary negotiation tips for tech offers:

**Before negotiating:**
- Research market rates (use levels.fyi, Glassdoor)
- Know your worth based on skills and experience
- Have a target range, not just one number

**Negotiation strategy:**
1. **Never accept the first offer immediately** - always negotiate (politely)
2. **Focus on total compensation**: Base + stocks + bonus + benefits
3. **Use competing offers**: "I have another offer at X, can you match?"
4. **Be specific**: "Based on my research and skills, I was expecting ₹X"
5. **Stay professional**: Never be aggressive or demanding

**Smart asks:**
- Higher base salary (most important for taxes)
- Signing bonus (one-time, less risky for company)
- Better equity/RSUs (if you believe in the company)
- Performance bonus targets

Most companies expect 10-20% negotiation room. Don't be afraid to ask!`;
        }

        // Default helpful response
        return `I'm here to help with your career decisions! I can provide insights on:

- **Job offer comparisons** - Which company to choose and why
- **Resume optimization** - Making your resume ATS-friendly
- **Salary negotiation** - Getting the best compensation package
- **Career strategy** - Long-term growth and skill development
- **Interview prep** - What to expect and how to prepare

What would you like to discuss?`;
    }

    /**
     * Extract skills from resume text
     */
    private extractSkillsFromText(text: string): string[] {
        const commonSkills = [
            'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
            'Java', 'C++', 'Git', 'Docker', 'AWS',
            'SQL', 'MongoDB', 'Express', 'Next.js', 'REST API',
            'GraphQL', 'Redux', 'TailwindCSS', 'Firebase', 'PostgreSQL',
        ];

        const foundSkills = commonSkills.filter(skill =>
            text.includes(skill.toLowerCase())
        );

        // Add some default skills if not enough found
        if (foundSkills.length < 10) {
            foundSkills.push(
                ...['Problem Solving', 'Data Structures', 'Algorithms', 'System Design']
                    .filter(s => !foundSkills.includes(s))
            );
        }

        return foundSkills.slice(0, 10);
    }

    /**
     * Simulate network delay
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Check if demo mode is active
     */
    get isDemoMode(): boolean {
        return true; // Always true for demo client
    }
}

export const demoAIClient = new DemoAIClient();
export default DemoAIClient;
