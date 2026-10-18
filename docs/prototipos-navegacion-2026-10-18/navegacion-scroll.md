# Navegación compacta implementada

## Comportamiento

`HeroFixedNav` mantiene sus tres estados, pero la navegación compacta cambia de forma:

1. **Arriba, dentro del hero:** se ve el índice completo (`apart`).
2. **Bajando:** el índice se va con el hero y no queda nada fijo (`off`).
3. **Subiendo:** aparece una barra fina de **50 px** a 16 px del borde (`top`).
4. **Bajando otra vez:** la barra se oculta.
5. **Al pulsar «Índice»:** se abre el índice completo como capa modal.

## Qué se implementó

- `src/components/CompactIndexNav.tsx`: índice completo, barra fina y capa modal.
- `src/components/MiniTabNav.tsx`: pasa a montar `CompactIndexNav`.
- `src/components/NavConceptPrototype.tsx`: variante `SPLITC` reutilizada como contenido del índice, con cierre opcional.
- `src/components/ui/Shells.tsx`: `HeroFixedNav` expone `data-nav-mode`.

La barra fina se monta con un portal a `document.body`, así no depende de la altura del wrapper ni provoca saltos. Se muestra con la intención de scroll (`wheel`/`touch`) y se oculta al bajar.

## Medidas

- Índice completo: **308 px** en móvil y **298 px** en escritorio.
- Barra fina: **50 px**.
- Capa del índice: **334 px** en móvil y **332 px** en escritorio.
- Objetivos táctiles de 44 px en pestañas, subapartados y botones.
- axe-core: **0 violaciones** en móvil y escritorio en el estado superior.

## Capturas

- [Estados en móvil](implementado-mobile2.png)
- [Estados en escritorio](implementado-desktop2.png)
- [Móvil arriba](implementado-movil-arriba.png)
- [Móvil bajando](implementado-movil-bajando.png)
- [Móvil con barra fina](implementado-movil-barra.png)
- [Móvil con el índice abierto](implementado-movil-indice.png)
- [Escritorio arriba](implementado-escritorio-arriba.png)
- [Escritorio con barra fina](implementado-escritorio-barra.png)
- [Escritorio con el índice abierto](implementado-escritorio-indice.png)

## Pruebas hechas

- 360, 390, 320 y 1440 px.
- Scroll real con rueda: arriba, bajando, subiendo, bajando otra vez.
- Cambio de sección desde la capa (Glosario) y cierre automático.
- Bloqueo y restauración del scroll con la capa abierta.
- Barrido de todas las rutas sin errores de consola ni desbordamiento.
