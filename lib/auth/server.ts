import { auth } from "./config"

export const getSession = async () => {
  return auth.api.getSession({
    headers: await import("next/headers").then((m) => m.headers()),
  })
}

export const getUser = async () => {
  const session = await getSession()
  return session?.user ?? null
}

