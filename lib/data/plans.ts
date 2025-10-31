import { and, eq } from "drizzle-orm"
import type { InferSelectModel } from "drizzle-orm"

import { plans } from "@/db/schema"
import { getDbClient } from "@/lib/db"

export type Plan = InferSelectModel<typeof plans>

export const getActivePlans = async () => {
  const db = getDbClient()

  return db.query.plans.findMany({
    where: eq(plans.isActive, true),
    orderBy: (plan, { asc }) => [asc(plan.priceCents)],
  })
}

export const getPlanBySlug = async (slug: string) => {
  const db = getDbClient()

  return db.query.plans.findFirst({
    where: eq(plans.slug, slug),
  })
}

export const getPlansForBillingPeriod = async (
  billingPeriod: Plan["billingPeriod"]
) => {
  const db = getDbClient()

  return db.query.plans.findMany({
    where: and(
      eq(plans.billingPeriod, billingPeriod),
      eq(plans.isActive, true)
    ),
  })
}
