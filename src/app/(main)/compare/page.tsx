"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDocumentStore } from '@/store/use-document-store';
import { generateRealityPage } from '@/lib/reality-engine';
import { Offer, OfferPriorities } from '@/types/off-radar';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { Radar, ArrowRight, Search, Check, TrendingUp, ShieldCheck, Banknote, Briefcase } from 'lucide-react';
import { COMPANIES } from '@/lib/company-data';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { useCurrencyStore } from '@/store/use-currency-store';
import { CURRENCIES, CurrencyCode } from '@/lib/currency';
import { getRolesForCompany, getInternRolesForCompany } from '@/lib/role-utils';

const DEFAULT_OFFER: Partial<Offer> = {
    company: '',
    ctc: 0,
    role: '',
    location: '',
    experienceLevel: '0-2',
    hasBonus: false,
    workMode: 'hybrid',
    type: 'fte'
};

const DEFAULT_PRIORITIES: OfferPriorities = {
    money: 50,
    learning: 50,
    wlb: 50,
    brand: 50,
    stability: 50
};

const getDynamicLabel = (offer: Partial<Offer>, defaultLabel: string) => {
    if (!offer.company) return defaultLabel;
    const company = COMPANIES.find(c => c.name.toLowerCase() === offer.company?.toLowerCase());

    if (company?.tier === 'Tier 1') return 'Brand Heavy';
    if (company?.companyType === 'Startup') return 'High Growth / High Risk';
    if (company?.companyType === 'Service') return 'Stable Enterprise';
    if ((offer.ctc || 0) > 30) return 'Cash Heavy';

    return defaultLabel;
};

const OfferInputCard = ({
    label,
    offer,
    setOffer,
    defaultLabel,
    currency
}: {
    label: string,
    offer: Partial<Offer>,
    setOffer: (o: Partial<Offer>) => void,
    defaultLabel: string,
    currency: CurrencyCode
}) => {
    const dynamicLabel = getDynamicLabel(offer, defaultLabel);
    const symbol = CURRENCIES[currency]?.symbol || currency;

    return (
        <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{label}</h2>
                <span className="text-xs font-medium px-2 py-1 bg-muted rounded text-muted-foreground uppercase tracking-wide">
                    {dynamicLabel}
                </span>
            </div>

            <div className="space-y-4">
                {/* C1: Company & Role */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Company</label>
                        <div className="relative group">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                                className="w-full pl-9 p-2.5 bg-secondary/50 rounded-md border border-input text-sm"
                                placeholder="e.g. Google"
                                value={offer.company || ''}
                                onChange={e => setOffer({ ...offer, company: e.target.value })}
                                list="companies-list"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Role / Level</label>
                        {(() => {
                            const selectedCompany = COMPANIES.find(c => c.name.toLowerCase() === offer.company?.toLowerCase());
                            const availableRoles = selectedCompany ? getRolesForCompany(selectedCompany) : [];

                            if (!offer.company || availableRoles.length === 0) {
                                return (
                                    <input
                                        className="w-full p-2.5 bg-secondary/50 rounded-md border border-input text-sm"
                                        placeholder={offer.company ? "e.g. SDE-1" : "Select company first"}
                                        value={offer.role || ''}
                                        onChange={e => setOffer({ ...offer, role: e.target.value })}
                                        disabled={!offer.company}
                                    />
                                );
                            }

                            return (
                                <select
                                    className="w-full p-2.5 bg-secondary/50 rounded-md border border-input text-sm cursor-pointer"
                                    value={offer.role || ''}
                                    onChange={e => setOffer({ ...offer, role: e.target.value })}
                                >
                                    <option value="">Select Role</option>
                                    {availableRoles.map(r => (
                                        <option key={r.role} value={r.role}>
                                            {r.role} ({r.level})
                                        </option>
                                    ))}
                                </select>
                            );
                        })()}
                    </div>
                </div>

                {/* C2: CTC & Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Total CTC ({currency === 'INR' ? 'LPA' : currency})</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-xs font-bold text-muted-foreground">{symbol}</span>
                            <input
                                className="w-full pl-7 p-2.5 bg-secondary/50 rounded-md border border-input text-sm font-medium"
                                placeholder="18.5"
                                type="number"
                                value={offer.ctc || ''}
                                onChange={e => setOffer({ ...offer, ctc: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                        <input
                            className="w-full p-2.5 bg-secondary/50 rounded-md border border-input text-sm"
                            placeholder="e.g. Bangalore"
                            value={offer.location || ''}
                            onChange={e => setOffer({ ...offer, location: e.target.value })}
                        />
                    </div>
                </div>

                {/* C3: Experience & Bonus Toggle */}
                <div className="grid grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Exp. Level</label>
                        <select
                            className="w-full p-2.5 bg-secondary/50 rounded-md border border-input text-sm"
                            value={offer.experienceLevel}
                            onChange={e => setOffer({ ...offer, experienceLevel: e.target.value })}
                        >
                            <option value="0-2">0-2 Years</option>
                            <option value="2-5">2-5 Years</option>
                            <option value="5+">5+ Years</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-secondary/30 rounded-md border border-dashed">
                        <label className="text-xs text-muted-foreground font-medium">Includes Bonus/ESOP?</label>
                        <button
                            onClick={() => setOffer({ ...offer, hasBonus: !offer.hasBonus })}
                            className={cn(
                                "w-12 h-6 rounded-full transition-colors relative flex items-center",
                                offer.hasBonus ? "bg-green-500" : "bg-muted-foreground/30"
                            )}
                        >
                            <span className={cn(
                                "w-4 h-4 rounded-full bg-white shadow-sm absolute transition-transform",
                                offer.hasBonus ? "translate-x-7" : "translate-x-1"
                            )} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PrioritySlider = ({ label, value, onChange, icon: Icon, color }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2 font-medium text-muted-foreground">
                <Icon className={cn("w-4 h-4", color)} /> {label}
            </span>
            <span className="font-bold text-foreground">{value}%</span>
        </div>
        <Slider
            value={[value]}
            onValueChange={(v) => onChange(v[0])}
            max={100}
            step={10}
            className="py-1"
        />
    </div>
);

export default function ComparePage() {
    const router = useRouter();
    const createDocument = useDocumentStore((state) => state.createDocument);
    const updateDocument = useDocumentStore((state) => state.updateDocument);
    const { currency } = useCurrencyStore();

    const [offerA, setOfferA] = useState<Partial<Offer>>({ ...DEFAULT_OFFER });
    const [offerB, setOfferB] = useState<Partial<Offer>>({ ...DEFAULT_OFFER });
    const [priorities, setPriorities] = useState<OfferPriorities>(DEFAULT_PRIORITIES);

    const handleRunAnalysis = () => {
        const fullOfferA = { ...offerA, id: 'a' } as Offer;
        const fullOfferB = { ...offerB, id: 'b' } as Offer;

        // Pass priorities to the engine (we'll update generateRealityPage signature next)
        const blocks = generateRealityPage(fullOfferA, fullOfferB, priorities);
        const title = `${fullOfferA.company} vs ${fullOfferB.company}`;
        const docId = createDocument(title);
        updateDocument(docId, { blocks });
        router.push(`/app/${docId}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
            <div className="mb-8 flex flex-col items-center gap-2 text-center max-w-xl">
                <Link href="/" className="p-3 bg-foreground rounded-full text-background hover:bg-foreground/90 transition-colors mb-2">
                    <Radar className="w-8 h-8" />
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Offer Comparison 2.0</h1>
                <p className="text-muted-foreground text-lg">
                    Make the decision you won’t regret in 3 years.
                </p>
                <div className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800 mt-2">
                    ✨ AI Benchmarked to 2025 Market Standards
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
                <OfferInputCard
                    label="Offer A"
                    defaultLabel="Safe Choice"
                    offer={offerA}
                    setOffer={setOfferA}
                    currency={currency}
                />
                <OfferInputCard
                    label="Offer B"
                    defaultLabel="Moonshot"
                    offer={offerB}
                    setOffer={setOfferB}
                    currency={currency}
                />
            </div>

            <datalist id="companies-list">
                {COMPANIES.map(c => (
                    <option key={c.id} value={c.name} />
                ))}
            </datalist>

            {/* Priority Sliders Section */}
            <div className="w-full max-w-3xl bg-secondary/20 border border-border rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    What matters to YOU? <span className="text-sm font-normal text-muted-foreground">(Affects Verdict)</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    <PrioritySlider
                        label="Money (In-hand)"
                        value={priorities.money}
                        onChange={(v: number) => setPriorities({ ...priorities, money: v })}
                        icon={Banknote}
                        color="text-green-500"
                    />
                    <PrioritySlider
                        label="Learning & Growth"
                        value={priorities.learning}
                        onChange={(v: number) => setPriorities({ ...priorities, learning: v })}
                        icon={TrendingUp}
                        color="text-blue-500"
                    />
                    <PrioritySlider
                        label="Work-Life Balance"
                        value={priorities.wlb}
                        onChange={(v: number) => setPriorities({ ...priorities, wlb: v })}
                        icon={ShieldCheck}
                        color="text-orange-500"
                    />
                    <PrioritySlider
                        label="Brand Value"
                        value={priorities.brand}
                        onChange={(v: number) => setPriorities({ ...priorities, brand: v })}
                        icon={Briefcase}
                        color="text-purple-500"
                    />
                </div>
            </div>

            <Button
                size="lg"
                className="px-12 py-6 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                onClick={handleRunAnalysis}
                disabled={!offerA.company || !offerB.company || !offerA.ctc || !offerB.ctc}
            >
                Run Reality Check <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-xs text-muted-foreground mt-4 text-center max-w-md">
                We analyze base pay, ESOPs, career trajectory, and hidden regrets based on community data.
            </p>
        </div>
    );
}
