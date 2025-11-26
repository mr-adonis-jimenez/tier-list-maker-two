# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Tier List Maker** application built with Next.js 15.2.4. Users can upload images, drag them into tier categories (S, A, B, C, D), and export the tier list as an image. The application supports internationalization (English, Japanese, Russian) and includes a blog section powered by Directus CMS.

The application is designed to run on **Cloudflare Workers** using `@opennextjs/cloudflare` with R2 bucket caching, D1 database, and Durable Objects for optimal performance.

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **UI**: React 19.2.0, Tailwind CSS 4, Radix UI, Shadcn/ui
- **Drag & Drop**: @dnd-kit
- **Language**: TypeScript
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)
- **CMS**: Directus SDK
- **Deployment**: Cloudflare Workers (via @opennextjs/cloudflare)
- **Package Manager**: pnpm
- **Image Export**: html2canvas

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production (standard Next.js build)
pnpm build

# Build for Cloudflare Workers
pnpm build:worker

# Preview Cloudflare Worker build locally
pnpm preview

# Deploy to Cloudflare Workers
pnpm deploy

# Upload to Cloudflare Workers
pnpm upload

# Lint code with Biome
pnpm lint

# Format code with Biome
pnpm format

# Generate Cloudflare environment types
pnpm cf-typegen
```

## High-Level Architecture

### Application Structure

```
app/
├── [lang]/              # Internationalized routes
├── api/                 # API routes (e.g., app/api/draft/route.ts)
├── posts/               # Blog posts (Directus-powered)
│   ├── [slug]/         # Individual post pages
│   └── page.tsx        # Posts listing
├── layout.tsx          # Root layout with theme provider
├── page.tsx            # Home page (Tier List Maker)
└── sitemap.ts          # Dynamic sitemap generation

components/
├── tier-list-maker.tsx # Main tier list component with drag-and-drop
├── ui/                 # Shadcn/ui components (button, card, dropdown)
├── theme-provider.tsx  # Dark/light theme context
├── theme-toggle.tsx    # Theme switcher
├── language-switcher.tsx # i18n language switcher
└── blog/               # Blog-specific components

lib/
├── directus.ts         # Directus CMS client configuration
├── i18n/
│   ├── translations.ts # i18n translations (en, ja, ru)
│   └── get-dictionary.ts # Dictionary getter
└── utils.ts            # Utility functions
```

### Key Components

**TierListMaker** (`components/tier-list-maker.tsx`):
- Client-side component using @dnd-kit for drag-and-drop
- Manages image upload, tier assignment, and image export
- Uses html2canvas to export tier lists as PNG images
- Supports 3 languages via i18n translations
- Features: S/A/B/C/D tier system, unassigned images area, clear all function

**Layout** (`app/layout.tsx`):
- Root layout with ThemeProvider
- Configured for dark/light mode with next-themes
- Contains metadata, OpenGraph, and Twitter card settings

### Cloudflare Configuration

**wrangler.jsonc** configures:
- R2 bucket (`NEXT_INC_CACHE_R2_BUCKET`) for incremental caching
- D1 database (`NEXT_TAG_CACHE_D1`) for tag-based cache invalidation
- Durable Objects (`NEXT_CACHE_DO_QUEUE`) for queue handling
- Assets binding for static files
- Service binding for worker self-reference

**next.config.ts**:
- TypeScript build errors are ignored (ignoreBuildErrors: true)
- Images are unoptimized for Cloudflare Workers
- Remote image patterns allow all HTTPS domains and symcloud.top

### Environment Variables

Required environment variables (see `.env` files):
- `NEXT_PUBLIC_DIRECTUS_URL`: Directus CMS URL
- `DIRECTUS_ACCESS_TOKEN`: Access token for Directus API

## Internationalization (i18n)

The app supports 3 locales: English (en), Japanese (ja), and Russian (ru).

- Translations are defined in `lib/i18n/translations.ts`
- Default locale is English
- Language switcher component allows switching between locales
- Locale is passed as prop to TierListMaker component

## Key Features

1. **Drag & Drop Interface**: Users can upload multiple images and drag them between tiers
2. **Export Functionality**: Export tier lists as high-quality PNG images with custom styling
3. **Blog Integration**: Directus-powered blog with posts at `/posts`
4. **Theme Support**: Dark/light mode via next-themes
5. **Responsive Design**: Works on mobile and desktop
6. **Cloudflare-Optimized**: Built to run efficiently on Cloudflare Workers

## Important Notes

- This project uses **Biome** instead of ESLint/Prettier for linting and formatting
- Images are served unoptimized (Next.js image optimization disabled for Cloudflare Workers)
- The tier list maker is entirely client-side - no backend API needed for core functionality
- Directus integration is primarily for the blog section, not the tier list maker
- TypeScript build errors are currently configured to be ignored during build
- The app uses Tailwind CSS 4 (latest version) with custom CSS variables from Shadcn/ui
