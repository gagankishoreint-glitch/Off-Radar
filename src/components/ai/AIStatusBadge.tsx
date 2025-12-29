// AI Status Badge Component
// Shows whether AI features are configured and available

'use client';

import { useEffect, useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface AIStatusBadgeProps {
    className?: string;
    showDetails?: boolean;
}

export default function AIStatusBadge({ className = '', showDetails = false }: AIStatusBadgeProps) {
    const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Quick check by trying to access Gemini client status
        const checkAIStatus = async () => {
            try {
                // Try a simple API call to check AI availability
                const response = await fetch('/api/ai/career-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'ping' }),
                });

                const data = await response.json();
                setAiAvailable(response.status !== 503 && data.configured !== false);
            } catch (error) {
                setAiAvailable(false);
            } finally {
                setChecking(false);
            }
        };

        checkAIStatus();
    }, []);

    if (checking) {
        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ${className}`}>
                <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                <span className="text-xs text-white/60">Checking AI...</span>
            </div>
        );
    }

    if (aiAvailable) {
        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 ${className}`}>
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-blue-300">AI Powered</span>
                {showDetails && (
                    <span className="text-xs text-blue-400/60 ml-1">by Gemini</span>
                )}
            </div>
        );
    }

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 ${className}`}>
            <AlertCircle className="w-3 h-3 text-orange-400" />
            <span className="text-xs font-medium text-orange-300">AI Not Configured</span>
            {showDetails && (
                <a
                    href="/docs/FIREBASE_SETUP.md"
                    target="_blank"
                    className="text-xs text-orange-400/80 underline ml-1 hover:text-orange-300"
                >
                    Setup Guide
                </a>
            )}
        </div>
    );
}

// Optional: Export a hook for checking AI status in other components
export function useAIStatus() {
    const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAIStatus = async () => {
            try {
                const response = await fetch('/api/ai/career-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'ping' }),
                });

                const data = await response.json();
                setAiAvailable(response.status !== 503 && data.configured !== false);
            } catch (error) {
                setAiAvailable(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAIStatus();
    }, []);

    return { aiAvailable, isChecking };
}
