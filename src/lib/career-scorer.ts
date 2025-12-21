import { Offer } from '@/types/off-radar';

export interface CareerFitScore {
    total: number; // 0-100
    breakdown: {
        salary: number;
        learning: number;
        wlb: number;
        brand: number;
        risk: number;
    };
    recommendation: string;
}

export function calculateCareerFit(offer: Offer, preferences: {
    salaryWeight: number; // 0-1
    learningWeight: number;
    wlbWeight: number;
    brandWeight: number;
    riskTolerance: number; // 0-1, higher = more willing to take risks
}): CareerFitScore {
    // Normalize preferences
    const total = preferences.salaryWeight + preferences.learningWeight + preferences.wlbWeight + preferences.brandWeight;
    const weights = {
        salary: preferences.salaryWeight / total,
        learning: preferences.learningWeight / total,
        wlb: preferences.wlbWeight / total,
        brand: preferences.brandWeight / total
    };

    // Calculate individual scores (0-100)
    const salaryScore = Math.min(100, (offer.ctc / 50000) * 100); // Cap at 50L

    // Learning score based on company type (heuristic)
    const learningScore = offer.company.toLowerCase().includes('google') ? 95 :
        offer.company.toLowerCase().includes('qualcomm') ? 90 :
            offer.company.toLowerCase().includes('texas') || offer.company.toLowerCase().includes('ti') ? 85 :
                offer.company.toLowerCase().includes('ather') ? 70 :
                    offer.company.toLowerCase().includes('tcs') || offer.company.toLowerCase().includes('infosys') ? 40 : 60;

    // WLB score (heuristic)
    const wlbScore = offer.company.toLowerCase().includes('google') || offer.company.toLowerCase().includes('texas') ? 85 :
        offer.company.toLowerCase().includes('qualcomm') ? 75 :
            offer.company.toLowerCase().includes('ather') ? 30 :
                offer.company.toLowerCase().includes('tcs') ? 60 : 65;

    // Brand score
    const brandScore = offer.company.toLowerCase().includes('google') ? 100 :
        offer.company.toLowerCase().includes('qualcomm') || offer.company.toLowerCase().includes('texas') ? 85 :
            offer.company.toLowerCase().includes('microsoft') ? 95 :
                offer.company.toLowerCase().includes('tcs') ? 50 : 60;

    // Risk score (startups = higher risk = lower score for risk-averse people)
    const isStartup = offer.company.toLowerCase().includes('ather') || offer.company.toLowerCase().includes('startup');
    const riskScore = isStartup ? 40 : 80;
    const adjustedRiskScore = preferences.riskTolerance > 0.7 ? (isStartup ? 70 : 60) : riskScore;

    // Weighted total
    const weightedScore =
        (salaryScore * weights.salary) +
        (learningScore * weights.learning) +
        (wlbScore * weights.wlb) +
        (brandScore * weights.brand);

    // Risk adjustment
    const finalScore = Math.round(weightedScore * 0.8 + adjustedRiskScore * 0.2);

    // Generate recommendation
    let recommendation = '';
    if (finalScore >= 80) {
        recommendation = `${offer.company} is an excellent fit for your priorities. The compensation, learning, and brand value align well with what you're looking for.`;
    } else if (finalScore >= 65) {
        recommendation = `${offer.company} is a solid choice with good alignment to your goals, though there are some trade-offs to consider.`;
    } else if (finalScore >= 50) {
        recommendation = `${offer.company} is acceptable but requires careful consideration. Make sure the trade-offs are worth it for your specific situation.`;
    } else {
        recommendation = `${offer.company} may not be the best fit given your stated priorities. Consider whether the non-monetary factors justify this choice.`;
    }

    return {
        total: finalScore,
        breakdown: {
            salary: Math.round(salaryScore),
            learning: learningScore,
            wlb: wlbScore,
            brand: brandScore,
            risk: adjustedRiskScore
        },
        recommendation
    };
}

export function compareOffers(offerA: Offer, offerB: Offer) {
    const defaultPreferences = {
        salaryWeight: 0.3,
        learningWeight: 0.35,
        wlbWeight: 0.2,
        brandWeight: 0.15,
        riskTolerance: 0.5
    };

    const scoreA = calculateCareerFit(offerA, defaultPreferences);
    const scoreB = calculateCareerFit(offerB, defaultPreferences);

    return {
        scoreA,
        scoreB,
        winner: scoreA.total > scoreB.total ? offerA : offerB,
        verdict: generateVerdict(offerA, offerB, scoreA, scoreB)
    };
}

function generateVerdict(offerA: Offer, offerB: Offer, scoreA: CareerFitScore, scoreB: CareerFitScore): string {
    const diff = Math.abs(scoreA.total - scoreB.total);

    if (diff < 5) {
        return `Both offers are nearly identical in overall fit (${scoreA.total} vs ${scoreB.total}). Choose ${offerA.company} if you value learning depth and ${offerB.company} if you value stability and compensation.`;
    }

    const winner = scoreA.total > scoreB.total ? offerA.company : offerB.company;
    const loser = scoreA.total > scoreB.total ? offerB.company : offerA.company;

    return `${winner} is the clear winner (${Math.max(scoreA.total, scoreB.total)} vs ${Math.min(scoreA.total, scoreB.total)}). While ${loser} has its strengths, the overall career trajectory favors ${winner} given typical student priorities.`;
}
