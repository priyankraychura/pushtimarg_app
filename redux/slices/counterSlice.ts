import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library internally.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Example with a payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;