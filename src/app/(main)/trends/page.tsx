"use client";

import { TrendingUp, DollarSign, Briefcase, LogIn, ArrowUpRight, ArrowDownRight, Users, BookOpen, Code2, BrainCircuit, Cpu } from 'lucide-react';
import { useUserStore } from '@/store/use-user-store';
import Link from 'next/link';

export default function TrendsPage() {
    const { isLoggedIn, username } = useUserStore();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium mb-3 border border-blue-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Last Updated: {currentDate}
                        </div>
                        <h1 className="text-4xl font-heading font-bold mb-3 flex items-center gap-3">
                            <TrendingUp className="text-primary" /> Market Trends 2025: <span className="text-primary italic">The Agentic Era</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Real-time hiring signals. Moving beyond "AI Hype" to <strong>Reasoning Models, LLM Ops, and Agentic Workflows</strong>.
                        </p>
                    </div>

                    {!isLoggedIn && (
                        <div className="bg-card p-4 rounded-xl border border-border max-w-xs shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <LogIn className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold">
                                    Personalized Insights
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">
                                Login to track trends relevant to your target roles.
                            </p>
                            <Link href="/login">
                                <button className="w-full px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Key Stats Grid - 2025 Data */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
                            <DollarSign className="w-4 h-4" /> Median SWE Comp (India)
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">₹22-55L</div>
                        <div className="text-green-500 text-sm mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" /> Adjusted for Senior/Staff
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
                            <BrainCircuit className="w-4 h-4" /> Top Paying Skill
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">AI Agents / RAG</div>
                        <div className="text-muted-foreground text-sm mt-1">Founders Office & Core AI</div>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
                            <Users className="w-4 h-4" /> Hiring Trend
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">Full Stack ++</div>
                        <div className="text-muted-foreground text-sm mt-1">"One person, end-to-end"</div>
                    </div>
                </div>

                {/* Industry Research Section */}
                <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" /> Deep Dives: 2025 Outlook
                </h2>

                <div className="grid gap-8 mb-16">
                    {/* McKinsey */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="p-6 border-b border-border bg-muted/30">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                📘 State of AI Report 2025
                                <span className="text-sm font-normal text-muted-foreground ml-auto bg-background px-3 py-1 rounded-full border border-border">Latest</span>
                            </h3>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold mb-3 text-primary">Shift to "Reasoning Models"</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                    <li>Hiring is shifting from "Prompt Engineering" to <strong className="text-foreground">Model Orchestration</strong>.</li>
                                    <li>Rise of <strong className="text-foreground">"AI Engineers"</strong> who sit between Research and Product.</li>
                                    <li>Traditional CRUD apps being replaced by Agentic Interfaces.</li>
                                </ul>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg flex flex-col justify-center">
                                <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4 mb-3">
                                    "The value capture is moving from model training to Agentic System Design."
                                </blockquote>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {['DeepSeek', 'o1/Reasoning', 'LangGraph', 'Evaluations'].map(tag => (
                                        <span key={tag} className="text-xs bg-background px-2 py-1 rounded border border-border text-muted-foreground">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WEF & NASSCOM Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* WEF */}
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-1">2️⃣ The "Junior" Crisis</h3>
                                <p className="text-sm text-muted-foreground">Market correction for Entry Level</p>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="text-sm font-semibold mb-2">What's Happening?</div>
                                    <p className="text-sm text-muted-foreground">
                                        Coding assistants (Cursor, Windsurf) have raised the bar. Juniors are expected to output at Senior velocity.
                                    </p>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold mb-2">Survival Guide</div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium bg-green-500/10 text-green-600 px-2 py-1 rounded">Build End-to-End</span>
                                        <span className="text-xs font-medium bg-green-500/10 text-green-600 px-2 py-1 rounded">System Design</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NASSCOM */}
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-1">🇮🇳 India Market Update</h3>
                                <p className="text-sm text-muted-foreground">GCCs & Startups Leading</p>
                            </div>

                            <div className="flex-1 space-y-4">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>**GCCs (Global Capability Centers)** are hiring aggressively (JPMC, Wells Fargo, Target).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>Startup equity aligns with 2025 IPO booms (Swiggy, etc).</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border text-sm font-medium text-primary">
                                “Bangalore and Hyderabad remain top hubs for AI talent.”
                            </div>
                        </div>
                    </div>

                    {/* LinkedIn & GitHub Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* LinkedIn */}
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold mb-4">3️⃣ The "Full-Stack" Renaissance</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Required Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Next.js', 'Supabase', 'Vector DBs', 'Python', 'FastAPI'].map(s => (
                                            <span key={s} className="px-2 py-1 bg-muted rounded text-xs text-foreground border border-border">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground border-l-2 border-primary pl-3">
                                    “Specialization is good, but Generalization wins in the AI era.”
                                </p>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold mb-4">4️⃣ Languages of 2025</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Winners</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Python (AI)', 'TypeScript (App)', 'Rust (Systems)'].map(s => (
                                            <span key={s} className="px-2 py-1 bg-orange-500/10 text-orange-600 rounded text-xs border border-orange-500/20">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm font-medium">
                                    Mojo and Go also seeing heavy adoption for infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Takeaways */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-heading font-bold mb-6 text-foreground text-center">Action Plan for Students</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2">🤖</div>
                            <h3 className="font-bold text-lg mb-2">Learn to Orchestrate</h3>
                            <p className="text-sm text-muted-foreground">Don't just chat with LLMs. Build workflows with them using LangChain or Vercel AI SDK.</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2">🚀</div>
                            <h3 className="font-bold text-lg mb-2">Ship, Don't just Code</h3>
                            <p className="text-sm text-muted-foreground">Recruiters want to see deployed URLs, not just GitHub repos. Vercel/Railway is your friend.</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2">🤝</div>
                            <h3 className="font-bold text-lg mb-2">Soft Skills are Hard Skills</h3>
                            <p className="text-sm text-muted-foreground">In an AI world, your ability to articulate problems and manage expectations is your moat.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                {!isLoggedIn && (
                    <div className="bg-muted p-8 rounded-xl text-center border border-border">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">Stay Ahead of the Curve</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            The market moves fast. Sign in to get weekly digests on hiring trends relevant to your skillset.
                        </p>
                        <Link href="/login">
                            <button className="px-8 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl">
                                Join the Platform
                            </button>
                        </Link>
                    </div>
                )}


                {/* Company Logos Grid with Animation */}
                <div className="mt-16 pt-12 border-t border-border overflow-hidden">
                    <h3 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-8">
                        Companies on Off-Radar
                    </h3>
                    <div className="relative">
                        {/* Animated Logo Grid */}
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-8 items-center justify-items-center">
                            {[
                                { name: 'Google', color: '#4285F4', delay: '0s' },
                                { name: 'Amazon', color: '#FF9900', delay: '0.1s' },
                                { name: 'Microsoft', color: '#00A4EF', delay: '0.2s' },
                                { name: 'Meta', color: '#0668E1', delay: '0.3s' },
                                { name: 'Apple', color: '#555', delay: '0.4s' },
                                { name: 'Netflix', color: '#E50914', delay: '0.5s' },
                                { name: 'Adobe', color: '#FF0000', delay: '0.6s' },
                                { name: 'Uber', color: '#000000', delay: '0.7s' },
                                { name: 'Airbnb', color: '#FF5A5F', delay: '0.8s' },
                                { name: 'Stripe', color: '#635BFF', delay: '0.9s' },
                                { name: 'Shopify', color: '#7AB55C', delay: '1s' },
                                { name: 'Dropbox', color: '#0061FF', delay: '1.1s' },
                                { name: 'Atlassian', color: '#0052CC', delay: '1.2s' },
                                { name: 'Snowflake', color: '#29B5E8', delay: '1.3s' },
                                { name: 'Databricks', color: '#FF3621', delay: '1.4s' },
                                { name: 'OpenAI', color: '#74AA9C', delay: '1.5s' },
                                { name: 'Nvidia', color: '#76B900', delay: '1.6s' },
                                { name: 'Intel', color: '#0071C5', delay: '1.7s' },
                                { name: 'AMD', color: '#ED1C24', delay: '1.8s' },
                                { name: 'Samsung', color: '#1428A0', delay: '1.9s' },
                            ].map((company, idx) => (
                                <div
                                    key={company.name}
                                    className="group relative"
                                    style={{
                                        animation: `fadeInUp 0.6s ease-out ${company.delay} both, float 3s ease-in-out infinite`,
                                        animationDelay: company.delay
                                    }}
                                >
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted group-hover:bg-background flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border border-border">
                                        <div
                                            className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center font-bold text-lg"
                                            style={{ backgroundColor: `${company.color}15`, color: company.color }}
                                        >
                                            {company.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="text-[9px] md:text-[10px] text-muted-foreground mt-2 text-center font-medium">
                                        {company.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
