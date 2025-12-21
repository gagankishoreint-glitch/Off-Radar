"use client";

import { useState, useMemo } from 'react';
import { COMPANIES, Company } from '@/lib/company-data';
import { Calculator, DollarSign, Building2, Info, TrendingDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
    const [ctc, setCtc] = useState<number | ''>('');
    const [bonus, setBonus] = useState<number | ''>(0);

    // Derived state
    const selectedCompany = useMemo(() =>
        COMPANIES.find(c => c.id === selectedCompanyId),
        [selectedCompanyId]);

    // Logic
    const calculateInHand = () => {
        if (!ctc || typeof ctc !== 'number') return null;

        let estimatedInHandPercent = 75; // Default fallback (standard Tier 1/2)

        if (selectedCompany) {
            estimatedInHandPercent = selectedCompany.salary.inHandPercent;
        } else {
            // Smart defaults if no company selected but user might know tier... 
            // For now, let's stick to a safe 70-75% range for generic engineering roles
            // allowing user to override would be next level, but let's keep it simple first.
        }

        const totalAnnual = ctc * 100000; // Convert LPA to absolute
        const annualBonus = (bonus && typeof bonus === 'number') ? bonus * 100000 : 0;

        // Basic Logic:
        // 1. Remove joining bonus/relocation from recurring monthly calculation base
        // 2. Apply in-hand % to the remaining "recurring" component
        // 3. Add back prorated bonus if needed, but usually in-hand % accounts for tax+pf deductions on the *total* package in student context.
        // However, the `inHandPercent` in our data is typically "In-Hand / Total CTC".

        // Let's use the company's specific data point if available, which is trusted.
        // Formula: (CTC * inHandPercent) / 100

        const annualInHand = totalAnnual * (estimatedInHandPercent / 100);
        const monthlyInHand = annualInHand / 12;

        return {
            monthly: Math.round(monthlyInHand),
            annual: Math.round(annualInHand),
            percentage: estimatedInHandPercent,
            isEstimate: !selectedCompany
        };
    };

    const result = calculateInHand();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center gap-3 text-foreground">
                        <Calculator className="w-8 h-8" />
                        CTC Reality Calculator
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Convert misleading CTC figures into real monthly in-hand salary using our database of company compensation structures.
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* Input Section */}
                    <div className="md:col-span-7 bg-card border border-border rounded-xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
                            <Info className="w-5 h-5 text-muted-foreground" />
                            Enter Details
                        </h2>

                        <div className="space-y-6">
                            {/* Company Selector */}
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Target Company (Optional)
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCompanyId}
                                        onChange={(e) => setSelectedCompanyId(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg appearance-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all cursor-pointer text-foreground"
                                    >
                                        <option value="">Select a company...</option>
                                        {COMPANIES.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.name} ({c.tier})
                                            </option>
                                        ))}
                                    </select>
                                    <Building2 className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5 pointer-events-none" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Selecting a company applies its specific tax & deduction patterns.
                                </p>
                            </div>

                            {/* CTC Input */}
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Total CTC (in LPA)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="e.g. 18.5"
                                        value={ctc}
                                        onChange={(e) => setCtc(e.target.value ? parseFloat(e.target.value) : '')}
                                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all text-foreground"
                                    />
                                    <DollarSign className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5 pointer-events-none" />
                                </div>
                            </div>

                            {/* Bonus Input */}
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Joining/First Year Bonus (in LPA)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="e.g. 2.0"
                                        value={bonus}
                                        onChange={(e) => setBonus(e.target.value ? parseFloat(e.target.value) : '')}
                                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all text-foreground"
                                    />
                                    <DollarSign className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5 pointer-events-none" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Bonuses are often one-time and inflate the first year CTC.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="md:col-span-5 flex flex-col">
                        <div className="bg-foreground text-background rounded-xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
                            {/* Abstract Background Element */}
                            <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            {result ? (
                                <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="mb-2 text-white/70 font-medium">Monthly In-Hand</div>
                                    <div className="text-5xl font-bold mb-6">
                                        ₹{(result.monthly / 1000).toLocaleString('en-IN', { maximumFractionDigits: 1 })}k
                                    </div>

                                    <div className="space-y-4 border-t border-white/20 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/70">Annual In-Hand</span>
                                            <span className="font-semibold">₹{(result.annual / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} LPA</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/70">Reality Score</span>
                                            <span className={`font-bold px-2 py-0.5 rounded ${result.percentage > 85 ? 'bg-green-500/20 text-green-300' :
                                                    result.percentage > 70 ? 'bg-yellow-500/20 text-yellow-300' :
                                                        'bg-red-500/20 text-red-300'
                                                }`}>
                                                {result.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    {result.isEstimate && (
                                        <div className="mt-6 p-3 bg-white/10 rounded-lg text-xs text-white/80 flex gap-2">
                                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>
                                                Using standard market estimate (75%). Select a specific company for higher accuracy.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center text-white/40 z-10">
                                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Enter CTC details to see the breakdown</p>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="mt-4 bg-muted border border-border rounded-xl p-6">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <TrendingDown className="w-4 h-4" />
                                Why is it lower?
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Companies inflate CTC with ESOPs, Joining Bonuses, Gratuity, and Employer PF contribution.
                            </p>
                            <Link href="/transparency" className="text-sm font-medium text-foreground hover:underline flex items-center gap-1">
                                Read our methodology <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
