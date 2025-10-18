import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginAuth } from "./thunk";

export interface Auth {
  loading: boolean;
  error: null;
  auth: null;
}

const initialState: Auth = {
  loading: false,
  error: null,
  auth: null,
};

const authSlice = createSlice({
  name: "authlogin",
  initialState,
  reducers: {
    clearError(state) {
      state.auth = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<any>) => {
        state.auth = action.payload;
        state.error = null;
        state.loading = false;
      })

      .addCase(loginAuth.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
