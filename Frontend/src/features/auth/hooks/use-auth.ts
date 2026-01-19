import { useSnapshot } from "valtio";
import authState, {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  fetchUser as fetchUserAction,
  clearError as clearErrorAction,
} from "../store";
import type { LoginPayload, RegisterPayload } from "../api";

export function useAuth() {
  const snap = useSnapshot(authState);

  return {
    user: snap.user,
    isAuthenticated: snap.isAuthenticated,
    isLoading: snap.isLoading,
    error: snap.error,
    login: loginAction,
    register: registerAction,
    logout: logoutAction,
    fetchUser: fetchUserAction,
    clearError: clearErrorAction,
  };
}

export type { LoginPayload, RegisterPayload };
