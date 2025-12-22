"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDocumentStore } from '@/store/use-document-store';
import { generateRealityPage } from '@/lib/reality-engine';
import { Offer } from '@/types/off-radar';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { Radar, ArrowRight, Search, Check } from 'lucide-react';
import { COMPANIES } from '@/lib/company-data';
import { cn } from '@/lib/utils';

export default function ComparePage() {
    const router = useRouter();
    const createDocument = useDocumentStore((state) => state.createDocument);
    const updateDocument = useDocumentStore((state) => state.updateDocument);

    const [offerA, setOfferA] = useState<Partial<Offer>>({ company: '', ctc: 0 });
    const [offerB, setOfferB] = useState<Partial<Offer>>({ company: '', ctc: 0 });

    const handleRunAnalysis = () => {
        const fullOfferA = { ...offerA, id: 'a' } as Offer;
        const fullOfferB = { ...offerB, id: 'b' } as Offer;
        const blocks = generateRealityPage(fullOfferA, fullOfferB);
        const title = `${fullOfferA.company} vs ${fullOfferB.company}`;
        const docId = createDocument(title);
        updateDocument(docId, { blocks });
        // Redirect directly to the comparison document instead of dashboard
        router.push(`/app/${docId}`);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="mb-8 flex flex-col items-center gap-2">
                <Link href="/" className="p-3 bg-foreground rounded-full text-background hover:bg-foreground/90 transition-colors">
                    <Radar className="w-8 h-8" />
                </Link>
                <h1 className="text-3xl font-bold">Off-Radar Comparison</h1>
                <p className="text-gray-500">Paste your offers. We will tell you the truth.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Offer A */}
                <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-lg font-bold mb-4">Offer A (The Safe Choice?)</h2>
                    <div className="space-y-4 relative">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Company Name</label>
                            <div className="relative group">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input
                                    className="w-full pl-10 p-3 bg-secondary rounded border border-input focus:ring-2 focus:ring-ring outline-none transition-all"
                                    placeholder="Search companies (e.g. Google)..."
                                    value={offerA.company || ''}
                                    onChange={e => setOfferA({ ...offerA, company: e.target.value })}
                                    list="companies-list"
                                />
                            </div>
                            {/* Simple HTML datalist for autocomplete - native and accessible */}
                            <datalist id="companies-list">
                                {COMPANIES.map(c => (
                                    <option key={c.id} value={c.name} />
                                ))}
                            </datalist>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Total CTC (₹ LPA)</label>
                            <input
                                className="w-full p-3 bg-secondary rounded border border-input focus:ring-2 focus:ring-ring outline-none"
                                placeholder="e.g. 1800000"
                                type="number"
                                onChange={e => setOfferA({ ...offerA, ctc: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>

                {/* Offer B */}
                <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border">
                    <h2 className="text-lg font-bold mb-4">Offer B (The Moonshot?)</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Company Name</label>
                            <div className="relative group">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <input
                                    className="w-full pl-10 p-3 bg-secondary rounded border border-input focus:ring-2 focus:ring-ring outline-none transition-all"
                                    placeholder="Search companies (e.g. Amazon)..."
                                    value={offerB.company || ''}
                                    onChange={e => setOfferB({ ...offerB, company: e.target.value })}
                                    list="companies-list"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Total CTC (₹ LPA)</label>
                            <input
                                className="w-full p-3 bg-secondary rounded border border-input focus:ring-2 focus:ring-ring outline-none"
                                placeholder="e.g. 2400000"
                                type="number"
                                onChange={e => setOfferB({ ...offerB, ctc: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <Button size="lg" className="mt-8 px-8 bg-foreground text-background hover:bg-foreground/90" onClick={handleRunAnalysis}>
                Run Reality Check <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    );
}
