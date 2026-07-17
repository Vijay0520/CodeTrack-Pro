import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProblemTable from "../components/problem/ProblemTable";
import AddProblemModal from "../components/problem/AddProblemModal";
import API from "../api/axios";

function Problems() {
  const [showModal, setShowModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  const [problems, setProblems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await API.get("/problems");
      setProblems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProblem = async (problemData) => {
    try {
      await API.post("/problems", {
        title: problemData.title,
        difficulty: problemData.difficulty,
        status: problemData.status,
        link: problemData.link,
      });

      fetchProblems();
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add problem");
    }
  };

  const updateProblem = async (updatedProblem) => {
    try {
      await API.put(`/problems/${updatedProblem._id}`, {
        title: updatedProblem.title,
        difficulty: updatedProblem.difficulty,
        status: updatedProblem.status,
        link: updatedProblem.link,
      });

      fetchProblems();
      setEditingProblem(null);
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  const deleteProblem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this problem?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/problems/${id}`);
      fetchProblems();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const editProblem = (problem) => {
    setEditingProblem(problem);
    setShowModal(true);
  };

  const filteredProblems = [...problems]
    .filter((problem) => {
      const matchesSearch = problem.title
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
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "A-Z":
          return a.title.localeCompare(b.title);

        case "Z-A":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });

  return (
    <MainLayout>
      <div className="p-4 md:p-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <h1 className="text-3xl md:text-4xl font-bold">
            Problems
          </h1>

          <button
            onClick={() => {
              setEditingProblem(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full md:w-auto"
          >
            + Add Problem
          </button>

        </div>

        <div className="my-6 flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search Problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border rounded-lg px-4 py-3"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-4 py-3"
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