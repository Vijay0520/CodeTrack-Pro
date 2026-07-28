import { useState, useEffect } from "react";
 

function AddProblemModal({
  onClose,
  onAddProblem,
  onUpdateProblem,
  editingProblem,
}) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [topic, setTopic] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Solved");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [revision, setRevision] = useState(false);

  useEffect(() => {
    if (editingProblem) {
      setTitle(editingProblem.title);
      setDifficulty(editingProblem.difficulty);
      setTopic(editingProblem.topic); 
      setCompany(editingProblem.company || "");
      setStatus(editingProblem.status);
      setLink(editingProblem.link);
      setNotes(editingProblem.notes || "");
      setFavorite(editingProblem.favorite || false);
      setRevision(editingProblem.revision || false);
    } else {
      setTitle("");
      setDifficulty("Easy");
      setTopic("");
      setCompany("");
      setStatus("Solved");
      setLink("");
      setNotes("");
      setFavorite(false);
      setRevision(false);
    }
  }, [editingProblem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const problemData = {
      title,
      difficulty,
      topic,
      company,
      status,
      link,
      notes,
      favorite,
      revision,
    };

    console.log(problemData);

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl  w-[95%] max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8" >

        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white">
          {editingProblem ? "Edit Problem" : "Add New Problem"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Problem Title
            </label>

            <input
              type="text"
              placeholder="e.g. Two Sum"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
             className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
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
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
    Topic
  </label>
          <select
          
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
>
  
  <option value="">Select Topic</option>

  <option>Arrays</option>
  <option>Strings</option>
  <option>Linked List</option>
  <option>Stack</option>
  <option>Queue</option>
  <option>Binary Tree</option>
  <option>BST</option>
  <option>Graph</option>
  <option>DP</option>
  <option>Greedy</option>
  <option>Heap</option>
  <option>Trie</option>
  <option>Backtracking</option>
</select>
</div>

<div>
  <label className="block text-sm font-medium mb-2">
    Company
  </label>

  <select
    value={company}
    onChange={(e) => setCompany(e.target.value)}
    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
  >
    <option value="">Select Company</option>
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
</div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
             className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
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
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
  <label className="block text-sm font-medium mb-2">
    Notes
  </label>

  <textarea
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Write your approach, time complexity, mistakes, or revision notes..."
    rows={5}
    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition"
  />
</div>

<div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
  <input
    type="checkbox"
    className="w-5 h-5 accent-blue-600"
    checked={favorite}
    onChange={(e) => setFavorite(e.target.checked)}
  />

  <label className="font-medium">
    ⭐ Mark as Favorite
  </label>
</div>

<div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
  <input
    type="checkbox"
    className="w-5 h-5 accent-blue-600"
    checked={revision}
    onChange={(e) => setRevision(e.target.checked)}
  />

  <label className="font-medium text-gray-700 dark:text-gray-300">
    🔁 Revision Required
  </label>
</div>

          <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-5 mt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
             className="w-full sm:w-auto px-5 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
             className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
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