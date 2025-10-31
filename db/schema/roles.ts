import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
})
