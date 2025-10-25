import { tokenStorage } from '@/lib/token';

export class AuthService {
  // Save token when received from backend
  static saveToken(token: string): void {
    tokenStorage.setToken(token);
  }

  // Get stored token
  static getToken(): string | null {
    return tokenStorage.getToken();
  }

  // Remove token (for logout)
  static removeToken(): void {
    tokenStorage.removeToken();
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }

  // Example: Handle login response from backend
  static handleLoginResponse(response: any): void {
    if (response?.data?.token) {
      this.saveToken(response.data.token);
    }
  }

  // Example: Handle register response from backend
  static handleRegisterResponse(response: any): void {
    if (response?.data?.token) {
      this.saveToken(response.data.token);
    }
  }
} 