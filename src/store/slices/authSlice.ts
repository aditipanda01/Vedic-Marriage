import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth';
import { tokenStorage } from '@/lib/token';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  const storedToken = tokenStorage.getToken();
  return {
    user: null,
    token: storedToken,
    isAuthenticated: !!storedToken,
    isLoading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token?: string }>) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        // Save token to localStorage
        tokenStorage.setToken(action.payload.token);
      }
      state.isAuthenticated = true;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      // Save token to localStorage
      tokenStorage.setToken(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      // Remove token from localStorage
      tokenStorage.removeToken();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      const storedToken = tokenStorage.getToken();
      if (storedToken) {
        state.token = storedToken;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setUser, setToken, clearUser, setLoading, setError, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 