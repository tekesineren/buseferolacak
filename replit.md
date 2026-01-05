# ScholarshipHub

## Overview
ScholarshipHub is a Next.js + Supabase marketplace platform for athletes and graduate students to find scholarship and program opportunities.

**Framework:** Next.js 14 (TypeScript, Tailwind CSS, App Router)  
**Database:** Supabase PostgreSQL with Prisma ORM  
**Language:** TypeScript everywhere

## Current State
- Initial project scaffolding complete
- Next.js 14 with TypeScript, Tailwind CSS, App Router configured
- Prisma schema created with models: User, AthleteProfile, PostGradProfile, Scholarship, Program, Application, Bookmark
- Supabase client and Prisma database utilities set up
- Authentication utilities (bcrypt, JWT) ready
- **Pending:** Database migration after Supabase credentials are provided

## Project Structure
```
src/
├── app/           # Next.js App Router pages
│   ├── api/       # API routes
│   │   └── health/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/    # Reusable React components
├── lib/           # Library utilities (Supabase client, Prisma client)
├── types/         # TypeScript type definitions
├── utils/         # Helper functions (auth utilities)
├── hooks/         # Custom React hooks
└── services/      # Business logic services

prisma/
└── schema.prisma  # Database schema
```

## Environment Variables Required
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token signing

## Recent Changes
- **Jan 05, 2026:** Initial project setup with Next.js 14, Tailwind CSS, Prisma, and Supabase client

## Development Commands
- `npm run dev` - Start development server on port 5000
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client
- `npx prisma studio` - Open Prisma Studio for database management
