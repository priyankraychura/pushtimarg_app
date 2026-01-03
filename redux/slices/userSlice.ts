import INITIAL_AARTI_DATA from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  name: string;
  email: string;
  number: string;
}

interface UserState {
  onboarded: boolean;
  profile: UserProfile;
  isProfileModalVisible: boolean;
  lastReadAarti: any; // Ideally replace 'any' with your Aarti Interface
  favoriteIds: string[]; // <--- NEW: Store IDs of favorite items here
}

const initialState: UserState = {
  onboarded: false,
  profile: { name: '', email: '', number: '' },
  isProfileModalVisible: false,
  lastReadAarti: INITIAL_AARTI_DATA[0],
  favoriteIds: [], // <--- NEW: Start with empty list
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    completeOnboarding: (state) => {
      state.onboarded = true;
    },
    updateProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setProfileModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isProfileModalVisible = action.payload;
    },
    setLastReadAarti: (state, action: PayloadAction<any>) => {
      state.lastReadAarti = action.payload;
    },
    // <--- NEW: Logic to add/remove favorites
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);

      if (index !== -1) {
        // ID exists, so remove it (Unfavorite)
        state.favoriteIds.splice(index, 1);
      } else {
        // ID does not exist, so add it (Favorite)
        state.favoriteIds.push(id);
      }
    },
  },
});

export const {
  completeOnboarding,
  updateProfile,
  setProfileModalVisible,
  setLastReadAarti,
  toggleFavorite // Export the new action
} = userSlice.actions;

export default userSlice.reducer;