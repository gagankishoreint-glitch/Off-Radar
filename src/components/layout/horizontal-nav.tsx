"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import { useTheme } from "@/store/use-theme-store";
import { Radar, Sun, Moon, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function HorizontalNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, username, logout } = useUserStore();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const navLinks = [
        { href: "/companies", label: "Explore Companies" },
        { href: "/trends", label: "Market Trends" },
        { href: "/calculator", label: "CTC Calculator" },
        ...(isLoggedIn ? [{ href: "/dashboard", label: "My Dashboard" }] : []),
        { href: "/about", label: "About Us" },
        { href: "/compare", label: "Compare Offers" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Radar className="w-6 h-6" />
                        <span className="font-heading font-bold text-xl">Off-Radar</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                    pathname === link.href || pathname?.startsWith(link.href)
                                        ? "text-foreground bg-muted"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-muted transition-colors"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-muted-foreground" />
                            ) : (
                                <Moon className="w-5 h-5 text-muted-foreground" />
                            )}
                        </button>

                        {/* User Info / Auth */}
                        {isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {username}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                        Log in
                                    </span>
                                </Link>
                                <Link href="/companies">
                                    <button className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-muted"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                        pathname === link.href
                                            ? "text-foreground bg-muted"
                                            : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="flex items-center gap-2 px-4 py-2 border-t border-border mt-2 pt-4">
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted"
                                >
                                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    <span className="text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>
                            </div>

                            {isLoggedIn ? (
                                <div className="px-4 py-2 border-t border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span className="text-sm font-medium">{username}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="text-sm font-medium text-muted-foreground"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="px-4 py-2">
                                    <Link href="/companies" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-6 py-3 bg-foreground text-background font-medium rounded-md">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
