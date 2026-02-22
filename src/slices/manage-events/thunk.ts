import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpAxios from "../../utils/axiosInstance";

export const getAllEvents = createAsyncThunk(
  "ManageEvents/registerEvent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().get("ManageEvents/getAllEvents");
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error.data);
    }
  },
);
