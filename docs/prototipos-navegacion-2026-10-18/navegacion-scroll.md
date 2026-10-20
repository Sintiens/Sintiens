# Navegación compacta — estado final

## Comportamiento

- **Arriba, dentro del hero:** se ve el índice completo (`apart`).
- **Al bajar:** el índice se va con el hero.
- **A partir de ahí, solo en móvil:** queda un **botón flotante «Índice»**
  abajo a la derecha, siempre visible mientras se lee.
- **Al pulsarlo:** se abre el índice completo como capa modal.
- **Al volver arriba:** el botón desaparece y se ve el índice del hero.
- **En escritorio no hay botón flotante:** el índice del hero es la única
  navegación; al hacer scroll se va con el hero y no queda ningún control
  flotante.

No hay barra superior que aparezca y desaparezca, ni dos navegaciones a la vez.

## Categorías de una sola página

Glosario y Noticias no tienen subapartados. Antes se repetía el nombre tres
veces: pestaña, panel del capítulo y H1 de la página. Ahora:

- **Móvil:** se muestran solo las cuatro pestañas, sin panel de capítulo.
- **Escritorio:** se mantiene el mismo master-detail de dos columnas que en
  Argumento/Laboratorio. El panel derecho usa un título propio —«Consulta
  rápida» en Glosario y «Archivo de actualidad» en Noticias— para no repetir
  el nombre de la categoría.
- Sin botones «Entrar en…» ni «Abrir…» redundantes.

Así el diseño de escritorio no cambia al pasar de Argumento a Glosario, y en
móvil se mantiene la versión compacta de pestañas.

## Texto

- Pestañas: 11 px en móvil y 14 px en escritorio.
- Subapartados: 12 px.
- Descripciones: 12 px.
- Sin botones «Entrar en…» ni «Abrir…» redundantes.

## Archivos

- `src/components/CompactIndexContent.tsx`: pestañas, panel del capítulo y
  variante simple para Glosario/Noticias.
- `src/components/CompactIndexNav.tsx`: índice del hero, botón flotante y capa.
- `src/components/MiniTabNav.tsx`: monta `CompactIndexNav`.
- `src/components/ui/Shells.tsx`: `HeroFixedNav` expone `data-nav-mode`.

## Pruebas

- 320, 360, 390 y 1440 px.
- Scroll con rueda: arriba, bajando, subiendo y bajando otra vez.
- Botón flotante visible tras el hero en móvil; en escritorio no se renderiza.
- Capa abre/cierra y bloquea el scroll en móvil.
- Glosario y Noticias mantienen el master-detail en escritorio y las pestañas
  simples en móvil, sin repetir el título.
- axe-core: **0 violaciones** en móvil y escritorio.
- Barrido de rutas sin errores ni desbordamiento.

## Capturas

- [Móvil con el índice completo](final-simple-mobile-top.png)
- [Móvil con el botón flotante](float-home-mobile-down.png)
- [Móvil con el índice abierto](float-home-mobile-overlay.png)
- [Glosario en móvil](glosario-mobile-consistente.png)
- [Glosario en escritorio, misma estructura de dos columnas](glosario-desktop-consistente.png)
- [Noticias en escritorio, misma estructura](noticias-desktop-consistente.png)
- [Escritorio sin botón al hacer scroll](desktop-sin-boton.png)
