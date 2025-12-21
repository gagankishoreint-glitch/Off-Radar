"use client";

import { useState } from 'react';
import { COMPANIES, Company, Major, ALL_DOMAINS, ALL_ROLE_TYPES } from '@/lib/company-data';
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

        return matchesMajor && matchesSearch && matchesLocation &&
            matchesCompanyType && matchesDifficulty && matchesDomain && matchesInternFriendly;
    });

    const hasActiveFilters = locationFilter !== 'All' ||
        companyTypeFilter !== 'All' || difficultyFilter !== 'All' ||
        domainFilter !== 'All' || internFriendlyFilter !== null;

    const clearAllFilters = () => {
        setLocationFilter('All');
        setCompanyTypeFilter('All');
        setDifficultyFilter('All');
        setDomainFilter('All');
        setInternFriendlyFilter(null);
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

                {/* Company Cards */}
                <div className="grid gap-4">
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

// Company Card Component
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
        <div className="bg-card border border-border rounded-xl p-6 hover:border-foreground/20 transition-colors">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{company.name}</h3>
                        {company.internFriendly && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                Intern Friendly
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">{company.description}</p>
                </div>

                {/* Salary */}
                <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-foreground">
                        ₹{company.salary.minLPA} - {company.salary.maxLPA} LPA
                    </div>
                    <div className="text-xs text-muted-foreground">
                        ~{company.salary.inHandPercent}% in-hand
                    </div>
                </div>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                </span>
                <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {company.companyType}
                </span>
                <span className={`flex items-center gap-1 ${getDifficultyStyle(company.difficulty)}`}>
                    <TrendingUp className="w-4 h-4" />
                    {company.difficulty}
                </span>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getWLBStyle(company.culture.wlb)}`}>
                    <Clock className="w-3 h-3" />
                    WLB: {company.culture.wlb}
                </span>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2 mb-4">
                {company.majors.map(m => (
                    <span key={m} className="px-2 py-1 text-xs bg-muted rounded-lg text-foreground font-medium">
                        {m}
                    </span>
                ))}
                {company.domains.slice(0, 3).map(d => (
                    <span key={d} className="px-2 py-1 text-xs bg-muted/50 rounded-lg text-muted-foreground">
                        {d}
                    </span>
                ))}
            </div>

            {/* Expand/Collapse Button */}
            <button
                onClick={onToggle}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {isExpanded ? 'Show less' : 'Why this company?'}
            </button>

            {/* Expanded Content */}
            {isExpanded && company.whyJoin && (
                <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Why Join?</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                        {company.whyJoin.map((reason, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                {reason}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground">Role Types: </span>
                            <span className="text-foreground">{company.roleTypes.join(', ')}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Learning: </span>
                            <span className="text-foreground">{company.culture.learning}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
