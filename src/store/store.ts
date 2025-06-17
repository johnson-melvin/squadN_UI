import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sportsReducer from './slices/sportsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sports: sportsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 