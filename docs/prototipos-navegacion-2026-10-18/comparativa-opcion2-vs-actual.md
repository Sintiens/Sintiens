# Opción 2 vs navegación actual

Comparación hecha el 18/10/2026 con la navegación actual (la que está en `main` y producción) y el prototipo `?nav=SPLIT` de la rama `prototipos-navegacion-movil`.

## Capturas

- [Actual en móvil, cerrada](actual-movil-cerrado.png)
- [Actual en móvil, menú abierto](actual-movil-menu-abierto.png)
- [Actual en escritorio](actual-escritorio.png)
- [Opción 2 en móvil](opcion2-movil.png)
- [Opción 2 en escritorio](opcion2-escritorio.png)
- [Opción 2 en Laboratorio, móvil](opcion2-laboratorio-movil.png)
- [Comparativa lado a lado](actual-vs-opcion2.png)

## Medidas

| Métrica | Actual | Opción 2 |
|---|---:|---:|
| Altura de la nav en móvil (portada) | 48 px cerrada / 557 px con el panel abierto | 396 px |
| Altura de la nav en móvil (Laboratorio) | 48 px cerrada / panel | 566 px |
| Altura de la nav en escritorio (portada) | 101 px | 332 px |
| Altura de la nav en escritorio (Laboratorio) | 101 px | 373 px |
| Enlaces visibles en móvil | 0 cerrada / 16 con el panel abierto | 8 (los de la sección activa) |
| Toques para cambiar de sección | 2 (abrir + elegir) | 1 |
| Toques para cambiar de subsección | 3 (abrir + sección + subsección) | 1–2 |
| axe-core móvil | 0 violaciones | 0 violaciones |
| axe-core escritorio | 0 violaciones | 0 violaciones |

## Lo que mejora claramente

1. **La jerarquía**. En la opción 2 no hay duda: las pestañas son capítulos y el panel de debajo es la página del capítulo activo. En la actual, el panel móvil mezcla categorías y subcategorías en la misma lista.
2. **El contexto**. Cada categoría y cada subapartado llevan una frase que explica qué hay dentro. La actual solo enseña nombres.
3. **Los toques**. En móvil se pasa de «abrir menú → elegir sección → elegir subsección» a «elegir sección → elegir subsección». En escritorio no hay que hover ni desplegar nada.
4. **La visibilidad**. Las cuatro categorías están siempre a la vista; en la actual móvil están escondidas detrás de «Menú».

## Lo que empeora

1. **Ocupa mucho más alto**. En móvil pasa de 48 px a 396 px en la portada y 566 px en Laboratorio. En escritorio pasa de 101 px a 332–373 px, más del triple.
2. **Empuja el contenido**. En móvil, la nav ocupa casi la mitad de la primera pantalla; en Laboratorio, casi dos tercios. La actual, cerrada, deja respirar el hero.
3. **Los objetivos táctiles de la opción 2 son más pequeños** que los 44 px de la actual. Hay que subirlos antes de implementarla.
4. **Se siente más «aplicación»**. La actual es una píldora editorial; la opción 2 es una página de índice dentro de la página. A cambio, se entiende mejor.

## Veredicto

La opción 2 **sí es mejor en lo que te molestaba**: jerarquía, contexto y claridad. No es mejor en economía de espacio: la navegación pesa mucho más y, tal cual, se come parte del hero.

Por eso no la implementaría exactamente como está. La ajustaría así:

- En móvil, subapartados en dos columnas y sin la frase de contexto debajo de cada uno; el contexto se queda en la descripción del capítulo. Eso reduce bastante la altura del Laboratorio.
- Objetivos táctiles de 44 px como mínimo.
- En escritorio, mantener las frases de contexto, que es donde más valor aportan, y recortar un poco el padding vertical.
- Mantener el panel del capítulo como «página», porque es lo que hace evidente la relación padre-hijo.

Con esos ajustes, la opción 2 sería mejor en conjunto. Tal cual, es mejor en claridad pero peor en espacio.

## Versión compacta

Implementada como `?nav=SPLITC`. Capturas:

- [Compacta en móvil](opcion2-compacta-movil.png)
- [Compacta en escritorio](opcion2-compacta-escritorio.png)
- [Compacta en Laboratorio, móvil](opcion2-compacta-laboratorio-movil.png)
- [Compacta en Laboratorio, escritorio](opcion2-compacta-laboratorio-escritorio.png)
- [Comparativa actual / opción 2 / compacta](actual-opcion2-compacta.png)

| Métrica | Actual | Opción 2 | Compacta |
|---|---:|---:|---:|
| Altura en móvil, portada | 48 px cerrada / 557 px abierta | 396 px | **300 px** |
| Altura en móvil, Laboratorio | 48 px cerrada | 566 px | **396 px** |
| Altura en escritorio, portada | 101 px | 332 px | **290 px** |
| Altura en escritorio, Laboratorio | 101 px | 373 px | 386 px |
| Enlaces visibles en móvil | 0 cerrada / 16 abierta | 8 | 8 |
| Objetivos táctiles | 44 px | menores | 44 px |
| axe-core móvil / escritorio | 0 / 0 | 0 / 0 | 0 / 0 |

La compacta recorta un 24 % en móvil portada y un 30 % en Laboratorio respecto a la opción 2. En escritorio recorta un 13 % en portada, pero en Laboratorio sube 13 px porque las filas ahora cumplen 44 px. Sigue siendo más alta que la actual cerrada, pero es más baja que el panel móvil actual abierto (557–566 px) y mucho más clara.

Lo que se pierde en móvil es la frase de contexto de cada subapartado; se mantiene la descripción del capítulo y, en escritorio, las frases de cada subapartado.

