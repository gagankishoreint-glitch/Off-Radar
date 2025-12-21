import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from '@/types/editor';
import { ContentBlock } from './blocks/content-block';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils'; // Make sure utils exists

interface SortableBlockProps {
    block: Block;
    documentId: string;
}

export function SortableBlock({ block, documentId }: SortableBlockProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : 'auto',
        position: 'relative' as 'relative', // cast for types
    };

    return (
        <div ref={setNodeRef} style={style} className="group flex items-start -ml-8 py-1 space-x-2">
            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="mt-1.5 p-0.5 rounded cursor-grab opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 select-none transition-opacity"
            >
                <GripVertical size={16} />
            </div>

            <div className="flex-1 min-w-0">
                <ContentBlock block={block} documentId={documentId} />
            </div>
        </div>
    );
}
