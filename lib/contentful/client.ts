import "server-only"

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"
import type { Document } from "@contentful/rich-text-types"

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? "master"
const DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN

const CDN_HOST = "cdn.contentful.com"
const PREVIEW_HOST = "preview.contentful.com"

const DEFAULT_REVALIDATE_SECONDS = 60 * 15
const BLOG_POST_CONTENT_TYPE =
  process.env.CONTENTFUL_BLOG_POST_CONTENT_TYPE ?? "pageBlogPost"

if (!SPACE_ID) {
  throw new Error("Missing Contentful configuration: CONTENTFUL_SPACE_ID.")
}

if (!DELIVERY_TOKEN) {
  throw new Error(
    "Missing Contentful configuration: CONTENTFUL_DELIVERY_TOKEN."
  )
}

type Link<TLinkType extends string> = {
  sys: {
    type: "Link"
    linkType: TLinkType
    id: string
  }
}

interface Sys {
  id: string
  type: string
  createdAt: string
  updatedAt: string
  revision?: number
  contentType?: Link<"ContentType">
}

interface ContentfulAsset {
  sys: Sys
  fields: {
    title?: string
    description?: string
    file?: {
      url?: string
      fileName?: string
      contentType?: string
      details?: {
        size?: number
        image?: {
          width?: number
          height?: number
        }
      }
    }
  }
}

interface ContentfulCollection<TFields> {
  items: Array<ContentfulEntry<TFields>>
  includes?: {
    Asset?: ContentfulAsset[]
    Entry?: ContentfulEntry<unknown>[]
  }
  total: number
  skip: number
  limit: number
}

export interface ContentfulEntry<TFields> {
  sys: Sys
  fields: TFields
}

type FetchEntriesOptions = {
  params?: Record<string, string>
  preview?: boolean
  revalidate?: number
}

async function contentfulFetch<TFields>(
  endpoint: string,
  {
    params = {},
    preview = false,
    revalidate = DEFAULT_REVALIDATE_SECONDS,
  }: FetchEntriesOptions = {}
): Promise<ContentfulCollection<TFields>> {
  const host = preview ? PREVIEW_HOST : CDN_HOST
  const token = preview ? PREVIEW_TOKEN : DELIVERY_TOKEN

  if (!token) {
    throw new Error(
      preview
        ? "Missing Contentful configuration: CONTENTFUL_PREVIEW_TOKEN."
        : "Missing Contentful configuration: CONTENTFUL_DELIVERY_TOKEN."
    )
  }

  const url = new URL(
    `https://${host}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/${endpoint}`
  )

  const searchParams = new URLSearchParams({ include: "2", ...params })

  for (const [key, value] of searchParams.entries()) {
    if (value === undefined || value === null || value === "") {
      searchParams.delete(key)
    }
  }

  url.search = searchParams.toString()

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate },
  })

  if (!response.ok) {
    const message = await safeReadError(response)
    throw new Error(
      `Contentful request failed (${response.status}): ${message}`
    )
  }

  return (await response.json()) as ContentfulCollection<TFields>
}

async function safeReadError(response: Response) {
  try {
    const data = await response.json()
    return JSON.stringify(data)
  } catch (error) {
    return response.statusText
  }
}

function buildAssetMap(includes?: ContentfulCollection<unknown>["includes"]) {
  const map = new Map<string, ContentfulAsset>()

  includes?.Asset?.forEach((asset) => {
    map.set(asset.sys.id, asset)
  })

  return map
}

function resolveAsset(
  link: Link<"Asset"> | undefined,
  assetMap: Map<string, ContentfulAsset>
) {
  if (!link) return undefined
  const asset = assetMap.get(link.sys.id)
  if (!asset) return undefined

  const file = asset.fields.file
  const url = file?.url ? ensureHttps(file.url) : undefined

  if (!url) return undefined

  return {
    id: asset.sys.id,
    url,
    title: asset.fields.title ?? undefined,
    description: asset.fields.description ?? undefined,
    width: file?.details?.image?.width,
    height: file?.details?.image?.height,
    contentType: file?.contentType,
  }
}

function ensureHttps(url: string) {
  if (url.startsWith("https:")) return url
  if (url.startsWith("//")) return `https:${url}`
  return url
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  description: string | null
  body: Document | null
  publishedAt: string | null
  heroImage?: {
    id: string
    url: string
    title?: string
    description?: string
    width?: number
    height?: number
    contentType?: string
  }
  tags: string[]
}

type BlogPostFields = {
  title?: string
  slug?: string
  shortDescription?: string
  content?: Document
  publishedDate?: string
  tags?: string[]
  featuredImage?: Link<"Asset">
}

function normalizeBlogPost(
  entry: ContentfulEntry<BlogPostFields>,
  assetMap: Map<string, ContentfulAsset>
): BlogPost | null {
  const title = entry.fields.title
  const slug = entry.fields.slug

  if (!title || !slug) {
    return null
  }

  const heroImage = resolveAsset(entry.fields.featuredImage, assetMap)

  const body = entry.fields.content ?? null
  const shortDescription = entry.fields.shortDescription?.trim()
  const excerpt = shortDescription
    ? shortDescription
    : body
    ? truncateText(documentToPlainTextString(body), 320)
    : null

  return {
    id: entry.sys.id,
    title,
    slug,
    excerpt: excerpt ?? null,
    description: shortDescription ?? null,
    body,
    publishedAt: entry.fields.publishedDate ?? null,
    heroImage,
    tags: entry.fields.tags ?? [],
  }
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value
  const truncated = value.slice(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(" ")
  const safeEnd =
    lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated
  return `${safeEnd}…`
}

export async function getBlogPosts({
  limit,
  preview = false,
  revalidate = DEFAULT_REVALIDATE_SECONDS,
}: {
  limit?: number
  preview?: boolean
  revalidate?: number
} = {}) {
  const params: Record<string, string> = {
    content_type: BLOG_POST_CONTENT_TYPE,
    order: "-fields.publishedDate",
  }

  if (limit) {
    params.limit = String(limit)
  }

  const collection = await contentfulFetch<BlogPostFields>("entries", {
    params,
    preview,
    revalidate,
  })

  const assetMap = buildAssetMap(collection.includes)

  return collection.items
    .map((entry) => normalizeBlogPost(entry, assetMap))
    .filter((post): post is BlogPost => Boolean(post))
}

export async function getBlogPostBySlug(
  slug: string,
  {
    preview = false,
    revalidate = DEFAULT_REVALIDATE_SECONDS,
  }: { preview?: boolean; revalidate?: number } = {}
): Promise<BlogPost | null> {
  const collection = await contentfulFetch<BlogPostFields>("entries", {
    preview,
    revalidate,
    params: {
      content_type: BLOG_POST_CONTENT_TYPE,
      limit: "1",
      ["fields.slug"]: slug,
    },
  })

  if (!collection.items.length) {
    return null
  }

  const assetMap = buildAssetMap(collection.includes)

  return normalizeBlogPost(collection.items[0], assetMap)
}

export async function getBlogSlugs({
  preview = false,
  revalidate = DEFAULT_REVALIDATE_SECONDS,
}: {
  preview?: boolean
  revalidate?: number
} = {}) {
  const collection = await contentfulFetch<BlogPostFields>("entries", {
    preview,
    revalidate,
    params: {
      content_type: BLOG_POST_CONTENT_TYPE,
      select: "fields.slug",
      limit: "1000",
    },
  })

  return collection.items
    .map((item) => item.fields.slug)
    .filter(
      (slug): slug is string => typeof slug === "string" && slug.length > 0
    )
}
