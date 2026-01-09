import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../model/auth.store";

export function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
