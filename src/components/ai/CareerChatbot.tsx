// AI Career Chatbot Component
// Interactive chat interface for AI-powered career advice

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface CareerChatbotProps {
    context?: {
        resumeText?: string;
        offers?: any[];
    };
}

export default function CareerChatbot({ context }: CareerChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hi! I\'m your AI career advisor. Ask me anything about job offers, career decisions, resumes, or interview prep!',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiAvailable, setAiAvailable] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/career-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    conversationHistory: messages,
                    context,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 503) {
                    setAiAvailable(false);
                    throw new Error('AI features not configured. Please follow the setup guide in docs/FIREBASE_SETUP.md');
                }
                throw new Error(data.error || 'Failed to get response');
            }

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: 'assistant',
                content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] border border-white/5 rounded-lg">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Bot className="w-5 h-5 text-blue-400" />
                <div>
                    <h3 className="text-sm font-medium text-white">AI Career Advisor</h3>
                    <p className="text-xs text-white/40">
                        {aiAvailable ? 'Powered by Gemini' : 'Configure AI to unlock this feature'}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                            }`}>
                            {msg.role === 'user' ? (
                                <User className="w-4 h-4 text-blue-400" />
                            ) : (
                                <Bot className="w-4 h-4 text-purple-400" />
                            )}
                        </div>
                        <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${msg.role === 'user'
                                    ? 'bg-blue-500/20 text-white'
                                    : 'bg-white/5 text-white/90'
                                }`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            <p className="text-xs text-white/30 mt-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="bg-white/5 px-4 py-2 rounded-lg">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={aiAvailable ? "Ask me anything..." : "AI not configured - see docs/FIREBASE_SETUP.md"}
                        disabled={!aiAvailable || isLoading}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading || !aiAvailable}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-white/10 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                {context?.offers && context.offers.length > 0 && (
                    <p className="text-xs text-white/40 mt-2">
                        Context: {context.offers.length} offer(s) loaded
                    </p>
                )}
            </div>
        </div>
    );
}
