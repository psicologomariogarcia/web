import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AuthCallbackPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revisa tu correo</CardTitle>
        <CardDescription>
          Si era necesario verificar tu dirección, sigue el enlace que te hemos
          enviado. Una vez confirmado, podrás acceder con normalidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Si la pestaña no se actualiza automáticamente, puedes volver a la
          página de inicio de sesión y entrar con tus credenciales.
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href="/auth/sign-in"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Ir a iniciar sesión
        </Link>
      </CardFooter>
    </Card>
  )
}
