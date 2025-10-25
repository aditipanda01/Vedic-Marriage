import { useAuth } from '@/contexts/AuthContext';
import { tokenStorage } from '@/lib/token';

export const useAuthToken = () => {
  const { isAuthenticated, user } = useAuth();

  const getToken = (): string | null => {
    return tokenStorage.getToken();
  };

  const setToken = (token: string): void => {
    tokenStorage.setToken(token);
  };

  const removeToken = (): void => {
    tokenStorage.removeToken();
  };

  const getUser = () => {
    return tokenStorage.getUser();
  };

  const setUser = (userData: any): void => {
    tokenStorage.setUser(userData);
  };

  const removeUser = (): void => {
    tokenStorage.removeUser();
  };

  const clearAuth = (): void => {
    tokenStorage.clearAuth();
  };

  return {
    isAuthenticated,
    user,
    getToken,
    setToken,
    removeToken,
    getUser,
    setUser,
    removeUser,
    clearAuth
  };
}; 