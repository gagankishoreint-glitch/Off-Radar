# Off-Radar
A clean, block-based workspace with real-world career context for students — now **powered by AI**.

Live: https://off-radar.vercel.app/

---

##  Problem Statement — The Hidden Cost of Career Decisions:

Every year, students accept internships and job offers based on CTC numbers, brand names, or peer pressure — without reliable insight into what those roles actually involve in day-to-day reality.

Most existing platforms focus on:
- Job listings
- HR-approved role descriptions
- Surface-level salary numbers

They fail to answer what students actually care about:
- What will my real in-hand salary be?
- Will I be overworked or burned out?
- Is the internship meaningful work or just busywork?
- What downsides aren't mentioned during hiring?
- Which offer truly fits my priorities — learning, money, or balance?

As a result, students often:
- Accept mismatched offers
- Experience early burnout
- Regret decisions within months
- Make choices based on incomplete or misleading information

There is no unified system that helps students compare opportunities using **reality, risk, and long-term impact**.



##  Features:

### Core Workspace
- **Block-based Editor**  
  Text, headings, lists, tasks, and code blocks

- **Slash Commands**  
  Insert blocks quickly using `/`

- **Drag & Drop**  
  Reorder blocks intuitively

- **Dark Mode UI**  
  Clean, low-contrast visuals for long sessions

- **Offline Demo Mode**  
  Works without authentication or backend

### 🤖 AI-Powered Career Tools (New!)
- **Smart Resume Analysis**  
  AI extracts skills, projects, and gives ATS compatibility scores

- **AI Offer Comparison**  
  Get personalized recommendations comparing multiple job offers

- **Career Chatbot**  
  Ask an AI advisor about career decisions, salaries, and growth paths

- **Context-Aware Insights**  
  AI knows your resume and offers to give tailored advice

> **Note**: AI features require Firebase/GCP setup (optional). App works fully without it. See [`docs/FIREBASE_SETUP.md`](docs/FIREBASE_SETUP.md)



## Tech Stack:

- **Next.js 14 (App Router)**
- **Tailwind CSS**
- **Zustand**
- **Firebase** (Auth, Firestore) - Optional
- **Google Cloud Vertex AI** (Gemini) - Optional
- **Vercel**
- **Gemini**
- **Google Drive**



##  Local Development:

```bash
git clone https://github.com/your-username/off-radar.git
cd off-radar
npm install
npm run dev
```

**Access**: http://localhost:3000

### Enable AI Features (Optional)
1. Follow the [Firebase Setup Guide](docs/FIREBASE_SETUP.md)
2. Copy `.env.example` to `.env.local` and fill in credentials
3. Restart dev server

---

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Firebase Setup](docs/FIREBASE_SETUP.md) - Enable AI features (10 min setup)
- [API Documentation](docs/API.md) - Available endpoints *(coming soon)*

---

## 🎯 Roadmap

- [x] Block-based editor
- [x] Resume parsing
- [x] Offer comparison
- [x] AI-powered resume analysis
- [x] AI career chatbot
- [ ] Firebase Authentication UI
- [ ] Real-time collaboration
- [ ] Mobile app
- [ ] Premium features

---

Built with ❤️ for students making tough career decisions
