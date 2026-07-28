import { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import api from "../../api/axios"; // change path if your axios file is elsewhere

const ContributionHeatMap = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const res = await api.get("/stats/contributions");

      const data = res.data.map((item) => ({
        date: item._id,
        count: item.count,
      }));

      setValues(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Coding Contributions
      </h2>

      <HeatMap
        value={values}
        startDate={new Date("2026-01-01")}
        width={900}
      />
    </div>
  );
};

export default ContributionHeatMap;