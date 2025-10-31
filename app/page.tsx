import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Store,
  LayoutDashboard,
  BookOpen,
  Github,
  ArrowRight,
  Code2,
  Layers,
  Atom,
  Paintbrush,
  Component,
} from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-full p-10 lg:px-20">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Next.js Template Collection
              <span className="text-black-500"> for Modern Web Apps</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Jump-start your project with three production-ready templates
              powered by Next.js 15 and Tailwind CSS v4.
            </p>
            <div className="space-x-4">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Template Cards */}
      <div className="container px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Choose Your Template
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer group">
            <a href="/dashboard">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Dashboard</CardTitle>
                <LayoutDashboard className="h-5 w-5 text-neutral-500 group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500">Visualize your data</p>
              </CardContent>
            </a>
          </Card>

          <Card className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer group">
            <a href="/store">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Store</CardTitle>
                <Store className="h-5 w-5 text-neutral-500 group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500">Build your shop</p>
              </CardContent>
            </a>
          </Card>

          <Card className="transition-transform duration-300 hover:-translate-y-1 cursor-pointer group">
            <a href="/blog">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Blog</CardTitle>
                <BookOpen className="h-5 w-5 text-neutral-500 group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500">Blog your stuff </p>
              </CardContent>
            </a>
          </Card>
        </div>
      </div>

      {/* Tech Stack Section */}
      <section className="w-full py-12">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Built With Modern Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                name: "Next.js 15",
                url: "https://nextjs.org/docs",
                icon: <Layers className="h-4 w-4 mr-1" />,
              },
              {
                name: "React 19",
                url: "https://react.dev",
                icon: <Atom className="h-4 w-4 mr-1" />,
              },
              {
                name: "Tailwind CSS v4",
                url: "https://tailwindcss.com/docs",
                icon: <Paintbrush className="h-4 w-4 mr-1" />,
              },
              {
                name: "TypeScript",
                url: "https://www.typescriptlang.org/docs",
                icon: <Code2 className="h-4 w-4 mr-1" />,
              },
              {
                name: "shadcn/ui",
                url: "https://ui.shadcn.com",
                icon: <Component className="h-4 w-4 mr-1" />,
              },
            ].map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Badge
                  variant="outline"
                  className="text-sm hover:-translate-y-1 transition-transform duration-300 flex items-center"
                >
                  {tech.icon}
                  {tech.name}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
