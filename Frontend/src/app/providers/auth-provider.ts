import { useEffect } from "react";
import { getMe } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/model/auth.store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return <>{children}</>;
};
