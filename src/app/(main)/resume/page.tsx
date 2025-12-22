"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertTriangle, XCircle, Search, Sparkles, ArrowRight, Loader2, Download, Building2, Target, ChevronRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Simulated Target Data
const TARGET_PRESETS = {
    'google': {
        name: 'Google',
        role: 'Software Engineer, Early Career',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
        hardSkills: ['Data Structures', 'Algorithms', 'System Design', 'C++', 'Java', 'Distributed Systems', 'Linux'],
        softSkills: ['Problem Solving', 'Adaptability', 'Googliness', 'Collaboration'],
        keywords: ['Scalability', 'Performance', 'Optimization', 'Cloud']
    },
    'amazon': {
        name: 'Amazon',
        role: 'SDE I',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
        hardSkills: ['Java', 'Object Oriented Programming', 'AWS', 'DynamoDB', 'Microservices'],
        softSkills: ['Customer Obsession', 'Ownership', 'Bias for Action', 'Deep Dive'],
        keywords: ['Scale', 'Deliver Results', 'Operational Excellence']
    },
    'microsoft': {
        name: 'Microsoft',
        role: 'Software Engineer',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        hardSkills: ['C#', '.NET', 'Azure', 'React', 'TypeScript', 'SQL'],
        softSkills: ['Growth Mindset', 'Teamwork', 'Communication'],
        keywords: ['Enterprise', 'Cloud Native', 'Full Stack']
    },
    'startup': {
        name: 'Generic High-Growth Startup',
        role: 'Full Stack Engineer',
        icon: null,
        hardSkills: ['React', 'Node.js', 'PostgreSQL', 'Next.js', 'TailwindCSS'],
        softSkills: ['Fast-paced', 'Ownership', 'Hustle', 'Wear Many Hats'],
        keywords: ['Ship Fast', 'Product-Led', 'End-to-End']
    }
};

type ScanResult = {
    score: number;
    matchRate: 'Low' | 'Medium' | 'High';
    missingKeySkills: string[];
    missingSoftSkills: string[];
    formattingIssues: string[];
    wordCount: number;
};

export default function ResumeScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [scanProgress, setScanProgress] = useState(0);
    const [selectedTarget, setSelectedTarget] = useState<keyof typeof TARGET_PRESETS>('google');
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
            startScan();
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            startScan();
        }
    };

    const startScan = () => {
        setStatus('scanning');
        setScanProgress(0);

        // Simulation: Calculate a random score based on the target
        // For demo purposes, we'll randomize the "found" skills
        const target = TARGET_PRESETS[selectedTarget];

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 1.5;
            setScanProgress(Math.min(currentProgress, 99));
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            setScanProgress(100);

            // Generate Mock Results
            const randomScore = Math.floor(Math.random() * (85 - 40) + 40); // 40-85 range

            setResults({
                score: randomScore,
                matchRate: randomScore > 75 ? 'High' : randomScore > 50 ? 'Medium' : 'Low',
                missingKeySkills: target.hardSkills.filter(() => Math.random() > 0.5), // Randomly miss 50%
                missingSoftSkills: target.softSkills.filter(() => Math.random() > 0.6),
                formattingIssues: Math.random() > 0.5 ? ['Date format inconsistency', 'Missing LinkedIn URL'] : [],
                wordCount: 450
            });

            setTimeout(() => setStatus('results'), 500);
        }, 6000);
    };

    const reset = () => {
        setFile(null);
        setStatus('idle');
        setResults(null);
        setScanProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const target = TARGET_PRESETS[selectedTarget];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-12 max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
                        AI Resume Scanner
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Simulate an ATS scan against top tech companies. See exactly what recruiters see.
                    </p>
                </div>

                {status === 'idle' && (
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 items-start">

                        {/* 1. Target Selector */}
                        <div className="md:col-span-1 bg-background border border-border rounded-xl p-6 space-y-4 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">Goal Target</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Who are you trying to impress? We'll load their ATS keywords.
                            </p>

                            <div className="space-y-3">
                                {Object.entries(TARGET_PRESETS).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedTarget(key as any)}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                                            selectedTarget === key
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-border hover:bg-muted"
                                        )}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-border shadow-sm flex-shrink-0">
                                            {data.icon ? (
                                                <img src={data.icon} alt={data.name} className="w-6 h-6 object-contain" />
                                            ) : (
                                                <Building2 className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{data.name}</div>
                                            <div className="text-xs text-muted-foreground">{data.role}</div>
                                        </div>
                                        {selectedTarget === key && <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Upload Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "md:col-span-2 relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 h-full flex flex-col justify-center items-center",
                                isDragging
                                    ? "border-primary bg-primary/5 scale-[1.02]"
                                    : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30"
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
                            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                                <Upload className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Upload Resume</h3>
                            <p className="text-muted-foreground mb-6 max-w-sm">
                                Drag & drop your PDF here. We'll analyze it against <strong>{target.name}'s</strong> hiring criteria.
                            </p>
                            <button className="px-8 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity">
                                Select File
                            </button>
                        </motion.div>
                    </div>
                )}

                {status === 'scanning' && (
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

                        <h3 className="text-2xl font-bold mb-2">Extracting Intelligence...</h3>
                        <p className="text-muted-foreground mb-8">Comparing against {target.name} database...</p>

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
                                Analyzing keyword density
                            </div>
                        </div>
                    </div>
                )}

                {status === 'results' && results && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

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
                                        Your resume contains {results.score}% of the keywords typically found in <strong>{target.name}</strong> job descriptions for this role.
                                        With a few tweaks, you can boost this significantly.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
                                            <Target className="w-4 h-4 text-primary" />
                                            <span>Target: {target.role}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
                                            <FileText className="w-4 h-4 text-primary" />
                                            <span>Word Count: {results.wordCount} (Optimal)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 min-w-[200px]">
                                    <button onClick={reset} className="w-full px-4 py-2 border border-input rounded-lg hover:bg-muted font-medium transition-colors text-sm">
                                        Scan New Resume
                                    </button>
                                    <button className="w-full px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 font-medium transition-colors text-sm">
                                        Download Report
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Tabs */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-1 border-b border-border">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={cn(
                                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                        activeTab === 'overview' ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                    )}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('skills')}
                                    className={cn(
                                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                        activeTab === 'skills' ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                    )}
                                >
                                    Skills Match
                                </button>
                                <button
                                    onClick={() => setActiveTab('ats')}
                                    className={cn(
                                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                        activeTab === 'ats' ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                    )}
                                >
                                    Recruiter Checks
                                </button>
                            </div>

                            {activeTab === 'overview' && (
                                <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-background border border-border rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            What You Did Well
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-sm text-muted-foreground">Found <strong>{target.hardSkills.length - results.missingKeySkills.length}/{target.hardSkills.length}</strong> critical hard skills required by {target.name}.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <span className="text-sm text-muted-foreground">Measurable results found (e.g., "Increased by 20%"). Recruiters love this.</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-background border border-border rounded-xl p-6">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-red-500" />
                                            Critical Fixes Used
                                        </h3>
                                        <ul className="space-y-3">
                                            {results.missingKeySkills.slice(0, 3).map(skill => (
                                                <li key={skill} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <X className="w-3.5 h-3.5 text-red-600" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">Missing keyword: <strong className="text-foreground">{skill}</strong>. Highly recommended for this role.</span>
                                                </li>
                                            ))}
                                            {results.formattingIssues.map(issue => (
                                                <li key={issue} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <X className="w-3.5 h-3.5 text-red-600" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">{issue}</span>
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
                                        <div className="col-span-3 text-center">In Job Description</div>
                                        <div className="col-span-3 text-center">In Your Resume</div>
                                        <div className="col-span-1">Status</div>
                                    </div>
                                    <div className="divide-y divide-border">
                                        {/* Hard Skills */}
                                        {target.hardSkills.map(skill => {
                                            const isMissing = results.missingKeySkills.includes(skill);
                                            return (
                                                <div key={skill} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-muted/30">
                                                    <div className="col-span-5 font-medium">{skill} <span className="text-xs text-muted-foreground font-normal ml-2">(Hard Skill)</span></div>
                                                    <div className="col-span-3 text-center"><div className="w-16 h-2 bg-foreground/20 rounded-full mx-auto" /></div>
                                                    <div className="col-span-3 text-center">
                                                        {isMissing ? (
                                                            <div className="w-4 h-2 bg-red-200 rounded-full mx-auto" />
                                                        ) : (
                                                            <div className="w-16 h-2 bg-green-500 rounded-full mx-auto" />
                                                        )}
                                                    </div>
                                                    <div className="col-span-1">
                                                        {isMissing ? <X className="w-5 h-5 text-red-500" /> : <Check className="w-5 h-5 text-green-500" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* Soft Skills */}
                                        {target.softSkills.map(skill => {
                                            const isMissing = results.missingSoftSkills.includes(skill);
                                            return (
                                                <div key={skill} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-muted/30">
                                                    <div className="col-span-5 font-medium">{skill} <span className="text-xs text-muted-foreground font-normal ml-2">(Soft Skill)</span></div>
                                                    <div className="col-span-3 text-center"><div className="w-12 h-2 bg-foreground/20 rounded-full mx-auto" /></div>
                                                    <div className="col-span-3 text-center">
                                                        {isMissing ? "-" : <div className="w-12 h-2 bg-green-500 rounded-full mx-auto" />}
                                                    </div>
                                                    <div className="col-span-1">
                                                        {isMissing ? <AlertTriangle className="w-5 h-5 text-yellow-500" /> : <Check className="w-5 h-5 text-green-500" />}
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
                                        { label: "Job Titles", status: "pass", desc: "Clear job titles matched to standard hierarchy." },
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
