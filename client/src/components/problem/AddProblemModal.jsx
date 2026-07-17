import { useState,useEffect } from "react";
function AddProblemModal({onClose,onAddProblem,onUpdateProblem,editingProblem,}) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [status, setStatus] = useState("Solved");
  const [link, setLink] = useState("");

  useEffect(() => {
  if (editingProblem) {
    setName(editingProblem.name);
    setDifficulty(editingProblem.difficulty);
    setStatus(editingProblem.status);
    setLink(editingProblem.link);
  } else {
    setName("");
    setDifficulty("Easy");
    setStatus("Solved");
    setLink("");
  }
}, [editingProblem]);

   const handleSubmit = (e) => {
  e.preventDefault();

  const problemData = {
    name,
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
  {editingProblem ? "Edit Problem" : "Add New Problem"}
</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Problem Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <select 
          value={difficulty}
          onChange={(e)=>setDifficulty(e.target.value)}
          className="w-full border rounded-lg px-4 py-3">

            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>

          </select>

          <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="w-full border rounded-lg px-4 py-3">

            <option>Solved</option>
            <option>Pending</option>

          </select>

          <input
            type="text"
            placeholder="LeetCode URL"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
  type="submit"
  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
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