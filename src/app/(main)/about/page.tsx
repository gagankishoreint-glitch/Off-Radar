"use client";

import { Target, Users, Shield, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const teamMembers = [
        { name: "Gagan Kishore B", role: "Leader", email: "gagankishoreint@gmail.com", avatar: "GB" },
        { name: "Shivani Kumari", role: "Developer", email: "shivaniikumari20@gmail.com", avatar: "SK" },
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
                <div>
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
