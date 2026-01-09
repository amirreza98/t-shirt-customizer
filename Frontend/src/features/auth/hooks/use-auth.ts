import { useSyncExternalStore } from "react";
import { getUser, isAuthenticated } from "../model/auth.store";

export function useAuth() {
  const user = useSyncExternalStore(
    () => () => {}, 
    getUser
  );

  return {
    user,
    isAuthenticated: isAuthenticated(),
  };
}
