import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { RootState } from '@/store';
import { setUser, clearUser, initializeAuth, setLoading } from '@/store/slices/authSlice';
import { User } from '@/types/auth';
import { tokenStorage } from '@/lib/token';
import { checkAuthenticationStatus } from '@/lib/auth';
import api from '@/services/axios';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // Function to fetch user data using stored token
  const fetchUserData = async (storedToken: string) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
      
      if (response.status === 200) {
        const userData = response.data.data?.user || response.data.data || response.data;
        if (userData) {
          dispatch(setUser({ user: userData, token: storedToken }));
          return userData;
        }
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        tokenStorage.removeToken();
        dispatch(clearUser());
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Function to refresh user data (can be called externally)
  const refreshUserData = async () => {
    const storedToken = tokenStorage.getToken();
    if (storedToken) {
      return await fetchUserData(storedToken);
    }
    throw new Error('No token available to refresh user data');
  };

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    let isMounted = true;
    
    const initializeAuthData = async () => {
      const storedToken = tokenStorage.getToken();
      console.log('Initializing auth data:', { storedToken: !!storedToken, user: !!user });
      
      if (storedToken && !user && isMounted) {
        console.log('Token found but no user data, fetching user data...');
        // If we have a token but no user data, fetch it
        dispatch(initializeAuth());
        try {
          await fetchUserData(storedToken);
          if (isMounted) {
            console.log('User data fetched successfully');
          }
        } catch (error) {
          if (isMounted) {
            console.error('Failed to fetch user data on initialization:', error);
          }
        }
      }
    };

    initializeAuthData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, user]);

  // Check if user is authenticated using both Redux and localStorage
  const currentAuthStatus = useMemo((): boolean => {
    return checkAuthenticationStatus(token, isAuthenticated);
  }, [token, isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const loginData = {
        email,
        password,
        deviceId: "device-123",
        deviceName: "iPhone 14",
        deviceType: "mobile",
        platform: "iOS"
      };

      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
      
      if (response.status === 200) {
        // Handle different response structures
        const responseData = response.data;
        const { token, user } = responseData.data || responseData;
        
        if (token && user) {
          // Save token to localStorage and Redux
          tokenStorage.setToken(token);
          dispatch(setUser({ user, token }));
          return responseData;
        } else {
          throw new Error('Invalid response format: missing token or user data');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      
      if (response.status === 200) {
        // Handle different response structures
        const responseData = response.data;
        const { token, user } = responseData.data || responseData;
        
        if (token && user) {
          // Save token to localStorage and Redux
          tokenStorage.setToken(token);
          dispatch(setUser({ user, token }));
          return responseData;
        } else {
          throw new Error('Invalid response format: missing token or user data');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout API with deviceId header
      await api.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
        headers: {
         // 'x-device-id': 'device-123' // TODO: Use actual device ID from localStorage or device fingerprint
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear both Redux and localStorage, even if API call fails
      tokenStorage.removeToken();
      dispatch(clearUser());
    }
  };

  return {
    user,
    token,
    isAuthenticated: currentAuthStatus,
    isLoading,
    login,
    register,
    logout,
    fetchUserData,
    refreshUserData,
    checkAuthStatus: currentAuthStatus,
  };
} 