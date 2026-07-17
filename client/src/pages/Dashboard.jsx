import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import API from "../api/axios";

function Dashboard() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
  console.log("Dashboard Mounted");
  fetchProblems();
}, []);

const fetchProblems = async () => {
  try {
    console.log("Fetching problems...");

    const res = await API.get("/problems");

    console.log("Response:", res.data);

    setProblems(res.data);
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
};

 

  const solved = problems.filter(
    (problem) => problem.status === "Solved"
  ).length;

  const easy = problems.filter(
    (problem) => problem.difficulty === "Easy"
  ).length;

  const medium = problems.filter(
    (problem) => problem.difficulty === "Medium"
  ).length;

  const hard = problems.filter(
    (problem) => problem.difficulty === "Hard"
  ).length;

  return (
    <MainLayout>
      <div className="p-8">

        <h1 className="text-4xl font-bold mb-2">
          Welcome Vijay 👋
        </h1>

        <p className="text-gray-500 mb-8">
          Track your coding journey.
        </p>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Total Solved
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-4">
              {solved}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Easy
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-4">
              {easy}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Medium
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-4">
              {medium}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Hard
            </h2>

            <p className="text-4xl font-bold text-red-500 mt-4">
              {hard}
            </p>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;