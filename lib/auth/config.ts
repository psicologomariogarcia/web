import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { getDb } from "@/db"
import { users } from "@/db/schema/users"
import { session, account, verification } from "@/db/schema/auth"

const requiredEnv = (key: string) => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`${key} is not set`)
  }

  return value
}

/**
 * Determines the base URL for Better Auth (server-side only)
 * Priority:
 * 1. BETTER_AUTH_URL (for local development override)
 * 2. VERCEL_URL (for Vercel Preview/Production deployments) - automatically prefixed with https://
 * 3. NEXT_PUBLIC_SITE_URL (for custom domain)
 * 4. Fallback to localhost
 */
const getBaseURL = () => {
  // Local development override
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL
  }

  // Vercel deployment (Preview or Production)
  // VERCEL_URL is provided by Vercel automatically (e.g., "your-app.vercel.app")
  // Note: In local .env, if VERCEL_URL is set, it should include the protocol
  if (process.env.VERCEL_URL) {
    // If it already has a protocol, use it as-is (for local dev)
    if (process.env.VERCEL_URL.startsWith("http")) {
      return process.env.VERCEL_URL
    }
    // Otherwise, prefix with https:// (for Vercel deployments)
    return `https://${process.env.VERCEL_URL}`
  }

  // Custom domain or fallback
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema: {
      user: users,
      session: session,
      account: account,
      verification: verification,
    },
  }),
  advanced: {
    database: {
      generateId: (options) => {
        // Generate UUIDs for user and account tables (UUID fields)
        if (
          options.model === "user" ||
          options.model === "users" ||
          options.model === "account"
        ) {
          return crypto.randomUUID()
        }
        // Generate text IDs for session and verification tables (text fields)
        // Better Auth expects text IDs for these tables
        return crypto.randomUUID().replace(/-/g, "").substring(0, 32)
      },
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    // github: {
    //   clientId: requiredEnv("GITHUB_CLIENT_ID"),
    //   clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
    // },
    google: {
      clientId: requiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    },
  },
  baseURL: getBaseURL(),
  basePath: "/api/auth",
  secret: requiredEnv("BETTER_AUTH_SECRET"),
})
