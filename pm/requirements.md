Intro

Estamos creando una plataforma de formación en psicología. La primera versión debe permitir ofrecer contenido gratuito y de pago, con especial foco en validar la propuesta de valor y preparar la base técnica para iterar rápido.

## Alcance inicial

- Priorizar un MVP enfocado en la web pública, el acceso autenticado a recursos premium y la capacidad de cobrar suscripciones o pagos puntuales.
- Los stakeholders principales son los usuarios finales (visitantes, suscriptores) y el equipo interno que gestiona contenidos.

## Arquitectura y stack propuesto

- **Hosting**: `Next.js 15` desplegado en Vercel para frontend y server actions/route handlers.
- **Backend**: lógica mínima en `Next.js` (sin microservicios); usar server actions y route handlers para procesos internos y webhooks.
- **Autenticación**: Supabase Auth integrado mediante route handlers de Next.js; sesiones y usuarios en Postgres gestionados por Supabase.
- **Base de datos**: `PostgreSQL` en Supabase. Para desarrollo local podemos usar `supabase start` (CLI) o un contenedor Docker/Postgres. ORM: utilizar `Drizzle` para modelado y migraciones.
- **Storage**: Supabase Storage para ficheros y vídeos protegidos. Evaluar políticas RLS para controlar acceso. Si hiciera falta CDN dedicado se podría estudiar bunny.net, pero no es prioritario para MVP.
- **Pagos**: Integración con TPV Virtual BBVA (Redsys). Requiere endpoint de notificación (webhook) en Next.js para validar pagos y actualizar el estado de suscripciones.
- **Email transaccional**: usar servicios nativos de Supabase (o SMTP propio) para verificación de correo y notificaciones básicas.
- **CMS / contenidos**: utilizar Contentful como headless CMS para Blog/Servicios y contenidos premium, consumiendo su API (REST/GraphQL). Definir los content models necesarios (posts, servicios, recursos) y mapearlos a nuestra base de datos. Mantener un fallback estático en el repo para desarrollo offline o incidencias del CMS.

## Estructura de la aplicación (páginas)

- `Inicio`: landing con propuesta de valor, CTA a registro y servicios principales.
- `Blog`: artículos educativos; origen del contenido según opción CMS elegida.
- `Servicios`: descripción de Psicoterapia, Cursos, membresía premium con CTA a conversión.
- `Recursos`: listado filtrable de materiales gratuitos, con posibilidad de descarga previa suscripción a newsletter.
- `Academia online`: área privada para usuarios autenticados con acceso a vídeos y materiales premium.
- `Autenticación`: páginas de registro, login, recuperación de contraseña.
- `Panel interno (mínimo)`: sección restringida para gestionar recursos (publicado/borrador) y revisar pagos básicos.

## Módulos funcionales prioritarios

- **Gestión de usuarios**: alta con email/password, verificación básica, roles usuario/admin.
- **Gestión de recursos**: catálogo de materiales categorizados, estados (gratis/premium), relación con archivos en Supabase Storage.
- **Pasarela de pago**: flujo de checkout con TPV BBVA, registro de transacciones, actualización de permisos premium.
- **Acceso a contenidos premium**: middleware/guards en Next.js para proteger rutas y streaming de vídeos.
- **Newsletter básica**: formulario de suscripción almacenando contactos en Supabase (lista dedicada) para migrar más adelante si se elige otra plataforma.
