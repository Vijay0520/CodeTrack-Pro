import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <Link
            to="/dashboard"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            🚀 CodeTrack-Pro
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8 text-gray-800 dark:text-white">

            <Link
              to="/dashboard"
              className="hover:text-blue-600 transition font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/problems"
              className="hover:text-blue-600 transition font-medium"
            >
              Problems
            </Link>

            <Link
              to="/profile"
              className="hover:text-blue-600 transition font-medium"
            >
              Profile
            </Link>

            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <Link
              to="/"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </Link>

          </div>

          {/* Mobile Buttons */}

          <div className="flex items-center gap-3 md:hidden">

            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-white"
            >
              {menuOpen ? (
                <HiX size={30} />
              ) : (
                <HiMenu size={30} />
              )}
            </button>

          </div>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">

            <div className="flex flex-col gap-3 pt-4">

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/problems"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                Problems
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                Profile
              </Link>

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="mx-4 text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
              >
                Logout
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;