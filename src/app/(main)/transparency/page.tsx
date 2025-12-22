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
                                    Off-Radar is a <strong className="text-foreground">decision intelligence engine</strong> designed for engineering students to evaluate offers beyond just the CTC.
                                    We decode the <strong className="text-foreground">real trade-offs, hidden costs, and career velocity</strong> that standard job portals miss.
                                </p>
                                <p className="text-muted-foreground">
                                    Built on the principles of <strong className="text-foreground">radical transparency</strong>, we aggregate fragmented community signals into a coherent strategic view.
                                    Our goal is to give you the leverage of a senior engineer when making your first career decision.
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
                                        <h3 className="font-semibold text-foreground mb-2">Community-Verified Benchmarks</h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li>Compensation data calibrated against verified sources (Levels.fyi, Blind)</li>
                                            <li>In-hand salary modeling based on standard tax regimes and EPF structures</li>
                                            <li>Industry-standard PPO conversion trends for each tier</li>
                                            <li>Career growth velocity indices derived from alumni trajectories</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-foreground mb-2">Strategic Market Intelligence</h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li>Team-specific cultural signals (e.g., "High-performance pressure vs. R&D pace")</li>
                                            <li>Resume impact scoring based on recruiter heuristics</li>
                                            <li>Risk assessment models for startups vs. established MNCs</li>
                                            <li>Recurrent feedback patterns from public engineering forums</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-muted p-4 rounded-lg mt-6">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">Our Philosophy:</strong> Inspired by trusted public sources like Levels.fyi — built for decision-making, not just raw numbers.
                                        We synthesize thousands of public data points to interpret the <em>quality</em> of an offer, not just the quantity.
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
                                            A proprietary weighted index comprising:
                                        </p>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li><strong className="text-foreground">Financial Health</strong> (30%): Adjusted Purchasing Power Parity (PPP) and savings potential.</li>
                                            <li><strong className="text-foreground">Learning Velocity</strong> (35%): Assessment of engineering culture and shipping pace.</li>
                                            <li><strong className="text-foreground">Market Sustainability</strong> (20%): Company runway and layoff risk factors.</li>
                                            <li><strong className="text-foreground">Brand Equity</strong> (15%): Long-term resume value and alumni network strength.</li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-semibold mb-2 text-foreground">Advanced Salary Modeling</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We look beyond the CTC. Our <code className="bg-background px-1 rounded">Real-In-Hand™</code> engine accounts for:
                                            Variable pay cliffs, Joining bonus clawbacks, Standard deductions (PF, PT), and Tier-1 city living costs.
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
                                <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">Data Integrity & Disclaimers</h2>

                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                                    <li>
                                        <strong className="text-foreground">Directional Accuracy.</strong> While our models are rigorously calibrated, individual offers may vary based on team, location, and negotiation leverage.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Decision Support.</strong> Off-Radar is a data analytics tool, not a certified financial or career advisor.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Generalized Insights.</strong> "Company Culture" is aggregate. Your specific team experience may differ significantly.
                                    </li>
                                    <li>
                                        <strong className="text-foreground">Fair Use.</strong> All company names and logos are used for educational and comparative purposes.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Future Vision */}
                    <div className="bg-background p-8 rounded-xl border border-dashed border-border">
                        <h2 className="text-xl font-heading font-semibold mb-4 text-foreground">The Roadmap</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            We are building the future of student career transparency:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Verified alumni mentorship connections</li>
                            <li>Real-time offer letter decoding (OCR)</li>
                            <li>Campus-specific placement archives</li>
                            <li>Anonymous salary submission & verification system</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
