"use client";

import { Mail, MessageSquare, Send, Github, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const teamMembers = [
        {
            name: "Gagan Kishore B",
            role: "Leader",
            email: "gagankishoreint@gmail.com",
            linkedin: "https://www.linkedin.com/in/gagankishore",
            github: "https://github.com/gagankishoreint-glitch",
            avatar: "GB"
        },
        {
            name: "Kushal Mohan",
            role: "Developer",
            email: "kushalmohan0512@gmail.com",
            avatar: "KM"
        },
        {
            name: "Dev Parvathareddy",
            role: "Developer",
            email: "devparvathareddy@gmail.com",
            avatar: "DP"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Have questions, feedback, or suggestions? We'd love to hear from you.
                    </p>
                </div>

                {/* Team Contact Cards */}
                <div className="mb-12">
                    <div className="grid md:grid-cols-3 gap-6">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center font-heading font-bold text-xl">
                                        {member.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-primary font-medium text-sm mb-3">
                                            {member.role}
                                        </p>
                                    </div>

                                    <a
                                        href={`mailto:${member.email}`}
                                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium bg-muted/50 px-4 py-2 rounded-lg w-full justify-center"
                                    >
                                        <Send className="w-4 h-4" />
                                        {member.email}
                                    </a>

                                    {member.linkedin && member.github && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <a
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-[#0077b5]/10 text-[#0077b5] rounded-lg hover:bg-[#0077b5]/20 transition-colors font-semibold"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn
                                            </a>
                                            <a
                                                href={member.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-semibold"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        </div>
                                    )}
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
                        We Typically respond within <strong className="text-foreground">24-48 hours</strong>. For urgent matters, please mention "URGENT" in your email subject line.
                    </p>
                </div>
            </div>
        </div>
    );
}
