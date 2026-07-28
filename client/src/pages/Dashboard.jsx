import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import API from "../api/axios";
import DashboardCharts from "../components/DashboardCharts";
import ContributionHeatMap from "../components/dashboard/ContributionHeatMap";
import MonthlyChart from "../components/dashboard/MonthlyChart";
import DifficultyChart from "../components/dashboard/DifficultyChart";
import TopicChart from "../components/dashboard/TopicChart";
import CompanyChart from "../components/dashboard/CompanyChart";
import Last30DaysChart from "../components/dashboard/Last30DaysChart";
import Achievements from "../components/dashboard/Achievements";

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState({
  currentStreak: 0,
  bestStreak: 0,
});

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  fetchProblems();
  fetchStats();
}, []);

  const fetchProblems = async () => {
    try {
      const res = await API.get("/problems");
      setProblems(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const fetchStats = async () => {
  try {
    const res = await API.get("/stats");
    setStats(res.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 flex flex-col gap-6 transition-colors duration-300">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1  className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome {user?.name} 👋
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your coding journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6  pb-16">

          {/* Total Problems */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Problems
            </h2>

            <p className="text-4xl font-bold text-indigo-600 mt-2">
              {problems.length}
            </p>
          </div>

          {/* Solved */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Solved
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-2">
              {solved}
            </p>
          </div>

          {/* Easy */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Easy
            </h2>

            <p className="text-4xl font-bold text-green-500 mt-2">
              {easy}
            </p>
          </div>

          {/* Medium */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Medium
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {medium}
            </p>
          </div>

          {/* Hard */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Hard
            </h2>

            <p className="text-4xl font-bold text-red-500 mt-2">
              {hard}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center" >
  <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
    🔥 Current Streak
  </h2>

  <p className="text-4xl font-bold text-orange-500 mt-2">
    {stats.currentStreak}
  </p>

  <p className="text-gray-500 dark:text-gray-400 mt-1">
    Day{stats.currentStreak !== 1 ? "s" : ""}
  </p>
</div>

<div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
  <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300" >
    🏆 Best Streak
  </h2>

  <p className="text-4xl font-bold text-purple-600 mt-2">
    {stats.bestStreak}
  </p>

  <p className="text-gray-500 dark:text-gray-400 mt-1">
    Day{stats.bestStreak !== 1 ? "s" : ""}
  </p>
</div>
</div>
         <div  className="mt-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">

        {/* Charts */}
        <DashboardCharts problems={problems} />
        </div>
        
        <div className="mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6  dark:text-black text-center">
        <ContributionHeatMap />
        </div>
        <div className="mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6  dark:text-black text-center">
        <MonthlyChart />
        </div>
        <div  className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center">
          <div  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700  dark:text-black p-6">
          <DifficultyChart />
          </div>
          <div  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700  dark:text-black p-6">
        <TopicChart />
        </div>
        <div  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700  dark:text-black p-6">
        <CompanyChart />
        </div>
        <div  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 dark:text-black p-6">
        <Last30DaysChart /></div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6  dark:text-black text-center">
        <Achievements />

        
        
      </div>
      </div>
     
    </MainLayout>
  );
}

export default Dashboard;