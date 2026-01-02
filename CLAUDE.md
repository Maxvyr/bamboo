# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bangboo Factory is a creative web application that transforms photos into "Bangboo" characters (inspired by Zenless Zone Zero) using Google Gemini 3 Pro AI. Built with Next.js 16 and React 19.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (runs on http://localhost:3000)
bun run dev

# Build for production
bun run build

# Start production server
bun start

# Run linting
bun run lint
```

## Environment Setup

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

The API key is **server-side only** - never exposed to the client bundle.

## Architecture

### Directory Structure

```
/app
  /layout.tsx           # Root layout with fonts, metadata
  /page.tsx             # Main page (client component)
  /globals.css          # Tailwind v4 styles
  /api/generate
    /route.ts           # POST handler for Gemini API (rate-limited)
/components             # UI components (Header, UploadZone, LoadingState)
/lib
  /geminiService.ts     # Server-side Gemini API logic
  /rateLimit.ts         # In-memory rate limiter (10 req/min per IP)
/services
  /api.ts               # Client-side API wrapper
/public
  /prompt.png           # Reference image for Bangboo style
```

### Key Technical Patterns

**Security Architecture**:

- API key stays server-side only (no `NEXT_PUBLIC_` prefix)
- Client calls `/api/generate` → Server calls Gemini API
- Rate limiting: 10 requests per minute per IP
- Input validation in API route (mime types, mood, style)

**State Management**: Uses React hooks (useState, useRef) for all state. No external state management.

**Image Processing Flow**:

1. User uploads image → converted to base64 via FileReader
2. Reference image loaded from `/public/prompt.png`
3. Client sends both to `/api/generate` via POST
4. Server validates request, checks rate limit
5. Server calls Gemini API with multimodal prompt
6. Returns generated image as base64 data URL

**Styling**:

- Tailwind CSS v4 (CSS-first configuration via `@import "tailwindcss"`)
- Google Fonts via `next/font` (Chakra Petch for headings, Inter for body)
- Dark theme (#09090b base, #ff5c00 accent)
- CRT overlay effect

### API Route Details (`/api/generate`)

**Request body:**

```typescript
{
  userImageBase64: string;   // Base64 image data
  mimeType: string;          // image/png, image/jpeg, etc.
  mood: string;              // default, happy, grumpy, combat, lazy
  style: string;             // 3d or flat
  referenceImageBase64?: string;
}
```

**Response:**

```typescript
{
  imageUrl: string;
} // Base64 data URL
```

**Rate limit headers:**

- `X-RateLimit-Remaining`: Requests left in window
- `X-RateLimit-Reset`: Seconds until reset (on 429)

### Prompt Engineering

The `BANGBOO_STYLE_PROMPT` in `constants.ts` is critical to output quality:

- Detailed anatomical constraints (tiny arms, bean-shaped body, screen face)
- Creative adaptation instructions (role assignment, unique props)
- Style keywords appended based on selection (3D cel-shaded vs flat 2D)

### Build Configuration

- Next.js 16 with App Router and Turbopack
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- TypeScript with strict mode
- Server actions enabled with 10MB body size limit

## Dependencies

**Runtime**:

- `next`: Next.js framework
- `react` + `react-dom`: React 19
- `@google/genai`: Gemini AI SDK
- `lucide-react`: Icon library
- `tailwindcss` + `@tailwindcss/postcss`: Styling

**Dev**:

- `typescript`: Type checking
- `eslint` + `eslint-config-next`: Linting
