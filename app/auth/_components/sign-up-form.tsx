"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { authClient } from "@/lib/auth/client"

type FormState = {
  error?: string
}

const INITIAL_STATE: FormState = {}

export function SignUpForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSocialSignIn = async (provider: "github" | "google") => {
    setFormState(INITIAL_STATE)
    setIsLoading(provider)

    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      })

      if (error) {
        throw new Error(error.message ?? "No se pudo completar el registro")
      }

      // If we get a redirect URL, the OAuth flow will handle it
      if (data?.url) {
        window.location.href = data.url
        return
      }

      // If we get here, sign-up was successful
      toast({
        title: "Cuenta creada",
        description: "Bienvenida a la academia",
      })

      router.push("/dashboard")
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
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn("github")}
          disabled={isLoading !== null}
        >
          {isLoading === "github" ? (
            "Conectando con GitHub…"
          ) : (
            <>
              <Github className="mr-2 h-4 w-4" />
              Continuar con GitHub
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading !== null}
        >
          {isLoading === "google" ? (
            "Conectando con Google…"
          ) : (
            <>
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continuar con Google
            </>
          )}
        </Button>
      </div>

      {formState.error ? (
        <p className="text-sm text-destructive">{formState.error}</p>
      ) : null}
    </div>
  )
}

export default SignUpForm
