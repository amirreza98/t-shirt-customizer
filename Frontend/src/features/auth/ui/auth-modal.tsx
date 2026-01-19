import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { login, register, isLoading, error: authError } = useAuth();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must contain at least one letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validation
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (!isLogin && formData.name.trim().length < 2) {
      setLocalError("Name must be at least 2 characters long");
      return;
    }

    if (!validateEmail(formData.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setLocalError(passwordError);
      return;
    }

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }
      onClose();
      navigate("/customizer");
    } catch (err) {
      // Error is already set in auth state
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setLocalError("");
  };

  const displayError = localError || authError;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* Error message */}
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
              {displayError}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (only for register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isLoading}
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder={
                  isLogin ? "Enter password" : "Min 8 chars, 1 letter, 1 number"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
                required
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                ? "Log In"
                : "Sign Up"}
            </button>
          </form>

          {/* Switch between login/register */}
          <div className="mt-6 text-center">
            <button
              onClick={switchMode}
              className="text-blue-500 hover:text-blue-600 font-medium"
              disabled={isLoading}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
