import { getBlogPosts } from "@/lib/contentful/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60 * 15

export const metadata = {
  title: "Blog | MG Psicología",
  description:
    "Artículos y recursos de psicología publicados por MG Psicología",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
      <header className="mb-12 flex flex-col gap-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline">Blog</Badge>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Historias y aprendizajes en psicología
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explora reflexiones clínicas, recursos prácticos y novedades del
          proyecto. Actualizamos regularmente con contenido pensado para
          profesionales y pacientes.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          <p className="text-lg font-medium">
            Todavía no hay publicaciones disponibles.
          </p>
          <p className="mt-2 text-sm">
            Vuelve pronto, estamos preparando los primeros artículos.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col overflow-hidden border-border/60"
            >
              {post.heroImage?.url && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/9] w-full overflow-hidden"
                >
                  <Image
                    src={post.heroImage.url}
                    alt={
                      post.heroImage.description ??
                      post.heroImage.title ??
                      post.title
                    }
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              )}

              <CardHeader>
                {post.publishedAt && (
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
                <CardTitle className="line-clamp-2 text-2xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                )}
              </CardHeader>

              {post.tags.length > 0 && (
                <CardContent className="mt-auto flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-2 py-1 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
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
