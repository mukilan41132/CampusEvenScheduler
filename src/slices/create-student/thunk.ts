import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpAxios from "../../utils/axiosInstance";
import type { Student } from "./studentSlice";

export const getAllStudents = createAsyncThunk(
  "students/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().get("/Student/getAll");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerStudent = createAsyncThunk(
  "students/register",
  async (studentData: Student, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().post(
        "/Student/register",
        studentData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);