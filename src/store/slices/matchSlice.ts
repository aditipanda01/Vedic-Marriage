import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/common/types/user';

interface Match {
  id: string;
  user: User;
  matchPercentage: number;
  status: 'pending' | 'accepted' | 'rejected';
  lastInteraction?: string;
}

interface MatchState {
  matches: Match[];
  pendingMatches: Match[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MatchState = {
  matches: [],
  pendingMatches: [],
  isLoading: false,
  error: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
      state.error = null;
    },
    addMatch: (state, action: PayloadAction<Match>) => {
      state.matches.push(action.payload);
      state.error = null;
    },
    updateMatch: (state, action: PayloadAction<{ id: string; updates: Partial<Match> }>) => {
      const match = state.matches.find((m) => m.id === action.payload.id);
      if (match) {
        Object.assign(match, action.payload.updates);
      }
      state.error = null;
    },
    removeMatch: (state, action: PayloadAction<string>) => {
      state.matches = state.matches.filter((match) => match.id !== action.payload);
      state.error = null;
    },
    setPendingMatches: (state, action: PayloadAction<Match[]>) => {
      state.pendingMatches = action.payload;
      state.error = null;
    },
    addPendingMatch: (state, action: PayloadAction<Match>) => {
      state.pendingMatches.push(action.payload);
      state.error = null;
    },
    removePendingMatch: (state, action: PayloadAction<string>) => {
      state.pendingMatches = state.pendingMatches.filter((match) => match.id !== action.payload);
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
  },
});

export const {
  setMatches,
  addMatch,
  updateMatch,
  removeMatch,
  setPendingMatches,
  addPendingMatch,
  removePendingMatch,
  setLoading,
  setError,
  clearError,
} = matchSlice.actions;

export default matchSlice.reducer; 