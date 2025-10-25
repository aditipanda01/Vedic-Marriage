import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { AuthResponse, ApiError } from '@/common/types/apiResponses';
import api from '@/services/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, request);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }

    const apiError = error as { response?: { data: ApiError } };
    if (apiError.response?.data) {
      return new Error(apiError.response.data.message);
    }

    return new Error('An unexpected error occurred');
  }
}

export const authService = new AuthService(); 