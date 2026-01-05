# Ventora (ScholarshipHub)

## Overview
Ventora is a Next.js + Supabase marketplace platform for athletes and graduate students to find scholarship and program opportunities.

**Framework:** Next.js 14 (TypeScript, Tailwind CSS, App Router)  
**Database:** Supabase PostgreSQL with Prisma ORM  
**Language:** TypeScript everywhere

## Current State
- Project scaffolding complete with Next.js 14, TypeScript, Tailwind CSS
- Header & Navigation component implemented with:
  - Scroll-based transparent to solid transition
  - Hide on scroll down / show on scroll up behavior
  - Global search bar with keyboard shortcut (Cmd/Ctrl+K)
  - Mega menu for "Explore Opportunities"
  - Full accessibility support (ARIA labels, keyboard nav, skip link, reduced motion)
- Prisma schema with models: User, AthleteProfile, PostGradProfile, Scholarship, Program, Application, Bookmark
- Supabase client and Prisma database utilities set up
- Authentication utilities (bcrypt, JWT) ready
- **Pending:** Database migration after Supabase credentials are provided

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── health/route.ts
│   ├── layout.tsx
│   ├── page.tsx           # Homepage with hero section
│   └── globals.css
├── components/            # Reusable React components
│   ├── Header.tsx         # Main header with search, icons, profile
│   └── Navigation.tsx     # Navigation with mega menu
├── hooks/                 # Custom React hooks
│   └── useScrollHeader.ts # Scroll behavior hook
├── lib/                   # Library utilities
│   ├── supabase.ts        # Supabase client
│   └── db.ts              # Prisma client
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
│   └── auth.ts            # Authentication utilities
└── services/              # Business logic services

prisma/
└── schema.prisma          # Database schema
```

## Key Components

### Header Component
- Fixed position with z-index 1000
- Transparent at top, solid white (95% opacity) when scrolled
- Backdrop blur effect when scrolled
- Padding: 25px/50px (default), 15px/50px (scrolled)
- Logo with size transition on scroll

### Navigation Component
- Main nav items: Dashboard, Explore Opportunities, My Applications, Mentorship, Network, Saved
- Mega menu for Explore Opportunities with categories
- Badge support for notifications count
- Full keyboard navigation support

### useScrollHeader Hook
- Uses requestAnimationFrame for performance
- Passive scroll event listener
- Respects prefers-reduced-motion preference
- Configurable thresholds

## Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token signing

## Recent Changes
- **Jan 05, 2026:** Added Header & Navigation components with scroll behavior, mega menu, and accessibility features
- **Jan 05, 2026:** Initial project setup with Next.js 14, Tailwind CSS, Prisma, and Supabase client

## Development Commands
- `npm run dev` - Start development server on port 5000
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client
- `npx prisma studio` - Open Prisma Studio for database management
