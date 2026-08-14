import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { year: 1961, world: 23.1, us: 89.8, china: 3.8, brazil: 27.5 },
  { year: 1980, world: 29.8, us: 106.3, china: 13.7, brazil: 38.6 },
  { year: 2000, world: 38.0, us: 119.3, china: 38.5, brazil: 75.3 },
  { year: 2010, world: 42.1, us: 117.6, china: 54.3, brazil: 93.3 },
  { year: 2021, world: 42.8, us: 126.8, china: 63.6, brazil: 98.7 }
];

export default function MeatConsumptionChart() {
  return (
    <div className="w-full h-80 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <h4 className="text-sm font-semibold mb-4 text-zinc-700 dark:text-zinc-300">Consumo de Carne per Cápita (kg/año)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#525252" opacity={0.2} />
          <XAxis dataKey="year" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5" }}
            itemStyle={{ color: "#f4f4f5" }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="us" name="EE.UU." stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="brazil" name="Brasil" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="china" name="China" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="world" name="Media Mundial" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
