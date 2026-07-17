function ProblemTable({problems,onDelete,onEdit}) {
  if (problems.length === 0) {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center mt-6">
      <h2 className="text-2xl font-bold text-gray-600">
        No Problems Found 😔
      </h2>

      <p className="text-gray-500 mt-3">
        Try changing your search or filter.
      </p>
    </div>
  );
}
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Problem</th>

            <th className="text-left">Difficulty</th>

            <th className="text-left">Status</th>

            <th className="text-left">Actions</th>

          </tr>

        </thead>

        <tbody>
  {problems.map((problem) => (
    <tr key={problem.id} className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{problem.name}</td>

      <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
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
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      problem.status === "Solved"
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {problem.status}
  </span>
</td>

     <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    <a
      href={problem.link}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
    >
      View
    </a>

    <button
      onClick={() => onEdit(problem)}
      className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
    >
      Edit
    </button>

    <button
      onClick={() => onDelete(problem.id)}
      className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
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