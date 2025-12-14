import { readFileSync } from "node:fs"
import { drizzle } from "drizzle-orm/node-postgres"
import { type PoolConfig, Pool } from "pg"

import * as schema from "./schema"

let pool: Pool | undefined

const createPool = () => {
  const connectionString = process.env.POSTGRES_URL

  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set")
  }

  const config: PoolConfig = { connectionString }

  const url = new URL(connectionString)
  const sslMode = (
    process.env.PGSSLMODE ??
    url.searchParams.get("sslmode") ??
    ""
  ).toLowerCase()
  const isLocalHost = /localhost|127\.0\.0\.1|::1/.test(url.hostname)
  const shouldUseSsl = !isLocalHost && sslMode !== "disable"

  if (shouldUseSsl) {
    const certificatePath =
      process.env.PGSSLROOTCERT ?? process.env.DATABASE_SSL_CERT_PATH
    const inlineCertificate = process.env.DATABASE_SSL_CERT

    if (certificatePath) {
      config.ssl = {
        ca: readFileSync(certificatePath, "utf8"),
        rejectUnauthorized: true,
      }
    } else if (inlineCertificate) {
      config.ssl = {
        ca: inlineCertificate.replace(/\\n/g, "\n"),
        rejectUnauthorized: true,
      }
    } else if (sslMode === "require" || sslMode === "verify-full") {
      config.ssl = {
        rejectUnauthorized: false,
      }
    }
  }

  return new Pool(config)
}

export const getPool = () => {
  if (!pool) {
    pool = createPool()
  }

  return pool
}

const createDb = () => drizzle(getPool(), { schema })

type DbClient = ReturnType<typeof createDb>

let db: DbClient | undefined

export const getDb = () => {
  if (!db) {
    db = createDb()
  }

  return db
}
