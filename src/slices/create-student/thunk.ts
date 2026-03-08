import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpAxios from "../../utils/axiosInstance";
import type { Student } from "./studentSlice";

export const getAllStudents = createAsyncThunk(
  "students/getAll",
  async (
    { page, limit }: { page?: number; limit?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await HttpAxios.axios().get(
        `/Student/getAll?page=${page}&limit=${limit}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const registerStudent = createAsyncThunk(
  "students/register",
  async (studentData: Student, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().post(
        "/Student/register",
        studentData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateByid = createAsyncThunk(
  "students/update",
  async (studentData: Student, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().put(
        "/Student/updateStudentById",
        studentData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
