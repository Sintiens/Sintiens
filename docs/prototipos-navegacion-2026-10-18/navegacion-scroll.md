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
veces: pestaña, panel del capítulo y H1 de la página. Ahora, cuando la categoría
solo tiene una página:

- se muestran solo las cuatro pestañas;
- no se pinta el panel de capítulo con título y descripción;
- el contenido empieza inmediatamente después.

El índice de Glosario/Noticias baja de ~250-300 px a **110 px**.

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
- Glosario y Noticias sin panel duplicado.
- axe-core: **0 violaciones** en móvil y escritorio.
- Barrido de rutas sin errores ni desbordamiento.

## Capturas

- [Móvil con el índice completo](final-simple-mobile-top.png)
- [Móvil con el botón flotante](float-home-mobile-down.png)
- [Móvil con el índice abierto](float-home-mobile-overlay.png)
- [Glosario sin repetición](float-glosario-mobile-top.png)
- [Glosario con el índice abierto](float-glosario-mobile-overlay.png)
- [Escritorio con el botón flotante](float-home-desktop-down.png)
