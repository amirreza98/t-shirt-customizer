import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/use-auth";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { register, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Client-side validation
    if (!form.name || !form.email || !form.password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (form.name.trim().length < 2) {
      setLocalError("Name must be at least 2 characters long");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    if (form.password.length < 8) {
      setLocalError("Password must be at least 8 characters long");
      return;
    }

    if (!/[a-zA-Z]/.test(form.password)) {
      setLocalError("Password must contain at least one letter");
      return;
    }

    if (!/[0-9]/.test(form.password)) {
      setLocalError("Password must contain at least one number");
      return;
    }

    try {
      await register(form);
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
          Register
        </h2>
        {displayError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {displayError}
          </div>
        )}
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={isLoading}
          required
        />
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
          placeholder="Password (min 8 chars, 1 letter, 1 number)"
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
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;