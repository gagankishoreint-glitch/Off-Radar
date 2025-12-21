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
    title: "Off-Radar",
    description: "The Truth Algorithm for Job Offers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="dark">
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                inter.variable,
                jakarta.variable
            )}>
                {children}
            </body>
        </html>
    );
}
