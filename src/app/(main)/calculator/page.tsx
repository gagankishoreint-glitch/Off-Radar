"use client";

import { useState, useMemo, useEffect } from 'react';
import { COMPANIES, Company } from '@/lib/company-data';
import { Calculator, DollarSign, Building2, Info, TrendingDown, ArrowRight, Check, AlertTriangle, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCurrencyStore } from '@/store/use-currency-store';
import { CURRENCIES, convertSalary, formatValue } from '@/lib/currency';

export default function CalculatorPage() {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
    const [ctc, setCtc] = useState<number | ''>('');
    const [bonus, setBonus] = useState<number | ''>(0);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const { currency } = useCurrencyStore();

    // Derived state
    const selectedCompany = useMemo(() =>
        COMPANIES.find(c => c.id === selectedCompanyId),
        [selectedCompanyId]);

    // Intelligent Insights Generator
    const insights = useMemo(() => {
        if (!ctc || typeof ctc !== 'number') return [];
        const msgs = [];

        // Bonus Warning
        const bonusVal = (typeof bonus === 'number') ? bonus : 0;
        if (bonusVal > (ctc * 0.2)) {
            msgs.push({
                type: 'warning',
                title: 'High Variable Component',
                text: `Your joining bonus is ${(bonusVal / ctc * 100).toFixed(0)}% of the offer. This will disappear in Year 2.`
            });
        }

        // Tier Insights
        if (selectedCompany) {
            msgs.push({
                type: 'info',
                title: `${selectedCompany.name} Tax Pattern`,
                text: `Standard ${selectedCompany.tier} Tier deductions applied (${100 - selectedCompany.salary.inHandPercent}%).`
            });
        }

        return msgs;
    }, [ctc, bonus, selectedCompany]);

    // Negotiation Tip Generator
    const negotiationTip = useMemo(() => {
        const tips = [
            "Equity is often the most negotiable part of a Tier 1 offer.",
            "Ask for a 'Relocation Bonus' if standard joining bonus is capped.",
            "Always negotiate on base salary first; it compounds with hikes.",
            "Check if the ESOP vesting schedule is back-loaded (e.g., 10-20-30-40)."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }, []);

    // Logic
    const calculateInHand = () => {
        if (!ctc || typeof ctc !== 'number') return null;

        let estimatedInHandPercent = 75; // Default fallback

        if (selectedCompany) {
            estimatedInHandPercent = selectedCompany.salary.inHandPercent;
        }

        const totalAnnual = ctc * 100000;
        const annualBonus = (bonus && typeof bonus === 'number') ? bonus * 100000 : 0;
        const recurringAnnual = Math.max(0, totalAnnual - annualBonus);

        // Core Calc
        const annualInHandFromRecurring = recurringAnnual * (estimatedInHandPercent / 100);
        const monthlyInHand = annualInHandFromRecurring / 12;

        // Bonus Taxed (30% flat assumption for safety)
        const bonusInHand = annualBonus * 0.7;
        const totalAnnualInHand = annualInHandFromRecurring + bonusInHand;

        // Reality Score: (Real Monthly * 12) / (CTC / 100000) -> Ratio of InHand vs Paper Money
        // Actually, let's use the effective percentage
        const effectivePercentage = (totalAnnualInHand / totalAnnual) * 100;

        return {
            monthly: Math.round(monthlyInHand),
            annual: Math.round(totalAnnualInHand),
            percentage: Math.round(effectivePercentage),
            isEstimate: !selectedCompany,
            baseDeduction: totalAnnual - totalAnnualInHand
        };
    };

    const result = calculateInHand();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">

                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                    >
                        <Sparkles className="w-3 h-3" />
                        Updated for 2025 Market Realities
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                        The <span className="text-primary decoration-wavy underline decoration-primary/30">Real</span> Value of Your Offer
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Don't get fooled by inflated CTC numbers. We decode the tax, ESOPs, and hidden deductions tailored to specific companies.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT PANEL: Progressive Inputs */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-border bg-muted/30">
                                <h2 className="font-bold text-lg flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-primary" />
                                    Offer Details
                                </h2>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* 1. Company Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-foreground flex justify-between">
                                        Target Company
                                        <span className="text-xs text-muted-foreground font-normal">Optional</span>
                                    </label>
                                    <div className="relative group">
                                        <select
                                            value={selectedCompanyId}
                                            onChange={(e) => setSelectedCompanyId(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Company (Auto-detects tax pattern)</option>
                                            {COMPANIES.sort((a, b) => a.name.localeCompare(b.name)).map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <Building2 className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5 group-hover:text-primary transition-colors pointer-events-none" />
                                        <ChevronRight className="w-4 h-4 text-muted-foreground absolute right-3 top-4 rotate-90 pointer-events-none" />
                                    </div>
                                    {selectedCompany && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-xs flex gap-2 items-center text-green-600 bg-green-500/10 px-3 py-2 rounded-md border border-green-500/20"
                                        >
                                            <Check className="w-3 h-3" />
                                            Active: {selectedCompany.tier} Tier Algorithm
                                        </motion.div>
                                    )}
                                </div>

                                {/* 2. CTC Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-foreground">Total CTC (LPA)</label>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            placeholder="e.g. 24.5"
                                            value={ctc}
                                            onChange={(e) => setCtc(e.target.value ? parseFloat(e.target.value) : '')}
                                            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg font-mono placeholder:text-muted-foreground/50"
                                        />
                                        <DollarSign className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5 group-hover:text-primary transition-colors pointer-events-none" />
                                    </div>
                                </div>

                                {/* 3. Bonus Input */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-foreground">Joining Bonus (LPA)</label>
                                        <div className="group relative">
                                            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                                            <div className="absolute right-0 bottom-6 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg border hidden group-hover:block z-50">
                                                One-time payments that inflate your first year CTC but disappear later.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            placeholder="e.g. 2.0"
                                            value={bonus}
                                            onChange={(e) => setBonus(e.target.value ? parseFloat(e.target.value) : '')}
                                            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono placeholder:text-muted-foreground/50"
                                        />
                                        <DollarSign className="w-5 h-5 text-muted-foreground absolute left-3 top-3.5 group-hover:text-primary transition-colors pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Intelligent Insights Cards */}
                        <AnimatePresence>
                            {insights.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={cn(
                                        "p-4 rounded-xl border flex gap-3 text-sm",
                                        msg.type === 'warning' ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400" : "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
                                    )}
                                >
                                    {msg.type === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <Info className="w-5 h-5 shrink-0" />}
                                    <div>
                                        <p className="font-bold">{msg.title}</p>
                                        <p className="opacity-90">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT PANEL: Dynamic Result Card */}
                    <div className="lg:col-span-7">
                        <div className={cn(
                            "relative overflow-hidden rounded-2xl transition-all duration-500 min-h-[500px] flex flex-col shadow-xl",
                            result
                                ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
                                : "bg-muted border border-border text-muted-foreground"
                        )}>

                            {/* Empty State */}
                            {!result && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center mb-6">
                                        <Calculator className="w-10 h-10 opacity-40" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">Awaiting Inputs</h3>
                                    <p className="text-muted-foreground max-w-sm">Enter your offer details on the left to generate the reality check breakdown.</p>
                                </div>
                            )}

                            {/* Result State */}
                            {result && (
                                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">

                                    {/* Monthly Hero */}
                                    <div className="mb-12">
                                        <div className="flex items-center gap-3 mb-2 text-white/60">
                                            <span className="uppercase tracking-wider text-xs font-bold">Real Monthly In-Hand</span>
                                            <div className="h-px bg-white/20 flex-1"></div>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-6xl md:text-7xl font-bold tracking-tight">
                                                {currency === 'INR'
                                                    ? `₹${(result.monthly / 1000).toLocaleString('en-IN', { maximumFractionDigits: 1 })}k`
                                                    : formatValue(result.monthly * CURRENCIES[currency].rate, currency)
                                                }
                                            </span>
                                            <span className="text-xl text-white/40">/ mo</span>
                                        </div>
                                    </div>

                                    {/* Reality Score Bar */}
                                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 mb-8">
                                        <div className="flex justify-between items-end mb-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-wider font-bold text-white/60 mb-1">Reality Score</p>
                                                <p className="text-2xl font-bold">
                                                    {result.percentage}% <span className="text-sm font-normal text-white/40">Efficiency</span>
                                                </p>
                                            </div>
                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-xs font-bold uppercase",
                                                result.percentage > 70 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                                            )}>
                                                {result.percentage > 70 ? "Healthy Offer" : "Inflated CTC"}
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${result.percentage}%` }}
                                                transition={{ duration: 1, ease: 'easeOut' }}
                                                className={cn(
                                                    "h-full rounded-full",
                                                    result.percentage > 70 ? "bg-green-500" : "bg-red-500"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Analysis Grid */}
                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <p className="text-xs text-white/50 mb-1">Annual Take Home</p>
                                            <p className="text-lg font-semibold">{convertSalary(result.annual / 100000, currency)}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <p className="text-xs text-white/50 mb-1">Total Deductions</p>
                                            <p className="text-lg font-semibold text-red-300">- {convertSalary(result.baseDeduction / 100000, currency)}</p>
                                        </div>
                                    </div>

                                    {/* Negotiation Tip Area */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <div className="flex gap-3">
                                            <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Negotiation Pro-Tip</span>
                                                <p className="text-sm text-white/80 mt-1 italic">"{negotiationTip}"</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* Background Decorations */}
                            {result && (
                                <>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
                                </>
                            )}
                        </div>

                        {/* Methodology Link */}
                        <div className="text-center mt-6">
                            <Link href="/transparency" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Info className="w-4 h-4" />
                                How do we calculate this?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
