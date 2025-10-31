## Implementation Plan

- **Fase 0 – Setup y decisiones base**

  - [x] Adoptar `Drizzle` como ORM principal y documentar la configuración inicial con Supabase (migraciones, conexiones, helpers).
  - [ ] Inicializar repo y tooling (Next.js 15, TypeScript, ESLint, Prettier, testing básico).
  - [~] Configurar Supabase local (CLI) y remoto; preparar `.env` y scripts de arranque. _Se añadió `.env.example` y scripts para migraciones/seed; pendiente levantar Supabase local/remoto._
  - [x] Definir que se utilizará Supabase Auth (emails, sesiones) para simplificar el MVP.
  - [ ] Añadir stub en `app/api/payments/` con comentario TODO explicando integración pendiente con TPV BBVA (Redsys) para referencia futura.

- **Fase 1 – Modelado de datos y backend mínimo** ✅

  - [x] Diseñar esquema inicial (usuarios, roles, planes, contenidos, transacciones, relaciones WordPress ↔ recursos internos) en Drizzle.
  - [x] Implementar migraciones y seed básico para roles/planes de prueba usando Drizzle Kit.
  - [~] Configurar Supabase Auth con Next.js (route handlers para sign-in/up, RLS en tablas, policies para recursos premium). _Route handlers operativos; queda pendiente definir RLS/policies en Supabase._
  - [x] Preparar servicios/helpers para acceso a datos (repositorios o server actions centralizadas).

- **Fase 2 – Contentful ingestion y CMS bridge**

  - Definir content models en Contentful (posts, servicios, recursos, metadatos premium) y los campos obligatorios que necesitaremos en la app.
  - Construir utilidades para fetch desde Contentful (REST/GraphQL), normalización y cache (ISR/cron) de entradas y páginas de servicios.
  - Crear modelos internos para mapear contenidos gratuitos/premium y asociar assets en Supabase Storage.
  - Diseñar fallback manual (data estática) por si la API de Contentful no responde durante desarrollo.

- **Fase 3 – Interfaz pública**

  - Implementar `Inicio`, `Blog`, `Servicios`, `Recursos` consumiendo la capa de datos de Contentful/Supabase.
  - Añadir layout, navegación, estados de carga, componentes reutilizables (Hero, cards, CTA).
  - Formularios de newsletter y contacto (sin lógica avanzada aún) apuntando a endpoints básicos.
  - Configurar estilos base, tokens y theming con Tailwind/shadcn.

- **Fase 4 – Área privada y paywall**

  - Implementar registro/login con Supabase Auth, guardas en server components y middleware para rutas protegidas.
  - Crear dashboard `Academia` con listado de contenidos premium, verificación de permisos, descarga/stream seguro desde Supabase Storage.
  - Añadir control de estados premium (post-compra) basado en flags de transacciones (mock mientras Redsys está pendiente).

- **Fase 5 – Administración ligera**

  - Construir panel mínimo para gestionar recursos (publicar/despublicar, marcar premium).
  - Controles para revisar suscripciones/pagos usando registros de supabase (con datos mock).
  - Implementar proceso manual para subir nuevos assets a Supabase Storage.

- **Fase 6 – Comunicación y QA**

  - Configurar plantillas de emails en Supabase (verificación, reset, bienvenida premium) y validar envío.
  - Tests de smoke (Playwright) para flujos críticos: login, acceso premium, lectura de blog.
  - Checklist de accesibilidad y SEO básico.

- **Fase 7 – Preparación del lanzamiento interno**
  - Documentar flujos (README, onboarding técnico, scripts).
  - Revisar performance en Vercel preview, ajustar caching ISR y protección de rutas.
  - Planificar iteración siguiente (integración real Redsys, marketing, analytics).
