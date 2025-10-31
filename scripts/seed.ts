import "dotenv/config"

import { getDb, getPool } from "../db"
import { billingPeriodEnum, plans, roles } from "../db/schema"

const roleSeed = [
  {
    id: "admin",
    name: "Administrador",
    description: "Control total de la plataforma",
  },
  {
    id: "member",
    name: "Miembro",
    description: "Acceso a contenidos públicos y recursos gratuitos",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Acceso a contenidos y recursos premium",
  },
]

const planSeed = [
  {
    slug: "free",
    name: "Plan Gratuito",
    description:
      "Acceso a artículos del blog, newsletter y recursos gratuitos de bienvenida.",
    priceCents: 0,
    billingPeriod: billingPeriodEnum.enumValues[0],
    isActive: true,
    metadata: {
      features: [
        "Artículos y recursos públicos",
        "Newsletter quincenal",
        "Acceso a webinars abiertos puntuales",
      ],
    },
  },
  {
    slug: "monthly-premium",
    name: "Suscripción Premium Mensual",
    description:
      "Acceso completo a la academia online, sesiones grupales y materiales descargables.",
    priceCents: 3900,
    billingPeriod: billingPeriodEnum.enumValues[1],
    isActive: true,
    metadata: {
      features: [
        "Academia con vídeos y fichas prácticas",
        "Sesiones mensuales en directo",
        "Recursos exclusivos y plantillas",
      ],
    },
  },
  {
    slug: "annual-premium",
    name: "Suscripción Premium Anual",
    description: "Mismos beneficios del plan mensual con dos meses de ahorro.",
    priceCents: 39000,
    billingPeriod: billingPeriodEnum.enumValues[2],
    isActive: true,
    metadata: {
      features: [
        "Academia con vídeos y fichas prácticas",
        "Sesiones mensuales en directo",
        "Recursos exclusivos y plantillas",
        "Prioridad en soporte",
      ],
    },
  },
]

async function seed() {
  const database = getDb()

  await database.transaction(async (tx) => {
    await tx.insert(roles).values(roleSeed).onConflictDoNothing()
    await tx.insert(plans).values(planSeed).onConflictDoNothing()
  })
}

seed()
  .then(async () => {
    console.log("✅ Seed data inserted successfully")
    await getPool().end()
  })
  .catch(async (error) => {
    console.error("❌ Seed failed", error)
    await getPool().end()
    process.exit(1)
  })
