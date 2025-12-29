// AI Career Chatbot API
// Provides conversational career advice using Gemini

import { NextRequest, NextResponse } from 'next/server';
import { geminiClient } from '@/lib/ai/gemini-client';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, conversationHistory, context } = body as {
            message: string;
            conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
            context?: {
                resumeText?: string;
                offers?: any[];
                userPreferences?: any;
            };
        };

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Check if AI is configured
        if (!geminiClient.configured) {
            return NextResponse.json({
                error: 'AI features not configured',
                configured: false
            }, { status: 503 });
        }

        // Build system prompt with context
        let systemPrompt = `You are an expert career advisor specializing in helping students and young professionals make informed career decisions. You provide:
- Honest, data-driven advice
- Specific, actionable recommendations
- Insights into company culture, work-life balance, and career growth
- Salary negotiation tips
- Resume and interview guidance

Be conversational but professional. Focus on long-term career impact, not just short-term gains.`;

        if (context?.resumeText) {
            systemPrompt += `\n\nUser's Resume Context:\n${context.resumeText.substring(0, 1000)}...`;
        }

        if (context?.offers && context.offers.length > 0) {
            systemPrompt += `\n\nUser's Current Offers:\n${context.offers.map((o: any) =>
                `- ${o.company}: ${o.role} @ ₹${o.ctc.toLocaleString('en-IN')}`
            ).join('\n')}`;
        }

        // Build conversation
        const messages = [
            ...(conversationHistory || []),
            { role: 'user' as const, content: message }
        ];

        const response = await geminiClient.chat(messages, systemPrompt);

        return NextResponse.json({
            success: true,
            response,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('[AI Career Chat] Error:', error);
        return NextResponse.json({
            error: 'Chat failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
