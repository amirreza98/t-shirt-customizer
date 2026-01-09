import { User } from "../api";

type AuthState = {
  user: User | null;
};

const state: AuthState = {
  user: null,
};

export function setUser(user: User) {
  state.user = user;
}

export function clearUser() {
  state.user = null;
}

export function getUser() {
  return state.user;
}

export function isAuthenticated() {
  return state.user !== null;
}
