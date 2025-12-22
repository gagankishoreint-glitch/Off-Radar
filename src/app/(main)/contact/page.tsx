"use client";

import { Mail, MessageSquare, Send, Github, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const teamLeader = {
        name: "Gagan Kishore B",
        role: "Leader",
        email: "gagankishoreint@gmail.com",
        linkedin: "https://www.linkedin.com/in/gagankishore",
        github: "https://github.com/gagankishoreint-glitch"
    };

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

                {/* Team Contact Card */}
                <div className="mb-12">
                    <div className="grid sm:grid-cols-1 gap-6 max-w-2xl mx-auto">
                        <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-8 h-8 text-primary" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-heading font-bold text-foreground">
                                            {teamLeader.name}
                                        </h3>
                                        <p className="text-primary font-medium">
                                            {teamLeader.role}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={`mailto:${teamLeader.email}`}
                                            className="inline-flex items-center justify-center md:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors font-medium bg-muted/50 px-4 py-2 rounded-lg"
                                        >
                                            <Send className="w-4 h-4" />
                                            {teamLeader.email}
                                        </a>

                                        <div className="flex justify-center md:justify-start items-center gap-3 mt-2">
                                            <a
                                                href={teamLeader.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-[#0077b5]/10 text-[#0077b5] dark:text-[#0077b5] rounded-lg hover:bg-[#0077b5]/20 transition-colors font-semibold"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn
                                            </a>
                                            <a
                                                href={teamLeader.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-semibold"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
