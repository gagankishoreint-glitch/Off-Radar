"use client";

import { useState } from 'react';
import { COMPANIES, Company, Major, Level, ALL_DOMAINS, ALL_ROLE_TYPES } from '@/lib/company-data';
import { useUserStore } from '@/store/use-user-store';
import { ChevronDown, ChevronUp, Bookmark, Star, MapPin, Building2, GraduationCap, Briefcase, Filter, X, Users, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CompaniesPage() {
    // Main filters
    const [majorFilter, setMajorFilter] = useState<'All' | Major>('All');
    const [search, setSearch] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

    // Advanced filters
    const [locationFilter, setLocationFilter] = useState<string>('All');
    const [companyTypeFilter, setCompanyTypeFilter] = useState<string>('All');
    const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
    const [domainFilter, setDomainFilter] = useState<string>('All');
    const [internFriendlyFilter, setInternFriendlyFilter] = useState<boolean | null>(null);
    const [levelFilter, setLevelFilter] = useState<string>('All');

    const { isLoggedIn } = useUserStore();

    // Filter companies
    const filtered = COMPANIES.filter(c => {
        const matchesMajor = majorFilter === 'All' || c.majors.includes(majorFilter);
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = locationFilter === 'All' || c.location === locationFilter;
        const matchesCompanyType = companyTypeFilter === 'All' || c.companyType === companyTypeFilter;
        const matchesDifficulty = difficultyFilter === 'All' || c.difficulty === difficultyFilter;
        const matchesDomain = domainFilter === 'All' || c.domains.includes(domainFilter);
        const matchesInternFriendly = internFriendlyFilter === null || c.internFriendly === internFriendlyFilter;
        const matchesLevel = levelFilter === 'All' || (c.levels && c.levels.includes(levelFilter as Level));

        return matchesMajor && matchesSearch && matchesLocation &&
            matchesCompanyType && matchesDifficulty && matchesDomain && matchesInternFriendly && matchesLevel;
    });

    const hasActiveFilters = locationFilter !== 'All' ||
        companyTypeFilter !== 'All' || difficultyFilter !== 'All' ||
        domainFilter !== 'All' || internFriendlyFilter !== null || levelFilter !== 'All';

    const clearAllFilters = () => {
        setLocationFilter('All');
        setCompanyTypeFilter('All');
        setDifficultyFilter('All');
        setDomainFilter('All');
        setInternFriendlyFilter(null);
        setLevelFilter('All');
    };

    const toggleCardExpand = (id: string) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedCards(newExpanded);
    };

    // Get domains based on selected major
    const getRelevantDomains = () => {
        if (majorFilter === 'All') return ALL_DOMAINS;
        const domains = COMPANIES.filter(c => c.majors.includes(majorFilter)).flatMap(c => c.domains);
        return Array.from(new Set(domains)).sort();
    };

    // WLB color styling
    const getWLBStyle = (wlb: string) => {
        switch (wlb) {
            case 'Green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Red': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-muted text-muted-foreground';
        }
    };


    // Difficulty styling
    const getDifficultyStyle = (difficulty: string) => {
        switch (difficulty) {
            case 'Hard': return 'text-red-600 dark:text-red-400';
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
            case 'Easy': return 'text-green-600 dark:text-green-400';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
                <h1 className="text-4xl font-heading font-bold mb-2 text-foreground">Explore Companies</h1>
                <p className="text-muted-foreground mb-8">Discover opportunities in Tech, Electronics, Power, and Core Engineering.</p>

                {/* Search + Major Tabs */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {(['All', 'CS', 'ECE', 'EEE', 'Core'] as const).map(m => (
                            <button
                                key={m}
                                onClick={() => {
                                    setMajorFilter(m);
                                    setDomainFilter('All'); // Reset domain when major changes
                                }}
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${majorFilter === m
                                    ? 'bg-foreground text-background'
                                    : 'border border-border text-foreground hover:bg-muted'
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Advanced Filters Toggle */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        Advanced Filters
                        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {hasActiveFilters && (
                            <span className="px-2 py-0.5 bg-foreground text-background text-xs rounded-full">Active</span>
                        )}
                    </button>

                    {showAdvanced && (
                        <div className="mt-4 p-5 bg-muted/50 rounded-xl border border-border">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                                {/* Location */}
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Location</label>
                                    <select
                                        value={locationFilter}
                                        onChange={e => setLocationFilter(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                    >
                                        <option value="All">All Locations</option>
                                        <option value="India">India</option>
                                        <option value="Global">Global</option>
                                    </select>
                                </div>

                                {/* Company Type */}
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Company Type</label>
                                    <select
                                        value={companyTypeFilter}
                                        onChange={e => setCompanyTypeFilter(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                    >
                                        <option value="All">All Types</option>
                                        <option value="Product">Product</option>
                                        <option value="Startup">Startup</option>
                                        <option value="Service">Service</option>
                                        <option value="PSU">PSU</option>
                                    </select>
                                </div>

                                {/* Domain */}
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Domain</label>
                                    <select
                                        value={domainFilter}
                                        onChange={e => setDomainFilter(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                    >
                                        <option value="All">All Domains</option>
                                        {getRelevantDomains().map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Difficulty */}
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Difficulty</label>
                                    <select
                                        value={difficultyFilter}
                                        onChange={e => setDifficultyFilter(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                    >
                                        <option value="All">All Levels</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>

                                {/* Intern Friendly */}
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Intern Friendly</label>
                                    <select
                                        value={internFriendlyFilter === null ? 'All' : internFriendlyFilter ? 'Yes' : 'No'}
                                        onChange={e => {
                                            if (e.target.value === 'All') setInternFriendlyFilter(null);
                                            else setInternFriendlyFilter(e.target.value === 'Yes');
                                        }}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                    >
                                        <option value="All">All</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                {/* Level Filter */}
                                <div>
                                    <label className="text-xs text-muted-foreground mb-1 block">Level</label>
                                    <select
                                        value={levelFilter}
                                        onChange={e => setLevelFilter(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                                    >
                                        <option value="All">All Levels</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Entry Level">Entry Level</option>
                                        <option value="Mid Level">Mid Level</option>
                                        <option value="Senior">Senior</option>
                                        <option value="Principal">Principal</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Director">Director</option>
                                        <option value="Executive">Executive</option>
                                    </select>
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                >
                                    <X className="w-3 h-3" /> Clear all filters
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground mb-6">
                    Showing {filtered.length} companies
                </p>

                {/* Company Cards - 3 Column Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <p className="text-lg mb-2">No companies found matching your criteria.</p>
                            <button onClick={clearAllFilters} className="text-foreground underline">Clear all filters</button>
                        </div>
                    ) : (
                        filtered.map(company => (
                            <CompanyCard
                                key={company.id}
                                company={company}
                                isExpanded={expandedCards.has(company.id)}
                                onToggle={() => toggleCardExpand(company.id)}
                                getWLBStyle={getWLBStyle}
                                getDifficultyStyle={getDifficultyStyle}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// Company Card Component - Compact Design
function CompanyCard({
    company,
    isExpanded,
    onToggle,
    getWLBStyle,
    getDifficultyStyle
}: {
    company: Company;
    isExpanded: boolean;
    onToggle: () => void;
    getWLBStyle: (wlb: string) => string;
    getDifficultyStyle: (d: string) => string;
}) {
    return (
        <Link href={`/companies/${company.id}`} className="block">
            <div className="bg-card border border-border rounded-lg p-5 hover:border-foreground/20 hover:shadow-md transition-all cursor-pointer">
                {/* Compact Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-foreground truncate">{company.name}</h3>
                            {company.internFriendly && (
                                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shrink-0">
                                    Intern
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{company.description}</p>
                    </div>

                    {/* Compact Salary */}
                    <div className="text-right shrink-0">
                        <div className="text-base font-bold text-foreground whitespace-nowrap">
                            ₹{company.salary.minLPA}-{company.salary.maxLPA}L
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                            ~{company.salary.inHandPercent}% in-hand
                        </div>
                    </div>
                </div>

                {/* Compact Info Row */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {company.companyType}
                    </span>
                    <span className={`flex items-center gap-1 ${getDifficultyStyle(company.difficulty)}`}>
                        <TrendingUp className="w-3 h-3" />
                        {company.difficulty}
                    </span>
                    <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${getWLBStyle(company.culture.wlb)}`}>
                        <Clock className="w-3 h-3" />
                        {company.culture.wlb}
                    </span>
                </div>

                {/* Compact Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {company.majors.map(m => (
                        <span key={m} className="px-1.5 py-0.5 text-[10px] bg-muted rounded text-foreground font-medium">
                            {m}
                        </span>
                    ))}
                    {company.domains.slice(0, 2).map(d => (
                        <span key={d} className="px-1.5 py-0.5 text-[10px] bg-muted/50 rounded text-muted-foreground">
                            {d}
                        </span>
                    ))}
                </div>

                {/* Expand Button */}
                <button
                    onClick={(e) => { e.preventDefault(); onToggle(); }}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {isExpanded ? 'Less' : 'Why join?'}
                </button>

                {/* Expanded Content */}
                {isExpanded && company.whyJoin && (
                    <div className="mt-3 pt-3 border-t border-border">
                        <ul className="grid md:grid-cols-2 gap-1.5">
                            {company.whyJoin.map((reason, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                    <span className="text-green-500 mt-0.5 text-[10px]">•</span>
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Link>
    );
}
