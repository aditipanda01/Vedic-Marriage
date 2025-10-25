import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const { isAuthenticated: authStatus, user: storedUser } = AuthService.initializeAuth();
        setIsAuthenticated(authStatus);
        setUser(storedUser);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await AuthService.login(credentials);
      setIsAuthenticated(true);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await AuthService.register(data);
      setIsAuthenticated(true);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      // Even if logout API fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        isLoading, 
        login, 
        register, 
        logout, 
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 