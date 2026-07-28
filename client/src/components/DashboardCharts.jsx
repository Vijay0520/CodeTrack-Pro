import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const DashboardCharts = ({ problems }) => {
  const difficultyData = [
    {
      name: "Easy",
      value: problems.filter((p) => p.difficulty === "Easy").length,
    },
    {
      name: "Medium",
      value: problems.filter((p) => p.difficulty === "Medium").length,
    },
    {
      name: "Hard",
      value: problems.filter((p) => p.difficulty === "Hard").length,
    },
  ];

  const statusData = [
    {
      name: "Solved",
      count: problems.filter((p) => p.status === "Solved").length,
    },
    {
      name: "Unsolved",
      count: problems.filter((p) => p.status === "Unsolved").length,
    },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Problems by Difficulty
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={difficultyData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {difficultyData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#000" }}
                itemStyle={{ color: "#000" }}
              />

              <Legend wrapperStyle={{ color: "#000" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-center text-black mb-4">
          Solved vs Unsolved
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid
                stroke="#d1d5db"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#000" }}
              />

              <YAxis
                tick={{ fill: "#000" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#000" }}
                itemStyle={{ color: "#000" }}
              />

              <Legend wrapperStyle={{ color: "#000" }} />

              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;