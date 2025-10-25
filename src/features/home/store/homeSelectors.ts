import { RootState } from '@/store';

export const selectActiveSection = (state: RootState) => state.home.activeSection;
export const selectScrollProgress = (state: RootState) => state.home.scrollProgress;
export const selectHeroVisibility = (state: RootState) => state.home.isHeroVisible; 