import { proxy } from "valtio";
import * as authApi from "./api";
import type { User, LoginPayload, RegisterPayload } from "./api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const authState = proxy<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
});

// Login function
export async function login(payload: LoginPayload): Promise<void> {
  authState.isLoading = true;
  authState.error = null;

  try {
    const user = await authApi.login(payload);
    authState.user = user;
    authState.isAuthenticated = true;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    authState.error = errorMessage;
    throw new Error(errorMessage);
  } finally {
    authState.isLoading = false;
  }
}

// Register function
export async function register(payload: RegisterPayload): Promise<void> {
  authState.isLoading = true;
  authState.error = null;

  try {
    const user = await authApi.register(payload);
    authState.user = user;
    authState.isAuthenticated = true;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Registration failed. Please try again.";
    authState.error = errorMessage;
    throw new Error(errorMessage);
  } finally {
    authState.isLoading = false;
  }
}

// Fetch current user
export async function fetchUser(): Promise<void> {
  authState.isLoading = true;
  authState.error = null;

  try {
    const user = await authApi.getMe();
    authState.user = user;
    authState.isAuthenticated = true;
  } catch (error: any) {
    authState.user = null;
    authState.isAuthenticated = false;
  } finally {
    authState.isLoading = false;
  }
}

// Logout function
export async function logout(): Promise<void> {
  authState.isLoading = true;
  authState.error = null;

  try {
    await authApi.logout();
    authState.user = null;
    authState.isAuthenticated = false;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Logout failed. Please try again.";
    authState.error = errorMessage;
  } finally {
    authState.isLoading = false;
  }
}

// Set user directly (for compatibility with existing code)
export function setUser(user: User): void {
  authState.user = user;
  authState.isAuthenticated = true;
}

// Clear error
export function clearError(): void {
  authState.error = null;
}

export default authState;
