# Reglas para agentes — Sintiens

## Despliegue (producción)
- La producción corre en un **VPS de Oracle Cloud** (Always Free ARM) como contenedor Docker `sintiens_app` (puerto 3000, red `sintiens_net`), detrás de **Caddy** (HTTPS Let's Encrypt) y DNS de DuckDNS → https://sintiens.duckdns.org.
- **Render NO se usa** (retirado el 12/09/2026) y **Vercel tampoco**. No mencionarlos como plataformas activas ni proponer cambios basados en ellos.
- **Publicar ≠ desplegar:** `git push` solo actualiza GitHub; la web se actualiza reconstruyendo y recreando el contenedor en el VPS (`docker build` + `docker run`). No dar por hecho que un push actualiza producción.

## Flujo Git
- **Cambios pequeños y seguros** ya probados en local → pueden ir directos a `main`.
- **Cambios grandes o experimentales** → proponer primero una rama (`git checkout -b pruebas-…`) y explicarlo en lenguaje llano; no fusionar a `main` hasta que Germán lo valide.
- **Worktree** = dos ramas abiertas a la vez en carpetas hermanas (lo usa Orca con agentes); una misma rama no puede estar abierta en dos sitios.
- Antes de tocar `main` con trabajo grande, preguntar; nunca reescribir el historial de git para borrar menciones antiguas de Render (son inofensivas una vez corregidos los archivos).
