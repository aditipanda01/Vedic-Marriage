import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth';

interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setLoading,
  setError,
  clearError,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer; 