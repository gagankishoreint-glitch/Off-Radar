import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Block, BlockType, Document } from '@/types/editor';
import { nanoid } from 'nanoid';

interface DocumentState {
    documents: Record<string, Document>;
    currentDocumentId: string | null;

    // Actions
    createDocument: (title?: string) => string;
    updateDocument: (id: string, updates: Partial<Document>) => void;
    deleteDocument: (id: string) => void;
    setCurrentDocument: (id: string) => void;

    // Block Actions
    addBlock: (documentId: string, type: BlockType, afterBlockId?: string) => void;
    updateBlock: (documentId: string, blockId: string, content: string, properties?: any) => void;
    deleteBlock: (documentId: string, blockId: string) => void;
    reorderBlocks: (documentId: string, activeId: string, overId: string) => void;
}

const DEFAULT_BLOCKS: Block[] = [
    { id: '1', type: 'heading-1', content: 'Welcome to Off-Radar', parentId: null },
    { id: '2', type: 'paragraph', content: 'Start comparing your offers...', parentId: null },
];

const DEFAULT_DOCUMENT: Document = {
    id: 'default',
    title: 'Welcome to Off-Radar',
    icon: null,
    coverImage: null,
    blocks: DEFAULT_BLOCKS,
    createdAt: Date.now(),
    updatedAt: Date.now(),
};

export const useDocumentStore = create<DocumentState>()(
    persist(
        (set, get) => ({
            documents: {
                'default': DEFAULT_DOCUMENT
            },
            currentDocumentId: 'default',

            createDocument: (title = 'Untitled') => {
                const id = nanoid();
                const newDoc: Document = {
                    id,
                    title,
                    icon: null,
                    coverImage: null,
                    blocks: [{ id: nanoid(), type: 'paragraph', content: '', parentId: null }],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                set((state) => ({
                    documents: { ...state.documents, [id]: newDoc },
                    currentDocumentId: id,
                }));
                return id;
            },

            updateDocument: (id, updates) => {
                set((state) => ({
                    documents: {
                        ...state.documents,
                        [id]: { ...state.documents[id], ...updates }
                    }
                }));
            },

            deleteDocument: (id) => {
                set((state) => {
                    const newDocs = { ...state.documents };
                    delete newDocs[id];
                    return { documents: newDocs, currentDocumentId: state.currentDocumentId === id ? null : state.currentDocumentId };
                });
            },

            setCurrentDocument: (id) => set({ currentDocumentId: id }),

            addBlock: (documentId, type, afterBlockId) => {
                set((state) => {
                    const doc = state.documents[documentId];
                    if (!doc) return state;

                    const newBlock: Block = {
                        id: nanoid(),
                        type,
                        content: '',
                        parentId: null,
                    };

                    const blocks = [...doc.blocks];
                    const index = afterBlockId ? blocks.findIndex(b => b.id === afterBlockId) : blocks.length - 1;

                    blocks.splice(index + 1, 0, newBlock);

                    return {
                        documents: {
                            ...state.documents,
                            [documentId]: { ...doc, blocks }
                        }
                    };
                });
            },

            updateBlock: (documentId, blockId, content, properties) => {
                set((state) => {
                    const doc = state.documents[documentId];
                    if (!doc) return state;

                    const blocks = doc.blocks.map(b =>
                        b.id === blockId ? { ...b, content, properties: { ...b.properties, ...properties } } : b
                    );

                    return {
                        documents: {
                            ...state.documents,
                            [documentId]: { ...doc, blocks }
                        }
                    };
                });
            },

            deleteBlock: (documentId, blockId) => {
                set((state) => {
                    const doc = state.documents[documentId];
                    if (!doc) return state;

                    const blocks = doc.blocks.filter(b => b.id !== blockId);

                    return {
                        documents: {
                            ...state.documents,
                            [documentId]: { ...doc, blocks }
                        }
                    };
                });
            },

            reorderBlocks: (documentId, activeId, overId) => {
                set((state) => {
                    const doc = state.documents[documentId];
                    if (!doc) return state;

                    const oldIndex = doc.blocks.findIndex(b => b.id === activeId);
                    const newIndex = doc.blocks.findIndex(b => b.id === overId);

                    if (oldIndex === -1 || newIndex === -1) return state;

                    const newBlocks = [...doc.blocks];
                    const [movedBlock] = newBlocks.splice(oldIndex, 1);
                    newBlocks.splice(newIndex, 0, movedBlock);

                    return {
                        documents: {
                            ...state.documents,
                            [documentId]: { ...doc, blocks: newBlocks }
                        }
                    };
                });
            }

        }),
        {
            name: 'offradar-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
