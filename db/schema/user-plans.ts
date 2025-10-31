import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

import { plans } from "./plans"
import { users } from "./users"

export const userPlanStatusEnum = pgEnum("user_plan_status", [
  "pending",
  "active",
  "cancelled",
  "expired",
])

export const userPlans = pgTable(
  "user_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    planId: uuid("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    status: userPlanStatusEnum("status").notNull().default("pending"),
    externalReference: text("external_reference"),
    isTrial: boolean("is_trial").notNull().default(false),
    startedAt: timestamp("started_at", { withTimezone: true, mode: "string" }),
    endsAt: timestamp("ends_at", { withTimezone: true, mode: "string" }),
    cancelledAt: timestamp("cancelled_at", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueUserPlan: uniqueIndex("user_plans_user_plan_unique").on(
      table.userId,
      table.planId
    ),
  })
)
