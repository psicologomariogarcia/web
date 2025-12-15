This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and [`shadcn-ui`](https://ui.shadcn.com/) and [tailwindcss](https://tailwindcss.com/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmiguelalcalde%2Fnextjs-with-shadcn)

## Navigation

This template includes a clean, simple navigation bar using shadcn/ui's navigation-menu component:

- Great for simple applications with clear navigation items
- Takes up minimal space on all screen sizes
- Responsive design that works well on mobile devices

## Local Development Setup

### Database (PostgreSQL)

This project uses a local PostgreSQL container for development. To start it:

```bash
# Start the PostgreSQL container
docker-compose up -d

# Or use docker directly:
docker run -d \
  --name psicologo-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=psicologo_db \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16-alpine
```

The database will be available at `postgres://postgres:postgres@localhost:5432/psicologo_db`

To stop the container:
```bash
docker-compose down
# or
docker stop psicologo-postgres && docker rm psicologo-postgres
```

### Running Migrations

After starting the database, run migrations:

```bash
pnpm db:migrate
```

## Authentication

This project uses [Better Auth](https://www.better-auth.com/) for authentication with OAuth providers (GitHub and Google).

### Required Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Better Auth Configuration
BETTER_AUTH_SECRET=<generate-a-random-secret-string>
BETTER_AUTH_URL=http://localhost:3000  # or your production URL

# Database (PostgreSQL)
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/psicologo_db

# GitHub OAuth (create app at https://github.com/settings/developers)
GITHUB_CLIENT_ID=<your-github-oauth-app-client-id>
GITHUB_CLIENT_SECRET=<your-github-oauth-app-client-secret>

# Google OAuth (create app at https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>

# Site URL (used for OAuth callbacks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production URL
```

### OAuth Setup Instructions

1. **GitHub OAuth App:**
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github` (or your production URL)
   - Copy the Client ID and Client Secret

2. **Google OAuth:**
   - Go to https://console.cloud.google.com/apis/credentials
   - Create a new OAuth 2.0 Client ID
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (or your production URL)
   - Copy the Client ID and Client Secret

3. **Generate BETTER_AUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
