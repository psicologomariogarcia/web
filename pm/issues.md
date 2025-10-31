## Registro y login (Fase 1)

- Error inicial al ejecutar migraciones contra Supabase: `SELF_SIGNED_CERT_IN_CHAIN` al usar el pooler. Solución aplicada: añadir soporte para cargar certificado raíz (variables `PGSSLROOTCERT`, `DATABASE_SSL_CERT_PATH`, `DATABASE_SSL_CERT`) o usar la URL directa.
- Fallo al registrar usuarios (inserción en tabla `users`) por el mismo certificado auto-firmado. Se actualizó la creación del `Pool` de `pg` para permitir SSL configurable.
- Pendiente: definir RLS/policies cuando se active protección de contenidos (decidimos operar sin RLS de momento).
