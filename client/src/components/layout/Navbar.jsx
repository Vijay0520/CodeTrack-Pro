import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-600">
        🚀 CodeTrack-Pro
      </h1>

      <div className="flex gap-8 text-lg">

        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/problems"
          className="hover:text-blue-600 transition"
        >
          Problems
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-600 transition"
        >
          Profile
        </Link>

        <Link
          to="/"
          className="text-red-500 hover:text-red-700 transition"
        >
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;