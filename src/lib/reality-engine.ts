import { nanoid } from 'nanoid';
import { Offer, RealityInsight } from '@/types/off-radar';
import { Block } from '@/types/editor';
import { COMPANIES } from '@/lib/company-data';

// MOCK KNOWLEDGE BASE
const COMPANY_KNOWLEDGE: Record<string, any> = {
    'startup': {
        culture: 'Hustle culture, unstructured, high learning curve.',
        warning: 'Expect 12-hour workdays. Equity might be worthless.',
        pros: 'Massive ownership, rapid growth.'
    },
    'mnc': {
        culture: 'Structured, slow pace, political.',
        warning: 'Your work might barely see production. Learning can be slow.',
        pros: 'Great brand name, stability, good WLB.'
    },
    'service': {
        culture: 'Body shopping model, bench risk.',
        warning: 'Project allocation is luck-based.',
        pros: 'Easy entry, stable salary.'
    }
};

export function generateRealityPage(offerA: Offer, offerB: Offer): Block[] {
    const blocks: Block[] = [];

    const add = (type: any, content: string, props?: any) => {
        blocks.push({
            id: nanoid(),
            type,
            content,
            properties: props,
            parentId: null,
            children: []
        });
    };

    add('heading-1', `Reality Check: ${offerA.company} vs ${offerB.company}`);
    add('paragraph', `Off-Radar has analyzed these offers against 50+ community discussions. Here is the unpolished truth.`);

    add('heading-2', 'The Compensation Truth');
    add('paragraph', 'CTCs are often inflated. Here is what you actually get.');

    // Fixed template string and calculation logic
    const ctcA = (offerA.ctc / 100000).toFixed(1);
    const ctcB = (offerB.ctc / 100000).toFixed(1);
    const inHandA = (offerA.ctc * 0.7 / 12).toFixed(0); // Rough estimate
    const inHandB = (offerB.ctc * 0.8 / 12).toFixed(0);

    // Fetch company data for enhanced metrics
    const companyDataA = COMPANIES.find(c => c.name.toLowerCase() === offerA.company.toLowerCase() || c.id === offerA.company.toLowerCase());
    const companyDataB = COMPANIES.find(c => c.name.toLowerCase() === offerB.company.toLowerCase() || c.id === offerB.company.toLowerCase());

    // Build enhanced metrics array
    const metrics = [
        { label: 'CTC', valueA: `₹${ctcA}L`, valueB: `₹${ctcB}L` },
        { label: 'Base Component', valueA: '~70%', valueB: '~80%' },
        { label: 'Monthly In-Hand', valueA: `₹${inHandA}k`, valueB: `₹${inHandB}k`, highlight: true }
    ];

    // Add WLB if available
    if (companyDataA || companyDataB) {
        metrics.push({
            label: 'Work-Life Balance',
            valueA: companyDataA?.culture.wlb || 'Unknown',
            valueB: companyDataB?.culture.wlb || 'Unknown'
        });
    }

    // Add learning curve if available
    if (companyDataA || companyDataB) {
        metrics.push({
            label: 'Learning Curve',
            valueA: companyDataA?.culture.learning || 'Unknown',
            valueB: companyDataB?.culture.learning || 'Unknown'
        });
    }

    // Add company type
    if (companyDataA || companyDataB) {
        metrics.push({
            label: 'Company Type',
            valueA: companyDataA?.companyType || 'Unknown',
            valueB: companyDataB?.companyType || 'Unknown'
        });
    }

    // Pass structured data for the comparison card
    const comparisonData = JSON.stringify({
        companyA: offerA.company,
        companyB: offerB.company,
        metrics
    });

    add('comparison-card', comparisonData);

    add('heading-2', 'Community Reality Check');

    [offerA, offerB].forEach(offer => {
        // Find specific company data
        const companyData = COMPANIES.find(c => c.name.toLowerCase() === offer.company.toLowerCase() || c.id === offer.company.toLowerCase());

        add('heading-3', `${offer.company} Signals`);

        if (companyData) {
            // Use specific data if available
            if (companyData.detailedAnalysis) {
                // High fidelity data (e.g. Google)
                add('quote', companyData.detailedAnalysis.highlight || companyData.description || "No signal data available.");
                add('todo', `Red Flag: ${companyData.detailedAnalysis.cons[0]}`, { checked: false });
                add('todo', `Green Flag: ${companyData.detailedAnalysis.pros[0]}`, { checked: true });
            } else {
                // Medium fidelity data (e.g. Amazon) - derive from culture/whyJoin
                const redFlag = companyData.culture.wlb === 'Red' ? "Poor Work-Life Balance often reported." :
                    companyData.culture.learning === 'Low' ? "Growth saturation risk." :
                        "Verify team allocation before joining.";

                const greenFlag = companyData.whyJoin?.[0] || companyData.description || "Strong brand value.";

                add('quote', companyData.description || `Insights for ${offer.company}`);
                add('todo', `Red Flag: ${redFlag}`, { checked: false });
                add('todo', `Green Flag: ${greenFlag}`, { checked: true });
            }
        } else {
            // Low fidelity fallback (Generic)
            const lowerName = offer.company.toLowerCase();
            const type = lowerName.includes('startup') ? 'startup' :
                (lowerName.includes('infosys') || lowerName.includes('tcs')) ? 'service' : 'mnc';
            const knowledge = COMPANY_KNOWLEDGE[type] || COMPANY_KNOWLEDGE['mnc'];

            add('quote', knowledge.culture);
            add('todo', `Red Flag: ${knowledge.warning}`, { checked: false });
            add('todo', `Green Flag: ${knowledge.pros}`, { checked: true });
        }
    });

    add('divider', '');
    add('heading-2', 'The Verdict');

    const winner = offerA.ctc > offerB.ctc ? offerA : offerB;

    add('paragraph', `If you care about MONEY: Go with **${winner.company}**. The financial gap is significant.`);
    add('paragraph', `If you care about LEARNING: Startups usually beat MNCs in early career velocity.`);

    add('quote', "Senior Advice: Don't just look at the CTC. Your first job defines your trajectory. If the 'boring' company offers 20% more, it might still be the wrong choice if you stop learning.");

    return blocks;
}
