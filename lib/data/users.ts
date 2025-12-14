import { eq } from "drizzle-orm"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

import { users } from "@/db/schema"
import { getDbClient } from "@/lib/db"

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export const getUserById = async (id: string) => {
  const db = getDbClient()

  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      role: true,
    },
  })
}

export const getUserByEmail = async (email: string) => {
  const db = getDbClient()

  return db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      role: true,
    },
  })
}

export const upsertUser = async (payload: NewUser) => {
  const db = getDbClient()
  const timestamp = new Date().toISOString()

  return db
    .insert(users)
    .values({
      ...payload,
      updatedAt: payload.updatedAt ?? timestamp,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email: payload.email,
        name: payload.name,
        fullName: payload.fullName,
        avatarUrl: payload.avatarUrl,
        image: payload.image,
        emailVerified: payload.emailVerified,
        roleId: payload.roleId,
        updatedAt: timestamp,
      },
    })
}

export const updateUserRole = async (id: string, roleId: string) => {
  const db = getDbClient()

  return db.update(users).set({ roleId }).where(eq(users.id, id)).returning()
}
