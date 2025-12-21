"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/store/use-user-store';
import { useDocumentStore } from '@/store/use-document-store';
import { COMPANIES } from '@/lib/company-data';
import { Bookmark, Clock, Heart, FileText, Building2, LogOut, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const { isLoggedIn, username, logout, savedCompanies, wishlist, readLater, isGuest } = useUserStore();
    const documents = useDocumentStore((state) => state.documents);

    // Only redirect to login if user is not logged in AND not a guest
    useEffect(() => {
        if (!isLoggedIn && !isGuest) {
            router.push('/login');
        }
    }, [isLoggedIn, isGuest, router]);

    // Show loading only for non-guest, non-logged-in users
    if (!isLoggedIn && !isGuest) {
        return <div className="p-8 text-center text-muted-foreground">Redirecting to login...</div>;
    }

    const savedCompanyData = COMPANIES.filter(c => savedCompanies.includes(c.id));
    const wishlistData = COMPANIES.filter(c => wishlist.includes(c.id));
    const readLaterData = Object.values(documents).filter(doc => readLater.includes(doc.id));

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
                {/* Guest Mode Warning */}
                {isGuest && (
                    <div className="mb-8 bg-muted p-4 rounded-lg border border-border">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">
                                    Guest Mode - Data Not Saved
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    You're using Guest Mode. Your saved items will be lost when you close this tab.
                                    <Link href="/login" className="underline font-medium ml-1 text-foreground">Create an account</Link> to keep your data permanently.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-heading font-bold mb-2 text-foreground">Your Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {username}!</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-background p-6 rounded-xl border border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                <Bookmark className="w-5 h-5 text-foreground" />
                            </div>
                            <h3 className="font-medium text-muted-foreground">Saved Companies</h3>
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">{savedCompanies.length}</div>
                    </div>

                    <div className="bg-background p-6 rounded-xl border border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-foreground" />
                            </div>
                            <h3 className="font-medium text-muted-foreground">Wishlist</h3>
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">{wishlist.length}</div>
                    </div>

                    <div className="bg-background p-6 rounded-xl border border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-foreground" />
                            </div>
                            <h3 className="font-medium text-muted-foreground">Read Later</h3>
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground">{readLater.length}</div>
                    </div>
                </div>

                {/* Saved Companies */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2 text-foreground">
                        <Bookmark className="w-6 h-6" />
                        Saved Companies
                    </h2>
                    {savedCompanyData.length === 0 ? (
                        <div className="bg-muted p-8 rounded-xl text-center">
                            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground mb-4">No saved companies yet. Start exploring!</p>
                            <Link href="/companies">
                                <button className="px-6 py-2.5 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors">
                                    Browse Companies
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedCompanyData.map(company => (
                                <Link key={company.id} href={`/companies/${company.id}`}>
                                    <div className="bg-background p-6 rounded-xl border border-border hover:shadow-lg transition-all">
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">{company.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {company.description}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-1 bg-muted text-foreground rounded-full">
                                                {company.tier}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                                                {company.majors.join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Wishlist */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2 text-foreground">
                        <Heart className="w-6 h-6" />
                        Wishlist
                    </h2>
                    {wishlistData.length === 0 ? (
                        <div className="bg-muted p-8 rounded-xl text-center">
                            <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">No companies in your wishlist.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {wishlistData.map(company => (
                                <Link key={company.id} href={`/companies/${company.id}`}>
                                    <div className="bg-background p-6 rounded-xl border border-border hover:shadow-lg transition-all">
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">{company.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            ₹{company.salary.minLPA}-{company.salary.maxLPA} LPA
                                        </p>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Heart className="w-3 h-3 fill-current" /> Dream Company
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Read Later */}
                <div>
                    <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2 text-foreground">
                        <Clock className="w-6 h-6" />
                        Read Later (Comparisons)
                    </h2>
                    {readLaterData.length === 0 ? (
                        <div className="bg-muted p-8 rounded-xl text-center">
                            <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">No saved comparisons.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {readLaterData.map(doc => (
                                <Link key={doc.id} href={`/app/${doc.id}`}>
                                    <div className="bg-background p-6 rounded-xl border border-border hover:shadow-lg transition-all flex items-center gap-4">
                                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-1 text-foreground">{doc.title || 'Untitled Comparison'}</h3>
                                            <p className="text-sm text-muted-foreground">Created {new Date(doc.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
