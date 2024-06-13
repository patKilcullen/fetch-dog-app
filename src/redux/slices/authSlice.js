import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

export const login = createAsyncThunk("auth/login", async ({ name, email }) => {
  await axiosInstance.post("/auth/login", { name, email });
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await axiosInstance.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
