import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: 1961, chickens: 6.6, pigs: 0.38, cattle: 0.17 },
  { year: 1980, chickens: 16.5, pigs: 0.69, cattle: 0.23 },
  { year: 2000, chickens: 40.5, pigs: 1.15, cattle: 0.29 },
  { year: 2010, chickens: 58.1, pigs: 1.38, cattle: 0.30 },
  { year: 2021, chickens: 73.8, pigs: 1.50, cattle: 0.30 }
];

export default function AnimalsSlaughteredChart() {
  return (
    <div className="w-full h-80 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <h4 className="text-sm font-semibold mb-4 text-zinc-700 dark:text-zinc-300">Animales sacrificados globalmente (Miles de Millones)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#525252" opacity={0.2} />
          <XAxis dataKey="year" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5" }}
            itemStyle={{ color: "#f4f4f5" }}
          />
          <Area type="monotone" dataKey="chickens" name="Pollos" stackId="1" stroke="#fbbf24" fill="#fbbf24" opacity={0.8} />
          <Area type="monotone" dataKey="pigs" name="Cerdos" stackId="1" stroke="#f43f5e" fill="#f43f5e" opacity={0.8} />
          <Area type="monotone" dataKey="cattle" name="Vacas" stackId="1" stroke="#3b82f6" fill="#3b82f6" opacity={0.8} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
