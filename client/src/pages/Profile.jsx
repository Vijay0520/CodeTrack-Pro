import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaUserEdit, FaKey } from "react-icons/fa";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const [userRes, problemRes] = await Promise.all([
      API.get("/auth/profile"),
      API.get("/problems"),
    ]);

    setUser(userRes.data);
    setProblems(problemRes.data);
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async (updatedData) => {
  try {
    const res = await API.put("/auth/profile", updatedData);

    setUser((prev) => ({
      ...prev,
      ...res.data.user,
    }));

    setShowModal(false);

    alert("Profile updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update profile.");
  }
};

const total = problems.length;

const solved = problems.filter(
  (problem) => problem.status === "Solved"
).length;

const easy = problems.filter(
  (problem) => problem.difficulty === "Easy"
).length;

const medium = problems.filter(
  (problem) => problem.difficulty === "Medium"
).length;

const hard = problems.filter(
  (problem) => problem.difficulty === "Hard"
).length;

  if (!user) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  

  return (
  <div className="max-w-5xl mx-auto p-8">
    <div className="bg-white rounded-xl shadow-lg p-8">

      <div className="flex items-center gap-6 mb-8">

        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl text-white font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>

          <p className="text-gray-600">{user.email}</p>

          <p className="text-gray-500">
            Joined on{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Problem Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="bg-blue-100 rounded-lg p-5 text-center">
          <h3 className="font-semibold">Total</h3>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 rounded-lg p-5 text-center">
          <h3 className="font-semibold">Solved</h3>
          <p className="text-3xl font-bold">{solved}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-5 text-center">
          <h3 className="font-semibold">Easy</h3>
          <p className="text-3xl font-bold">{easy}</p>
        </div>

        <div className="bg-yellow-100 rounded-lg p-5 text-center">
          <h3 className="font-semibold">Medium</h3>
          <p className="text-3xl font-bold">{medium}</p>
        </div>

        <div className="bg-red-100 rounded-lg p-5 text-center">
          <h3 className="font-semibold">Hard</h3>
          <p className="text-3xl font-bold">{hard}</p>
        </div>

      </div>

     <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
  <h2 className="text-2xl font-bold mb-6 text-center">
    Account Settings
  </h2>

  <div className="flex flex-col sm:flex-row gap-6">

   <button
  onClick={() => setShowModal(true)}
  className="flex items-center justify-center gap-3 flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>
  <FaUserEdit className="text-xl" />
  Edit Profile
</button>

    <button
  onClick={() => setShowPasswordModal(true)}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Change Password
</button>

  </div>
</div>
</div>
    <EditProfileModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  user={user}
  onUpdateProfile={updateProfile}
/>
<ChangePasswordModal
  isOpen={showPasswordModal}
  onClose={() => setShowPasswordModal(false)}
/>
    </div>
  
);
}

export default Profile;