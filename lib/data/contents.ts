import { and, eq } from "drizzle-orm"
import type { InferSelectModel } from "drizzle-orm"

import { contentPlanAccess, contents, plans } from "@/db/schema"
import { getDbClient } from "@/lib/db"

export type Content = InferSelectModel<typeof contents>

export const listPublishedContent = async (
  options: {
    visibility?: Content["visibility"]
  } = {}
) => {
  const db = getDbClient()

  return db.query.contents.findMany({
    where: (content, { eq, and }) =>
      options.visibility
        ? and(
            eq(content.status, "published"),
            eq(content.visibility, options.visibility)
          )
        : eq(content.status, "published"),
    orderBy: (content, { desc }) => [
      desc(content.publishedAt),
      desc(content.createdAt),
    ],
  })
}

export const getContentBySlug = async (slug: string) => {
  const db = getDbClient()

  return db.query.contents.findFirst({
    where: eq(contents.slug, slug),
  })
}

export const getContentForPlan = async (planSlug: string) => {
  const db = getDbClient()

  return db
    .select({
      content: contents,
      plan: plans,
    })
    .from(contentPlanAccess)
    .innerJoin(contents, eq(contentPlanAccess.contentId, contents.id))
    .innerJoin(plans, eq(contentPlanAccess.planId, plans.id))
    .where(eq(plans.slug, planSlug))
}
