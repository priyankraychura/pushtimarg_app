import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

// Your existing imports
import contentReducer from './slices/contentSlice';
import { counterSlice } from './slices/counterSlice';
import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';
import vartaReducer from './slices/vartaSlice';

// 1. Create the Root Reducer
// We need to combine them first because persistReducer expects one single reducer function.
const rootReducer = combineReducers({
  settings: settingsReducer,
  user: userReducer,
  content: contentReducer,
  counter: counterSlice.reducer,
  varta: vartaReducer,
});

// 2. Configure Persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // IMPORTANT: Only 'settings' and 'user' will be saved to storage.
  // Remove this line if you want to save everything (including content/counter).
  whitelist: ['settings', 'user'],
};

// 3. Create the Persisted Reducer
// 3. Create the Persisted Reducer
export type RootReducerState = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootReducerState>(persistConfig, rootReducer);

// 4. Create the Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This ignores the special redux-persist actions that are not serializable
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Export the Persistor (required for App.tsx)
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;