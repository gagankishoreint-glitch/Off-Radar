"use client";

import { TrendingUp, DollarSign, Briefcase, LogIn, ArrowUpRight, ArrowDownRight, Users, BookOpen, Code2 } from 'lucide-react';
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
                            <TrendingUp className="text-primary" /> Market Trends 2025-2026
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Live insights on the shifting hiring landscape. Data aggregated from global research and top-tier Indian placement stats.
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

                {/* Key Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
                            <DollarSign className="w-4 h-4" /> Top 10% Salary Growth
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">Aggressive</div>
                        <div className="text-green-500 text-sm mt-1 flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" /> Disproportionate gains for high-skill talent
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
                            <Briefcase className="w-4 h-4" /> Fastest Growing Role
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">AI Engineer</div>
                        <div className="text-muted-foreground text-sm mt-1">Software + Data + Systems</div>
                    </div>
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
                            <Users className="w-4 h-4" /> Placement Trend
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">Off-Campus ↑</div>
                        <div className="text-muted-foreground text-sm mt-1">Tier-2/3 colleges seeing breakout hires</div>
                    </div>
                </div>

                {/* Industry Research Section */}
                <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" /> Backed by Industry Research
                </h2>

                <div className="grid gap-8 mb-16">
                    {/* McKinsey */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="p-6 border-b border-border bg-muted/30">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                📘 McKinsey Global Institute
                                <span className="text-sm font-normal text-muted-foreground ml-auto bg-background px-3 py-1 rounded-full border border-border">The Future of Work</span>
                            </h3>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold mb-3 text-primary">Key Insights</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                    <li>Up to <strong className="text-foreground">30%</strong> of current work activities automated by 2030.</li>
                                    <li>Demand shift: Software Engineers, Data Engineers, Platform Engineers.</li>
                                    <li><strong className="text-foreground">Skill depth &gt; Role title</strong> is the new norm.</li>
                                </ul>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg flex flex-col justify-center">
                                <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4 mb-3">
                                    "AI will not eliminate engineering roles — it will eliminate shallow skillsets."
                                </blockquote>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {['AI', 'Automation', 'System Design', 'Reskilling'].map(tag => (
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
                                <h3 className="text-lg font-bold mb-1">2️⃣ World Economic Forum</h3>
                                <p className="text-sm text-muted-foreground">Future of Jobs Report 2024</p>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="text-sm font-semibold mb-2">Fastest Growing Roles</div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium bg-green-500/10 text-green-600 px-2 py-1 rounded">Software Devs</span>
                                        <span className="text-xs font-medium bg-green-500/10 text-green-600 px-2 py-1 rounded">Data Engineers</span>
                                        <span className="text-xs font-medium bg-green-500/10 text-green-600 px-2 py-1 rounded">Cybersecurity</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold mb-2">Declining</div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs font-medium bg-red-500/10 text-red-600 px-2 py-1 rounded">Clerical Roles</span>
                                        <span className="text-xs font-medium bg-red-500/10 text-red-600 px-2 py-1 rounded">Repetitive Tasks</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border text-sm italic text-muted-foreground">
                                "Analytical thinking remains the #1 skill employers seek globally."
                            </div>
                        </div>

                        {/* NASSCOM */}
                        <div className="bg-card p-6 rounded-xl border border-border flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold mb-1">🇮🇳 NASSCOM India Outlook</h3>
                                <p className="text-sm text-muted-foreground">India Tech Industry Data</p>
                            </div>

                            <div className="flex-1 space-y-4">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>IT hiring stabilizing after 2023 slowdown.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>Growth in AI Services, Semi-conductors, & Cloud.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        <span>Increased off-campus hiring for Tier-2/3 colleges.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border text-sm font-medium text-primary">
                                “India’s tech demand is shifting from services to deep-tech.”
                            </div>
                        </div>
                    </div>

                    {/* LinkedIn & GitHub Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* LinkedIn */}
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold mb-4">3️⃣ LinkedIn Economic Graph</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Most Demanded Skills (India)</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Java', 'SQL', 'Python', 'System Design', 'Cloud'].map(s => (
                                            <span key={s} className="px-2 py-1 bg-muted rounded text-xs text-foreground border border-border">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground border-l-2 border-blue-500 pl-3">
                                    “Hiring velocity favors engineers who build scalable systems.”
                                </p>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h3 className="text-lg font-bold mb-4">4️⃣ GitHub Octoverse</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Fastest Growing</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Rust', 'Go', 'TypeScript'].map(s => (
                                            <span key={s} className="px-2 py-1 bg-orange-500/10 text-orange-600 rounded text-xs border border-orange-500/20">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm font-medium">
                                    AI-assisted coding is now standard.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    ℹ️ GitHub profile strength &gt; Resume buzzwords
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Takeaways */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-heading font-bold mb-6 text-foreground text-center">What This Means for Students</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2">🧱</div>
                            <h3 className="font-bold text-lg mb-2">Fundamentals &gt; Frameworks</h3>
                            <p className="text-sm text-muted-foreground">Don't just learn React; understand how the DOM works.</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2">🛠️</div>
                            <h3 className="font-bold text-lg mb-2">Projects &gt; CGPA</h3>
                            <p className="text-sm text-muted-foreground">Build real things. Deploy them. Broken code on GitHub is better than no code.</p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-3xl mb-2">🧠</div>
                            <h3 className="font-bold text-lg mb-2">Systems &gt; Tools</h3>
                            <p className="text-sm text-muted-foreground">Tools change every year. Systems thinking lasts forever.</p>
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
            </div>
        </div>
    );
}
