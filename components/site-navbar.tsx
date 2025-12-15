"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  BookOpen,
  Home,
  Brain,
  GraduationCap,
  Store,
  Menu,
  LogIn,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "@/lib/auth/client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Menu items
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BookOpen,
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: Store,
  },
  {
    title: "Academia online",
    url: "/academia-online",
    icon: GraduationCap,
  },
  {
    title: "Recursos",
    url: "/recursos",
    icon: Brain,
  },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Mario García</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = pathname === item.url
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-primary font-extrabold"
                      : "text-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/dashboard" className="md:hidden">
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage
                    src={user.image || undefined}
                    alt={user.name || user.email || "User"}
                  />
                  <AvatarFallback className="text-xs">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : user.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button asChild variant="ghost" size="icon" className="md:hidden">
                <Link href="/auth/sign-in" aria-label="Iniciar sesión">
                  <LogIn className="h-4 w-4" />
                </Link>
              </Button>
            )}
            <div className="flex items-center gap-2">
              <ModeToggle />
              {/* Desktop Auth Button/Avatar */}
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <Link href="/dashboard">
                    <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name || user.email || "User"}
                      />
                      <AvatarFallback className="text-xs">
                        {user.name
                          ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : user.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <Button asChild variant="ghost" size="icon">
                    <Link href="/auth/sign-in" aria-label="Iniciar sesión">
                      <LogIn className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navegación</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {items.map((item) => {
                    const isActive = pathname === item.url
                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                  {!user && (
                    <div className="pt-4 border-t mt-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link
                          href="/auth/sign-in"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2"
                        >
                          <LogIn className="h-5 w-5" />
                          <span>Iniciar sesión</span>
                        </Link>
                      </Button>
                    </div>
                  )}
                  {user && (
                    <div className="pt-4 border-t mt-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.image || undefined}
                            alt={user.name || user.email || "User"}
                          />
                          <AvatarFallback className="text-xs">
                            {user.name
                              ? user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)
                              : user.email?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {user.name || user.email}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Ver perfil
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
