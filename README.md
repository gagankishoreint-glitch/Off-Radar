# Webild Clone (Notion-style App)

A high-performance, block-based workspace application built with Next.js 14, Tailwind CSS, and Zustand.

## ✨ Features
- **Block Editor**: Heading, Lists, Tasks, Code blocks.
- **Slash Commands**: Type `/` to insert blocks.
- **Drag & Drop**: Reorder blocks intuitively.
- **Dark Mode**: Polished UI for all lighting conditions.
- **Offline First**: Works without a backend (demo mode).

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/webild-clone.git
   cd webild-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🛠 Deployment (Vercel + Supabase)

1. **Push to GitHub**.
2. **Import to Vercel**.
3. **Set Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
4. **Deploy**!

## 🤝 Architecture
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details on the data model and block engine.
