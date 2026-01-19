import axios from "axios";

const API_URL = "https://t-shirt-customizer-3pju.onrender.com/api/auth";

axios.defaults.withCredentials = true;

export type User = {
  id: number;
  name: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export interface AuthResponse {
  user: User;
}

export interface ErrorResponse {
  message: string;
}

// Login user
export async function login(payload: LoginPayload): Promise<User> {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, payload);
  return response.data.user;
}

// Register user
export async function register(payload: RegisterPayload): Promise<User> {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, payload);
  return response.data.user;
}

// Get current user
export async function getMe(): Promise<User> {
  const response = await axios.get<User>(`${API_URL}/me`);
  return response.data;
}

// Logout user
export async function logout(): Promise<void> {
  await axios.post(`${API_URL}/logout`);
}
