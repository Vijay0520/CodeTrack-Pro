import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div  className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl" >

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          🚀 CodeTrack-Pro
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your account
        </p>

        <form className="space-y-6">
             <div>
  <label className="block mb-2 text-sm font-medium text-gray-700">
    Email
  </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <div>
  <label className="block mb-2 text-sm font-medium text-gray-700">
    Full Name
  </label>

    <input
    type="email"
    placeholder="Enter your email"
    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </div>
         <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
        Password
        </label>
          <input
            type="password"
            placeholder="Password"
           className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 duration-200 text-white p-3 rounded-lg  transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;