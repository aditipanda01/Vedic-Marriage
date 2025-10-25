import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  notifications: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null;
}

const initialState: UIState = {
  theme: 'system',
  sidebarOpen: false,
  notifications: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    showNotification: (state, action: PayloadAction<Omit<UIState['notifications'], 'show'>>) => {
      state.notifications = { ...action.payload, show: true };
    },
    hideNotification: (state) => {
      if (state.notifications) {
        state.notifications.show = false;
      }
    },
    clearNotification: (state) => {
      state.notifications = null;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  showNotification,
  hideNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer; 