# Navegación compacta — estado final

## Comportamiento

- **Arriba, dentro del hero:** se ve el índice completo (`apart`).
- **Al bajar:** el índice se va con el hero y **no reaparece ninguna barra**.
- **Al subir:** tampoco reaparece nada; se evita el solape entre dos navegaciones.
- **Para volver a navegar:** se sube hasta el índice del hero.

Esto sustituye la barra fina que aparecía y desaparecía. Se retiró porque se
solapaba con el índice completo y resultaba visualmente pesada.

## Cambios de esta corrección

- Fuera la barra flotante y la capa modal asociada.
- Fuera el botón «Entrar en…»: estando ya dentro del capítulo no aportaba nada.
- Fuera el botón «Abrir Glosario/Noticias» cuando la categoría solo tiene una
  página.
- Texto más grande en pestañas, títulos, subapartados y descripciones.
- Sin solape: el índice completo solo se renderiza en estado `apart`; fuera del
  hero el contenedor queda vacío.

## Archivos

- `src/components/CompactIndexContent.tsx`: pestañas, página del capítulo y
  subapartados.
- `src/components/CompactIndexNav.tsx`: muestra el índice solo en el hero y
  controla el estado `data-nav-mode`.
- `src/components/MiniTabNav.tsx`: monta `CompactIndexNav`.
- `src/components/ui/Shells.tsx`: `HeroFixedNav` expone `data-nav-mode`.

## Pruebas

- 320, 360, 390 y 1440 px.
- Scroll con rueda: arriba, bajando, subiendo y bajando otra vez. En ningún
  estado aparecen dos navegaciones a la vez.
- axe-core: **0 violaciones** en móvil y escritorio.
- Capturas: [móvil 360](final-simple-mobile-top.png),
  [móvil 320](final-simple-320-top.png),
  [escritorio](final-simple-desktop-top.png).
