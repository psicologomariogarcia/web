import { cookies } from "next/headers"
import { type NextResponse } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

const requiredEnv = (key: string) => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`${key} is not set`)
  }

  return value
}

const getSupabaseCredentials = () => ({
  url: requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  anonKey: requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
})

const mapRequestCookies = async () => {
  const cookieStore = await cookies()

  return cookieStore.getAll().map(({ name, value }) => ({
    name,
    value,
  }))
}

export const createSupabaseServerClient = () => {
  const { url, anonKey } = getSupabaseCredentials()

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: mapRequestCookies,
    },
  })
}

type CookieHydrator = {
  supabase: ReturnType<typeof createServerClient>
  applyCookies: (response: NextResponse) => void
}

export const createSupabaseRouteHandlerClient = (): CookieHydrator => {
  const { url, anonKey } = getSupabaseCredentials()
  const cookieJar: {
    name: string
    value: string
    options: CookieOptions
  }[] = []

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: mapRequestCookies,
      setAll: async (cookiesToSet) => {
        cookieJar.splice(0, cookieJar.length, ...cookiesToSet)
      },
    },
  })

  const applyCookies = (response: NextResponse) => {
    cookieJar.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })
  }

  return { supabase, applyCookies }
}
