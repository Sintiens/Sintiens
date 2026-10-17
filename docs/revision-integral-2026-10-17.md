# Revisión integral de la web — Sintiens

**Fecha:** 17 de octubre de 2026, 18:20 (Europe/Madrid)  
**Commit revisado:** `e022622` — *feat(legal): página de privacidad y aviso legal en /privacidad*  
**Producción:** <https://sintiens.org> (índice con `Last-Modified: Sat, 17 Oct 2026 15:45:08 GMT`; incluye ya la página legal)  
**Alcance:** 15 rutas públicas, temas claro/oscuro, escritorio 1440×900 y móvil 390/360/320 px, API de IA, SEO, accesibilidad, seguridad, rendimiento, contenido y legal.  
**Método:** `tsc --noEmit`, `npm run build`, validadores del proyecto, `npm audit`, Chrome 155 headless vía CDP, axe-core 4.10.2, sondas HTTP a producción y revisión estática del código.  
**Naturaleza:** auditoría de solo lectura. No se ha modificado ningún archivo de la web ni se ha desplegado nada.

> **Nota posterior (17/10/2026):** las correcciones de esta auditoría se implementaron después de cerrar el informe; el detalle está en [cambios-2026-10-17.md](cambios-2026-10-17.md). Este documento conserva el estado previo a los cambios.

> **Veredicto: aprobado con reservas.** La web está funcionalmente sana, bien construida y visualmente muy cuidada. Antes de una campaña de difusión conviene corregir cuatro cosas: la navegación móvil (A1), la carga anticipada de todas las pestañas (A2), los metadatos SEO duplicados/solo-cliente (A3) y el CLS de la primera visita (A5). El resto son deudas de accesibilidad, contenido y hardening que no rompen la experiencia actual.

---

## 1. Resumen ejecutivo

| ID | Severidad | Hallazgo | Evidencia principal |
|---|---|---|---|
| **A1** | **Alta** | En móvil (≤390 px) la pestaña «Noticias» queda tapada por el botón de tema y no responde al toque; el submenú de Laboratorio oculta 6 de 9 herramientas | Clic real a 360 px sobre NOTICIAS impacta en el SVG del botón de tema y no navega; reproducible en producción |
| **A2** | **Alta** | El *code splitting* está anulado: todas las pestañas se descargan al abrir la portada | 23 scripts y ~1,6 MB de JS decodificado en la primera carga; se descarga `DataSection` (645 KB) sin visitar Cifras |
| **A3** | **Alta/Media** | Cada ruta tiene 2 `<title>` y 2 `meta description`; el HTML estático no lleva `og:title`/`og:description`, así que los bots sociales solo ven la portada | Barrido de 15 rutas: `titleTags=2`, `descCount=2`, primera descripción genérica de 156 caracteres |
| **A4** | **Media** | Las rutas inexistentes devuelven 200 y reescriben la URL a `/` (soft 404) | `/no-existe`, `/Glosario`, `/privacidadx` → 200 + portada; la URL pasa a `/` |
| **A5** | **Alta** | CLS ≈ 0,98 en la primera visita móvil a la portada y ≈ 0,95 en Cifras (escritorio y móvil) | El esqueleto de 600 px se sustituye por un hero de 796 px y el footer salta; reproducible en producción sin caché |
| **A6** | **Media** | Deuda de accesibilidad: contraste en 14/14 rutas, saltos de jerarquía de encabezados y dos `input` sin etiqueta | axe-core: `color-contrast` serious; `label` critical en calculadora y termodinámica |
| **A7** | **Media** | Las 61 noticias comparten título/descripción genéricos y `CollectionPage`; no hay `NewsArticle` ni imagen social por noticia | `/noticias?id=...` mantiene `<title>Noticias — Sintiens</title>` y la descripción de la sección |
| **A8** | **Media/Baja** | `www.sintiens.org` sirve una copia con 200 en vez de redirigir al dominio canónico | `https://www.sintiens.org/` → 200; el canonical solo se añade por JS |
| **A9** | **Baja** | RSS ordenado del más antiguo al más nuevo; `lastmod` del sitemap estático = fecha de build | Primer ítem del RSS: 2024-01-09; último: 2026-09-08 |
| **A10** | **Baja/Media** | Mojibake visible («factor�a»), 54 citas a Wikipedia/Google Books y noticias sin actualizar desde el 8/9 | `storyData.tsx:429`; avisos de `validate-all`; último `date` de `newsData` |
| **A11** | **Baja** | Hardening y mantenibilidad: CSP con `unsafe-inline`, 413 en HTML, Google Fonts externo, sin CI/tests | `server.ts:192-201`, `index.html:52-58`, ausencia de `.github/` |

**Indicadores globales**

| Comprobación | Resultado |
|---|---|
| TypeScript (`npm run lint`) | ✅ 0 errores |
| Build de producción | ✅ correcto (29 assets; 2,4 MB sin comprimir; 649 KB gzip) |
| Validadores de datos | ✅ 0 errores · ⚠️ 3 avisos (54 citas a Wikipedia/Google Books) |
| `npm audit` | ✅ 0 vulnerabilidades |
| Enlaces internos | ✅ 16/16 rutas únicas responden 200 |
| Enlaces externos (muestra 12) | ✅ sin 404; 2 bloqueos anti-bot (401/403) |
| API `/api/analyze-argument` | ✅ 200 en 13,7 s, esquema correcto, sin HTML inyectado |
| Consola del navegador | ✅ 0 errores en rutas locales; en producción 1 `ERR_FAILED` de la hoja de Google Fonts que no impide el render |
| axe-core | ⚠️ 35–48 reglas superadas; contraste en 14/14 rutas y violaciones medias/graves adicionales |
| CLS primera visita (sin caché) | ❌ 0,985 en portada móvil · 0,949 en Cifras escritorio · 0,955 en Cifras móvil |
| Sitemap / RSS | ✅ 76 URLs (15 estáticas + 61 noticias) · 61 ítems RSS |
| Navegación móvil | ❌ falla a 360 px en producción |

---

## 2. Lo que funciona bien

- **Navegación de escritorio**: los cuatro apartados y el submenú cambian de ruta, actualizan `<title>`, `h1` y canonical; atrás/adelante del historial funciona (probado: Inicio → Glosario → Noticias → Laboratorio → Argumento → atrás → adelante).
- **Buscadores**: el glosario filtra por término y las noticias por texto (61 → 41 resultados al buscar «ley»), con región `aria-live` para lectores de pantalla.
- **Calculadora de impacto**: los horizontes temporales, el perfil dietético, los botones ± y el deslizador de población recalculan vidas, agua, emisiones y territorio de forma coherente (p. ej. 8.000 M de personas × 108,8 vidas/persona/año ≈ 870,5 mil millones).
- **IA dialéctica**: una llamada real devolvió 200 en 13,7 s con el esquema esperado (`argumentSummary`, `axioms`, `scientificAccuracy`, `logicalFailures`, `impactAnalysis`, `alternativeReflection`), sin HTML y con validación de entrada (vacío, tipo incorrecto, >4.000 caracteres y modo inválido → 400).
- **Seguridad de cabeceras**: HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP y `x-powered-by` desactivado.
- **API protegida en producción**: `/api/dev/tasks` devuelve 403; CORS solo permite `https://sintiens.org`; sin claves en archivos versionados.
- **Legal**: `/privacidad` existe, se enlaza desde el footer, tiene título/canonical propios, vuelve correctamente con «Volver» y describe cookies, almacenamiento local, Gemini y Google Fonts.
- **Rendimiento de red**: assets con hash y `Cache-Control: immutable, max-age=31536000`; HTML `no-cache`; gzip activo en producción; service worker v4 con precache y limpieza de cachés antiguas.
- **Accesibilidad de base**: un solo `h1` por ruta, `lang="es"`, imágenes con `alt`, botones con `aria-label`, foco visible, `prefers-reduced-motion` respetado, modales en portal con trampa de foco y búsquedas anunciadas.
- **Contenido**: las cifras clave son coherentes entre sí (78,53 mil millones de pollos → 2.490,3/s y ~91 % del total terrestre; ~86 mil millones de terrestres → ~2.700/s). La página legal se añadió durante esta revisión (commit `e022622`) y ya está en producción.

---

## 3. Hallazgos detallados

### A1 — La navegación principal pierde «Noticias» en móvil · **Alta**

**Qué ocurre.** En un viewport de 360 px (Android habitual), la píldora de navegación mide 270 px visibles pero su contenido mide 357 px: «ARGUMENTO», «GLOSARIO» y «LABORATORIO» se ven, y «NOTICIAS» queda fuera del área visible, debajo del botón de tema. Un clic real en el centro de «NOTICIAS» impacta en el `<path>` del icono del botón de tema y **no navega**. A 414 px sí funciona; a 390 px el impacto también cae en el contenedor del botón.

**Evidencia**

- Producción, 360 px: rect de NOTICIAS `x=277,8–350,6`; `elementFromPoint` devuelve `path` del botón de tema; tras el clic la URL sigue en `/`.
- Local, 390 px: impacto en `DIV` del dock, sin navegación; a 414 px el impacto es un `SPAN` dentro del enlace y navega a `/noticias`.
- El submenú de Laboratorio tiene 9 elementos y 797 px de ancho de scroll frente a 326 px visibles: solo se ven «INICIO», «VELO DE RAWLS» y «TERMODINÁMICA»; el resto exige un swipe sin indicación visual.
- Captura: `scratch/audit/shots/home-mobile-fold.png` (se ve «NO» cortado y el botón de tema encima).

**Causa técnica.** El dock principal usa `flex-nowrap` con `overflow-x-auto` ([MiniTabNav.tsx:71](../src/components/MiniTabNav.tsx#L71)) y el dock del tema es `shrink-0` ([MiniTabNav.tsx:116](../src/components/MiniTabNav.tsx#L116)) dentro de una fila sin `flex-1` en el dock principal ([MiniTabNav.tsx:82](../src/components/MiniTabNav.tsx#L82)). El cuarto enlace queda en el contenido desplazable, fuera de la ventana visible, y el botón del tema ocupa esa esquina.

**Recomendación**

1. En `<640px`, sustituir la píldora por un menú móvil (hamburguesa + panel) o permitir dos filas; es la solución más robusta para 320–390 px.
2. Si se mantiene el scroll horizontal: dar `flex-1 min-w-0` al dock principal, separar el botón de tema del área desplazable, añadir un degradado/chevron que indique «hay más» y `scroll-snap`.
3. Aplicar lo mismo al submenú de Laboratorio (o un desplegable «Más herramientas»).
4. Probar con clics reales a 320, 360, 375, 390 y 414 px, no solo con capturas.

---

### A2 — El *code splitting* está anulado: se descargan todas las pestañas al inicio · **Alta**

**Qué ocurre.** `App.tsx` crea las promesas de importación **en el ámbito del módulo**:

```ts
const storyPromise = import("./components/StoryMode");
const glossaryPromise = import("./components/GlossaryExplorer");
// … 14 promesas más
const StoryMode = lazy(() => storyPromise);
```

Una llamada `import()` se ejecuta en cuanto se evalúa el módulo, no cuando se renderiza el `lazy`. Resultado: al abrir la portada se descargan **todos** los componentes de pestaña, incluido `DataSection` (645 KB sin comprimir, 177 KB gzip), `NewsExplorer` (183 KB), `StoryMode` (132 KB), `TimelineExplorer` (85 KB), etc. El precacheo por `requestIdleCallback` que hay después es redundante porque ya está todo descargado.

**Evidencia**

- `App.tsx:15-28` (promesas) y `App.tsx:30-43` (`lazy` que las reutiliza).
- Medición en la portada: **23 scripts**, ~1,63 MB de JS decodificado; entre los recursos cargados están `DataSection`, `NewsExplorer`, `TimelineExplorer`, `AiValidator`, `NutriCompare`, `WelfarewashingScanner`, `ThermodynamicMatrix`, `NeurobiologyViewer` y `ImpactCalculator`.
- Build: 28 archivos JS, 2.146 KB sin comprimir y **618 KB gzip** en total; la portada descarga casi todo.
- El chunk `DataSection` no se usa hasta visitar `/argumento/cifras`.

**Impacto.** Primera carga y consumo de datos muy por encima de lo necesario, sobre todo en 4G/móvil; se pierde el beneficio de dividir el bundle y se retrasa la interactividad. En la prueba sintética el hilo principal no se bloqueó de forma grave (2 tareas largas, 91 ms de *total blocking time*), así que el coste principal aquí es de **red, descarga y decodificación**, no de CPU.

**Recomendación**

1. Cambiar a factorías: `const DataSection = lazy(() => import("./components/DataSection"));` y eliminar las constantes `*Promise`.
2. Si se quiere precargar, hacerlo solo con la pestaña actual y sus vecinas, en `requestIdleCallback`, y respetar `navigator.connection.saveData`/`effectiveType`.
3. Considerar dividir `DataSection` por módulo (ticker, anatomía, matriz) para que Cifras no cargue 645 KB de golpe.
4. Verificar con `Performance.getEntriesByType("resource")` que la portada solo descarga el shell y la pestaña activa.

---

### A3 — Metadatos SEO duplicados y solo en cliente · **Alta/Media**

**Qué ocurre.** En las 15 rutas hay **dos `<title>` y dos `meta[name="description"]`** en el `<head>`: los estáticos de `index.html` y los que añade `react-helmet-async` con `TabSeo`. El primero que encuentra un consumidor es el estático:

- `<title>Sintiens — Análisis crítico sobre nuestra relación con los animales</title>` ([index.html:59](../index.html#L59))
- `<meta name="description" content="Sintiens es una plataforma interactiva de bioética…">` (156 caracteres, [index.html:30](../index.html#L30))

`TabSeo` añade los suyos con `<Helmet>` ([TabSeo.tsx:150-156](../src/components/TabSeo.tsx#L150-L156)), pero no elimina los estáticos. En el barrido de 15 rutas, `document.head.querySelectorAll('meta[name="description"]').length === 2` y la primera descripción es siempre la genérica de 156 caracteres; la descripción específica de cada pestaña queda en segundo lugar.

Además, el HTML estático **no incluye** `og:title`, `og:description`, `twitter:title` ni `twitter:description`. Los bots de WhatsApp, X/Twitter, Facebook, LinkedIn y Bing no ejecutan JavaScript: al compartir cualquier ruta ven la portada genérica o ningún título/descripción.

**Evidencia**

- `index.html` solo tiene `og:type`, `og:site_name`, `og:image`, `og:image:width/height/alt` y `og:locale`; no hay `og:title`/`og:description` ([index.html:20-29](../index.html#L20-L29)).
- Barrido `scratch/audit/sweep-local.json`: 15/15 rutas con `titleTags=2`, `descCount=2`, `descLen=156`.
- En `/glosario`, el `<head>` contiene dos títulos (`Glosario interactivo — Sintiens` y el estático) y dos descripciones (la estática primero).

**Impacto.** Fragmentos y vistas previas sociales pobres o incorrectos; riesgo de que buscadores usen la descripción genérica; HTML inválido por doble `<title>`.

**Recomendación**

1. Añadir `data-rh="true"` al `<title>` y al `meta description` estáticos para que Helmet los reconozca y los **reemplace**, o eliminarlos y dejar que Helmet los gestione (con un fallback para no-JS).
2. Añadir `og:title`/`og:description` estáticos de portada como mínimo, y generar los específicos por ruta en el servidor.
3. Lo más robusto para un sitio de contenido: **inyectar metadatos en el servidor** según `req.path`/`?id=` (leer `index.html` y sustituir marcadores) o prerenderizar las 15 rutas. Así los bots sociales y Bing reciben el título/descripción correctos sin ejecutar JS.
4. Validar con el depurador de tarjetas de X/Facebook y con `curl` sin JS.

---

### A4 — Rutas inexistentes: 200 + reescritura a la portada (soft 404) · **Media**

**Qué ocurre.** Cualquier ruta desconocida sin extensión recibe `index.html` con estado 200; la app la interpreta como pestaña por defecto y `replaceState` cambia la URL a `/`. Ejemplos verificados: `/no-existe`, `/Glosario`, `/privacidadx`, `/noticias?id=no-existe` → 200 y portada; en `/no-existe` la URL final es `/`.

**Causa.** El *fallback* SPA devuelve siempre `index.html` ([server.ts:969-978](../server.ts#L969-L978)); el mapa de rutas cae en `DEFAULT_TAB` ([App.tsx:107-109](../src/App.tsx#L107-L109)) y el efecto inicial reescribe la URL ([App.tsx:190-202](../src/App.tsx#L190-L202)). Solo se protegen rutas con extensión y `/api/*`.

**Impacto.** Soft 404s para buscadores, tráfico de erratas que aterriza en la portada sin explicación, URLs perdidas y posible contenido duplicado.

**Recomendación.** Servir un 404 real (o una página «No encontrada» con estado 404) para rutas no reconocidas; como mínimo, no reescribir la URL y mostrar un mensaje. Mantener los 301 legacy que ya funcionan (`/datos`, `/grafo`, etc.).

---

### A5 — CLS ≈ 0,98 en la primera visita móvil y ≈ 0,95 en Cifras · **Alta**

**Qué ocurre.** El *Cumulative Layout Shift* de la primera visita (sin caché) es muy alto en dos escenarios:

| Escenario | CLS medido |
|---|---|
| Portada en móvil 390×844 (producción, sin caché) | **0,985** (0,9246 + 0,0602) |
| Portada en móvil (local, sin caché) | **0,980** |
| `/argumento/cifras` en escritorio 1440×900 (producción) | **0,949** |
| `/argumento/cifras` en móvil (producción) | **0,955** |
| Portada en escritorio (producción) | 0,047 ✅ |

El salto ocurre al sustituirse el esqueleto inicial de `min-h-[600px]` por el hero real: en móvil el contenedor pasa de **600 a 796 px** y el footer se desmonta/mueve; en Cifras móvil pasa de **560 a 836 px**. En escritorio la portada no salta porque el esqueleto (820 px) coincide con el hero final (820 px), lo que confirma que el problema es la altura reservada, no el *swap* de fuentes.

**Evidencia.** `scratch/audit/expr-cls.js` (local y producción, `--no-cache`); umbral «bueno» ≤0,1 y «pobre» >0,25. La captura con caché caliente daba 0,05 porque el esqueleto se sustituía antes del primer pintado; el problema aparece en la primera visita real, que es el caso que importa.

**Causa.** El *skeleton* genérico de 600 px ([App.tsx:485](../src/App.tsx#L485)) no reserva la altura del hero, que cambia según breakpoint; al montar el contenido real, el footer y todo lo que hay debajo se desplazan. No es un problema de fuentes ni de la animación de página.

**Recomendación.** Hacer que el esqueleto reserve la altura real del hero por breakpoint (variable CSS medida del hero o `min-h` específico), no montar el footer hasta que el contenido esté listo (o reservarle su espacio) y medir de nuevo con Lighthouse/WebPageTest. Es un cambio acotado y de alto impacto en Core Web Vitals móviles.

---

### A6 — Accesibilidad: contraste, jerarquía y etiqueta · **Media**

**Resultados de axe-core 4.10.2** (14 rutas; solo automático, no sustituye una revisión manual con lector de pantalla):

| Ruta | Violaciones | Nodos |
|---|---|---|
| `/` (oscuro) | `color-contrast`, `heading-order` | 12 + 1 |
| `/` (claro) | `color-contrast`, `heading-order` | 12 + 1 |
| `/glosario` | `color-contrast`, `heading-order` | 12 + 1 |
| `/noticias` | `color-contrast`, `heading-order` | 4 + 1 |
| `/argumento/cifras` | `color-contrast` | 12 |
| `/argumento/cronologia` | `color-contrast`, `heading-order` | 8 + 1 |
| `/argumento/critica` | `color-contrast`, `heading-order` | 3 + 1 |
| `/laboratorio/impacto` | `color-contrast`, **`label` (critical)** | 10 + 1 |
| `/laboratorio/descomponer` | `color-contrast` | 6 |
| `/laboratorio/velo-rawls` | `color-contrast` | 10 |
| `/laboratorio/termodinamica` | `color-contrast`, **`label` (critical)** | 12 + 1 |
| `/laboratorio/neurobiologia` | `color-contrast`, `heading-order` | 12 + 1 |
| `/laboratorio/nutricion` | `color-contrast`, `heading-order` | 9 + 1 |
| `/laboratorio/welfarewashing` | `color-contrast`, `heading-order` | 6 + 1 |
| `/privacidad` | `color-contrast`, `link-in-text-block` | 3 + 1 |

**El contraste falla en las 14 rutas auditadas** (de 3 a 12 nodos por página), y 8 de ellas tienen además saltos de jerarquía. Es un patrón sistémico de microtexto, no un caso aislado.

**Casos concretos**

- **«Profundizar»** (10 px, `text-zinc-500` sobre `#09090b`) = **4,08:1**, por debajo del 4,5:1 de AA ([SocraticReflection.tsx:339-341](../src/components/SocraticReflection.tsx#L339-L341)). Pasa a `zinc-400` o sube el tamaño.
- **Microtexto del glosario**: descripciones a 11 px con `text-on-surface-variant/70` y metadatos a 9 px con `/50` ([GlossaryExplorer.tsx:1121-1124](../src/components/GlossaryExplorer.tsx#L1121-L1124)); mismo patrón en los contadores de noticias ([NewsExplorer.tsx:1774](../src/components/NewsExplorer.tsx#L1774)), etiquetas de la calculadora y footer (`opacity-70`/`opacity-50`, [App.tsx:593-610](../src/App.tsx#L593-L610)). axe marca 255 nodos «incomplete» en la portada por fondos con gradiente/transparencia: el problema real puede ser mayor.
- **Jerarquía de encabezados**: la portada pasa de `h1` a `h3` («Preguntas Comunes & Reflexiones»); el glosario usa `h5` para las letras; noticias usa `h3` para tarjetas sin `h2` de sección.
- **Calculadora**: el `input[type=range]` de escala de población no tiene `aria-label` ni `<label>` asociado ([ImpactCalculator.tsx:322-329](../src/components/ImpactCalculator.tsx#L322-L329)); axe lo marca como **critical**. El mismo fallo aparece en otro deslizador de `/laboratorio/termodinamica`.
- **Legal**: los enlaces del cuerpo solo se distinguen por color hasta el hover (`hover:underline`), lo que incumple `link-in-text-block`; añadir subrayado permanente.
- **Skip link**: `main` no tiene `tabindex="-1"`, así que «Saltar al contenido» desplaza pero no mueve el foco; añadirlo.

**Lo que sí está bien**: `alt` en las 36 imágenes de noticias (0 sin alt, 0 rotas), nombres accesibles en botones, `aria-current` en la navegación, regiones `aria-live` en buscadores, foco visible, reducción de movimiento y diálogos con trampa de foco.

---

### A7 — Noticias sin metadatos de artículo · **Media**

**Qué ocurre.** Las 61 noticias se publican como `/noticias?id=<slug>`, pero todas comparten:

- `<title>Noticias — Sintiens</title>`
- descripción genérica de la sección
- JSON-LD `CollectionPage` (no `NewsArticle`)
- `og:image` genérica de 1200×630

El canonical y `og:url` sí incluyen el `id`, lo cual está bien, pero el título/descripción no cambian. Un enlace a una noticia concreta compartido en redes muestra el título y la imagen de la sección, no el titular.

**Evidencia.** `/noticias?id=world-ley-corea-dog-meat-ban-2024`: título `Noticias — Sintiens`, descripción de la sección, `CollectionPage`; el elemento de la noticia existe y hace scroll hasta él (correcto), pero los metadatos no lo reflejan.

**Recomendación.** Para cada noticia, generar título (`<titular> — Sintiens`), descripción (resumen), `og:image` propia (o generada) y JSON-LD `NewsArticle` con `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage` e `image`. Lo ideal es hacerlo en servidor para que los bots lo vean sin JS; si no, al menos un `useEffect` que actualice Helmet con el artículo seleccionado (mejora la pestaña y Google, no los bots sociales).

---

### A8 — `www` duplicado sin redirección · **Media/Baja**

`https://www.sintiens.org/` responde **200** con el mismo HTML que el ápice; no hay 301 a `https://sintiens.org`. El canonical solo se añade por JavaScript, así que un rastreador sin JS ve dos hosts idénticos sin canonical. HSTS ya incluye subdominios.

**Recomendación.** Redirigir `www` → ápice con 301 en Caddy (una regla de una línea) y, si se sirve `www`, incluir el canonical estático en el HTML. Verificar también `http://` → `https://` (ya devuelve 308).

---

### A9 — RSS y sitemap · **Baja**

- **RSS**: `items.sort((a,b)=> a.date.localeCompare(b.date))` ordena del más antiguo al más nuevo ([generate-rss.mjs:22](../scripts/generate-rss.mjs#L22)). El primer ítem es de 2024-01-09 y el último de 2026-09-08; los lectores suelen mostrar el primero como «lo último». Cambiar a `b.date.localeCompare(a.date)`.
- **Sitemap**: todas las rutas estáticas reciben `lastmod = buildDate` ([generate-sitemap.mjs:23-45](../scripts/generate-sitemap.mjs#L23-L45)), incluida `/privacidad` con `changefreq=yearly`. Eso hace que `lastmod` cambie en cada build y pierda valor. Usar la fecha real de modificación por ruta o quitar `lastmod` donde no se sepa.
- **Lo correcto**: 76 URLs únicas, todas canónicas, `/privacidad` incluida, XML válido, `robots.txt` con sitemap, RSS válido con 61 ítems, `application/rss+xml` y `application/xml` correctos.

---

### A10 — Contenido y calidad editorial · **Baja/Media**

- **Mojibake visible**: `label: "las granjas factor�a (CAFO)"` en [storyData.tsx:429](../src/data/storyData.tsx#L429). Debe ser «factoría». Es el único carácter U+FFFD encontrado en `src/`, pero conviene añadir una comprobación al CI.
- **Citas**: los validadores avisan de **54 citas a Wikipedia/Google Books** (CORE 17, DILEMMAS 15, TIMELINE 22) que deberían migrarse a DOI/fuente primaria para los datos factuales. No bloquea el build, pero es deuda de rigor.
- **Noticias paradas**: el último `date` es 2026-09-08; a 17/10/2026 son ~39 días sin novedades. En una sección llamada «Noticias» conviene publicar, etiquetar como archivo o explicar la cadencia.
- **«GEMINI 2.5»**: el badge está fijo en [AiValidator.tsx:433](../src/components/AiValidator.tsx#L433), mientras el servidor usa `gemini-flash-latest` configurable ([server.ts:759](../server.ts#L759)). Puede quedar desfasado; mejor derivarlo de una variable o decir «Gemini (flash)».
- **Cifras**: la muestra revisada es coherente (78,53 mil millones de pollos → 2.490,3/s; ~86 mil millones de terrestres → ~2.700/s; 91 % de pollos). No se ha hecho una verificación fuente por fuente de los 33 dilemas.
- **Codificación**: el resto de archivos `src/` no presenta `Ã`, `â€` ni U+FFFD; el RSS y el manifest están en UTF-8 correcto.

---

### A11 — Hardening y mantenibilidad · **Baja**

- **CSP**: `script-src 'self' 'unsafe-inline'` y `style-src 'self' 'unsafe-inline'` ([server.ts:192-201](../server.ts#L192-L201)). Es comprensible por el loader inline, el JSON-LD y los estilos inline, pero se puede endurecer con hashes/nonces para los scripts estáticos y dejar `style-src` con `'unsafe-inline'` solo si es imprescindible. Añadir `report-uri`/`report-to` para detectar roturas.
- **413 en HTML**: un cuerpo JSON >200 KB devuelve la página HTML por defecto de Express (`Payload Too Large`), no JSON. Añadir un *error handler* que devuelva `{ error }` con `application/json`.
- **Google Fonts**: se cargan tres familias desde `fonts.googleapis.com` ([index.html:52-58](../index.html#L52-L58)) y reciben la IP del visitante antes de cualquier consentimiento. La página legal lo disclose, pero sigue siendo un riesgo RGPD y una dependencia externa. Autoalojar las fuentes (subconjunto latino, variable) mejora privacidad, elimina el `ERR_FAILED` de producción y ahorra conexiones.
- **Sin CI ni tests**: no hay `.github/`, ESLint ni pruebas. Los scripts de validación de datos son buenos; añadir un workflow que ejecute `lint`, `build`, validadores, `npm audit` y una prueba de humo de rutas/metadatos. Un test de axe/Lighthouse en CI evitaría regresiones como A1/A3/A6.
- **Imagen de producción**: `vite` está en `dependencies` y `server.ts` lo importa estáticamente, así que la imagen final incluye Vite aunque no se use en producción. Mover la importación a un `await import("vite")` dentro del bloque de desarrollo y pasar Vite a `devDependencies` reduce superficie y tamaño.
- **`DevModeOverlay`**: se genera un chunk de 133 KB que no se descarga en producción (bien), pero ocupa espacio en la imagen; si no se usa, excluirlo del build de producción.
- **Legal/LSSI**: la página identifica al titular y el contacto, pero no incluye NIF ni domicilio. Si el proyecto se monetiza o se constituye como servicio de la sociedad de la información, añadirlos. Si sigue siendo un proyecto personal sin ánimo de lucro, al menos documentar esa condición.

---

## 4. Plan de acción priorizado

| Prioridad | Acción | Esfuerzo | Impacto |
|---|---|---|---|
| 1 | Menú móvil o rediseño del dock; arreglar solape con el botón de tema y el submenú de Laboratorio | 0,5–1 día | Desbloquea Noticias y 6 herramientas en móvil |
| 2 | Cambiar las 14 promesas `import()` por factorías `lazy(() => import(...))`; precarga condicionada | 1–2 h | Reduce la primera carga ~60–80 % |
| 3 | Hacer que el esqueleto reserve la altura real del hero (móvil y Cifras) y estabilizar el footer; medir CLS sin caché | 2–4 h | CLS de ~0,98 a <0,1 en la primera visita |
| 4 | Añadir `data-rh="true"`/eliminar tags estáticos, `og:title`/`og:description` y metadatos por ruta en servidor | 0,5–1 día | Arregla títulos/descripciones duplicados y vistas previas sociales |
| 5 | 404 real para rutas desconocidas; no reescribir la URL | 2–4 h | Evita soft 404s y mejora UX/SEO |
| 6 | Tokens de contraste, jerarquía `h2`, `<label>` del range, subrayado de enlaces legales | 0,5–1 día | Elimina las violaciones graves de axe |
| 7 | `NewsArticle` + título/descripción/imagen por noticia | 0,5–1 día | Mejora indexing y compartidos de 61 URLs |
| 8 | 301 `www` → ápice | 15 min | Elimina duplicado de host |
| 9 | RSS descendente y `lastmod` real | 30 min | Feed y sitemap más correctos |
| 10 | Mojibake, citas primarias, badge Gemini, CI/tests, CSP/413, autoalojar fuentes | 1–2 días | Deuda de calidad/seguridad/privacidad |

---

## 5. Evidencias y reproducción

**Comandos ejecutados**

```powershell
npm run lint          # 0 errores
npm run build         # OK (29 assets; 2,4 MB raw; 649 KB gzip)
npm audit             # 0 vulnerabilidades
node scripts/validate-news.mjs
node scripts/validate-all.mjs   # 0 errores; 3 avisos (54 citas Wikipedia/Google Books)
```

> Nota de entorno: el primer `npm run build` falló porque esbuild no podía borrar su archivo temporal en `%TEMP%` (permisos del sandbox). Con `TEMP` dentro del workspace el build pasa; **no es un defecto del proyecto**.

**Evidencias locales** (carpeta `scratch/audit/`, ignorada por git)

- `shots/home-dark*.png`, `home-light.png`, `home-mobile.png`, `cifras-*.png`, `glosario-*.png`, `noticias-*.png`, `laboratorio-dark.png`, `descomponer-dark.png`, `impacto-dark.png`, `privacidad-dark.png`.
- `shots/prod-home-mobile-fold.png` (producción, 390 px): se ve «NOTICI…» cortado y el botón de tema encima; evidencia visual de A1.
- `axe/*.json`: resultados completos de axe por ruta.
- `sweep-local.json`: barrido de 15 rutas con título, descripciones, canonical, H1 y overflow.
- `prod-probe.json`, `prod-check.mjs`, `prod-assets.mjs`: cabeceras, compresión, sitemap, RSS y build desplegado.
- `mobile-nav-click.mjs`: prueba de clic real a 360/414 px contra local y producción.
- `expr-cls.js`, `expr-contrast.js`, `expr-nav.js`, `expr-calc.js`, `expr-news*.js`, `expr-legal-back.js`: pruebas funcionales y de accesibilidad.

**Limitaciones de esta revisión**

- Solo Chromium headless (Chrome 155). No se ha probado Safari/iOS, Firefox ni dispositivos físicos; los bugs de Safari < 16.4 ya corregidos en commits anteriores no se han revalidado.
- No se ha hecho revisión manual con VoiceOver/NVDA ni pruebas de teclado exhaustivas; axe es automático y deja 255 nodos «incomplete» por gradientes.
- Las métricas LCP/CLS son sintéticas (red local/headless); el CLS de primera visita (portada móvil y Cifras) se reprodujo también en producción sin caché, pero conviene confirmarlo con Lighthouse/WebPageTest y datos de campo (CrUX).
- No hay pruebas de carga, *penetration testing* ni revisión legal vinculante.
- El repositorio cambió durante la revisión (commit `e022622`, página legal). El análisis se fija en ese commit; si hay nuevos commits, algunos hallazgos pueden variar. Producción sirve un build con la página legal (índice 15:45 GMT).

---

## 6. Conclusión

Sintiens está por encima de la media de proyectos personales: identidad visual coherente, contenido denso y bien estructurado, API funcional y protegida, validadores de datos, página legal y una base de accesibilidad razonable. Los problemas importantes no son de «falta de trabajo» sino de **detalles de integración**: el menú móvil que se rompe en el ancho más común, el `lazy` que se ejecuta antes de tiempo y unos metadatos que solo existen después de montar React.

Corrigiendo A1–A5 (menú móvil, carga anticipada, metadatos y CLS de primera visita) y A6–A7, la web queda lista para difusión; A8–A11 pueden ir en el siguiente ciclo. Recomiendo repetir esta auditoría después de los cambios con el mismo guion (barrido de rutas, axe, clic móvil real, CLS sin caché y metadatos sin JS) para verificar que no haya regresiones.
