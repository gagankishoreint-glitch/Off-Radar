# Architecture Documentation

## System Overview
This is a block-based collaborative workspace application (Notion-lite) with **AI-powered career insights**. It uses a hybrid data approach:
1. **Client**: rich interaction, optimistic updates, local caching (Zustand).
2. **Server**: data persistence, auth (Firebase), AI features (Vertex AI).
3. **Backend**: Optional Firebase/GCP integration with graceful fallback to offline mode.

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

## Backend Architecture (New)

### Firebase Services
- **Authentication**: Email/Password + Google OAuth
- **Firestore**: Real-time database for users, resumes, offers, chat sessions
- **Security Rules**: User-scoped data access control

### Google Cloud Platform
- **Vertex AI (Gemini)**: Resume analysis, career recommendations, chatbot
- **Cloud Functions**: Background processing (future)

### Graceful Degradation
- All AI features are **optional enhancements**
- App works fully in offline mode (local storage only)
- Firebase not configured → Regular features work, AI disabled
- Firebase configured → Real-time sync + AI features enabled

## API Routes (Next.js App Router)

### Existing Routes (Enhanced)
- `POST /api/parse-resume` - File upload + optional AI analysis
  - Returns: `{ text, analysis, aiAnalysis?, aiAvailable }`

### New AI Routes
- `POST /api/ai/analyze-resume` - Deep AI resume analysis
- `POST /api/ai/compare-offers` - AI-powered offer comparison
- `POST /api/ai/career-chat` - Conversational career advisor

### Legacy Routes
- `GET /api/documents/:id` - Fetch page + blocks
- `POST /api/documents` - Create new page
- `PATCH /api/blocks/batch` - Batch update (move/edit) blocks

## Editor Engine
The editor is NOT a single ContentEditable. It is a list of **Block Component** wrappers.
- **BlockWrapper**: Handles drag handle, options menu, and focus management.
- **ContentEditable**: Inside each block for text.

## Persistence Strategy
- **Local**: `localStorage` via Zustand `persist` middleware (for immediate offline demo).
- **Remote (Optional)**: Async sync to Firestore when Firebase is configured.
- **Fallback**: If Firebase fails, falls back to local storage automatically.

## AI Integration Points

### 1. Resume Scanner
- Upload DOCX/PDF → Extract text (existing)
- **NEW**: Optional AI analysis (skills, projects, ATS score)
- **NEW**: Personalized improvement suggestions

### 2. Offer Comparison
- Manual offer comparison (existing)
- **NEW**: AI-generated insights and recommendations
- **NEW**: Long-term career impact analysis

### 3. Career Chatbot (New)
- Conversational AI advisor
- Context-aware (knows user's resume and offers)
- Personalized career guidance

## Environment Configuration

Required for AI features:
```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# Firebase Admin (Server)
FIREBASE_ADMIN_PRIVATE_KEY=...
# Google Cloud Vertex AI
GCP_PROJECT_ID=...
VERTEX_AI_MODEL=gemini-2.0-flash-exp
```

See `docs/FIREBASE_SETUP.md` for complete setup guide.
