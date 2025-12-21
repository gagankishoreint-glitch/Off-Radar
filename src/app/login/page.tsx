"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { Radar } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const { login } = useUserStore();
    const router = useRouter();

    const handleDemoLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && email) {
            login(username, email, false);
            router.push("/dashboard");
        }
    };

    const handleGuestLogin = () => {
        login("Guest User", "guest@offradar.demo", true);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <Radar className="w-8 h-8" />
                    <span className="font-heading font-bold text-2xl">Off-Radar</span>
                </div>

                {/* Demo Mode Banner */}
                <div className="bg-muted p-4 rounded-lg mb-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Demo Mode</strong> — This is a prototype. No real authentication or data storage.
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-background border border-border rounded-xl p-8">
                    <h1 className="text-2xl font-heading font-bold text-center mb-6 text-foreground">
                        Welcome back
                    </h1>

                    <form onSubmit={handleDemoLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter any username"
                                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter any email"
                                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!username || !email}
                            className="w-full py-3 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign in (Demo)
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background text-muted-foreground">or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGuestLogin}
                        className="w-full py-3 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors"
                    >
                        Continue as Guest
                    </button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Guest sessions are temporary and data won't be saved after closing the tab.
                    </p>
                </div>
            </div>
        </div>
    );
}
