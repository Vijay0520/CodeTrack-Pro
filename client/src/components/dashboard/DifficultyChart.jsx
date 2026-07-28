import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../../api/axios";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const DifficultyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDifficulty();
  }, []);

  const fetchDifficulty = async () => {
    try {
      const res = await api.get("/stats/difficulty");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Difficulty Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="difficulty"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;