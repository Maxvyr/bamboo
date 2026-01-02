# Bangboo Factory 🤖

First thanks [Rayinf](https://github.com/Rayinf), for the first version 🙏, who inspire this one.

Transform your photos into Bangboo characters using AI - inspired by **Zenless Zone Zero**.

Bangboo Factory is a creative web application powered by Google Gemini 3 Pro that reimagines any photo as a collectible "Bangboo" character with customizable moods and art styles.

## ✨ Features

- **Image-to-Bangboo Conversion**: Upload any photo and AI transforms it into a unique Bangboo character
- **Mood Customization**: Choose from multiple expressions (Original, Happy, Grumpy, Combat Ready, Sleepy)
- **Render Styles**:
  - **3D Cel-Shaded**: Matches the Zenless Zone Zero visual aesthetic with clean outlines and vibrant colors
  - **Flat 2D**: Clean vector art style with simplified shapes and colors
- **Secure API Layer**: Gemini API key stays server-side, never exposed to client
- **Rate Limiting**: Built-in protection (10 requests per minute per IP)
- **Modern UI**: Game-inspired interface with CRT overlay effects and smooth animations

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js 16 (App Router), Node.js
- **AI**: Google Gemini 3 Pro API
- **Build**: Turbopack (via Next.js)
- **Styling**: Tailwind CSS v4 (CSS-first), Google Fonts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- npm/yarn/pnpm (or Bun)
- Google Gemini API key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Maxvyr/bamboo.git
   cd bamboo
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Create environment file**

   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start development server**

   ```bash
   bun run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📖 Usage Guide

1. **Upload Image**: Drag and drop or click to select a photo
2. **Configure Settings**:
   - Select a **mood** for the Bangboo's expression
   - Choose a **render style** (3D or Flat 2D)
3. **Generate**: Click "Start Construction" to generate
4. **Download**: Save your Bangboo character once generation completes

## 🔒 Security

### API Key Protection

- Gemini API key is **never** exposed to the client
- All API calls are proxied through the backend `/api/generate` route
- Environment variables are server-side only

### Rate Limiting

- **10 requests per minute** per IP address
- In-memory rate limiter to prevent abuse
- Returns 429 status when limit exceeded

### Input Validation

- Image type validation (PNG, JPEG, WebP, GIF)
- Mood and style option validation
- Request body size limit (10MB)

## 🏗 Architecture

```
User Browser
    ↓ (upload image + mood/style)
Next.js Frontend (app/page.tsx)
    ↓ (POST /api/generate)
API Route (app/api/generate/route.ts)
    ├─ Check rate limit
    ├─ Validate input
    ├─ Check Gemini API key
    └─ Call Gemini 3 Pro
         ↓ (multimodal prompt)
    Google Gemini API
         ↓ (generated image)
    API Route → Frontend
         ↓
    Display & Download
```

### Key Files

| File                        | Purpose                                  |
| --------------------------- | ---------------------------------------- |
| `app/page.tsx`              | Main UI component (client-side)          |
| `app/api/generate/route.ts` | Secure API endpoint for image generation |
| `lib/geminiService.ts`      | Server-side Gemini API client            |
| `lib/rateLimit.ts`          | Rate limiter implementation              |
| `services/api.ts`           | Client-side API wrapper                  |
| `constants.ts`              | Prompts and configuration                |
| `components/`               | Reusable UI components                   |

## 🧠 Prompt Engineering

The core magic happens in the Bangboo transformation prompt (`constants.ts`):

- **Anatomical specifications**: Defines the exact Bangboo body structure

  - Tiny short arms (no elbows)
  - Bean-shaped cylindrical body
  - Black screen face with yellow ring eyes
  - Rabbit-like mechanical ears

- **Creative adaptation**: Analyzes input to assign roles and create unique props

  - Function detection (gamer, chef, artist, etc.)
  - Unique prop generation (tools, weapons, attachments)
  - Style translations (hats → helmet modifications, etc.)

- **Style keywords**: Different styling instructions for 3D vs 2D modes

## 🌐 API Endpoint

### POST `/api/generate`

Generate a Bangboo character from an image.

**Request:**

```json
{
  "userImageBase64": "data:image/png;base64,...",
  "mimeType": "image/png",
  "mood": "happy",
  "style": "3d",
  "referenceImageBase64": "data:image/png;base64,..." // optional
}
```

**Response:**

```json
{
  "imageUrl": "data:image/png;base64,..."
}
```

**Rate Limit Headers:**

- `X-RateLimit-Remaining`: Requests left in current window
- `X-RateLimit-Reset`: Seconds until rate limit resets (on 429)

**Status Codes:**

- `200`: Success
- `400`: Invalid input (bad image type, mood, or style)
- `429`: Rate limit exceeded
- `500`: Server error (API key missing or Gemini API error)

## 📦 Build & Deploy

### Build for Production

```bash
bun run build
bun start
```

### Deploy to Vercel

```bash
vercel deploy
```

Make sure to set `GEMINI_API_KEY` in your Vercel environment variables.

## 🎮 Available Moods

- **Original Match** (😐): Default expression matching the input
- **Hyper Happy** (😆): Excited, joyful expression
- **Grumpy/Serious** (😠): Stern, determined expression
- **Combat Ready** (⚔️): Battle-ready stance
- **Lazy/Sleepy** (💤): Relaxed, sleepy mood

## 🎨 Available Styles

- **3D Cel-Shaded**: Zenless Zone Zero-inspired 3D render
- **Flat 2D**: Clean vector art illustration

## 📝 Development

### Scripts

```bash
bun run dev      # Start dev server (http://localhost:3000)
bun run build    # Production build
bun run start    # Start production server
bun run lint     # Run ESLint
```

### Project Structure

```
bamboo/
├── app/                    # Next.js App Router
│   ├── api/generate/      # API route
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Server-side utilities
├── public/                # Static assets
├── services/              # Client-side utilities
├── constants.ts           # Config & prompts
├── types.ts              # TypeScript types
└── CLAUDE.md             # Developer guide
```

## 🐛 Troubleshooting

### "API Key not found"

- Check `.env.local` exists and contains `GEMINI_API_KEY`
- Verify the API key is valid on Google Cloud Console

### "Rate limit exceeded"

- Wait 60 seconds before trying again
- Check `X-RateLimit-Reset` header for exact reset time

### Slow image generation

- Gemini 3 Pro can take 10-30 seconds depending on complexity
- Check network tab in browser dev tools

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This is a **fan-made project** and is not affiliated with HoYoverse or Zenless Zone Zero. All Zenless Zone Zero assets and characters are property of HoYoverse.

## 🙏 Credits

- **AI**: Powered by [Google Gemini 3 Pro](https://ai.google.dev/)
- **Framework**: Built with [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Inspiration**: [Zenless Zone Zero](https://zenlesszonezero.com/)

---

**Made with ❤️ by fans, for fans.**
