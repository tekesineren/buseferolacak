# ScholarshipHub - Global Sports Scholarship Finder

## Overview
ScholarshipHub is a Next.js + Supabase marketplace platform for athletes and graduate students to find sports scholarship opportunities globally.

**Framework:** Next.js 14 (TypeScript, Tailwind CSS, App Router)  
**Database:** Supabase PostgreSQL with Prisma ORM  
**Language:** TypeScript everywhere

## Current State
- Full landing page with all sections complete
- Search form with filtering functionality (sport, academic level, country, GPA, age, funding)
- Mock scholarship data with 12 entries
- Form validation requiring all fields before search
- Responsive design with mobile menu
- FAQ accordion section
- Testimonials from scholarship winners
- **Pending:** Database migration after Supabase credentials are provided

## Features
1. **Header** - Navigation with Sign In/Sign Up buttons, mobile responsive menu
2. **Hero Section** - Headline, subheading, CTA buttons
3. **Value Proposition Cards** - 5000+ scholarships, $2.5B funding, 95% success rate
4. **Search Form** - Sport, academic level, country multi-select, GPA slider, age slider, funding type
5. **Features Section** - Scholarship Database, Application Support, Match Manager
6. **Scholarship Results** - Dynamic cards filtered by search criteria
7. **Testimonials** - Success stories from scholarship winners
8. **FAQ Accordion** - Common questions about sports scholarships
9. **CTA Section** - Call to action for signup
10. **Footer** - Links, social media, copyright

## Project Structure
```
src/
├── app/           # Next.js App Router pages
│   ├── api/       # API routes
│   │   └── health/route.ts
│   ├── layout.tsx
│   ├── page.tsx   # Main landing page with all sections
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
- **Jan 06, 2026:** Built complete Global Sports Scholarship Finder landing page
- **Jan 05, 2026:** Initial project setup with Next.js 14, Tailwind CSS, Prisma, and Supabase client

## Development Commands
- `npm run dev` - Start development server on port 5000
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma client
- `npx prisma studio` - Open Prisma Studio for database management

## Design System
- **Primary Color:** Blue (#2563eb)
- **Accent Color:** Teal (#0d9488)
- **Background:** Gray (#f9fafb)
- **Typography:** Inter font family
