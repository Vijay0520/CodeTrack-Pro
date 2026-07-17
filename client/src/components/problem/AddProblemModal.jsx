import { useState, useEffect } from "react";

function AddProblemModal({
  onClose,
  onAddProblem,
  onUpdateProblem,
  editingProblem,
}) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [status, setStatus] = useState("Solved");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (editingProblem) {
      setTitle(editingProblem.title);
      setDifficulty(editingProblem.difficulty);
      setStatus(editingProblem.status);
      setLink(editingProblem.link);
    } else {
      setTitle("");
      setDifficulty("Easy");
      setStatus("Solved");
      setLink("");
    }
  }, [editingProblem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const problemData = {
      title,
      difficulty,
      status,
      link,
    };

    if (editingProblem) {
      onUpdateProblem({
        ...editingProblem,
        ...problemData,
      });
    } else {
      onAddProblem(problemData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {editingProblem ? "Edit Problem" : "Add New Problem"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Problem Title
            </label>

            <input
              type="text"
              placeholder="e.g. Two Sum"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Solved</option>
              <option>Unsolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Problem Link
            </label>

            <input
              type="url"
              placeholder="https://leetcode.com/problems/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              {editingProblem ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddProblemModal;