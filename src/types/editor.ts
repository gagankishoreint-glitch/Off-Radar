export type BlockType =
    | 'paragraph'
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'bullet-list'
    | 'numbered-list'
    | 'todo'
    | 'quote'
    | 'code'
    | 'image'
    | 'divider'
    | 'comparison-card'
    | 'verdict-card';

export interface Block {
    id: string;
    type: BlockType;
    content: string; // HTML string or JSON
    properties?: {
        checked?: boolean;
        language?: string;
        url?: string;
        caption?: string;
        [key: string]: any;
    };
    parentId: string | null;
    children?: Block[]; // Virtual property for rendering, flat list in store
}

export interface Document {
    id: string;
    title: string;
    icon: string | null;
    coverImage: string | null;
    blocks: Block[];
    createdAt: number;
    updatedAt: number;
}

export interface Workspace {
    id: string;
    name: string;
    documents: string[]; // Document IDs
}
