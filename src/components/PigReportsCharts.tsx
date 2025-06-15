
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

// Helper: Parse litter data from the sow notes
function parseLitterReports(notes?: string) {
  if (!notes) return [];
  // Example of a farrowing line: "LITTER 4: Due 4/10/2024, Actual 4/7/2024 - 2 alive (1M, 1F) + 1 adopted = 3 total"
  const litterLines = notes.match(/LITTER\s*\d+:[^\n]+/gi) || [];
  const litters = litterLines.map(line => {
    const numMatch = line.match(/LITTER\s*(\d+):/);
    const number = numMatch ? Number(numMatch[1]) : undefined;

    let alive = 0, dead = 0, adopted = 0, total = 0;
    // Count alive piglets
    const aliveMatch = line.match(/(\d+)\s*alive/i);
    alive = aliveMatch ? Number(aliveMatch[1]) : 0;
    // Count dead piglets
    const deadMatch = line.match(/(\d+)\s*died/i);
    dead = deadMatch ? Number(deadMatch[1]) : 0;
    // Count adopted piglets
    const adoptedMatch = line.match(/(\d+)\s*adopted/i);
    adopted = adoptedMatch ? Number(adoptedMatch[1]) : 0;
    // Extract total if written, else calculate
    const totalMatch = line.match(/=\s*(\d+)\s*total/i);
    total = totalMatch ? Number(totalMatch[1]) : alive + dead + adopted;

    // Find actual farrowing date
    const actualMatch = line.match(/Actual\s*([^\s,-]+)/i);
    const actualDate = actualMatch ? actualMatch[1] : "";

    return { litter: number, alive, dead, adopted, total, actualDate };
  });
  return litters;
}

const CHART_COLORS = ["#3b82f6", "#22c55e", "#fbbf24", "#ef4444", "#6366f1", "#f59e42"];

interface PigReportsChartsProps {
  notes?: string;
}

export default function PigReportsCharts({ notes }: PigReportsChartsProps) {
  const litters = parseLitterReports(notes);

  if (!litters.length) return null;

  // Aggregate for pie chart
  const aliveSum = litters.reduce((acc, l) => acc + l.alive, 0);
  const deadSum = litters.reduce((acc, l) => acc + l.dead, 0);
  const adoptedSum = litters.reduce((acc, l) => acc + l.adopted, 0);

  const outcomeData = [
    { name: "Alive", value: aliveSum },
    { name: "Dead", value: deadSum },
    { name: "Adopted", value: adoptedSum }
  ].filter(item => item.value > 0);

  // Bar chart for litter size (alive piglets per litter)
  const litterBarData = litters.map(l => ({
    name: `L${l.litter}`,
    Alive: l.alive,
    Dead: l.dead,
    Adopted: l.adopted,
    Total: l.total
  }));

  return (
    <div className="grid gap-8 md:grid-cols-2 mt-6">
      {/* Pie Chart: Farrowing outcomes */}
      <div>
        <div className="font-semibold mb-1">Farrowing Outcomes (All Litters)</div>
        <ResponsiveContainer minHeight={220} width="100%" height={220}>
          <PieChart>
            <Pie
              data={outcomeData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {outcomeData.map((entry, idx) => (
                <Cell key={entry.name} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Bar Chart: Per-litter Performance */}
      <div>
        <div className="font-semibold mb-1">Litter Performance by Birth Event</div>
        <ResponsiveContainer minHeight={220} width="100%" height={220}>
          <BarChart data={litterBarData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Alive" fill="#22c55e" />
            <Bar dataKey="Dead" fill="#ef4444" />
            {adoptedSum > 0 && <Bar dataKey="Adopted" fill="#3b82f6" />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
