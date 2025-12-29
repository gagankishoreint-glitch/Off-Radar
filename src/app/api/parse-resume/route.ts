import { NextRequest, NextResponse } from 'next/server';
import { geminiClient } from '@/lib/ai/gemini-client';
import { analyzeResume } from '@/lib/resume-parser';

// @ts-ignore
const mammoth = require('mammoth');

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const useAI = formData.get('useAI') === 'true'; // Optional AI enhancement
        const targetCompany = formData.get('targetCompany') as string;
        const requiredKeywords = formData.get('requiredKeywords') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = '';

        if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')
        ) {
            // Handle DOCX files
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else {
            return NextResponse.json({ error: 'Unsupported file format. PDFs are parsed client-side.' }, { status: 400 });
        }

        // Basic clean up
        text = text.replace(/\s+/g, ' ').trim();

        // Basic analysis (always run - no breaking changes)
        const keywords = requiredKeywords ? requiredKeywords.split(',').map(k => k.trim()) : [];
        const basicAnalysis = analyzeResume(text, targetCompany || '', keywords);

        // AI-enhanced analysis (optional - only if configured and requested)
        let aiAnalysis = null;
        if (useAI && geminiClient.configured) {
            try {
                console.log('[AI] Performing AI-enhanced resume analysis...');
                aiAnalysis = await geminiClient.analyzeDocument(text, 'resume');
                console.log('[AI] AI analysis completed successfully');
            } catch (error) {
                console.error('[AI] AI analysis failed, falling back to basic analysis:', error);
                // Don't fail the request, just skip AI features
            }
        }

        return NextResponse.json({
            text,
            analysis: basicAnalysis, // Always include basic analysis
            aiAnalysis: aiAnalysis, // null if AI not available/requested
            aiAvailable: geminiClient.configured,
        });

    } catch (error) {
        console.error('Error parsing file:', error);
        return NextResponse.json({ error: 'Failed to parse resume file.' }, { status: 500 });
    }
}
