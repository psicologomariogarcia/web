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
    github: {
      clientId: requiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
    },
    /* google: {
      clientId: requiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    }, */
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",
  basePath: "/api/auth",
  secret: requiredEnv("BETTER_AUTH_SECRET"),
})
