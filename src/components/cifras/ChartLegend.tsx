/**
 * ChartLegend — leyenda HTML común para los gráficos de Cifras.
 * Sustituye a la leyenda de Recharts (altura fija → recortes con muchas series)
 * por chips con wrap libre, legibles y accesibles (texto real, no SVG).
 */
export interface ChartLegendItem {
  label: string;
  color: string;
  dashed?: boolean;
}

export default function ChartLegend({
  items,
  className = ""
}: {
  items: ChartLegendItem[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-on-surface-variant">
          {item.dashed ? (
            <span
              aria-hidden="true"
              className="w-4 shrink-0 border-t-2 border-dashed"
              style={{ borderColor: item.color }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          )}
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
