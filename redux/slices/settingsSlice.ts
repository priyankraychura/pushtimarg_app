import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  isDark: boolean;
  textSizeMode: 'Small' | 'Medium' | 'Large';
  notificationsEnabled: boolean; // Added
  playerEnabled: boolean; // Added
}

const initialState: SettingsState = {
  isDark: false,
  textSizeMode: 'Medium',
  notificationsEnabled: true, // Default to true
  playerEnabled: true, // Default to true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    cycleTextSize: (state) => {
      if (state.textSizeMode === 'Small') state.textSizeMode = 'Medium';
      else if (state.textSizeMode === 'Medium') state.textSizeMode = 'Large';
      else state.textSizeMode = 'Small';
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    togglePlayer: (state) => {
      state.playerEnabled = !state.playerEnabled;
    },
  },
});

export const { toggleTheme, cycleTextSize, toggleNotifications, togglePlayer } = settingsSlice.actions;
export default settingsSlice.reducer;