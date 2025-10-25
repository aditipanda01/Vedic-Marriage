import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authService, LoginCredentials, RegisterCredentials } from '../services/authService';
import { setUser, clearUser } from '@/store/slices/authSlice';
import { ROUTES } from '@/common/constants/routes';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    dispatch(setUser(response.user));
    return response;
  }, [dispatch]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const response = await authService.register({ email, password, name });
    dispatch(setUser(response.user));
    return response;
  }, [dispatch]);

  const logout = useCallback(async () => {
    await authService.logout();
    dispatch(clearUser());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword(email);
  }, []);

  const resetPassword = useCallback(async (email: string, token: string, password: string) => {
    await authService.resetPassword({ email, token, password });
  }, []);

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };
} 