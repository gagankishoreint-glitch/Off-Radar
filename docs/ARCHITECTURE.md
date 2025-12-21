# Architecture Documentation

## System Overview
This is a block-based collaborative workspace application (Notion-lite). It uses a hybrid data approach:
1. **Client**: rich interaction, optimistic updates, local caching (Zustand).
2. **Server**: data persistence, auth (Supabase).

## Data Model

### core types
```typescript
export type BlockType = 'paragraph' | 'heading-1' | 'heading-2' | 'heading-3' | 'bullet-list' | 'numbered-list' | 'to-do' | 'quote' | 'code' | 'image' | 'divider';

export interface Block {
  id: string;
  type: BlockType;
  content: string; // HTML or JSON
  properties?: Record<string, any>; // checked, language, url, etc.
  parentId: string | null; // For nested blocks (like inside columns)
  order: number;
}

export interface Page {
  id: string;
  workspaceId: string;
  title: string;
  icon?: string;
  coverImage?: string;
  createdAt: number;
}
```

## API Routes (Next.js App Router)

- `GET /api/documents/:id` - Fetch page + blocks
- `POST /api/documents` - Create new page
- `PATCH /api/blocks/batch` - Batch update (move/edit) blocks

## Editor Engine
The editor is NOT a single ContentEditable. It is a list of **Block Component** wrappers.
- **BlockWrapper**: Handles drag handle, options menu, and focus management.
- **ContentEditable**: Inside each block for text.

## Persistence Strategy
- **Local**: `localStorage` via Zustand `persist` middleware (for immediate offline demo).
- **Remote**: Async sync to Supabase (Postgres) when online.
