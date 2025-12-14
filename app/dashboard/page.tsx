import { redirect } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUser } from "@/lib/auth/server"

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenida a tu área privada
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Información de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Nombre</p>
                <p className="text-sm text-muted-foreground">
                  {user.name || user.email}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              {user.image && (
                <div>
                  <p className="text-sm font-medium">Avatar</p>
                  <img
                    src={user.image}
                    alt={user.name || "Avatar"}
                    className="h-16 w-16 rounded-full mt-2"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenidos Premium</CardTitle>
            <CardDescription>Accede a materiales exclusivos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próximamente podrás acceder a todos los contenidos premium aquí.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mi Plan</CardTitle>
            <CardDescription>Gestión de suscripción</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí podrás ver y gestionar tu plan de suscripción.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

