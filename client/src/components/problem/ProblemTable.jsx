function ProblemTable({
  problems,
  onDelete,
  onEdit,
  onFavorite,
  onRevision,
}) {
  if (problems.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-10 text-center">
        <div className="text-6xl mb-4">📚</div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          No Problems Found
        </h2>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Click <span className="font-semibold text-blue-600">+ Add Problem</span>{" "}
          to start tracking your coding journey.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-[1400px] w-full border-collapse">

          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">

            <tr className="text-sm uppercase tracking-wide">

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Problems
              </th>

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Difficulty
              </th>

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Topic
              </th>

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Company
              </th>

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Status
              </th>

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Notes
              </th>

              <th className="px-4 py-4 text-center whitespace-nowrap">
                ⭐
              </th>

              <th className="px-4 py-4 text-center whitespace-nowrap">
                🔁
              </th>

              <th className="px-6 py-4 text-center whitespace-nowrap">
                Revisions
              </th>

              <th className="px-6 py-4 text-left whitespace-nowrap">
                Last Revised
              </th>

              <th className="px-6 py-4 text-center whitespace-nowrap">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {problems.map((problem) => (

              <tr
                key={problem._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-200"
              >

                <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  {problem.title}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      problem.difficulty === "Easy"
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                        : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {problem.difficulty}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {problem.topic}
                  </span>

                </td>

                <td className="px-6 py-5">

                  {problem.company ? (
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                      {problem.company}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}

                </td>
                                <td className="px-6 py-5">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      problem.status === "Solved"
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {problem.status}
                  </span>
                </td>

                <td className="px-6 py-5 max-w-xs">
                  {problem.notes ? (
                    <span
                      title={problem.notes}
                      className="block truncate rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {problem.notes}
                    </span>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">
                      No Notes
                    </span>
                  )}
                </td>

                <td className="px-4 py-5 text-center">
                  <button
                    onClick={() => onFavorite(problem)}
                    className="text-2xl hover:scale-125 transition-transform duration-200"
                  >
                    {problem.favorite ? "⭐" : "☆"}
                  </button>
                </td>

                <td className="px-4 py-5 text-center">
                  <button
                    onClick={() => onRevision(problem)}
                    className="text-2xl hover:rotate-180 transition duration-300"
                  >
                    🔁
                  </button>
                </td>

                <td className="px-6 py-5 text-center text-gray-700 dark:text-gray-300 font-semibold">
                  {problem.revisionCount || 0}
                </td>

                <td className="px-6 py-5 whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {problem.lastRevised
                    ? new Date(problem.lastRevised).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap justify-center gap-2">

                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-green-100 dark:bg-green-900 px-3 py-2 text-sm font-medium text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition"
                    >
                      🔗 View
                    </a>

                    <button
                      onClick={() => onEdit(problem)}
                      className="rounded-lg bg-blue-100 dark:bg-blue-900 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => onDelete(problem._id)}
                      className="rounded-lg bg-red-100 dark:bg-red-900 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition"
                    >
                      🗑 Delete
                    </button>

                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProblemTable;