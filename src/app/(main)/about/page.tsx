"use client";

import { Target, Users, Shield, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const teamMembers = [
        { name: "Gagan Kishore B", role: "Leader", email: "gagankishoreint@gmail.com", avatar: "GB" },
        { name: "Kushal Mohan", role: "Developer", email: "kushalmohan0512@gmail.com", avatar: "KM" },
        { name: "Dev Parvathareddy", role: "Developer", email: "devparvathareddy@gmail.com", avatar: "DP" }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                        About Off-Radar
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        A student-built decision intelligence platform to help you make better career choices.
                    </p>
                </div>

                {/* Mission Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 rounded-xl bg-background border border-border">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">Our Mission</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Cut through corporate marketing and show students the real trade-offs behind every offer.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-background border border-border">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">Active Users</h3>
                        <p className="text-4xl font-heading font-bold text-foreground mb-2">2,500+</p>
                        <p className="text-muted-foreground">
                            Students making informed decisions
                        </p>
                    </div>

                    <div className="p-8 rounded-xl bg-background border border-border">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">100% Transparent</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            All methodology is open. No hidden algorithms or biased rankings.
                        </p>
                    </div>
                </div>

                {/* Why We Built This */}
                <div className="bg-muted p-10 md:p-12 rounded-xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                        Why We Built Off-Radar
                    </h2>
                    <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            As Indian engineering students, we faced the same confusion you do: <strong className="text-foreground">CTC numbers that don't match reality, "culture fit" that means nothing, and salary breakdowns that hide the truth.</strong>
                        </p>
                        <p>
                            Existing platforms either sugarcoat everything or drown you in data. We wanted something honest, analytical, and built for students who care about their long-term trajectory—not just the highest package.
                        </p>
                        <p>
                            <strong className="text-foreground">Off-Radar is our answer:</strong> a no-BS comparison tool that shows you the in-hand salary, work-life reality, learning potential, and hidden red flags of any offer.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-foreground">
                        Meet the Team
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-8 bg-background rounded-xl border border-border hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-bold text-xl mb-4">
                                    {member.avatar}
                                </div>
                                <h3 className="font-heading font-semibold text-lg mb-1 text-foreground">{member.name}</h3>
                                <p className="text-sm text-muted-foreground font-medium mb-3">{member.role}</p>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                                >
                                    <Mail className="w-3 h-3" />
                                    {member.email}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-muted p-10 md:p-12 rounded-xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground text-center">
                        Get in Touch
                    </h2>
                    <p className="text-center text-muted-foreground mb-8">
                        Have questions or want to contribute? Reach out to the project lead.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://www.linkedin.com/in/gagankishore"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </Link>
                            <Link
                                href="https://github.com/gagankishoreint-glitch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                                GitHub
                            </Link>
                        </div>
                        <a
                            href="mailto:gagankishoreint@gmail.com"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            gagankishoreint@gmail.com
                        </a>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link href="/companies">
                        <button className="px-8 py-3.5 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors">
                            Explore Companies
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
