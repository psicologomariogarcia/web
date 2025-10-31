import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { plans } from "./plans"
import { userPlans } from "./user-plans"
import { users } from "./users"

export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
])

export const transactionTypeEnum = pgEnum("transaction_type", [
  "subscription",
  "one_time",
])

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  planId: uuid("plan_id").references(() => plans.id, { onDelete: "set null" }),
  userPlanId: uuid("user_plan_id").references(() => userPlans.id, {
    onDelete: "set null",
  }),
  type: transactionTypeEnum("type").notNull().default("one_time"),
  status: transactionStatusEnum("status").notNull().default("pending"),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").notNull().default("EUR"),
  provider: text("provider").notNull().default("redsys"),
  providerReference: text("provider_reference"),
  errorCode: text("error_code"),
  metadata: jsonb("metadata"),
  processedAt: timestamp("processed_at", {
    withTimezone: true,
    mode: "string",
  }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
})
