import { HorizontalNav } from "@/components/layout/horizontal-nav";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <HorizontalNav />
            <main className="flex-1 overflow-auto bg-white dark:bg-[#191919]">
                {children}
            </main>
        </div>
    );
}
