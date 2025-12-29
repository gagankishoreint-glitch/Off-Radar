// Login/Signup Modal Component
// Provides UI for Firebase authentication with Google and email/password

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
    const router = useRouter();
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, isConfigured } = useAuth();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleGoogleSignIn = async () => {
        if (!isConfigured) {
            setError('Firebase not configured. Please set up Firebase Authentication in .env.local');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await signInWithGoogle();
            onClose();
            router.push('/companies');
        } catch (err: any) {
            setError(err.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isConfigured) {
            setError('Firebase not configured. Please set up Firebase Authentication.');
            return;
        }

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (activeTab === 'login') {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(email, password);
            }
            onClose();
            router.push('/companies');
        } catch (err: any) {
            setError(err.message || `${activeTab === 'login' ? 'Sign in' : 'Sign up'} failed`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-md relative overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="px-8 pt-8 pb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-white/60 text-sm">
                        {activeTab === 'login'
                            ? 'Sign in to access your career insights'
                            : 'Join Off-Radar to unlock AI-powered career tools'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 px-8">
                    <button
                        onClick={() => {
                            setActiveTab('login');
                            setError('');
                        }}
                        className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'login'
                            ? 'text-white'
                            : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        Login
                        {activeTab === 'login' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('signup');
                            setError('');
                        }}
                        className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'signup'
                            ? 'text-white'
                            : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        Sign Up
                        {activeTab === 'signup' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                        )}
                    </button>
                </div>

                <div className="p-8">
                    {/* Error message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading || !isConfigured}
                        className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        {isConfigured ? 'Continue with Google' : 'Google Sign-In (Setup Required)'}
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-[#0F0F0F] text-white/40">Or continue with email</span>
                        </div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    disabled={loading || !isConfigured}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={loading || !isConfigured}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isConfigured}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* Firebase setup notice */}
                    {!isConfigured && (
                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-xs text-yellow-400">
                                Firebase not configured. Follow <code className="text-yellow-300">docs/FIREBASE_SETUP.md</code> to enable authentication.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
