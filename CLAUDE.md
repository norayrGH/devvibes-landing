# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project

**DEVVIBES** — Software development studio landing page. Dark theme, progressive, bold uppercase typography, interactive 3D elements, scroll-driven animations. Same architectural quality as the Profal Group landing page but adapted for a tech/dev studio brand.

## Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS 3 + custom CSS
- **Animation:** Motion (Framer Motion) + GSAP
- **3D:** React Three Fiber + Three.js + Drei
- **State:** Zustand
- **Fonts:** Inter (body), Space Grotesk (display/headlines), JetBrains Mono (code)

## Commands

```bash
npm run dev       # dev server on :5174
npm run build     # tsc + vite build
npm run preview   # preview production build
```

## Architecture

Source in `src/`:

- `main.tsx` → entry point
- `App.tsx` → page shell, section composition
- `index.css` → base styles, utility classes, glass effects, grain texture
- `landing/` → landing page sections (Hero, Services, Work, About, Contact, Header, Footer)
- `lab/` → interactive 3D experience sections (if applicable)

## Design System

- **Theme:** Dark mode primary (`#0A0A0F` background)
- **Accent:** Electric purple `#6C5CE7`, cyan `#00D2FF`
- **Typography:** Bold uppercase display headings (Space Grotesk), clean body (Inter), code snippets (JetBrains Mono)
- **Style:** Capital letters for headings, glass-morphism cards, grain texture overlays, scroll-driven animations
- **Tailwind prefix:** `dv-` for all brand colors (e.g. `text-dv-electric`, `bg-dv-ink`)

## Conventions

- Components use PascalCase filenames
- Keep sections as self-contained components
- Use Motion for scroll-triggered animations
- Use GSAP for complex timeline animations
- Use R3F for any 3D background/hero elements
- Never commit `.env` or secret files
- Same progressive, architectural landing page style as the Profal project (`../profalgroup/`)

## Reference

The Profal Group landing page (`../profalgroup/`) is the design reference for quality, interaction patterns, and code structure. This project follows the same patterns but with a dark tech/dev studio aesthetic.
