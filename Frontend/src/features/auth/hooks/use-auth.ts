import { useSnapshot } from "valtio";
import authState from "../store";

export function useAuth() {
  const snap = useSnapshot(authState);

  return {
    user: snap.user,
    isAuthenticated: snap.isAuthenticated,
  };
}
