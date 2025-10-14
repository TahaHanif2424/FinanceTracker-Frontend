import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", expenses: 400 },
  { name: "Tue", expenses: 300 },
  { name: "Wed", expenses: 500 },
  { name: "Thur", expenses: 200 },
  { name: "Fri", expenses: 100 },
  { name: "Sat", expenses: 250 },
  { name: "Sun", expenses: 350 },
];

export default function ExpenseBarChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.5} />
          <XAxis
            dataKey="name"
            stroke="#0F4C5C"
            tick={{ fill: "#0F4C5C", fontSize: 12 }}
            axisLine={{ stroke: "#0F4C5C" }}
          />
          <YAxis
            stroke="#0F4C5C"
            tick={{ fill: "#0F4C5C", fontSize: 12 }}
            axisLine={{ stroke: "#0F4C5C" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(15, 76, 92, 0.1)",
            }}
            labelStyle={{ color: "#0F4C5C", fontWeight: "bold" }}
            itemStyle={{ color: "#5E8C61" }}
            cursor={{ fill: "rgba(15, 76, 92, 0.05)" }}
          />
          <Bar
            dataKey="expenses"
            fill="#0F4C5C"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
