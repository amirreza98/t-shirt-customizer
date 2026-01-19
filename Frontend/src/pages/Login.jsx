import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/use-auth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Client-side validation
    if (!form.email || !form.password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      // Error is already set in auth state
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 font-bold text-center text-gray-800">
          Login
        </h2>
        {displayError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {displayError}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;