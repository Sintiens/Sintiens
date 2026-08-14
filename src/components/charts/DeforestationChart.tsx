import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Carne de vaca", value: 41 },
  { name: "Semillas oleaginosas", value: 18 },
  { name: "Silvicultura", value: 13 },
  { name: "Agricultura", value: 13 },
  { name: "Otros", value: 15 },
];

export default function DeforestationChart() {
  return (
    <div className="w-full h-80 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <h4 className="text-sm font-semibold mb-4 text-zinc-700 dark:text-zinc-300">Motores de la Deforestación Tropical (%)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#525252" opacity={0.2} horizontal={true} vertical={false} />
          <XAxis type="number" stroke="#888" fontSize={12} />
          <YAxis dataKey="name" type="category" stroke="#888" fontSize={12} width={100} />
          <Tooltip 
            cursor={{fill: 'transparent'}}
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5" }}
            itemStyle={{ color: "#f4f4f5" }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#f43f5e" : "#10b981"} opacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
