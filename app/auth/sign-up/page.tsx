import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SignUpForm } from "../_components/sign-up-form"

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Crea tu cuenta</CardTitle>
        <CardDescription>
          Accede a la academia y guarda tu progreso con tu correo y una
          contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
