"use client";

import Link from "next/link";
import { Radar, Sun, Moon, DollarSign, Zap, Target } from "lucide-react";
import { useTheme } from "@/store/use-theme-store";
import { useUserStore } from "@/store/use-user-store";

export default function LandingPage() {
    const { theme, toggleTheme } = useTheme();
    const userCount = useUserStore(state => state.getUserCount());

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Navigation */}
            <header className="px-6 lg:px-12 h-16 flex items-center bg-background">
                <Link className="flex items-center gap-2 font-bold text-xl" href="/">
                    <Radar className="w-6 h-6" />
                    <span className="font-heading font-bold text-foreground">Off-Radar</span>
                </Link>
                <nav className="ml-auto flex items-center gap-6">
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/about">
                        About Us
                    </Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/compare">
                        Compare Offers
                    </Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/contact">
                        Contact
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md hover:bg-muted transition-colors"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Moon className="w-5 h-5 text-muted-foreground" />
                        )}
                    </button>
                    <Link href="/login">
                        <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Log in
                        </span>
                    </Link>
                    <Link href="/companies">
                        <button className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors">
                            Join Community
                        </button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-20 md:py-28 lg:py-36">
                    <div className="container px-6 md:px-12 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center space-y-8 text-center">
                            {/* Badge with Live User Count */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-muted rounded-full text-sm">
                                <span className="text-purple-600 font-semibold">{userCount.toLocaleString()}+</span>
                                <span className="text-muted-foreground">Students on Off-Radar</span>
                            </div>

                            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
                                Career decisions<br />
                                made clearer with<br />
                                <span className="text-muted-foreground">honest data</span>
                            </h1>

                            <p className="text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed">
                                Use Off-Radar as your career ally, not a replacement. Instantly compare internship offers,
                                salary breakdowns, and company trade-offs—all in minutes.
                            </p>

                            <div className="flex gap-4 mt-4">
                                <Link href="/companies">
                                    <button className="px-8 py-3.5 bg-foreground text-background text-base font-medium rounded-md hover:bg-foreground/90 transition-colors">
                                        Explore Companies
                                    </button>
                                </Link>
                                <Link href="/compare">
                                    <button className="px-8 py-3.5 border border-border text-foreground text-base font-medium rounded-md hover:bg-muted transition-colors">
                                        Compare Offers
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full py-20 border-t border-border">
                    <div className="container px-6 md:px-12 max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                                    <DollarSign className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-2">Real In-Hand Salary</h3>
                                <p className="text-muted-foreground">
                                    We strip away joining bonuses, ESOPs, and retention claws to show you actual monthly take-home.
                                </p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-2">Culture Signals</h3>
                                <p className="text-muted-foreground">
                                    Detect red flags like "Hustle Culture" or "Slow Growth" from community patterns and public data.
                                </p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                                    <Target className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-2">Career Fit Score</h3>
                                <p className="text-muted-foreground">
                                    Get a personalized score based on your priorities—learning, salary, or work-life balance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-20 bg-muted">
                    <div className="container px-6 md:px-12 max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Built by students,<br />for students
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We faced the same confusion about CTC breakdowns and hidden trade-offs.
                            Off-Radar is our answer to transparent career guidance.
                        </p>
                        <Link href="/about">
                            <button className="px-8 py-3.5 bg-foreground text-background text-base font-medium rounded-md hover:bg-foreground/90 transition-colors">
                                Meet the team
                            </button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border py-8">
                <div className="container px-6 md:px-12 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">© 2024 Off-Radar. Built by students, for students.</p>
                    <nav className="flex gap-6">
                        <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/compare">
                            Compare Offers
                        </Link>
                        <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/contact">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
