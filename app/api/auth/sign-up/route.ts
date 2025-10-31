import { NextResponse } from "next/server"

import { users } from "@/db/schema"
import { getDbClient } from "@/lib/db"
import { createSupabaseRouteHandlerClient } from "@/lib/supabase/clients"

type SignUpPayload = {
  email?: string
  password?: string
  fullName?: string
  roleId?: string
}

export async function POST(request: Request) {
  const { supabase, applyCookies } = createSupabaseRouteHandlerClient()
  const body = (await request.json()) as SignUpPayload

  if (!body?.email || !body?.password) {
    const response = NextResponse.json(
      { error: "Email y contraseña son obligatorios" },
      { status: 400 }
    )
    applyCookies(response)
    return response
  }

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        full_name: body.fullName,
        role_id: body.roleId ?? "member",
      },
    },
  })

  if (error) {
    const response = NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 }
    )
    applyCookies(response)
    return response
  }

  const user = data.user

  if (user) {
    const db = getDbClient()

    await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email ?? body.email,
        fullName: body.fullName ?? user.user_metadata?.full_name ?? null,
        roleId: body.roleId ?? "member",
      })
      .onConflictDoNothing()
  }

  const response = NextResponse.json(
    {
      user,
      session: data.session,
      message:
        "Registro completado. Revisa tu correo para confirmar la cuenta si es necesario.",
    },
    { status: 201 }
  )

  applyCookies(response)

  return response
}
