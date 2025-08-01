// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducter';

export const store = configureStore({
    reducer: rootReducer,
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

