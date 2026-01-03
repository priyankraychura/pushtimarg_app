import { getBhajanDetails, getMasterList } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- THUNKS ---
export const fetchContentList = createAsyncThunk(
  'content/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMasterList();
      return data;
    } catch (error: any) {
      // This usually catches "Network request failed" if offline
      return rejectWithValue(error.message || "Network Error");
    }
  }
);

export const fetchAartiContent = createAsyncThunk(
  'content/fetchDetail',
  async (filename: string, { rejectWithValue }) => {
    try {
      const data = await getBhajanDetails(filename);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to load details");
    }
  }
);

interface ContentState {
  // Master List Data
  items: any[];
  listStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  listError: string | null; // <--- NEW: To store list error

  // Specific Detail Data
  selectedAartiContent: any | null;
  detailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  detailError: string | null; // <--- NEW: To store detail error
  selectedAartiMetadata: any | null;

  selectedAarti: any | null;
  listFilter: string;
}

const initialState: ContentState = {
  items: [],
  listStatus: 'idle',
  listError: null, // <--- INIT

  selectedAartiContent: null,
  detailStatus: 'idle',
  detailError: null, // <--- INIT
  selectedAartiMetadata: null,

  selectedAarti: null,
  listFilter: 'All',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSelectedAarti: (state, action: PayloadAction<any | null>) => {
      state.selectedAarti = action.payload;
    },
    setListFilter: (state, action: PayloadAction<string>) => {
      state.listFilter = action.payload;
    },
    setSelectedAartiMetadata: (state, action: PayloadAction<any>) => {
      state.selectedAartiMetadata = action.payload;
      state.selectedAartiContent = null;
      state.detailStatus = 'idle';
      state.detailError = null; // <--- Reset error on new selection
    },
    clearSelectedAarti: (state) => {
      state.selectedAartiMetadata = null;
      state.selectedAartiContent = null;
    },
    // Optional: Action to clear errors manually
    clearErrors: (state) => {
      state.listError = null;
      state.detailError = null;
    }
  },

  extraReducers: (builder) => {
    // Handle Master List
    builder
      .addCase(fetchContentList.pending, (state) => {
        state.listStatus = 'loading';
        state.listError = null; // Clear previous error
      })
      .addCase(fetchContentList.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContentList.rejected, (state, action) => {
        state.listStatus = 'failed';
        // Store the error message from rejectWithValue
        state.listError = action.payload as string;
      });

    // Handle Detail Content
    builder
      .addCase(fetchAartiContent.pending, (state) => {
        state.detailStatus = 'loading';
        state.detailError = null;
      })
      .addCase(fetchAartiContent.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.selectedAartiContent = action.payload;
      })
      .addCase(fetchAartiContent.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.detailError = action.payload as string;
      });
  },
});

export const { setSelectedAarti, setListFilter, setSelectedAartiMetadata, clearSelectedAarti, clearErrors } = contentSlice.actions;
export default contentSlice.reducer;