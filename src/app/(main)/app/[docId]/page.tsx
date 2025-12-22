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
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-xl text-muted-foreground">Comparison not found.</p>
                    <p className="text-sm text-gray-500 max-w-md">
                        The comparison data is stored locally in your browser. If you cleared your cache or switched devices, it may be gone.
                    </p>
                    <Link href="/compare">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Run New Comparison
                        </Button>
                    </Link>
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
                    <Link href="/" className="md:hidden">
                        <Radar className="w-6 h-6" />
                    </Link>
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
