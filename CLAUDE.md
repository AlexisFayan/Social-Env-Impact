# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fullscreen slide presentation for an Epitech 2026 course on Social & Environmental Impact Assessment. Analyzes the e-commerce supply chain lifecycle (8 stages) with ESG indicators, KPIs, and sourced statistics. Built for projection (16:9) and deployed on Vercel.

**Groupe 7**: Yoann, Alexis, Clément, Quentin

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build (must pass without errors)
- `npm run lint` — ESLint (Next.js core-web-vitals + TypeScript rules)

## Architecture

This is a single-page app — virtually all logic lives in **`src/app/page.tsx`** (~590 lines, `"use client"`).

### Key structure inside `page.tsx`:
- **Data arrays**: `steps` (8 lifecycle stages), `ramifications` (ESG impacts per stage with KPIs and sources), `systemicEffects` (causal chains)
- **`CircleDiagram`**: SVG component rendering the circular lifecycle diagram — keep as-is
- **Slide components**: `Slide` (wrapper), `ImageSlide` (bg image + overlay), `StepSlide` (per-stage template)
- **`Presentation`** (default export): Manages slide state, keyboard nav (arrows/space), Framer Motion transitions, dot navigation. `TOTAL_SLIDES = 16`.

### Slide order (0-indexed):
0: Title → 1: Problem → 2: Solution → 3: Lifecycle diagram → 4–11: 8 lifecycle stages → 12: Systemic effects → 13: Methodology → 14: Sources → 15: Conclusion

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`) — **no `group/name` syntax** (unsupported in v4)
- Framer Motion (slide transitions with AnimatePresence)
- Lucide React (icons)
- Path alias: `@/*` → `./src/*`

## Constraints

- Do NOT add new npm dependencies
- Do NOT use `Home` as export name — conflicts with lucide-react's `Home` icon (use `Presentation`)
- Import lucide's Home as `HomeIcon`
- Background images come from Unsplash URLs (no local assets used)
- All KPIs must have a source citation (`src` field)
- Content is in French
