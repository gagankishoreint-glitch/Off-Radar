// AI-Powered Offer Comparison API
// Compares two job offers using Gemini AI

import { NextRequest, NextResponse } from 'next/server';
import { geminiClient } from '@/lib/ai/gemini-client';
import { Offer } from '@/types/off-radar';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { offer1, offer2, userPreferences } = body as {
            offer1: Offer;
            offer2: Offer;
            userPreferences?: any;
        };

        if (!offer1 || !offer2) {
            return NextResponse.json({ error: 'Two offers are required for comparison' }, { status: 400 });
        }

        // Check if AI is configured
        if (!geminiClient.configured) {
            return NextResponse.json({
                error: 'AI features not configured',
                configured: false
            }, { status: 503 });
        }

        // Use AI to compare offers
        const comparison = await geminiClient.compareOffers(
            offer1,
            offer2,
            userPreferences || {
                salaryWeight: 0.3,
                learningWeight: 0.35,
                wlbWeight: 0.2,
                brandWeight: 0.15,
            }
        );

        return NextResponse.json({
            success: true,
            comparison,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('[AI Offer Comparison] Error:', error);
        return NextResponse.json({
            error: 'Offer comparison failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
