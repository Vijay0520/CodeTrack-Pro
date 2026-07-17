function ProblemTable({ problems, onDelete, onEdit }) {
  if (problems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center mt-6">
        <h2 className="text-2xl font-bold text-gray-600">
          No Problems Found 😔
        </h2>

        <p className="text-gray-500 mt-3">
          Click <span className="font-semibold">+ Add Problem</span> to start tracking your coding journey.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg mt-6 overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left px-6 py-4">Problem</th>

            <th className="text-left px-6 py-4">Difficulty</th>

            <th className="text-left px-6 py-4">Status</th>

            <th className="text-left px-6 py-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {problems.map((problem) => (

            <tr
              key={problem._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-6 py-4 font-medium">
                {problem.title}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    problem.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : problem.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {problem.difficulty}
                </span>

              </td>

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    problem.status === "Solved"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {problem.status}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex flex-wrap gap-2">

                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    View
                  </a>

                  <button
                    onClick={() => onEdit(problem)}
                    className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(problem._id)}
                    className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProblemTable;