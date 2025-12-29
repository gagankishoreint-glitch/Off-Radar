// AI-Powered Resume Analysis API
// Provides deep analysis using Vertex AI Gemini

import { NextRequest, NextResponse } from 'next/server';
import { geminiClient } from '@/lib/ai/gemini-client';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { resumeText, targetRole, targetCompany } = body;

        if (!resumeText) {
            return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
        }

        // Check if AI is configured
        if (!geminiClient.configured) {
            return NextResponse.json({
                error: 'AI features not configured. Please set up Google Cloud credentials.',
                configured: false
            }, { status: 503 });
        }

        // Perform AI analysis
        const analysis = await geminiClient.analyzeDocument(resumeText, 'resume');

        // Enhance prompt with target role/company if provided
        let recommendations = '';
        if (targetRole || targetCompany) {
            const enhancementPrompt = `Given this resume analysis and targeting ${targetRole || 'a software role'} at ${targetCompany || 'top tech companies'}, provide 3 specific actionable improvements:

Resume Analysis:
${JSON.stringify(analysis, null, 2)}

Respond with specific changes to make, not generic advice.`;

            recommendations = await geminiClient.generateText(enhancementPrompt, { temperature: 0.5 });
        }

        return NextResponse.json({
            success: true,
            analysis,
            recommendations: recommendations || null,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('[AI Resume Analysis] Error:', error);
        return NextResponse.json({
            error: 'AI analysis failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
