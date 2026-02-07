# FAU Professor Finder 🎓

> **AI-powered research supervisor finder for FAU Erlangen-Nürnberg's Technical Faculty**

Find your perfect research supervisor at FAU using intelligent AI analysis with real-time web scraping and smart matchmaking.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

## ✨ Features

### Core Functionality
- 🔍 **Real-time Web Scraping** - Fetches latest professor data directly from FAU department websites
- 🤖 **AI-Powered Analysis** - Extracts emails, research interests, and bio summaries automatically
- 🎯 **Smart Matchmaking** - Get relevance scores (0-10) based on your research interests
- 📊 **Progress Tracking** - Real-time progress bar and detailed logs
- 🎨 **Incremental Display** - See professors as they're analyzed with smooth animations

### Multi-Department Search
- ✅ **Select Multiple Departments** - Search up to 6 departments simultaneously
- ⚡ **Concurrent Scraping** - All departments scraped in parallel for speed
- 🔄 **Auto-Deduplication** - Professors appearing in multiple departments shown once
- 🏷️ **Department Badges** - See which department each professor belongs to

### External Enrichment (Optional)
- ✨ **Google Scholar Integration** - Citation counts, publications, h-index *(placeholder)*
- 💼 **LinkedIn Data** - Recent activity and professional summary *(coming soon)*
- ⚠️ **Toggle On/Off** - Enable for detailed data (slower) or disable for speed

### AI Provider Options
- 🌐 **Google Gemini** - Fast cloud AI (Gemini 1.5 Flash)
- ⚡ **Groq** - Ultra-fast cloud AI (Llama 3.3 70B)
- 🏠 **Ollama (Local)** - Privacy-first, free, runs offline
  - Dynamic model selection
  - No API key required
  - Your data never leaves your machine

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- (Optional) Ollama for local AI

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/professorlist.git
cd professorlist/web

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📖 Usage Guide

### Basic Search (Cloud AI)

1. **Select AI Provider** - Choose Gemini or Groq
2. **Enter API Key** - Get from [Google AI Studio](https://aistudio.google.com/app/apikey) or [Groq Console](https://console.groq.com)
3. **Select Departments** - Check one or more departments
4. **Add Interests (Optional)** - Enter your research topics for relevance scoring
5. **Click "Find Professors"**

### Local Search (Ollama)

1. **Install Ollama** - Download from [ollama.com](https://ollama.com)
2. **Pull a Model** - `ollama pull llama3.1:8b` (recommended)
3. **Select "Ollama (Local)"** in the app
4. **Choose Model** from dropdown
5. **Select Departments** and search

### With External Enrichment

1. Enable **"Enrich with LinkedIn & Google Scholar"** checkbox
2. Search as usual
3. See citation metrics on professor cards:
   - 📚 Citations
   - 📄 Publications
   - 🎯 h-index

> **Note**: External enrichment currently uses placeholder data. Real Google Scholar scraping coming soon.

## 🎓 Supported Departments

1. Artificial Intelligence
2. Chemical and Biological Engineering
3. Computer Science
4. Electrical Engineering
5. Materials Science
6. Mechanical Engineering

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 |
| **AI SDK** | Vercel AI SDK |
| **AI Providers** | Google Gemini, Groq, Ollama |
| **Scraping** | Puppeteer 22 |
| **Validation** | Zod 3 |
| **Icons** | Lucide React |

### Key Dependencies

```json
{
  "@ai-sdk/google": "^3.0.22",
  "@ai-sdk/openai": "^3.0.26",
  "ai": "^6.0.77",
  "next": "^16.1.6",
  "puppeteer": "^22.15.0",
  "zod": "^3.23.8"
}
```

## 🎯 How It Works

```
1. User selects departments + (optional) interests
   ↓
2. Concurrent scraping of all department websites
   ↓
3. AI extracts professor names from merged content
   ↓
4. Deduplication (same name = same person)
   ↓
5. All professors displayed with "Pending" status
   ↓
6. AI analyzes each professor one by one:
   - Email, website, bio
   - Research interests (tags)
   - Relevance score (if interests provided)
   - (Optional) External enrichment
   ↓
7. Real-time updates with animations
   ↓
8. Low-relevance professors fade out (score < 3)
```

## 🔒 Privacy & Security

- ✅ API keys **never stored** (session-only)
- ✅ No professor data saved to database
- ✅ Real-time scraping (no caching)
- ✅ With Ollama: **100% local** processing
- ✅ No tracking or analytics

## 🐛 Troubleshooting

### Ollama Issues
```bash
# Check if Ollama is running
curl http://localhost:11434

# Pull a model if needed
ollama pull llama3.1:8b

# List installed models
ollama list
```

**Common Fixes:**
- "Could not connect" → Start Ollama app
- "No models found" → Pull a model first
- Timeout errors → Try smaller model (8b instead of 70b)

### General Issues
- **Long scraping time** - Normal for large departments (30-60s)
- **API errors** - Check API key validity and quota
- **No professors found** - Department website structure may have changed
- **Progress stuck** - Click the red "Stop" button and try again

## 📸 Screenshots

### Multi-Department Selection
Checkbox grid with "Select All" option

### Progress Tracking
Real-time log with stage indicators (🔍 ✅ 🤖 ✨)

### Professor Cards
- Department badges
- Relevance scores
- Research interest tags
- Citation metrics (when enriched)
- Contact links

## 🗺️ Roadmap

- [ ] **Real Google Scholar Scraping** - Actual citation data
- [ ] **LinkedIn Integration** - Professional profiles
- [ ] **Export to CSV** - Download results
- [ ] **Save Favorites** - Bookmark professors
- [ ] **Email Templates** - Pre-written supervisor inquiry emails
- [ ] **Comparison View** - Side-by-side professor comparison

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- FAU Erlangen-Nürnberg for public professor listings
- Vercel AI SDK for multi-provider support
- Ollama for local AI capabilities

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check existing discussions
- Review troubleshooting section

---

**Made with ❤️ for FAU students seeking research supervisors**
