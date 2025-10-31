import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core"

import { contents } from "./contents"
import { plans } from "./plans"

export const contentPlanAccess = pgTable(
  "content_plan_access",
  {
    contentId: uuid("content_id")
      .notNull()
      .references(() => contents.id, { onDelete: "cascade" }),
    planId: uuid("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.contentId, table.planId] }),
  })
)
