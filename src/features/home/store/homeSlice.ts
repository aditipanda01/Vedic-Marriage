import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  activeSection: string;
  scrollProgress: number;
  isHeroVisible: boolean;
}

const initialState: HomeState = {
  activeSection: 'hero',
  scrollProgress: 0,
  isHeroVisible: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setScrollProgress: (state, action: PayloadAction<number>) => {
      state.scrollProgress = action.payload;
    },
    setHeroVisibility: (state, action: PayloadAction<boolean>) => {
      state.isHeroVisible = action.payload;
    },
  },
});

export const { setActiveSection, setScrollProgress, setHeroVisibility } = homeSlice.actions;
export default homeSlice.reducer; 