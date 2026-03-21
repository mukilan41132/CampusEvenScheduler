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
      const { profile, ...payload } = studentData;
      const formData = new FormData();

      formData.append(
        "students",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        }),
      );

      if (profile instanceof File) {
        formData.append("file", profile);
      }
      const response = await HttpAxios.axios().post(
        "/Student/register",
        formData,
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
      const { profile, ...payload } = studentData;
      const formData = new FormData();

      formData.append(
        "students",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        }),
      );

      if (profile instanceof File) {
        formData.append("file", profile);
      }

      const response = await HttpAxios.axios().put(
        "/Student/updateStudentById",
        formData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
