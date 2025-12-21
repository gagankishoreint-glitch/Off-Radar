"use client";

import { Mail, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const teamMembers = [
        { name: "Gagan Kishore B", role: "Leader", email: "gagankishoreint@gmail.com" },
        { name: "Shivani Kumari", role: "Developer", email: "shivaniikumari20@gmail.com" },
        { name: "Kushal Mohan", role: "Developer", email: "kushalmohan0512@gmail.com" },
        { name: "Dev Parvathareddy", role: "Developer", email: "devparvathareddy@gmail.com" }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Have questions, feedback, or suggestions? We'd love to hear from you.
                    </p>
                </div>

                {/* Team Contact Cards */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-semibold mb-8 text-foreground">
                        Our Team
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-heading font-semibold mb-1 text-foreground">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium mb-3">
                                            {member.role}
                                        </p>
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors break-all"
                                        >
                                            <Send className="w-4 h-4 flex-shrink-0" />
                                            {member.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feedback Card */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-semibold mb-8 text-foreground">
                        Share Feedback
                    </h2>
                    <div className="p-8 rounded-xl bg-muted">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                                    Help Us Improve
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Your feedback helps us make Off-Radar better. Share:
                                </p>
                                <ul className="text-muted-foreground space-y-2">
                                    <li>• Feature requests</li>
                                    <li>• Bug reports</li>
                                    <li>• Company data corrections</li>
                                    <li>• General suggestions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-muted p-8 rounded-xl mb-12">
                    <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                        Response Time
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We're a small student team, so we typically respond within <strong className="text-foreground">24-48 hours</strong>. For urgent matters, please mention "URGENT" in your email subject line.
                    </p>
                </div>

                {/* Team Info */}
                <div className="text-center">
                    <p className="text-muted-foreground mb-6">
                        Built by students, for students. Learn more about our team:
                    </p>
                    <Link href="/about">
                        <button className="px-8 py-3.5 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors">
                            Meet the Team
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
