import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Register() {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register(formData.username, formData.email, formData.password);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-cyan-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-sm border border-cyan-500/40 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-center items-center mb-4 space-x-3">
          <SparklesIcon className="h-10 w-10 text-cyan-400" />
          <span className="text-3xl font-bold text-white">Strive</span>
        </div>

        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
