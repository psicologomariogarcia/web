import { NextRequest, NextResponse } from "next/server"

import { auth } from "@/lib/auth/config"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard and other authenticated routes
  const isProtectedRoute = pathname.startsWith("/dashboard")

  if (isProtectedRoute) {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute =
    pathname.startsWith("/auth/sign-in") ||
    pathname.startsWith("/auth/sign-up")

  if (isAuthRoute) {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/dashboard/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
  ],
}

