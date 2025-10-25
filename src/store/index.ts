import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import matchReducer from './slices/matchSlice';
import homeReducer from '@/features/home/store/homeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    match: matchReducer,
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 