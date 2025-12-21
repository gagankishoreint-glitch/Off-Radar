"use client";

import React, { useMemo, useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragEndEvent,
    DragStartEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Block, BlockType } from '@/types/editor';
import { useDocumentStore } from '@/store/use-document-store';
import { SortableBlock } from './sortable-block';
import { BlockTypeSelector } from './block-type-selector';

interface BlockEditorProps {
    documentId: string;
}

export function BlockEditor({ documentId }: BlockEditorProps) {
    const document = useDocumentStore((state) => state.documents[documentId]);
    const reorderBlocks = useDocumentStore((state) => state.reorderBlocks);
    const addBlock = useDocumentStore((state) => state.addBlock);

    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const blocks = document?.blocks || [];
    const blockIds = useMemo(() => blocks.map((block) => block.id), [blocks]);

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            reorderBlocks(documentId, active.id as string, over.id as string);
        }
        setActiveId(null);
    }

    if (!document) return <div>Document not found</div>;

    return (
        <div className="max-w-3xl mx-auto py-12 px-8 min-h-screen pb-40">
            <h1
                className="text-4xl font-bold mb-8 outline-none placeholder:text-gray-300"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => useDocumentStore.getState().updateDocument(documentId, { title: e.currentTarget.textContent || '' })}
            >
                {document.title}
            </h1>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={blockIds}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-1">
                        {blocks.map((block) => (
                            <SortableBlock key={block.id} block={block} documentId={documentId} />
                        ))}
                    </div>
                </SortableContext>

                {/* Placeholder for Drag Overlay if needed for smooth animations */}
                <DragOverlay>
                    {activeId ? (
                        // Simplified overlay for performance
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded opacity-50 border border-blue-500">
                            Dragging...
                        </div>
                    ) : null}
                </DragOverlay>

            </DndContext>

            {/* Click to add block at bottom */}
            <div
                className="flex items-center text-gray-400 hover:text-gray-600 cursor-pointer mt-4"
                onClick={() => addBlock(documentId, 'paragraph')}
            >
                <span className="mr-2">+</span> Click to add a block
            </div>
        </div>
    );
}
