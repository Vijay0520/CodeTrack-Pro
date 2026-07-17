import MainLayout from "../components/layout/MainLayout";
import ProblemTable from "../components/problem/ProblemTable";
import { useState } from "react";
import AddProblemModal from "../components/problem/AddProblemModal";
function Problems() {

    const [showModal,setShowModal]=useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [editingProblem, setEditingProblem] = useState(null);
    const [problems,setProblems]=useState([
        {
            id: 1,
    name: "Two Sum",
    difficulty: "Easy",
    status: "Solved",
    link: "https://leetcode.com/problems/two-sum/",
        },
        {
             id: 2,
    name: "Merge Two Sorted Lists",
    difficulty: "Medium",
    status: "Pending",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
        },
    ]);
    const [sortBy, setSortBy] = useState("Newest");

    const addProblem = (newProblem) => {
  setProblems((prevProblems) => [
    ...prevProblems,
    {
      id: Date.now(),
      ...newProblem,
    },
  ]);

  setShowModal(false);
};

const updateProblem = (updatedProblem) => {
  setProblems((prevProblems) =>
    prevProblems.map((problem) =>
      problem.id === updatedProblem.id ? updatedProblem : problem
    )
  );

  setEditingProblem(null);
  setShowModal(false);
};
const deleteProblem = (id) => {
  setProblems((prevProblems) =>
    prevProblems.filter((problem) => problem.id !== id)
  );
};

const editProblem = (problem) => {
  setEditingProblem(problem);
  setShowModal(true);
};

const filteredProblems = [...problems]
  .filter((problem) => {
    const matchesSearch = problem.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" ||
      problem.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "Newest":
        return b.id - a.id;

      case "Oldest":
        return a.id - b.id;

      case "A-Z":
        return a.name.localeCompare(b.name);

      case "Z-A":
        return b.name.localeCompare(a.name);

      default:
        return 0;
    }
  });
  return (
    <MainLayout>

      <div className="p-8">

        <div className="flex justify-between items-center">

          <h1 className="text-4xl font-bold">
            Problems
          </h1>

          <button 
          onClick={()=>setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">

            + Add Problem

          </button>

        </div>

<div className="my-6 flex flex-col md:flex-row gap-4 justify-between items-center">

  <input
    type="text"
    placeholder="🔍 Search problems..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={difficultyFilter}
    onChange={(e) => setDifficultyFilter(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="All">All Difficulties</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>

  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="Newest">Newest First</option>
  <option value="Oldest">Oldest First</option>
  <option value="A-Z">Name (A-Z)</option>
  <option value="Z-A">Name (Z-A)</option>
</select>

</div>

        <ProblemTable
  problems={filteredProblems}
  onDelete={deleteProblem}
  onEdit={editProblem}
/>
        {showModal && (
            <AddProblemModal
  onClose={() => {
    setShowModal(false);
    setEditingProblem(null);
  }}
  onAddProblem={addProblem}
  onUpdateProblem={updateProblem}
  editingProblem={editingProblem}
/>
    )}

      </div>

    </MainLayout>
  );
}

export default Problems;