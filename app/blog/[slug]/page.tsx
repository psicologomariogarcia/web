import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import type { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/contentful/client"

export const revalidate = 900

type PageParams = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const post = await getBlogPostBySlug((await params).slug)

  if (!post) {
    return {
      title: "Entrada no encontrada | MG Psicología",
    }
  }

  const description = post.excerpt ?? post.description ?? undefined
  const image = post.heroImage?.url

  return {
    title: `${post.title} | MG Psicología`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: image
        ? [
            {
              url: image,
              width: post.heroImage?.width,
              height: post.heroImage?.height,
              alt:
                post.heroImage?.description ??
                post.heroImage?.title ??
                post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageParams) {
  const post = await getBlogPostBySlug((await params).slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16 sm:px-8">
      <Link
        href="/blog"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        ← Volver al blog
      </Link>

      <header className="mt-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="uppercase tracking-wide"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg text-muted-foreground">{post.description}</p>
        )}
      </header>

      {post.heroImage?.url && (
        <figure className="relative mt-10 overflow-hidden rounded-xl border border-border/40">
          <Image
            src={post.heroImage.url}
            alt={
              post.heroImage.description ?? post.heroImage.title ?? post.title
            }
            width={post.heroImage.width ?? 1600}
            height={post.heroImage.height ?? 900}
            className="h-auto w-full object-cover"
            priority
          />
          {(post.heroImage.title || post.heroImage.description) && (
            <figcaption className="bg-background/80 px-4 py-2 text-xs text-muted-foreground">
              {post.heroImage.description ?? post.heroImage.title}
            </figcaption>
          )}
        </figure>
      )}

      {post.body && (
        <div className="prose prose-neutral mx-auto mt-12 max-w-none prose-headings:mt-10 prose-headings:font-semibold prose-p:leading-7 dark:prose-invert">
          {documentToReactComponents(post.body, richTextOptions)}
        </div>
      )}
    </article>
  )
}

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
      <h1>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h2>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
      <h3>{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => (
      <h4>{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: unknown, children: ReactNode) => (
      <h5>{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: unknown, children: ReactNode) => (
      <h6>{children}</h6>
    ),
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p>{children}</p>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
      <li>{children}</li>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const file = node?.data?.target?.fields?.file
      if (!file?.url) return null
      const url = ensureHttps(file.url)
      const description =
        node?.data?.target?.fields?.description ??
        node?.data?.target?.fields?.title ??
        "Recurso destacado"
      const width = file?.details?.image?.width ?? 1600
      const height = file?.details?.image?.height ?? 900

      return (
        <figure className="my-10 overflow-hidden rounded-xl border border-border/40">
          <Image
            src={url}
            alt={description}
            width={width}
            height={height}
            className="h-auto w-full object-cover"
          />
          {description && (
            <figcaption className="px-4 py-2 text-sm text-muted-foreground">
              {description}
            </figcaption>
          )}
        </figure>
      )
    },
    [BLOCKS.HR]: () => <hr className="my-8 border-border/70" />,
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
      <a
        href={node.data.uri}
        className="text-primary underline underline-offset-4"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
}

function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed)
}

function ensureHttps(url: string) {
  if (url.startsWith("https://")) return url
  if (url.startsWith("//")) return `https:${url}`
  return url
}
