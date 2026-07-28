import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProblemTable from "../components/problem/ProblemTable";
import AddProblemModal from "../components/problem/AddProblemModal";
import API from "../api/axios";
import { exportPDF, exportExcel } from "../utils/exportData";

function Problems() {
  const [showModal, setShowModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [topicFilter, setTopicFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [revisionFilter, setRevisionFilter] = useState("All");
  const [problems, setProblems] = useState([]);
  const [favoriteFilter, setFavoriteFilter] = useState("All");
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
        topic:problemData.topic,
        company: problemData.company,
        status: problemData.status,
        link: problemData.link,
         notes: problemData.notes,
         favorite: problemData.favorite,
         revision: problemData.revision,
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
        topic: updatedProblem.topic,
        company: updatedProblem.company,
        status: updatedProblem.status,
        link: updatedProblem.link,
        notes: updatedProblem.notes,
        favorite: updatedProblem.favorite,
        revision: updatedProblem.revision,
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

  const toggleFavorite = async (problem) => {
  try {
    await API.put(`/problems/${problem._id}`, {
      ...problem,
      favorite: !problem.favorite,
    });

    fetchProblems();
  } catch (error) {
    alert("Failed to update favorite");
  }
};

const toggleRevision = async (problem) => {
  try {
    await API.put(`/problems/${problem._id}`, {
      ...problem,
      revision: true,
revisionCount: (problem.revisionCount || 0) + 1,
lastRevised: new Date(),
    });

    fetchProblems();
  } catch (error) {
    alert("Failed to update revision");
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

      const matchesTopic =
  topicFilter === "All" ||
  problem.topic === topicFilter;

  const matchesCompany =
  companyFilter === "All" ||
  problem.company === companyFilter;

  const matchesFavorite =
  favoriteFilter === "All" ||
  problem.favorite;

  const matchesRevision =
  revisionFilter === "All" ||
  problem.revision;

return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany && matchesFavorite &&  matchesRevision;
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
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5" >

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Problems
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">

  <button
    onClick={() => exportPDF(filteredProblems)}
   className="w-full bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition"
  >
    📄 Export PDF
  </button>

  <button
    onClick={() => exportExcel(filteredProblems)}
    className="w-full bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-medium transition"
  >
    📊 Export Excel
  </button>

  <button
    onClick={() => {
      setEditingProblem(null);
      setShowModal(true);
    }}
    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl font-medium transition"
  >
    + Add Problem
  </button>

</div>

        </div>

        <div className="my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="🔍 Search Problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
          />

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

            <select
  value={topicFilter}
  onChange={(e) => setTopicFilter(e.target.value)}
  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
>
  <option value="All">All Topics</option>
  <option value="Arrays">Arrays</option>
  <option value="Strings">Strings</option>
  <option value="Linked List">Linked List</option>
  <option value="Stack">Stack</option>
  <option value="Queue">Queue</option>
  <option value="Binary Tree">Binary Tree</option>
  <option value="BST">BST</option>
  <option value="Graph">Graph</option>
  <option value="DP">DP</option>
  <option value="Greedy">Greedy</option>
  <option value="Heap">Heap</option>
  <option value="Trie">Trie</option>
  <option value="Backtracking">Backtracking</option>
</select>

<select
  value={companyFilter}
  onChange={(e) => setCompanyFilter(e.target.value)}
  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
>
  <option value="All">All Companies</option>
  <option>Google</option>
  <option>Amazon</option>
  <option>Microsoft</option>
  <option>Meta</option>
  <option>Adobe</option>
  <option>Apple</option>
  <option>Netflix</option>
  <option>Uber</option>
  <option>Goldman Sachs</option>
  <option>Oracle</option>
  <option>Infosys</option>
  <option>TCS</option>
  <option>Wipro</option>
  <option>Accenture</option>
</select>

<select
  value={favoriteFilter}
  onChange={(e) => setFavoriteFilter(e.target.value)}
  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
>
  <option value="All">All Problems</option>
  <option value="Favorites">⭐ Favorites</option>
</select>

<select
  value={revisionFilter}
  onChange={(e) => setRevisionFilter(e.target.value)}
  className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
>
  <option value="All">All Problems</option>
  <option value="Revision">Revision Required</option>
</select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="A-Z">Name (A-Z)</option>
            <option value="Z-A">Name (Z-A)</option>
          </select>

        </div>
        <div  className="overflow-x-auto rounded-xl shadow">
        <ProblemTable
          problems={filteredProblems}
          onDelete={deleteProblem}
          onEdit={editProblem}
          onFavorite={toggleFavorite}
          onRevision={toggleRevision}
          
        />
        </div>

        {showModal && (
          <AddProblemModal
            onClose={() => {
              setShowModal(false);
              setEditingProblem(null);
            }}
           
            onAddProblem={addProblem}
            onUpdateProblem={updateProblem}
            editingProblem={editingProblem}
             onRevision={toggleRevision}
          />
        )}

      </div>
    </MainLayout>
  );
  
}

export default Problems;