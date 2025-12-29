// Vertex AI Gemini Client Wrapper - WITH DEMO MODE
// Provides easy-to-use methods for AI operations with error handling
// Falls back to demo mode when not configured for full functionality

import { VertexAI } from '@google-cloud/vertexai';
import { demoAIClient } from './demo-ai-client';

interface GeminiConfig {
    projectId: string;
    location: string;
    model?: string;
}

class GeminiClient {
    private vertexAI: VertexAI | null = null;
    private model: string;
    private isConfigured: boolean;

    constructor(config?: GeminiConfig) {
        const projectId = config?.projectId || process.env.GCP_PROJECT_ID;
        const location = config?.location || process.env.GCP_LOCATION || 'us-central1';
        this.model = config?.model || process.env.VERTEX_AI_MODEL || 'gemini-2.0-flash-exp';

        this.isConfigured = Boolean(projectId && location);

        if (this.isConfigured && projectId && location) {
            try {
                this.vertexAI = new VertexAI({
                    project: projectId,
                    location: location,
                });
                console.log('[Gemini] Client initialized successfully - Real AI Mode');
            } catch (error) {
                console.error('[Gemini] Initialization failed:', error);
                this.isConfigured = false;
            }
        } else {
            console.warn('[Gemini] Configuration missing - Using Demo AI Mode for full functionality');
        }
    }

    /**
     * Generate text from a prompt
     */
    async generateText(prompt: string, options?: { temperature?: number; maxTokens?: number }): Promise<string> {
        // DEMO MODE: Use mock AI when not configured
        if (!this.isConfigured || !this.vertexAI) {
            console.log('[Gemini] Using demo AI mode');
            return demoAIClient.chat(prompt);
        }

        try {
            const generativeModel = this.vertexAI.getGenerativeModel({
                model: this.model,
                generationConfig: {
                    temperature: options?.temperature ?? 0.7,
                    maxOutputTokens: options?.maxTokens ?? 2048,
                },
            });

            const result = await generativeModel.generateContent(prompt);
            const response = result.response;
            return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } catch (error) {
            console.error('[Gemini] Text generation failed:', error);
            throw new Error(`AI generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Analyze a document (resume, job description, etc.)
     */
    async analyzeDocument(text: string, analysisType: 'resume' | 'job_description' | 'offer'): Promise<any> {
        // DEMO MODE: Use mock analysis
        if (!this.isConfigured || !this.vertexAI) {
            console.log('[Gemini] Using demo mode for document analysis');
            if (analysisType === 'resume') {
                return demoAIClient.analyzeResume(text);
            }
            return { error: 'Demo mode only supports resume analysis', demo: true };
        }

        const prompts = {
            resume: `You are an expert resume analyzer and career coach. Analyze the following resume and extract:
1. Skills (categorize as proficient/familiar)
2. Projects (title, technologies, impact)
3. Work experience (role, company, achievements)
4. Education (degree, major, institution)
5. ATS compatibility score (0-100)
6. Specific improvement suggestions with examples

Resume:
${text}

Respond in JSON format with the structure:
{
  "skills": { "proficient": [], "familiar": [] },
  "projects": [{ "title": "", "tech": [], "description": "", "suggestion": "" }],
  "experience": [{ "role": "", "company": "", "achievements": [] }],
  "education": { "degree": "", "major": "", "institution": "" },
  "atsScore": 0,
  "suggestions": [{ "type": "critical|improvement", "text": "", "impact": 0 }]
}`,

            job_description: `Analyze this job description and extract key requirements, skills, and keywords:

${text}

Respond in JSON format.`,

            offer: `Analyze this job offer and provide insights:

${text}

Respond in JSON format with salary breakdown, pros/cons, and recommendations.`
        };

        const response = await this.generateText(prompts[analysisType], { temperature: 0.3 });

        try {
            // Extract JSON from response (handle markdown code blocks)
            const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[1] || jsonMatch[0]);
            }
            return JSON.parse(response);
        } catch (error) {
            console.error('[Gemini] Failed to parse JSON response:', error);
            return { raw: response, error: 'Failed to parse structured data' };
        }
    }

    /**
     * Chat completion for conversational AI
     */
    async chat(messages: Array<{ role: 'user' | 'assistant'; content: string }>, systemPrompt?: string, context?: any): Promise<string> {
        // DEMO MODE: Use mock chat
        if (!this.isConfigured || !this.vertexAI) {
            console.log('[Gemini] Using demo mode for chat');
            const lastMessage = messages[messages.length - 1];
            return demoAIClient.chat(lastMessage.content, context);
        }

        // Combine system prompt and conversation history
        const fullPrompt = [
            systemPrompt || 'You are a helpful career advisor AI.',
            ...messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        ].join('\n\n');

        return this.generateText(fullPrompt, { temperature: 0.8 });
    }

    /**
     * Compare two offers and provide recommendation
     */
    async compareOffers(offer1: any, offer2: any, userPreferences: any): Promise<any> {
        // DEMO MODE: Use mock comparison
        if (!this.isConfigured || !this.vertexAI) {
            console.log('[Gemini] Using demo mode for offer comparison');
            return demoAIClient.compareOffers(offer1, offer2);
        }

        const prompt = `You are a career advisor. Compare these two job offers and provide a detailed recommendation considering the user's preferences.

Offer 1:
Company: ${offer1.company}
Role: ${offer1.role}
CTC: ₹${offer1.ctc.toLocaleString('en-IN')}
Location: ${offer1.location}
Type: ${offer1.type}

Offer 2:
Company: ${offer2.company}
Role: ${offer2.role}
CTC: ₹${offer2.ctc.toLocaleString('en-IN')}
Location: ${offer2.location}
Type: ${offer2.type}

User Preferences:
${JSON.stringify(userPreferences, null, 2)}

Provide:
1. Winner and why
2. Pros/cons of each
3. Long-term career impact
4. Final recommendation

Respond in JSON format:
{
  "winner": "offer1" | "offer2",
  "reasoning": "",
  "offer1Pros": [],
  "offer1Cons": [],
  "offer2Pros": [],
  "offer2Cons": [],
  "longTermImpact": "",
  "recommendation": ""
}`;

        const response = await this.generateText(prompt, { temperature: 0.5 });
        const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[1] || jsonMatch[0]);
        }
        return JSON.parse(response);
    }

    /**
     * Check if client is properly configured (real AI mode)
     */
    get configured(): boolean {
        return this.isConfigured;
    }

    /**
     * Check if using demo mode
     */
    get isDemoMode(): boolean {
        return !this.isConfigured;
    }
}

// Export singleton instance
export const geminiClient = new GeminiClient();
export default GeminiClient;
