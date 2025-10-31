"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

type FormState = {
  error?: string
  success?: string
}

const INITIAL_STATE: FormState = {
  error: undefined,
  success: undefined,
}

export function SignUpForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")?.toString().trim() ?? ""
    const password = formData.get("password")?.toString() ?? ""
    const fullName = formData.get("fullName")?.toString().trim() || undefined

    if (!email || !password) {
      setFormState({ error: "Introduce un email y contraseña válidos" })
      return
    }

    setIsSubmitting(true)
    setFormState(INITIAL_STATE)

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, fullName }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? "No se pudo completar el registro")
      }

      setFormState({
        success:
          payload.message ??
          "Registro completado. Inicia sesión para continuar.",
      })

      toast({
        title: "Usuario registrado",
        description:
          "Hemos creado tu cuenta. Revisa tu correo si necesitas confirmación.",
      })

      event.currentTarget.reset()

      setTimeout(() => {
        router.push("/auth/sign-in")
      }, 300)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido"
      setFormState({ error: message })
      toast({
        title: "No se pudo registrar",
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
          htmlFor="fullName"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          Nombre completo
        </label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Tu nombre (opcional)"
          autoComplete="name"
        />
      </div>

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
          autoComplete="new-password"
          required
          minLength={6}
        />
      </div>

      {formState.error ? (
        <p className="text-sm text-destructive">{formState.error}</p>
      ) : null}
      {formState.success ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          {formState.success}
        </p>
      ) : null}

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
    </form>
  )
}

export default SignUpForm
