import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaUserEdit, FaKey } from "react-icons/fa";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import toast from "react-hot-toast";

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
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const total = problems.length;
  const solved = problems.filter((p) => p.status === "Solved").length;
  const easy = problems.filter((p) => p.difficulty === "Easy").length;
  const medium = problems.filter((p) => p.difficulty === "Medium").length;
  const hard = problems.filter((p) => p.difficulty === "Hard").length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300 py-10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Card */}

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">

            {/* Avatar */}

            <div className="relative">

              <div className="w-24 h-24 sm:w-32 sm:h-32 text-4xl sm:text-5xl rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white  font-bold shadow-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>

            </div>

            {/* User Info */}

            <div className="flex-1">

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>

              <p className="text-base sm:text-lg mt-2 text-gray-600 dark:text-gray-300">
                {user.email}
              </p>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Joined on{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>

          {/* Statistics */}

          <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
            Problem Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-5 sm:p-6">
            {/* Total */}
<div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
  <h3 className="text-lg font-medium text-center">Total Problems</h3>
  <p className="text-3xl sm:text-4xl font-bold mt-3 text-center">{total}</p>
</div>

{/* Solved */}
<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
  <h3 className="text-lg font-medium text-center">Solved</h3>
  <p className="text-3xl sm:text-4xl font-bold mt-3 text-center">{solved}</p>
</div>

{/* Easy */}
<div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
  <h3 className="text-lg font-medium text-center">Easy</h3>
  <p className="text-3xl sm:text-4xl font-bold mt-3 text-center">{easy}</p>
</div>

{/* Medium */}
<div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
  <h3 className="text-lg font-medium text-center">Medium</h3>
  <p className="text-3xl sm:text-4xl font-bold mt-3 text-center">{medium}</p>
</div>

{/* Hard */}
<div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
  <h3 className="text-lg font-medium text-center">Hard</h3>
  <p className="text-3xl sm:text-4xl font-bold mt-3 text-center">{hard}</p>
</div>

</div>

{/* Account Settings */}

<div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">

  <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
    Account Settings
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <button
      onClick={() => setShowModal(true)}
      className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <FaUserEdit className="text-xl sm:text-2xl" />
      Edit Profile
    </button>

    <button
      onClick={() => setShowPasswordModal(true)}
      className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <FaKey className="text-xl sm:text-2xl" />
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

</div>
  );
};

export default Profile;
          