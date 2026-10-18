# Navegación compacta al hacer scroll

## Cómo se comporta ahora

`HeroFixedNav` tiene tres estados:

1. **Arriba, dentro del hero:** la nav va con el hero (`apart`).
2. **Bajando:** desaparece (`off`).
3. **Subiendo:** reaparece fija arriba (`top`), a 16 px del borde.

Con la nav actual, ese estado fijo mide 48 px en móvil y 101 px en escritorio, así que funciona. Con la compacta, el estado fijo mediría **300 px en móvil y 290 px en escritorio**, y taparía el contenido. Se ve en las capturas marcadas como «entera (problema)».

## Propuesta: barra fina al subir

- **Arriba:** índice completo (300 px móvil / 290 px escritorio).
- **Bajando:** el índice se va con el hero y no queda nada fijo.
- **Subiendo:** aparece una barra fina de **48 px** con:
  - móvil: `☰ Índice · Argumento · Relato` + tema;
  - escritorio: `Índice · 01 Argumento · Glosario · Laboratorio · Noticias` + subapartados activos + tema.
- **Bajando otra vez:** la barra fina se oculta.
- **Al tocar «Índice»:** se abriría el índice completo como capa, sin tener que subir hasta el hero.

## Capturas

- [Estados en móvil](compacta-scroll-mobile.png)
- [Estados en escritorio](compacta-scroll-desktop.png)
- [Barra fina en móvil](compacta-scroll-movil-barra.png)
- [Barra fina en escritorio](compacta-scroll-escritorio-barra.png)

Las barras finas están **simuladas** en estas capturas: oculté la nav real e inyecté una barra con los estilos previstos. Todavía no está implementado el estado real ni la capa del índice.
