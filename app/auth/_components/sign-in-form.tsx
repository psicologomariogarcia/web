"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

type FormState = {
  error?: string
}

const INITIAL_STATE: FormState = {}

export function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")?.toString().trim() ?? ""
    const password = formData.get("password")?.toString() ?? ""

    if (!email || !password) {
      setFormState({ error: "Introduce tus credenciales" })
      return
    }

    setFormState(INITIAL_STATE)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo iniciar sesión")
      }

      toast({
        title: "Sesión iniciada",
        description: "Bienvenida de nuevo",
      })

      router.push("/dashboard")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido"
      setFormState({ error: message })
      toast({
        title: "No se pudo iniciar sesión",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Contraseña
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          minLength={6}
        />
      </div>

      {formState.error ? (
        <p className="text-sm text-destructive">{formState.error}</p>
      ) : null}

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Accediendo…" : "Iniciar sesión"}
      </Button>
    </form>
  )
}

export default SignInForm
