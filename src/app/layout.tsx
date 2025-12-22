import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
    display: 'swap',
    weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
    title: "Off-Radar | The Real Truth About Tech Salaries & Job Offers",
    description: "Decode your job offer with Off-Radar. Compare real in-hand salaries, verify company culture signals, and calculate true ROI. Built for India's engineering talent to make informed career decisions.",
    keywords: ["CTC Calculator", "Tech Salaries India", "Job Offer Comparison", "In-hand Salary", "Startup vs MNC", "Engineering Careers", "Off-Radar"],
    icons: {
        icon: '/icon.png',
        apple: '/apple-icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body suppressHydrationWarning className={cn(
                "min-h-screen bg-background font-sans antialiased",
                inter.variable,
                jakarta.variable
            )}>
                {children}
            </body>
        </html>
    );
}
