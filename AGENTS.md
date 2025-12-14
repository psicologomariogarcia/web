---
agents:
  - name: "Next.js Developer"
    description: "Specialized in Next.js 15 App Router, React Server Components, and TypeScript"
    instructions:
      - "Always use Next.js 15 App Router conventions"
      - "Prefer Server Components by default, use 'use client' only when necessary"
      - "Use Server Actions for mutations, Route Handlers for API endpoints"
      - "Follow TypeScript strict mode guidelines"
    tools:
      - "next"
      - "react"
      - "typescript"

  - name: "Database Architect"
    description: "Expert in Drizzle ORM, PostgreSQL, and database schema design"
    instructions:
      - "Use Drizzle ORM for all database operations"
      - "Follow existing schema patterns in db/schema/"
      - "Always generate migrations using 'pnpm db:generate'"
      - "Ensure proper relations and foreign keys"
    tools:
      - "drizzle-orm"
      - "drizzle-kit"
      - "postgresql"

  - name: "UI Component Specialist"
    description: "Focused on shadcn/ui, Tailwind CSS, and component architecture"
    instructions:
      - "Use shadcn/ui components from @/components/ui"
      - "Follow component naming: Kebab Case for files"
      - "Shared components in @/components, page-specific in @/app/[page]/_components"
      - "Library-specific components in @/components/[library]"
      - "Use Tailwind CSS 4 utilities, prefer CSS variables for theming"
    tools:
      - "shadcn-ui"
      - "tailwindcss"
      - "radix-ui"

version: "1.0.0"
supported_languages:
  - "typescript"
  - "tsx"
  - "sql"
supported_frameworks:
  - "next.js"
  - "react"
  - "drizzle-orm"
---

# AGENTS.md

This file provides context, guidelines, and best practices for AI coding agents working with this repository. It serves as a reference for understanding the project architecture, coding standards, and development workflows.

## Introduction

This repository contains a **psychology education platform** built with Next.js 16, TypeScript, and modern web technologies. The platform enables content creators to offer both free and premium educational content, manage user subscriptions, and process payments.

AI agents should use this document to:

- Understand the project structure and architecture
- Follow established coding conventions
- Make informed decisions about code organization
- Ensure consistency with existing patterns
- Respect security and privacy requirements

## Project Overview

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: Tailwind CSS 4.1.0
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle ORM 0.44.7
- **Authentication**: Supabase Auth
- **CMS**: Contentful (headless)
- **Payment**: BBVA/Redsys TPV integration
- **Package Manager**: pnpm
- **Deployment**: Vercel

### Key Features

- User authentication (sign-in/sign-up) with Supabase
- Blog system with Contentful integration
- Content management (free/premium resources)
- User plans and subscription management
- Payment processing and transaction tracking
- Theme system with multiple theme options
- Newsletter subscription
- Protected routes and content access control

### Architecture Principles

1. **Server-First**: Prefer Server Components and Server Actions over client-side logic
2. **Type Safety**: Leverage TypeScript strict mode for all code
3. **Component Organization**: Clear separation between shared, page-specific, and library components
4. **Database-First**: Schema-driven development with Drizzle migrations
5. **Security**: Row Level Security (RLS) policies in Supabase, server-side validation

## Coding Standards

### TypeScript

- **Strict Mode**: Always enabled, no exceptions
- **Type Definitions**: Define types in `types/` directory or inline when component-specific
- **Imports**: Use path aliases (`@/components`, `@/lib`, `@/hooks`)
- **Naming**:
  - Components: PascalCase (`UserProfile.tsx`)
  - Files: Kebab Case (`user-profile.tsx`)
  - Functions/Variables: camelCase
  - Constants: UPPER_SNAKE_CASE

### React/Next.js

- **Server Components**: Default choice, add `'use client'` only when needed
- **Server Actions**: Use for mutations, place in `app/` directory or `lib/actions/`
- **Route Handlers**: Use for API endpoints (`app/api/**/route.ts`)
- **Error Handling**: Implement proper error boundaries and try-catch blocks
- **Loading States**: Use Next.js `loading.tsx` and Suspense boundaries

### Component Structure

```typescript
// Shared component example
// File: @/components/user-card.tsx
import { cn } from "@/lib/utils"

interface UserCardProps {
  name: string
  email: string
  className?: string
}

export function UserCard({ name, email, className }: UserCardProps) {
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <h3>{name}</h3>
      <p className="text-sm text-muted-foreground">{email}</p>
    </div>
  )
}
```

### Database Operations

- **Schema**: Define in `db/schema/` using Drizzle ORM
- **Migrations**: Generate with `pnpm db:generate`, review before applying
- **Queries**: Use Drizzle query builder, avoid raw SQL unless necessary
- **Relations**: Define relations in schema files for type-safe joins
- **Seeding**: Use `scripts/seed.ts` for development data

### Styling

- **Tailwind CSS**: Use utility classes, prefer CSS variables for theming
- **Component Styling**: Use `cn()` utility for conditional classes
- **Theme System**: Leverage `next-themes` and theme CSS variables
- **Responsive**: Mobile-first approach, use Tailwind breakpoints

## Repository Structure

```
web/
├── app/                          # Next.js App Router
│   ├── api/                      # API Route Handlers
│   │   └── auth/                 # Authentication endpoints
│   ├── auth/                     # Auth pages (sign-in, sign-up)
│   │   └── _components/          # Page-specific components
│   ├── blog/                     # Blog pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Shared components
│   ├── ui/                       # shadcn/ui components
│   ├── origin-ui/                # Origin UI library components
│   └── [component-name].tsx      # Other shared components
├── db/                           # Database layer
│   ├── schema/                   # Drizzle schema definitions
│   └── index.ts                  # Schema exports
├── hooks/                        # React hooks
├── lib/                          # Utilities and helpers
│   ├── contentful/               # Contentful client
│   ├── data/                     # Data access layer
│   ├── supabase/                 # Supabase clients
│   └── utils.ts                  # Common utilities
├── scripts/                      # Build and utility scripts
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
```

### Key Directories

- **`app/`**: Next.js App Router pages and layouts
- **`components/`**: Reusable React components
  - `ui/`: shadcn/ui components (do not modify directly)
  - `[library]/`: Library-specific components
  - Root level: Shared application components
- **`app/[page]/_components/`**: Components specific to a page
- **`db/schema/`**: Database schema definitions (Drizzle)
- **`lib/data/`**: Data access functions (queries, mutations)
- **`lib/supabase/`**: Supabase client configuration
- **`hooks/`**: Custom React hooks

## Agent Instructions

### General Guidelines

1. **Read Before Writing**: Always examine existing code patterns before creating new code
2. **Consistency**: Match existing code style and patterns
3. **Type Safety**: Never use `any`, prefer proper TypeScript types
4. **Error Handling**: Always handle errors appropriately
5. **Security**: Never expose sensitive data, validate inputs server-side
6. **Performance**: Consider Server Components, code splitting, and image optimization

### Component Creation

When creating new components:

1. **Determine Location**:

   - Shared across pages → `@/components/`
   - Specific to one page → `@/app/[page]/_components/`
   - Library-specific → `@/components/[library]/`

2. **Naming**: Use Kebab Case for file names (`user-profile.tsx`)

3. **Structure**:
   - Export named function component
   - Define TypeScript interface for props
   - Use `cn()` utility for className merging
   - Add JSDoc comments for complex components

### Database Changes

When modifying the database:

1. **Update Schema**: Edit files in `db/schema/`
2. **Generate Migration**: Run `pnpm db:generate`
3. **Review Migration**: Check generated SQL in `drizzle/` directory
4. **Apply Migration**: Use `pnpm db:migrate` (development) or proper migration tool (production)
5. **Update Types**: Drizzle generates TypeScript types automatically

### API Development

For API routes (`app/api/**/route.ts`):

- Use Route Handlers (not Server Actions) for external integrations
- Implement proper error handling and status codes
- Validate all inputs
- Use Supabase client for authenticated requests
- Log errors appropriately (avoid logging sensitive data)

### Authentication

- Use Supabase Auth via `@/lib/supabase/clients.ts`
- Protect routes with middleware or Server Component checks
- Never expose auth tokens or secrets
- Use server-side session validation

### Content Management

- Contentful integration via `@/lib/contentful/client.ts`
- Cache Contentful responses appropriately
- Handle Contentful API errors gracefully
- Provide fallback content when CMS is unavailable

## Development Workflow

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables (see .env.example)
# Run database migrations
pnpm db:migrate

# Seed development data (optional)
pnpm db:seed

# Start development server
pnpm dev
```

### Common Commands

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm lint`: Run ESLint
- `pnpm db:generate`: Generate Drizzle migrations
- `pnpm db:migrate`: Apply migrations
- `pnpm db:studio`: Open Drizzle Studio
- `pnpm db:seed`: Seed database
- `pnpm a`: Add shadcn/ui component

### Adding shadcn/ui Components

```bash
pnpm a [component-name]
```

This uses the `shadcn-ui` CLI to add components to `@/components/ui/`.

## Security Considerations

1. **Environment Variables**: Never commit `.env` files, use `.env.local`
2. **API Keys**: Store in environment variables, never hardcode
3. **User Input**: Always validate and sanitize server-side
4. **Database**: Use RLS policies in Supabase for row-level security
5. **Authentication**: Verify sessions server-side before granting access
6. **Payment Data**: Never store payment details, use payment provider tokens

## Testing Considerations

- Write tests for critical business logic
- Test Server Actions and Route Handlers
- Verify database migrations before applying
- Test authentication flows
- Validate payment webhook handlers

## Common Patterns

### Server Action Example

```typescript
// app/actions/user.ts
"use server"

import { db } from "@/lib/db"
import { users } from "@/db/schema"

export async function updateUserProfile(
  userId: string,
  data: { fullName: string }
) {
  await db
    .update(users)
    .set({ fullName: data.fullName })
    .where(eq(users.id, userId))
}
```

### Route Handler Example

```typescript
// app/api/users/[id]/route.ts
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/db/schema"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, params.id),
  })

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}
```

### Protected Route Example

```typescript
// app/dashboard/page.tsx
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/clients"

export default async function DashboardPage() {
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/sign-in")
  }

  return <div>Dashboard content</div>
}
```

## Contributing Guidelines

### Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] No `any` types used
- [ ] Components follow naming conventions
- [ ] Database migrations are reviewed
- [ ] Error handling is implemented
- [ ] Security considerations addressed
- [ ] Code follows existing patterns

### Commit Messages

Use conventional commits format:

- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `docs:` Documentation changes
- `style:` Formatting changes
- `chore:` Maintenance tasks

## References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)

## Version History

- **1.0.0** (Initial): Basic structure and guidelines for Next.js 15 + Drizzle + Supabase stack

---

**Note**: This document should be updated as the project evolves. When making significant architectural changes, update the relevant sections to reflect current practices.
