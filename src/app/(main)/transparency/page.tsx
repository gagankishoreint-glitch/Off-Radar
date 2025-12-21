"use client";

import { BookOpen, Shield, AlertCircle, Database } from 'lucide-react';

export default function TransparencyPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                    Transparency & Methodology
                </h1>
                <p className="text-xl text-muted-foreground mb-12">
                    How Off-Radar works, what's real, and what's estimated.
                </p>

                <div className="space-y-8">
                    {/* What is Off-Radar */}
                    <div className="bg-background p-8 rounded-xl border border-border">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-heading font-semibold mb-3 text-foreground">What is Off-Radar?</h2>
                                <p className="text-muted-foreground mb-3">
                                    Off-Radar is a <strong className="text-foreground">decision intelligence tool</strong> designed for Indian engineering students comparing internship and job offers.
                                    Unlike HR-sanitized career portals, we focus on <strong className="text-foreground">real trade-offs, hidden costs, and unfiltered reality</strong>.
                                </p>
                                <p className="text-muted-foreground">
                                    This is a <strong className="text-foreground">hackathon prototype</strong> built to demonstrate how transparent, student-centric career guidance could work.
                                    All data is <strong className="text-foreground">simulated</strong> or based on <strong className="text-foreground">public patterns</strong>, not proprietary scraping.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Sources */}
                    <div className="bg-background p-8 rounded-xl border border-border">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <Database className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">Where Does the Data Come From?</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">What's Simulated (Mocked)</h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li>Salary ranges and in-hand estimates</li>
                                            <li>PPO conversion rates</li>
                                            <li>Work-life balance scores</li>
                                            <li>Career fit scores</li>
                                            <li>Sentiment summaries (not real scraping)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">What's Based on Public Patterns</h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li>General industry trends (e.g., "Startups have higher risk, lower WLB")</li>
                                            <li>Well-known reputation of companies (e.g., "Google = strong resume signal")</li>
                                            <li>Typical compensation structures (base vs variable vs equity)</li>
                                            <li>Common complaint patterns from public forums (not company-specific data)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-muted p-4 rounded-lg mt-6">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">Important:</strong> We do <strong className="text-foreground">NOT</strong> scrape company data, internal documents, or private forums.
                                        All "sentiment" and "Reddit summaries" are <strong className="text-foreground">simulated examples</strong> to demonstrate the product vision.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Methodology */}
                    <div className="bg-background p-8 rounded-xl border border-border">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">How We Calculate Scores</h2>

                                <div className="space-y-4">
                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-semibold mb-2 text-foreground">Career Fit Score (0-100)</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Weighted combination of:
                                        </p>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li><strong className="text-foreground">Salary</strong> (30%): Normalized CTC relative to market</li>
                                            <li><strong className="text-foreground">Learning</strong> (35%): Heuristic based on company type and reputation</li>
                                            <li><strong className="text-foreground">Work-Life Balance</strong> (20%): Industry patterns for that company category</li>
                                            <li><strong className="text-foreground">Brand Value</strong> (15%): Resume signal strength in the market</li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-semibold mb-2 text-foreground">In-Hand Salary Estimates</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Rough calculation: <code className="bg-background px-1 rounded">CTC × 0.7-0.8 ÷ 12</code>.
                                            Accounts for tax, PF, and typical deductions. Not exact—consult a CA for precision.
                                        </p>
                                    </div>

                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-semibold mb-2 text-foreground">WLB & Risk Scores</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Based on industry heuristics: Startups = Red WLB, MNCs = Green WLB, etc.
                                            Not based on real employee surveys.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Limitations & Ethics */}
                    <div className="bg-muted p-8 rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">Limitations & Disclaimers</h2>

                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                                    <li>
                                        <strong className="text-foreground">All insights are estimates.</strong> Real offers vary by team, role, location, and negotiation.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">No guarantee of accuracy.</strong> This is a demo tool, not financial or career advice.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Company data is generalized.</strong> "Google" covers hundreds of teams with vastly different experiences.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Sentiment analysis is simulated.</strong> We do not scrape Reddit or private forums for this prototype.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Not affiliated with any company.</strong> All company names are used for educational/demo purposes under fair use.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Future Vision */}
                    <div className="bg-muted p-8 rounded-xl">
                        <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">What Could This Become?</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            If Off-Radar were a real product, it could:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Aggregate anonymized data from real students via opt-in submissions</li>
                            <li>Use NLP to summarize public sentiment from verified sources (with proper attribution)</li>
                            <li>Partner with colleges for placement transparency initiatives</li>
                            <li>Build a community-driven knowledge base (similar to Glassdoor, but student-focused)</li>
                            <li>Provide personalized recommendations based on individual career goals</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-4">
                            <strong className="text-foreground">For now, this is a concept demo.</strong> Treat it as a prototype, not a production tool.
                        </p>
                    </div>

                    {/* Contact / Feedback */}
                    <div className="bg-muted p-8 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground">
                            Have feedback or want to contribute to this vision?
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            This is a hackathon project. No data is collected or stored.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
