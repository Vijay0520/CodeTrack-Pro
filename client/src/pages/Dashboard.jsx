import MainLayout from "../components/layout/MainLayout";

function Dashboard() {
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
              0
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Easy
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-4">
              0
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Medium
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-4">
              0
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold">
              Hard
            </h2>

            <p className="text-4xl font-bold text-red-500 mt-4">
              0
            </p>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;