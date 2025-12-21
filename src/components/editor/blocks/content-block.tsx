import React, { useEffect, useRef } from 'react';
import { Block } from '@/types/editor';
import { useDocumentStore } from '@/store/use-document-store';
import { cn } from '@/lib/utils';
import { CheckSquare, Square, ArrowRight, DollarSign } from 'lucide-react';

interface ContentBlockProps {
    block: Block;
    documentId: string;
}

export function ContentBlock({ block, documentId }: ContentBlockProps) {
    const updateBlock = useDocumentStore((state) => state.updateBlock);
    const addBlock = useDocumentStore((state) => state.addBlock);
    const deleteBlock = useDocumentStore((state) => state.deleteBlock);

    const contentRef = useRef<HTMLElement>(null);

    // Sync content from store on initial load or if changed externally
    // Note: simpler approach. In prod, need careful cursor management.
    useEffect(() => {
        if (contentRef.current && contentRef.current.innerText !== block.content) {
            // contentRef.current.innerText = block.content; 
            // Warn: setting InnerText destroys cursor. 
            // For this MVP, we rely on React's suppression and only update if empty?
            // Actually, let's just render children once and let onInput handle it.
            // This is the hard part of ContentEditable. 
            // Simplified: Only set if strictly different to avoid loop, but Cursor jump issues ensue.
        }
    }, [block.content]);


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addBlock(documentId, 'paragraph', block.id);
            // Focus will need to move to next block. 
            // We can implement a focus manager later or use a simple timeout.
        }
        if (e.key === 'Backspace' && (!block.content || block.content === '')) {
            e.preventDefault();
            deleteBlock(documentId, block.id);
        }
        if (e.key === '/') {
            // Trigger slash command (MVP: just log)
            console.log('Slash command triggered');
        }
    };

    const handleChange = (e: React.FormEvent<HTMLElement>) => {
        const newContent = e.currentTarget.innerText; // Use innerText for plain text for now, or innerHTML
        updateBlock(documentId, block.id, newContent);
    };

    // Render logic based on type
    if (block.type === 'todo') {
        return (
            <div className="flex items-start space-x-2">
                <button
                    contentEditable={false}
                    className="mt-1 text-primary cursor-pointer"
                    onClick={() => updateBlock(documentId, block.id, block.content, { checked: !block.properties?.checked })}
                >
                    {block.properties?.checked ? <CheckSquare size={18} /> : <Square size={18} />}
                </button>
                <p
                    ref={contentRef as any}
                    className={cn("outline-none break-words min-h-[1.5em]", block.properties?.checked && "line-through text-gray-500")}
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={handleKeyDown}
                    onInput={handleChange}
                >
                    {block.content}
                </p>
            </div>
        )
    }

    if (block.type === 'divider') {
        return <hr className="my-4 border-gray-200 dark:border-gray-800 select-none" />
    }

    if (block.type === 'image') {
        /* Placeholder for image block */
        return (
            <div className="bg-gray-100 p-8 rounded text-center text-gray-500">
                Image Block Placeholder
            </div>
        )
    }

    if (block.type === 'comparison-card') {
        try {
            const data = JSON.parse(block.content);
            const metrics = data.metrics || [];

            // Calculate winner for salary
            const salaryMetric = metrics.find((m: any) => m.label === 'CTC');
            const parseValue = (val: string) => parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
            const aWins = salaryMetric ? parseValue(salaryMetric.valueA) > parseValue(salaryMetric.valueB) : false;

            return (
                <div className="my-8 space-y-6">
                    {/* Hero Comparison Header */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Company A Card */}
                        <div className={cn(
                            "relative p-6 rounded-2xl border-2 transition-all",
                            aWins ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-border bg-card"
                        )}>
                            {aWins && (
                                <div className="absolute -top-3 left-6">
                                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                                        HIGHER PAY
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {data.companyA?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{data.companyA || 'Company A'}</h3>
                                    <p className="text-xs text-muted-foreground">Offer Package</p>
                                </div>
                            </div>

                            {/* Metrics for A */}
                            <div className="space-y-3">
                                {metrics.map((metric: any, i: number) => (
                                    <div key={`a-${i}`} className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                                        <span className={cn(
                                            "font-bold font-mono text-base",
                                            metric.highlight && "text-green-600 dark:text-green-400"
                                        )}>
                                            {metric.valueA}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Company B Card */}
                        <div className={cn(
                            "relative p-6 rounded-2xl border-2 transition-all",
                            !aWins ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-border bg-card"
                        )}>
                            {!aWins && (
                                <div className="absolute -top-3 left-6">
                                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <ArrowRight className="w-3 h-3 rotate-[-45deg]" />
                                        HIGHER PAY
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-orange-600">
                                        {data.companyB?.charAt(0) || 'B'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{data.companyB || 'Company B'}</h3>
                                    <p className="text-xs text-muted-foreground">Offer Package</p>
                                </div>
                            </div>

                            {/* Metrics for B */}
                            <div className="space-y-3">
                                {metrics.map((metric: any, i: number) => (
                                    <div key={`b-${i}`} className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                                        <span className={cn(
                                            "font-bold font-mono text-base",
                                            metric.highlight && "text-green-600 dark:text-green-400"
                                        )}>
                                            {metric.valueB}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visual Comparison Bar */}
                    <div className="bg-muted rounded-xl p-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium text-muted-foreground">Salary Comparison</span>
                        </div>
                        <div className="relative h-8 bg-background rounded-lg overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-blue-500 transition-all flex items-center justify-end pr-2"
                                style={{ width: aWins ? '60%' : '40%' }}
                            >
                                <span className="text-xs font-bold text-white">{data.companyA}</span>
                            </div>
                            <div
                                className="absolute right-0 top-0 h-full bg-orange-500 transition-all flex items-center justify-start pl-2"
                                style={{ width: !aWins ? '60%' : '40%' }}
                            >
                                <span className="text-xs font-bold text-white">{data.companyB}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } catch (e) {
            return <div className="text-red-500">Error rendering comparison card</div>
        }
    }

    // Text Blocks
    const Tag =
        block.type === 'heading-1' ? 'h1' :
            block.type === 'heading-2' ? 'h2' :
                block.type === 'heading-3' ? 'h3' :
                    block.type === 'quote' ? 'blockquote' :
                        block.type === 'code' ? 'pre' :
                            'p';

    const styles = cn(
        "outline-none break-words min-h-[1.5em]",
        block.type === 'heading-1' && "text-3xl font-bold mt-6 mb-2",
        block.type === 'heading-2' && "text-2xl font-semibold mt-5 mb-2",
        block.type === 'heading-3' && "text-xl font-semibold mt-4 mb-2",
        block.type === 'quote' && "border-l-4 border-gray-300 pl-4 italic text-gray-600",
        block.type === 'code' && "bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm",
    );

    return (
        <Tag
            ref={contentRef as any}
            className={styles}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onInput={handleChange}
        >
            {block.content}
        </Tag>
    );
}
