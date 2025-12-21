"use client";

import { COMPANIES, TIER_TOOLTIPS } from '@/lib/company-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, TrendingUp, Clock, GraduationCap, Briefcase, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CompanyDetailPage() {
    const params = useParams();
    const id = params?.id as string;

    const company = COMPANIES.find(c => c.id === id);

    if (!company) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-background">
                <h1 className="text-2xl font-bold mb-4 text-foreground">Company Not Found</h1>
                <Link href="/companies"><Button>Go Back</Button></Link>
            </div>
        );
    }

    const getWLBStyle = (wlb: string) => {
        switch (wlb) {
            case 'Green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Red': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const getTierStyle = (tier: string) => {
        switch (tier) {
            case 'Tier 1': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Tier 2': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Tier 3': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const getDifficultyStyle = (difficulty: string) => {
        switch (difficulty) {
            case 'Hard': return 'text-red-600 dark:text-red-400';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
            case 'Easy': return 'text-green-600 dark:text-green-400';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">
                <Link href="/companies" className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Companies
                </Link>

                {/* Header Card */}
                <div className="bg-card border border-border rounded-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${getTierStyle(company.tier)}`}
                                    title={TIER_TOOLTIPS[company.tier]}
                                >
                                    {company.tier}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {company.majors.map(m => (
                                    <span key={m} className="px-3 py-1 bg-foreground/10 text-foreground text-sm rounded-full font-medium">
                                        {m}
                                    </span>
                                ))}
                                {company.internFriendly && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm rounded-full">
                                        Intern Friendly
                                    </span>
                                )}
                            </div>

                            <p className="text-muted-foreground text-lg">{company.description}</p>
                        </div>

                        {/* Salary Card */}
                        <div className="bg-muted/50 rounded-xl p-6 text-center shrink-0 min-w-[200px]">
                            <div className="text-3xl font-bold text-foreground mb-1">
                                ₹{company.salary.minLPA} - {company.salary.maxLPA} LPA
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">
                                ~{company.salary.inHandPercent}% in-hand monthly
                            </div>
                            <div className="text-xs text-muted-foreground">
                                ≈ ₹{Math.round(company.salary.minLPA * 100000 * (company.salary.inHandPercent / 100) / 12 / 1000)}k - ₹{Math.round(company.salary.maxLPA * 100000 * (company.salary.inHandPercent / 100) / 12 / 1000)}k/month
                            </div>
                        </div>
                    </div>

                    {/* Quick Info Row */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {company.location}
                        </span>
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="w-4 h-4" />
                            {company.companyType}
                        </span>
                        <span className={`flex items-center gap-2 ${getDifficultyStyle(company.difficulty)}`}>
                            <TrendingUp className="w-4 h-4" />
                            {company.difficulty} to crack
                        </span>
                        <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${getWLBStyle(company.culture.wlb)}`}>
                            <Clock className="w-4 h-4" />
                            WLB: {company.culture.wlb}
                        </span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Domains */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                            Domains
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {company.domains.map(d => (
                                <span key={d} className="px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Role Types */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            Role Types
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {company.roleTypes.map(r => (
                                <span key={r} className="px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                                    {r}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Culture */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            Culture
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Work-Life Balance</span>
                                <span className={`px-3 py-1 rounded-full text-sm ${getWLBStyle(company.culture.wlb)}`}>
                                    {company.culture.wlb}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Learning Opportunities</span>
                                <span className="text-foreground font-medium">{company.culture.learning}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-muted-foreground" />
                            Quick Stats
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Difficulty Level</span>
                                <span className={`font-medium ${getDifficultyStyle(company.difficulty)}`}>
                                    {company.difficulty}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Intern Friendly</span>
                                <span className="text-foreground font-medium">
                                    {company.internFriendly ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Join */}
                {company.whyJoin && company.whyJoin.length > 0 && (
                    <div className="bg-card border border-border rounded-xl p-6 mb-8">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-muted-foreground" />
                            Why Join {company.name}?
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                            {company.whyJoin.map((reason, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span className="text-muted-foreground">{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Deep Dive Analysis (New Section) */}
                {company.detailedAnalysis && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                            🔍 Deep Dive Analysis
                        </h3>

                        {company.detailedAnalysis.highlight && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8 italic text-muted-foreground">
                                "{company.detailedAnalysis.highlight}"
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Pros */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h4 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                                    ✅ The Good
                                </h4>
                                <ul className="space-y-3">
                                    {company.detailedAnalysis.pros.map((item, i) => (
                                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Cons */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                                    ❌ The Bad
                                </h4>
                                <ul className="space-y-3">
                                    {company.detailedAnalysis.cons.map((item, i) => (
                                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Recent Developments */}
                        <div className="mt-8 bg-card border border-border rounded-xl p-6">
                            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                ⚡ Application Strategy (2024-25)
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                                {company.detailedAnalysis.recentDevelopments.map((item, i) => (
                                    <div key={i} className="bg-muted p-4 rounded-lg text-sm">
                                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground block mb-1">$1</strong>') }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center">
                    <Link href="/companies">
                        <Button variant="outline" className="mr-4">
                            Browse More Companies
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
