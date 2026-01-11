import { getPrasangContent, getVartaList, VartaType } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- THUNK 1: Fetch Specific Varta List ---
export const fetchVartaList = createAsyncThunk(
  'varta/fetchList',
  async (type: VartaType, { rejectWithValue }) => {
    try {
      const data = await getVartaList(type);
      // Return both the type (to know which list to update) and the data
      return { type, data }; 
    } catch (error: any) {
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

// --- THUNK 2: Fetch Prasang Content ---
export const fetchPrasangContent = createAsyncThunk(
  'varta/fetchPrasang',
  async (filePath: string, { rejectWithValue }) => {
    try {
      const data = await getPrasangContent(filePath);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to load story");
    }
  }
);

interface VartaState {
  // Two separate lists for the tabs
  list84: any[];
  list252: any[];
  
  // Status for the *list* fetching
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  listError: string | null;

  // Status for *reading* a story
  currentPrasang: any | null;
  prasangStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  prasangError: string | null;
}

const initialState: VartaState = {
  list84: [],
  list252: [],
  listStatus: 'idle',
  listError: null,

  currentPrasang: null,
  prasangStatus: 'idle',
  prasangError: null,
};

const vartaSlice = createSlice({
  name: 'varta',
  initialState,
  reducers: {
    // Call this when leaving the reading screen
    clearCurrentPrasang: (state) => {
      state.currentPrasang = null;
      state.prasangStatus = 'idle';
      state.prasangError = null;
    }
  },
  extraReducers: (builder) => {
    // --- Handle List Fetch ---
    builder
      .addCase(fetchVartaList.pending, (state) => {
        state.listStatus = 'loading';
        state.listError = null;
      })
      .addCase(fetchVartaList.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        // Update the correct list based on the 'type' we passed
        if (action.payload.type === '84') {
          state.list84 = action.payload.data;
        } else {
          state.list252 = action.payload.data;
        }
      })
      .addCase(fetchVartaList.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.listError = action.payload as string;
      });

    // --- Handle Prasang Content Fetch ---
    builder
      .addCase(fetchPrasangContent.pending, (state) => {
        state.prasangStatus = 'loading';
        state.prasangError = null;
      })
      .addCase(fetchPrasangContent.fulfilled, (state, action) => {
        state.prasangStatus = 'succeeded';
        state.currentPrasang = action.payload;
      })
      .addCase(fetchPrasangContent.rejected, (state, action) => {
        state.prasangStatus = 'failed';
        state.prasangError = action.payload as string;
      });
  },
});

export const { clearCurrentPrasang } = vartaSlice.actions;
export default vartaSlice.reducer;