import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpAxios from "../../utils/axiosInstance";
import type { EventFormData } from "./manage-eventSlice";

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

export const register = createAsyncThunk(
  "Events/register",
  async (eventData: EventFormData, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().post(
        "/ManageEvents/registerEvent",
        eventData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateByid = createAsyncThunk(
  "Events/update",
  async (eventData: EventFormData, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().put(
        "/ManageEvents/updateEvent",
        eventData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);