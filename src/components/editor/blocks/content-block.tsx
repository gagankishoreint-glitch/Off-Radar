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
            return (
                <div className="my-6 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-muted p-4 text-sm font-medium text-muted-foreground border-b border-border">
                        <div className="col-span-1">Metric</div>
                        <div className="col-span-1 text-center font-bold text-foreground">{data.companyA || 'Company A'}</div>
                        <div className="col-span-1 text-center font-bold text-foreground">{data.companyB || 'Company B'}</div>
                    </div>
                    {/* Rows */}
                    <div className="divide-y divide-border">
                        {data.metrics?.map((metric: any, i: number) => (
                            <div key={i} className={cn("grid grid-cols-3 p-4 items-center text-sm", metric.highlight && "bg-green-50 dark:bg-green-900/10")}>
                                <div className="col-span-1 font-medium text-muted-foreground flex items-center gap-2">
                                    {metric.label === 'Monthly In-Hand' && <DollarSign className="w-4 h-4 text-green-600" />}
                                    {metric.label}
                                </div>
                                <div className={cn("col-span-1 text-center font-mono", metric.highlight && "text-green-700 dark:text-green-400 font-bold")}>
                                    {metric.valueA}
                                </div>
                                <div className={cn("col-span-1 text-center font-mono", metric.highlight && "text-green-700 dark:text-green-400 font-bold")}>
                                    {metric.valueB}
                                </div>
                            </div>
                        ))}
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
