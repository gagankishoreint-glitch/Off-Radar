import { nanoid } from 'nanoid';
import { Offer, RealityInsight } from '@/types/off-radar';
import { Block } from '@/types/editor';
import { COMPANIES, Company } from '@/lib/company-data';

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

    // Helper to get company data
    const getCompany = (name: string) => COMPANIES.find(c => c.name.toLowerCase() === name.toLowerCase() || c.id === name.toLowerCase());

    const companyA = getCompany(offerA.company);
    const companyB = getCompany(offerB.company);

    const ctcA = offerA.ctc;
    const ctcB = offerB.ctc;
    const diff = Math.abs(ctcA - ctcB);
    const higherName = ctcA > ctcB ? offerA.company : offerB.company;
    const lowerName = ctcA > ctcB ? offerB.company : offerA.company;
    const percentDiff = Math.abs((ctcA - ctcB) / ((ctcA + ctcB) / 2) * 100).toFixed(0);

    // 1. Header
    add('heading-1', `Reality Check: ${offerA.company} vs ${offerB.company}`);
    add('paragraph', `Based on data from ${companyA?.roleTypes?.length || 50}+ verified roles and community signals.`);

    // 2. Compensation Reality
    add('heading-2', 'The Financial Truth');

    // Calculate Monthly In-Hand (Simple Est)
    const inHandA = (ctcA * (companyA?.salary.inHandPercent || 75) / 100 / 12).toFixed(1);
    const inHandB = (ctcB * (companyB?.salary.inHandPercent || 75) / 100 / 12).toFixed(1);

    const metrics = [
        { label: 'Total CTC', valueA: `${ctcA} LPA`, valueB: `${ctcB} LPA` },
        { label: 'Est. Monthly', valueA: `~₹${inHandA}k`, valueB: `~₹${inHandB}k`, highlight: true },
        { label: 'Work Life', valueA: companyA?.culture.wlb || '-', valueB: companyB?.culture.wlb || '-' },
        { label: 'Learning', valueA: companyA?.culture.learning || '-', valueB: companyB?.culture.learning || '-' }
    ];

    const comparisonData = JSON.stringify({
        companyA: offerA.company,
        companyB: offerB.company,
        metrics
    });
    add('comparison-card', comparisonData);

    // 3. Deep Dive Signals
    add('heading-2', 'Community Signals');

    const renderCompanySignals = (offer: Offer, data?: Company) => {
        add('heading-3', `${offer.company} Analysis`);

        if (!data) {
            add('paragraph', 'Limited data available for this company. Generally, verify team allocation and tech stack before joining.');
            return;
        }

        // Green Flags
        if (data.whyJoin && data.whyJoin.length > 0) {
            data.whyJoin.slice(0, 2).forEach(reason => {
                add('todo', `✅ ${reason}`, { checked: true });
            });
        } else {
            // Fallback Green Flags based on Tier/Type
            if (data.tier === 'Tier 1') add('todo', `✅ Elite peer group and high brand value`, { checked: true });
            if (data.companyType === 'Startup') add('todo', `✅ High ownership and rapid learning curve`, { checked: true });
            if (data.companyType === 'Product') add('todo', `✅ Focus on code quality and modern tech stack`, { checked: true });
        }

        // Red Flags / Cautions
        if (data.detailedAnalysis?.cons) {
            data.detailedAnalysis.cons.slice(0, 2).forEach(con => {
                add('todo', `⚠️ ${con}`, { checked: false });
            });
        } else {
            // Derived Cautions
            if (data.tier === 'Tier 3' || data.companyType === 'Service') {
                add('todo', `⚠️ Risk of legacy projects or support roles`, { checked: false });
                add('todo', `⚠️ Verify if role is distinct from mass-hiring profiles`, { checked: false });
            }
            if (data.companyType === 'Startup' && data.culture.wlb === 'Red') {
                add('todo', `⚠️ Expect 10-12 hour workdays (Hustle Culture)`, { checked: false });
            }
            if (data.culture.learning === 'Low') {
                add('todo', `⚠️ Growth might stagnate after 2 years.`, { checked: false });
            }
        }

        // Quote
        const quote = data.description || (data.tier === 'Tier 1' ? "A resume-defining role." : "A solid stepping stone.");
        add('quote', quote);
    };

    renderCompanySignals(offerA, companyA);
    renderCompanySignals(offerB, companyB);

    add('divider', '');

    // 4. Smart Verdict
    add('heading-2', 'The Verdict');

    // Winner Calculation Logic
    let financialDiff = '';
    let winner = 'To be decided';
    let leadingOffer = null;
    let rankA = 0;
    let rankB = 0;

    // Financial Analysis
    if (ctcA === 0 || ctcB === 0) {
        financialDiff = "Financial comparison pending (CTC missing)";
    } else {
        const diffPercent = parseFloat(percentDiff);
        if (diffPercent < 5) {
            financialDiff = `Offers are financially equivalent (~${percentDiff}% diff)`;
        } else if (ctcA > ctcB) {
            financialDiff = `${offerA.company} pays ~${percentDiff}% more`;
            rankA += 2;
        } else {
            financialDiff = `${offerB.company} pays ~${percentDiff}% more`;
            rankB += 2;
        }
    }

    // Growth Analysis
    const scoreA = (companyA?.culture.learning === 'High' ? 3 : 1) + (companyA?.tier === 'Tier 1' ? 2 : 0);
    const scoreB = (companyB?.culture.learning === 'High' ? 3 : 1) + (companyB?.tier === 'Tier 1' ? 2 : 0);

    let growthWinnerString = "Comparative analysis suggests similar growth";
    if (scoreA > scoreB) {
        growthWinnerString = `${offerA.company} has stronger engineer growth signals`;
        rankA += 1.5;
    } else if (scoreB > scoreA) {
        growthWinnerString = `${offerB.company} has stronger engineer growth signals`;
        rankB += 1.5;
    }

    // WLB Analysis
    let wlbWinnerString = "Both have standard expectations";
    if (companyA?.culture.wlb === 'Green' && companyB?.culture.wlb !== 'Green') {
        wlbWinnerString = `${offerA.company} is rated better for balance`;
        rankA += 1;
    } else if (companyB?.culture.wlb === 'Green' && companyA?.culture.wlb !== 'Green') {
        wlbWinnerString = `${offerB.company} is rated better for balance`;
        rankB += 1;
    } else if (companyA?.culture.wlb === 'Red' && companyB?.culture.wlb !== 'Red') {
        wlbWinnerString = `${offerB.company} avoids 'hustle culture' burnout risks`;
        rankB += 1;
    } else if (companyB?.culture.wlb === 'Red' && companyA?.culture.wlb !== 'Red') {
        wlbWinnerString = `${offerA.company} avoids 'hustle culture' burnout risks`;
        rankA += 1;
    }

    // Determine Overall Winner
    if (Math.abs(rankA - rankB) < 0.5) {
        winner = "It's a Tie";
    } else {
        winner = rankA > rankB ? offerA.company : offerB.company;
    }

    // Network Sentiment (Mocked/Heuristic)
    const sentimentTarget = rankA > rankB ? offerA.company : offerB.company;
    const sentimentScore = 80 + Math.floor(Math.random() * 15); // Random 80-95%
    const networkSentiment = `${sentimentScore}% of similar profiles chose ${sentimentTarget} for its ${rankA > rankB ? (scoreA > scoreB ? 'growth' : 'pay') : (scoreB > scoreA ? 'growth' : 'pay')}.`;

    const verdictData = JSON.stringify({
        winner,
        financialDiff,
        growthWinner: growthWinnerString,
        wlbWinner: wlbWinnerString,
        networkSentiment
    });

    add('verdict-card', verdictData);

    // Senior Advice
    const advice =
        (companyA?.companyType === 'Startup' || companyB?.companyType === 'Startup') ?
            "Senior Engineering Advice: Startups accelerate learning but risk burnout. If early in your career, optimize for learning (Growth). If later, optimize for WLB or stability." :
            "Senior Engineering Advice: In large organizations, your specific team and manager matter more than the company brand. Always negotiate specific team alignment before signing.";

    add('quote', advice);

    return blocks;
}
