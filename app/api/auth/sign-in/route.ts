import { NextResponse } from "next/server"

import { createSupabaseRouteHandlerClient } from "@/lib/supabase/clients"

type SignInPayload = {
  email?: string
  password?: string
}

export async function POST(request: Request) {
  const { supabase, applyCookies } = createSupabaseRouteHandlerClient()
  const body = (await request.json()) as SignInPayload

  if (!body?.email || !body?.password) {
    const response = NextResponse.json(
      { error: "Email y contraseña son obligatorios" },
      { status: 400 }
    )
    applyCookies(response)
    return response
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error) {
    const response = NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 }
    )
    applyCookies(response)
    return response
  }

  const response = NextResponse.json({
    user: data.user,
    session: data.session,
  })

  applyCookies(response)

  return response
}
