"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDocumentStore } from "@/store/use-document-store";
import { useUserStore } from "@/store/use-user-store";
import { useTheme } from "@/store/use-theme-store";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Settings, ChevronLeft, Menu, Radar, Scale, TrendingUp, Sun, Moon, LogOut, User } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
    const documents = useDocumentStore((state) => state.documents);
    const { isLoggedIn, username, logout } = useUserStore();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (collapsed) {
        return (
            <div className="h-screen w-12 border-r bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-4">
                <button onClick={() => setCollapsed(false)}><Menu className="h-4 w-4" /></button>
            </div>
        )
    }

    return (
        <div className={cn("h-screen border-r bg-gray-50 dark:bg-gray-900 flex flex-col w-64 transition-all duration-300")}>
            <div className="p-4 flex items-center justify-between">
                <Link href="/" className="font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Radar className="w-5 h-5 text-indigo-600" />
                    <span>Off-Radar</span>
                </Link>
                <button onClick={() => setCollapsed(true)} className="text-gray-400 hover:text-gray-600">
                    <ChevronLeft className="h-4 w-4" />
                </button>
            </div>

            {/* User Info & Controls */}
            {isLoggedIn && (
                <div className="px-3 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-sm font-medium truncate flex-1">{username}</span>
                    </div>
                </div>
            )}

            <div className="px-3 mb-2">
                <Link href="/companies" className="w-full block mb-2">
                    <Button
                        className={cn(
                            "w-full justify-start",
                            pathname?.includes('/companies')
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        )}
                    >
                        <Scale className="mr-2 h-4 w-4" /> Explore Companies
                    </Button>
                </Link>

                <Link href="/trends" className="w-full block mb-2">
                    <Button
                        className={cn(
                            "w-full justify-start",
                            pathname?.includes('/trends')
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        )}
                    >
                        <TrendingUp className="mr-2 h-4 w-4" /> Market Trends
                    </Button>
                </Link>

                {isLoggedIn && (
                    <Link href="/dashboard" className="w-full block mb-4">
                        <Button
                            className={cn(
                                "w-full justify-start",
                                pathname?.includes('/dashboard')
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                            )}
                        >
                            <FileText className="mr-2 h-4 w-4" /> My Dashboard
                        </Button>
                    </Link>
                )}

                <div className="text-xs font-semibold text-gray-400 mb-2 ml-1">YOUR COMPARISONS</div>
            </div>

            <div className="flex-1 overflow-y-auto px-3">
                <div className="space-y-1">
                    {Object.values(documents).map((doc) => (
                        <Link key={doc.id} href={`/app/${doc.id}`}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-8 px-2 font-normal truncate",
                                    pathname === `/app/${doc.id}` && "bg-gray-200 dark:bg-gray-800 font-medium"
                                )}
                            >
                                <div className="mr-2">{doc.icon || <FileText className="h-4 w-4 text-gray-400" />}</div>
                                <span className="truncate">{doc.title || "Untitled"}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 dark:text-gray-300"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? (
                        <>
                            <Sun className="mr-2 h-4 w-4" />
                            Light Mode
                        </>
                    ) : (
                        <>
                            <Moon className="mr-2 h-4 w-4" />
                            Dark Mode
                        </>
                    )}
                </Button>

                {/* Logout */}
                {isLoggedIn && (
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
}
