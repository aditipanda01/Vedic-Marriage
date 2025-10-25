const TOKEN_KEY = 'vdm_auth_token';

export const tokenStorage = {
  // Store token in localStorage
  setToken: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  // Get token from localStorage
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  // Remove token from localStorage
  removeToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = tokenStorage.getToken();
    return !!token;
  }
}; 