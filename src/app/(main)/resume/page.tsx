"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertTriangle, XCircle, Search, Sparkles, ArrowRight, Loader2, Download, Building2, Target, ChevronRight, Check, X, ArrowLeft, RefreshCw, Globe, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { analyzeResume, AnalysisResult } from '@/lib/resume-parser';
import { ATS_MAPPING } from '@/lib/ats-data';

// Expanded FAANG+ Database + General Option
const COMPANIES_DB = {
    'google': {
        name: 'Google',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
        roles: {
            'swe-early': {
                title: 'Software Engineer, University Grad',
                hardSkills: ['Data Structures', 'Algorithms', 'System Design', 'C++', 'Java', 'Python', 'Linux', 'Distributed Systems'],
                softSkills: ['Problem Solving', 'Adaptability', 'Googliness', 'Collaboration', 'Ambiguity'],
                keywords: ['Scalability', 'Performance', 'Optimization', 'Cloud', 'Google Cloud Platform']
            },
            'swe-intern': {
                title: 'Software Engineering Intern',
                hardSkills: ['Data Structures', 'JAVA', 'C++', 'Python', 'Algorithms'],
                softSkills: ['Learning Agility', 'Communication', 'Teamwork'],
                keywords: ['GPA', 'Projects', 'Coding Competitions']
            },
            'pm': {
                title: 'Associate Product Manager (APM)',
                hardSkills: ['Product Design', 'Strategy', 'SQL', 'Data Analysis', 'UX Principles'],
                softSkills: ['Leadership', 'Vision', 'Empathy', 'Communication'],
                keywords: ['User Centric', 'Launch', 'Metrics', 'Roadmap']
            }
        }
    },
    'meta': {
        name: 'Meta',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        roles: {
            'swe-general': {
                title: 'Software Engineer, University Grad',
                hardSkills: ['PHP/Hack', 'React', 'GraphQL', 'Python', 'C++', 'System Design'],
                softSkills: ['Move Fast', 'Impact Driven', 'Boldness'],
                keywords: ['Billions of users', 'Scale', 'Social Graph']
            },
            'fe-swe': {
                title: 'Front End Engineer',
                hardSkills: ['JavaScript', 'React', 'HTML/CSS', 'Performance', 'WebAssembly'],
                softSkills: ['Product Instincts', 'Design Eye'],
                keywords: ['User Experience', 'Pixel Perfect', 'Components']
            }
        }
    },
    'amazon': {
        name: 'Amazon',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
        roles: {
            'sde-1': {
                title: 'Software Development Engineer I',
                hardSkills: ['Java', 'Object Oriented Design', 'AWS', 'DynamoDB', 'Distributed Systems'],
                softSkills: ['Customer Obsession', 'Ownership', 'Bias for Action', 'Deep Dive'],
                keywords: ['Operational Excellence', 'Scale', 'Deliver Results']
            },
            'sde-intern': {
                title: 'SDE Intern',
                hardSkills: ['Java', 'C++', 'Data Structures'],
                softSkills: ['Learn and Be Curious', 'Insist on Highest Standards'],
                keywords: ['Internship', 'Project']
            }
        }
    },
    'netflix': {
        name: 'Netflix',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
        roles: {
            'senior-swe': {
                title: 'Senior Software Engineer',
                hardSkills: ['Java', 'Spring Boot', 'Microservices', 'Cassandra', 'Kafka', 'AWS'],
                softSkills: ['Freedom and Responsibility', 'Context not Control', 'Highly Aligned'],
                keywords: ['Streaming', 'Resilience', 'High Performance']
            },
            'platform': {
                title: 'Platform Engineer',
                hardSkills: ['Go', 'Python', 'Kubernetes', 'Docker', 'Infrastructure as Code'],
                softSkills: ['Innovation', 'Selflessness'],
                keywords: ['Developer Productivity', 'Tooling']
            }
        }
    },
    'apple': {
        name: 'Apple',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        roles: {
            'ios': {
                title: 'iOS Engineer',
                hardSkills: ['Swift', 'Objective-C', 'UIKit', 'SwiftUI', 'Xcode', 'Core Data'],
                softSkills: ['Attention to Detail', 'Perfectionism', 'Creativity'],
                keywords: ['User Interface', 'Apple Ecosystem', 'Mobile']
            },
            'hardware': {
                title: 'Hardware Engineer',
                hardSkills: ['Verilog', 'SystemVerilog', 'ASIC Design', 'Python', 'C'],
                softSkills: ['Collaboration', 'Innovation'],
                keywords: ['Silicon', 'Chip', 'Performance/Watt']
            }
        }
    },
    'microsoft': {
        name: 'Microsoft',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        roles: {
            'swe': {
                title: 'Software Engineer',
                hardSkills: ['C#', '.NET', 'Azure', 'SQL', 'TypeScript', 'React'],
                softSkills: ['Growth Mindset', 'One Microsoft', 'Diverse & Inclusive'],
                keywords: ['Enterprise', 'Cloud', 'Productivity']
            }
        }
    },
    'general': {
        name: 'General / Other',
        icon: null,
        roles: {
            'swe-general': {
                title: 'General Software Engineer',
                hardSkills: ['Data Structures', 'Algorithms', 'System Design', 'Database Design', 'API Development', 'Git', 'Testing'],
                softSkills: ['Problem Solving', 'Communication', 'Teamwork', 'Adaptability'],
                keywords: ['Clean Code', 'Scalability', 'Maintainability', 'Agile']
            },
            'fullstack': {
                title: 'Full Stack Developer',
                hardSkills: ['Frontend (React/Vue)', 'Backend (Node/Python)', 'Databases (SQL/NoSQL)', 'REST APIs', 'DevOps basics'],
                softSkills: ['End-to-End Ownership', 'User Focus'],
                keywords: ['Responsive Design', 'API Integration', 'Deployment']
            }
        }
    }
};

type AnalysisState = {
    result: AnalysisResult | null;
    targetRoleTitle: string;
    targetCompanyName: string;
    keywordsList: string[];
};

export default function ResumeScannerPage() {
    const [resumeText, setResumeText] = useState('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [scanProgress, setScanProgress] = useState(0);

    // Selection State
    const [selectedCompany, setSelectedCompany] = useState<keyof typeof COMPANIES_DB | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'experience' | 'tech' | 'recs'>('overview');

    // Analysis Results Wrapper
    const [analysis, setAnalysis] = useState<AnalysisState | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.text) {
                setResumeText(data.text);
            } else {
                alert("Could not extract text from file.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to upload/parse file.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleStartScan = () => {
        if (!resumeText.trim() || !selectedCompany || !selectedRole) return;

        setStatus('scanning');
        setScanProgress(0);

        const companyData = COMPANIES_DB[selectedCompany];
        // @ts-ignore
        const roleData = companyData.roles[selectedRole];
        const allKeywords = [...roleData.hardSkills, ...roleData.keywords];

        // Simulate Scanning Progress with Real Analysis
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1.5;
            setScanProgress(Math.min(currentProgress, 99));
        }, 30);

        setTimeout(() => {
            clearInterval(interval);
            setScanProgress(100);

            // RUN REAL ANALYSIS
            const result = analyzeResume(resumeText, companyData.name, allKeywords);

            setAnalysis({
                result,
                targetRoleTitle: roleData.title,
                targetCompanyName: companyData.name,
                keywordsList: allKeywords
            });

            setTimeout(() => setStatus('results'), 500);
        }, 2000);
    };

    const fullReset = () => {
        setResumeText('');
        setStatus('idle');
        setAnalysis(null);
        setSelectedCompany(null);
        setSelectedRole(null);
        setScanProgress(0);
        setActiveTab('overview');
    }

    // Helper to get current role data safely
    const getCurrentRoleData = () => {
        if (selectedCompany && selectedRole) {
            // @ts-ignore
            return COMPANIES_DB[selectedCompany].roles[selectedRole];
        }
        return null;
    };

    const roleData = getCurrentRoleData();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-6 py-12 max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        AI Resume Coach (<span className='text-primary'>Beta</span>)
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We've reverse-engineered the ATS algorithms of 70+ top companies.
                        Get specific, actionable advice to 5x your interview chances.
                    </p>
                </div>

                {status === 'idle' && (
                    <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 items-start">
                        {/* 1. Configuration Panel */}
                        <div className="md:col-span-5 bg-background border border-border rounded-xl p-6 space-y-6 shadow-sm">
                            <div>
                                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-primary" />
                                    1. Select Target
                                </h3>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {Object.entries(COMPANIES_DB).map(([key, data]) => (
                                        <button
                                            key={key}
                                            onClick={() => { setSelectedCompany(key as any); setSelectedRole(null); }}
                                            className={cn(
                                                "flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all hover:bg-muted/50",
                                                selectedCompany === key
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                    : "border-border"
                                            )}
                                        >
                                            {data.icon ? (
                                                <img src={data.icon} alt={data.name} className="w-8 h-8 object-contain" />
                                            ) : (
                                                <Globe className="w-8 h-8 text-muted-foreground" />
                                            )}
                                            <span className="font-medium text-sm text-center">{data.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {selectedCompany && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-3 pt-4 border-t border-border"
                                    >
                                        <h4 className="text-sm font-medium text-muted-foreground">Select Role</h4>
                                        <div className="space-y-2">
                                            {/* @ts-ignore */}
                                            {Object.entries(COMPANIES_DB[selectedCompany].roles).map(([roleKey, role]: [string, any]) => (
                                                <button
                                                    key={roleKey}
                                                    onClick={() => setSelectedRole(roleKey)}
                                                    className={cn(
                                                        "w-full text-left p-3 rounded-md text-sm transition-colors border",
                                                        selectedRole === roleKey
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-background hover:bg-muted border-border"
                                                    )}
                                                >
                                                    {role.title}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* 2. Input Area */}
                        <div className="md:col-span-7 flex flex-col h-full">
                            <div className="bg-background border border-border rounded-xl p-6 shadow-sm h-full flex flex-col">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    2. Upload or Paste Resume
                                </h3>

                                <div className="mb-4">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {isUploading ? (
                                                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                                            ) : (
                                                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                            )}
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">PDF, DOCX, TXT</p>
                                        </div>
                                        <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
                                    </label>
                                </div>

                                <div className="relative flex items-center py-2 mb-4">
                                    <div className="flex-grow border-t border-border"></div>
                                    <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase">Or paste text</span>
                                    <div className="flex-grow border-t border-border"></div>
                                </div>

                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    3. Verify Content
                                </h3>

                                <div className="flex-1 min-h-[300px]">
                                    <textarea
                                        value={resumeText}
                                        onChange={(e) => setResumeText(e.target.value)}
                                        placeholder="Paste your full resume text here (Ctrl+A, Ctrl+C from your PDF)..."
                                        className="w-full h-full p-4 rounded-lg border border-input bg-muted/20 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono leading-relaxed"
                                    />
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={handleStartScan}
                                        disabled={!resumeText.trim() || !selectedCompany || !selectedRole}
                                        className={cn(
                                            "w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3",
                                            (!resumeText.trim() || !selectedCompany || !selectedRole)
                                                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                                : "bg-primary text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0"
                                        )}
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        Analyze Match
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {status === 'scanning' && roleData && (
                    <div className="max-w-xl mx-auto text-center py-20">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                                <motion.circle
                                    cx="64" cy="64" r="56"
                                    stroke="currentColor" strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={351.86}
                                    strokeDashoffset={351.86 - (351.86 * scanProgress) / 100}
                                    className="text-primary"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold font-mono">{Math.round(scanProgress)}%</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Analyzing against {COMPANIES_DB[selectedCompany!].name} ATS...</h3>
                        <p className="text-muted-foreground mb-8">Checking algorithms for <strong>{roleData.title}</strong> role</p>
                    </div>
                )}

                {status === 'results' && analysis?.result && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Navigation Back */}
                        <div className="flex justify-start">
                            <button
                                onClick={fullReset}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Switch Target / Upload New
                            </button>
                        </div>

                        {/* Top Summary Card */}
                        <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative w-40 h-40 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/20" />
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="currentColor" strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={439.8}
                                            strokeDashoffset={439.8 - (439.8 * analysis.result.score) / 100}
                                            className={cn(
                                                analysis.result.score > 75 ? "text-green-500" : analysis.result.score > 50 ? "text-yellow-500" : "text-red-500"
                                            )}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-bold">{analysis.result.score}</span>
                                        <span className="text-sm text-muted-foreground text-center mt-1">Match Rate</span>
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-2">
                                        {analysis.result.score > 75 ? "Strong Candidate" : "Needs Improvement"}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 max-w-xl">
                                        Your resume hits {analysis.result.foundKeywords.length}/{analysis.keywordsList.length} required signals for
                                        the <strong>{analysis.targetRoleTitle}</strong> role.
                                    </p>
                                    {/* Action Recommendations Summary */}
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        {analysis.result.recommendations.slice(0, 2).map((rec, i) => (
                                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                                                <Sparkles className="w-3 h-3" /> {rec.type}: {rec.text.substring(0, 40)}...
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Tabs */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'projects', label: `Projects (${analysis.result.projects.length})` },
                                    { id: 'experience', label: `Experience (${analysis.result.experience.length})` },
                                    { id: 'tech', label: 'Tech Stack' },
                                    { id: 'recs', label: 'Action Plan', icon: Sparkles }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={cn(
                                            "flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                            activeTab === tab.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                        )}
                                    >
                                        {tab.icon && <tab.icon className="w-4 h-4" />}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* --- TAB CONTENT AREA --- */}
                            <div className="min-h-[500px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {activeTab === 'overview' && (
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-background border border-border rounded-xl p-6">
                                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                        Key Strengths
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {analysis.result.foundKeywords.length > 5 ? (
                                                            <li className="flex items-start gap-3">
                                                                <Check className="w-4 h-4 text-green-500 mt-1" />
                                                                <span className="text-sm">Strong keyword coverage ({analysis.result.foundKeywords.length} found).</span>
                                                            </li>
                                                        ) : null}
                                                        {analysis.result.formattingScore > 90 && (
                                                            <li className="flex items-start gap-3">
                                                                <Check className="w-4 h-4 text-green-500 mt-1" />
                                                                <span className="text-sm">Clean, standard formatting detected.</span>
                                                            </li>
                                                        )}
                                                        {analysis.result.projects.length > 0 && (
                                                            <li className="flex items-start gap-3">
                                                                <Check className="w-4 h-4 text-green-500 mt-1" />
                                                                <span className="text-sm">Projects section parsed successfully.</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="bg-background border border-border rounded-xl p-6">
                                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                                        Critical Gaps
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {analysis.result.recommendations.filter(r => r.type === 'Critical').slice(0, 3).map((rec, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                                <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                                                <span>{rec.text}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'projects' && (
                                            <div className="space-y-6">
                                                {analysis.result.projects.length === 0 ? (
                                                    <div className="text-center p-12 border border-dashed border-border rounded-xl">
                                                        <p className="text-muted-foreground">No specific "Projects" section detected. This is a red flag for tech roles.</p>
                                                    </div>
                                                ) : (
                                                    analysis.result.projects.map((proj, i) => (
                                                        <div key={i} className="group bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h3 className="font-bold text-lg">{proj.title}</h3>
                                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                                        {proj.tech.map((t, idx) => (
                                                                            <span key={idx} className="px-2 py-0.5 bg-muted rounded text-xs font-mono">{t}</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mb-4 italic pl-4 border-l-2 border-primary/20">
                                                                "{proj.description}"
                                                            </p>
                                                            {proj.rewriteSuggestion && (
                                                                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 p-4 rounded-lg">
                                                                    <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold text-xs uppercase tracking-wide">
                                                                        <Sparkles className="w-3 h-3" /> AI Rewrite Suggestion
                                                                    </div>
                                                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                                                        {proj.rewriteSuggestion}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}

                                        {activeTab === 'experience' && (
                                            <div className="space-y-6">
                                                {analysis.result.experience.length === 0 ? (
                                                    <div className="text-center p-12 border border-dashed border-border rounded-xl">
                                                        <p className="text-muted-foreground">No "Experience" section parsed. Check your headers.</p>
                                                    </div>
                                                ) : (
                                                    analysis.result.experience.map((exp, i) => (
                                                        <div key={i} className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                                                            {exp.gapAlert && (
                                                                <div className="absolute top-0 right-0 p-2 bg-red-100 dark:bg-red-900/30 text-red-600 text-xs font-bold rounded-bl-xl">
                                                                    Impact Gap Detected
                                                                </div>
                                                            )}
                                                            <div className="mb-4">
                                                                <h3 className="font-bold text-lg">{exp.role}</h3>
                                                                <p className="text-muted-foreground pointer-events-none">{exp.company} • {exp.duration}</p>
                                                            </div>
                                                            {exp.gapAlert ? (
                                                                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                                                                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                                                    <div>
                                                                        <p className="text-sm font-medium mb-1">Missing Quantifiable Metrics</p>
                                                                        <p className="text-xs text-muted-foreground">{exp.gapAlert}</p>
                                                                        <p className="text-xs text-foreground font-semibold mt-2">Try adding: "Engineered scalable API reducing latency by 40%..."</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-sm text-green-600 flex items-center gap-2">
                                                                    <CheckCircle2 className="w-4 h-4" /> Good use of impact metrics.
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}

                                        {activeTab === 'tech' && (
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="bg-card p-6 border border-border rounded-xl">
                                                        <h3 className="font-semibold mb-4 text-green-600">✅ Proficient / Found</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {analysis.result.techStack.proficient.concat(analysis.result.techStack.familiar).length > 0 ? (
                                                                analysis.result.techStack.proficient.concat(analysis.result.techStack.familiar).map(t => (
                                                                    <span key={t} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded border border-green-200 dark:border-green-800 text-sm">
                                                                        {t}
                                                                    </span>
                                                                ))
                                                            ) : <span className="text-muted-foreground text-sm">No tech stack keywords detected.</span>}
                                                        </div>
                                                    </div>
                                                    <div className="bg-card p-6 border border-border rounded-xl">
                                                        <h3 className="font-semibold mb-4 text-red-500">❌ Missing / Critical</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {analysis.result.techStack.missing.map(t => (
                                                                <span key={t} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded border border-red-200 dark:border-red-800 text-sm">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                {!analysis.result.education.found && (
                                                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-3">
                                                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                                        <div>
                                                            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">Education Section Missing</p>
                                                            <p className="text-xs text-yellow-700 dark:text-yellow-300">Even for senior roles, ATS parsers often require a degree field.</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {activeTab === 'recs' && (
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold mb-4">Prioritized Action Plan</h3>
                                                {analysis.result.recommendations.map((rec, i) => (
                                                    <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                                                        <div className={cn(
                                                            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg",
                                                            rec.type === 'Critical' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                                        )}>
                                                            {i + 1}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className={cn(
                                                                    "px-2 py-0.5 text-[10px] uppercase font-bold rounded",
                                                                    rec.type === 'Critical' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                                                )}>
                                                                    {rec.type}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground">High Impact (+{rec.impact} pts)</span>
                                                            </div>
                                                            <p className="font-medium text-foreground">{rec.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
