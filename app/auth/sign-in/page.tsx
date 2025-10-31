import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SignInForm } from "../_components/sign-in-form"

export default function SignInPage() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Introduce tus credenciales para acceder a los contenidos disponibles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          ¿Todavía no tienes cuenta?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
