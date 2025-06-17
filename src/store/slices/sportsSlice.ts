import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sportsApi, Sport, UserSport } from '../../services/api/sportsApi';
import { RootState } from '../store';

interface SportsState {
    allSports: Sport[];
    userSports: UserSport[];
    loading: boolean;
    error: string | null;
}

const initialState: SportsState = {
    allSports: [],
    userSports: [],
    loading: false,
    error: null,
};

export const fetchAllSports = createAsyncThunk(
    'sports/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await sportsApi.getAllSports();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch sports');
        }
    }
);

export const fetchUserSports = createAsyncThunk(
    'sports/fetchUserSports',
    async (_, { rejectWithValue }) => {
        try {
            return await sportsApi.getUserSports();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user sports');
        }
    }
);

export const updateUserSports = createAsyncThunk(
    'sports/updateUserSports',
    async (sports: UserSport[], { rejectWithValue }) => {
        try {
            await sportsApi.updateUserSports(sports);
            return sports;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user sports');
        }
    }
);

const sportsSlice = createSlice({
    name: 'sports',
    initialState,
    reducers: {
        clearSportsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all sports
            .addCase(fetchAllSports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSports.fulfilled, (state, action) => {
                state.loading = false;
                state.allSports = action.payload;
            })
            .addCase(fetchAllSports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch user sports
            .addCase(fetchUserSports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserSports.fulfilled, (state, action) => {
                state.loading = false;
                state.userSports = action.payload;
            })
            .addCase(fetchUserSports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update user sports
            .addCase(updateUserSports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserSports.fulfilled, (state, action) => {
                state.loading = false;
                state.userSports = action.payload;
            })
            .addCase(updateUserSports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSportsError } = sportsSlice.actions;

export const selectAllSports = (state: RootState) => state.sports.allSports;
export const selectUserSports = (state: RootState) => state.sports.userSports;
export const selectSportsLoading = (state: RootState) => state.sports.loading;
export const selectSportsError = (state: RootState) => state.sports.error;

export default sportsSlice.reducer; 