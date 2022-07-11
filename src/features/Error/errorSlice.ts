import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ErrorState } from './ErrorState';

const initialState: ErrorState = {
  message: undefined,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearError(state) {
      state.message = '';
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
