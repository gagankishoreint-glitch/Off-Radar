"use client";

import { useDocumentStore } from '@/store/use-document-store';
import { useParams } from 'next/navigation';
import { ContentBlock } from '@/components/editor/blocks/content-block';
import Link from 'next/link';
import { ArrowLeft, Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComparisonResultPage() {
    const params = useParams();
    const docId = params.docId as string;

    // Get document from store
    const documents = useDocumentStore((state) => state.documents);
    const comparisonDoc = documents[docId];

    if (!comparisonDoc) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-8">
                    {/* Visual Icon */}
                    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 animate-in zoom-in-50 duration-500">
                        <Radar className="w-12 h-12 text-muted-foreground opacity-50" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Comparison Not Found
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed">
                            We couldn't locate this specific comparison.
                            <br className="hidden sm:inline" />
                            Data is stored locally on your device for privacy and may have been cleared.
                        </p>
                    </div>

                    <div className="grid gap-4 pt-4">
                        <Link href="/compare" className="w-full">
                            <Button size="lg" className="w-full gap-2 font-semibold text-base py-6">
                                <ArrowLeft className="w-4 h-4" />
                                Start a New Reality Check
                            </Button>
                        </Link>

                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/trends">
                                <Button variant="outline" className="w-full">
                                    Market Trends
                                </Button>
                            </Link>
                            <Link href="/companies">
                                <Button variant="outline" className="w-full">
                                    Explore Companies
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border mt-8">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-4">
                            Why Off-Radar?
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground text-center">
                            <div className="bg-card p-2 rounded border border-border">
                                🔒 <br />Private
                            </div>
                            <div className="bg-card p-2 rounded border border-border">
                                ⚡ <br />Real Data
                            </div>
                            <div className="bg-card p-2 rounded border border-border">
                                🚫 <br />No BS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="border-b sticky top-0 bg-background/80 backdrop-blur z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/compare" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <span className="font-semibold">{comparisonDoc.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ReadLaterButton docId={docId} />
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                                View Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <main className="space-y-4">
                    {comparisonDoc.blocks.map((block) => (
                        <ContentBlock
                            key={block.id}
                            block={block}
                            documentId={docId}
                            readOnly={true}
                        />
                    ))}
                </main>

                <div className="mt-12 text-center">
                    <Link href="/dashboard">
                        <Button variant="default" className="gap-2">
                            View in Dashboard
                        </Button>
                    </Link>
                    <Link href="/compare">
                        <Button variant="outline" className="gap-2">
                            Compare Other Offers
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Read Later Button Component
function ReadLaterButton({ docId }: { docId: string }) {
    const { readLater, addToReadLater, removeFromReadLater } = useUserStore();
    const isSaved = readLater.includes(docId);

    const handleToggle = () => {
        if (isSaved) {
            removeFromReadLater(docId);
        } else {
            addToReadLater(docId);
        }
    };

    return (
        <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={handleToggle}
        >
            {isSaved ? (
                <>
                    <BookmarkCheck className="w-4 h-4" />
                    Saved
                </>
            ) : (
                <>
                    <Bookmark className="w-4 h-4" />
                    Save to Read Later
                </>
            )}
        </Button>
    );
}
