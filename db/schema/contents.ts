import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const contentStatusEnum = pgEnum("content_status", [
  "draft",
  "published",
  "archived",
])

export const contentVisibilityEnum = pgEnum("content_visibility", [
  "public",
  "premium",
])

export const contents = pgTable("contents", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  status: contentStatusEnum("status").notNull().default("draft"),
  visibility: contentVisibilityEnum("visibility").notNull().default("public"),
  wordpressId: integer("wordpress_id"),
  wordpressSlug: text("wordpress_slug"),
  wordpressType: text("wordpress_type"),
  heroImageUrl: text("hero_image_url"),
  metadata: jsonb("metadata"),
  publishedAt: timestamp("published_at", {
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
