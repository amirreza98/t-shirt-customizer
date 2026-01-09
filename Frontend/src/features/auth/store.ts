import { proxy } from "valtio";

type User = {
  id: string;
  email: string;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const authState = proxy<AuthState>({
  user: null,
  isAuthenticated: false,
});

export function setUser(user: User) {
  authState.user = user;
  authState.isAuthenticated = true;
}

export function logout() {
  authState.user = null;
  authState.isAuthenticated = false;
}

export default authState;
