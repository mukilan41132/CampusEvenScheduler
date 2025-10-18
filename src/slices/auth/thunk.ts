import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpAxios from "../../utils/axiosInstance";

interface login {
  username: string;
  password: string;
}

export const loginAuth = createAsyncThunk(
  "auth/login",
  async (auth: login, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().post("auth/login", auth);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
