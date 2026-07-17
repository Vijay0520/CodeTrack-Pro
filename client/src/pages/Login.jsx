import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          🚀 CodeTrack-Pro
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Track your coding journey
        </p>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;