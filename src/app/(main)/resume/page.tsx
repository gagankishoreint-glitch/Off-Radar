"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertTriangle, XCircle, Search, Sparkles, ArrowRight, Loader2, Download, Building2, Target, ChevronRight, Check, X, ArrowLeft, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Expanded FAANG+ Database
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
    }
};

type ScanResult = {
    score: number;
    matchRate: 'Low' | 'Medium' | 'High';
    missingKeySkills: string[];
    missingSoftSkills: string[];
    formattingIssues: string[];
    wordCount: number;
    targetCompany: string;
    targetRole: string;
};

export default function ResumeScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [scanProgress, setScanProgress] = useState(0);

    // Selection State
    const [selectedCompany, setSelectedCompany] = useState<keyof typeof COMPANIES_DB | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'ats'>('overview');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Simulated Results State
    const [results, setResults] = useState<ScanResult | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type.includes("image"))) {
            setFile(droppedFile);
            // Don't auto-scan yet, ensure target is selected
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleStartScan = () => {
        if (!file || !selectedCompany || !selectedRole) return;

        setStatus('scanning');
        setScanProgress(0);

        const companyData = COMPANIES_DB[selectedCompany];
        // @ts-ignore
        const roleData = companyData.roles[selectedRole];

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1.5;
            setScanProgress(Math.min(currentProgress, 99));
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            setScanProgress(100);

            // Generate Mock Results
            const randomScore = Math.floor(Math.random() * (90 - 45) + 45); // 45-90 range

            setResults({
                score: randomScore,
                matchRate: randomScore > 80 ? 'High' : randomScore > 60 ? 'Medium' : 'Low',
                missingKeySkills: roleData.hardSkills.filter(() => Math.random() > 0.4),
                missingSoftSkills: roleData.softSkills.filter(() => Math.random() > 0.5),
                formattingIssues: Math.random() > 0.6 ? ['Date format inconsistency'] : [],
                wordCount: 450,
                targetCompany: companyData.name,
                targetRole: roleData.title
            });

            setTimeout(() => setStatus('results'), 500);
        }, 6000);
    };

    const resetScan = () => {
        setStatus('idle');
        setResults(null);
        setScanProgress(0);
        // Keep file and selection, or clear? Let's clear result-dependent things but maybe keep file
        // To be safe, clear "Results" state but keep selection state so they can re-scan easily if they want, 
        // or they can change selection.
    };

    const fullReset = () => {
        setFile(null);
        setStatus('idle');
        setResults(null);
        setSelectedCompany(null);
        setSelectedRole(null);
        setScanProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
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
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-12 max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        AI Resume Scanner
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Simulate an ATS scan against FAANG hiring criteria.
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
                                <p className="text-sm text-muted-foreground mb-4">
                                    Choose the company to load their specific ATS keywords.
                                </p>

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
                                            <img src={data.icon} alt={data.name} className="w-8 h-8 object-contain" />
                                            <span className="font-medium text-sm">{data.name}</span>
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

                        {/* 2. Upload Area */}
                        <div className="md:col-span-7 flex flex-col h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex-1 relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center items-center bg-muted/10",
                                    isDragging
                                        ? "border-primary bg-primary/5 scale-[1.02]"
                                        : "border-muted-foreground/30 hover:border-primary/50"
                                )}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleFileSelect}
                                />
                                {file ? (
                                    <div className="animate-in zoom-in-50 duration-300">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto text-primary">
                                            <FileText className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-1">{file.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="text-sm text-red-500 hover:text-red-600 font-medium"
                                        >
                                            Remove File
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                                            <Upload className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2">Upload Resume</h3>
                                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                                            Drag & drop your PDF here.
                                        </p>
                                        <button className="px-8 py-3 bg-muted text-foreground border border-input font-medium rounded-lg hover:bg-muted/80 transition-colors">
                                            Select File
                                        </button>
                                    </>
                                )}
                            </motion.div>

                            <div className="mt-6">
                                <button
                                    onClick={handleStartScan}
                                    disabled={!file || !selectedCompany || !selectedRole}
                                    className={cn(
                                        "w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3",
                                        (!file || !selectedCompany || !selectedRole)
                                            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                            : "bg-primary text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0"
                                    )}
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Run ATS Simulator
                                </button>
                                {(!selectedCompany || !selectedRole) && file && (
                                    <p className="text-center text-sm text-red-500 mt-3 animate-pulse">
                                        Please select a target company and role above.
                                    </p>
                                )}
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

                        <h3 className="text-2xl font-bold mb-2">Analyzing against {COMPANIES_DB[selectedCompany!].name}...</h3>
                        <p className="text-muted-foreground mb-8">Comparing skills for <strong>{roleData.title}</strong> role</p>

                        <div className="text-sm text-left max-w-xs mx-auto space-y-2 font-mono text-muted-foreground bg-muted p-4 rounded-lg">
                            <div className={cn("flex items-center gap-2", scanProgress > 10 ? "text-green-500" : "opacity-50")}>
                                {scanProgress > 10 ? <Check className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                                Parsing layout structure
                            </div>
                            <div className={cn("flex items-center gap-2", scanProgress > 40 ? "text-green-500" : "opacity-50")}>
                                {scanProgress > 40 ? <Check className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                                Identifying hard skills
                            </div>
                            <div className={cn("flex items-center gap-2", scanProgress > 70 ? "text-green-500" : "opacity-50")}>
                                {scanProgress > 70 ? <Check className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                                Checking for "{roleData.keywords[0]}"
                            </div>
                        </div>
                    </div>
                )}

                {status === 'results' && results && roleData && (
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
                                {/* Score Circle */}
                                <div className="relative w-40 h-40 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/20" />
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="currentColor" strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={439.8}
                                            strokeDashoffset={439.8 - (439.8 * results.score) / 100}
                                            className={cn(
                                                results.score > 75 ? "text-green-500" : results.score > 50 ? "text-yellow-500" : "text-red-500"
                                            )}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-bold">{results.score}</span>
                                        <span className="text-sm text-muted-foreground text-center mt-1">Match Rate</span>
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold mb-2">
                                        {results.score > 75 ? "Great Match!" : "Needs Improvement"}
                                    </h2>
                                    <p className="text-muted-foreground mb-4 max-w-xl">
                                        Your resume hits {results.score}% of the key signals for the <strong>{results.targetRole}</strong> role at <strong>{results.targetCompany}</strong>.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
                                            <Building2 className="w-4 h-4 text-primary" />
                                            <span>{results.targetCompany}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
                                            <Target className="w-4 h-4 text-primary" />
                                            <span>{roleData.keywords[0]} Focus</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Tabs */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={cn(
                                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                        activeTab === 'overview' ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                    )}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('skills')}
                                    className={cn(
                                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                        activeTab === 'skills' ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                    )}
                                >
                                    Skills Gap ({results.missingKeySkills.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('ats')}
                                    className={cn(
                                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                        activeTab === 'ats' ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                    )}
                                >
                                    ATS Checks
                                </button>
                            </div>

                            {activeTab === 'overview' && (
                                <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-background border border-border rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            Matched Signals
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-sm text-muted-foreground">Found <strong>{roleData.hardSkills.length - results.missingKeySkills.length}/{roleData.hardSkills.length}</strong> required tech stack keywords.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-sm text-muted-foreground">Aligned with {results.targetCompany}'s values (e.g. "{roleData.softSkills[0]}").</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-background border border-border rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-red-500" />
                                            Missing Critical Keywords
                                        </h3>
                                        <ul className="space-y-3">
                                            {results.missingKeySkills.slice(0, 3).map(skill => (
                                                <li key={skill} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <X className="w-3.5 h-3.5 text-red-600" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">Missing: <strong className="text-foreground">{skill}</strong>.</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="bg-background border border-border rounded-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-12 bg-muted/50 p-4 border-b border-border text-sm font-medium text-muted-foreground">
                                        <div className="col-span-5">Skill</div>
                                        <div className="col-span-3 text-center">Relevance</div>
                                        <div className="col-span-3 text-center">Status</div>
                                        <div className="col-span-1"></div>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {/* Hard Skills */}
                                        {roleData.hardSkills.map((skill: string) => {
                                            const isMissing = results.missingKeySkills.includes(skill);
                                            return (
                                                <div key={skill} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-muted/30">
                                                    <div className="col-span-5 font-medium">{skill}</div>
                                                    <div className="col-span-3 text-center">High</div>
                                                    <div className="col-span-3 text-center">
                                                        {isMissing ? (
                                                            <span className="text-red-500 text-xs bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">Missing</span>
                                                        ) : (
                                                            <span className="text-green-500 text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Found</span>
                                                        )}
                                                    </div>
                                                    <div className="col-span-1">
                                                        {isMissing ? <X className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-green-500" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'ats' && (
                                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                                    {[
                                        { label: "File Format", status: "pass", desc: "PDF is preferred. OCR readable." },
                                        { label: "Searchable Text", status: "pass", desc: "Text is selectable and not flattened." },
                                        { label: "Section Headings", status: "pass", desc: "Standard headers (Education, Experience) found." },
                                        { label: "Date Formatting", status: "warn", desc: "Use 'Month Year' format consistently (e.g., Nov 2023)." },
                                        { label: "Contact Info", status: "pass", desc: "Email and Phone found." }
                                    ].map((check, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl bg-background">
                                            <div>
                                                <h4 className="font-medium">{check.label}</h4>
                                                <p className="text-sm text-muted-foreground">{check.desc}</p>
                                            </div>
                                            <div>
                                                {check.status === 'pass' && <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 text-xs font-medium rounded-full border border-green-200 dark:border-green-900">Pass</span>}
                                                {check.status === 'warn' && <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 text-xs font-medium rounded-full border border-yellow-200 dark:border-yellow-900">Warning</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
