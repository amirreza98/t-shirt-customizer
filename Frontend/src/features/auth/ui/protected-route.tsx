import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login"); // مسیر فرم لاگین
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading || !isLoggedIn) {
    // می‌تونی یه loader هم اینجا بذاری
    return <p className="text-center mt-20">در حال بررسی دسترسی...</p>;
  }

  return <>{children}</>;
};
