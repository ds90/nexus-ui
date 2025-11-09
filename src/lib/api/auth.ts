import apiClient from "../api";
import { API_ENDPOINTS } from "../endpoints";

// Types per Request/Response

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  tokenExpiration?: string;
  user?: {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    organizationId: number;
    organizationName: string;
    organizationType: string;
    role: string;
  };
}

// Funzioni API
export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  // Logout (future)
  logout: async (): Promise<void> => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
