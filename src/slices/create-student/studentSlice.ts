import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import HttpAxios from "../../utils/axiosInstance";
 

export interface Student {
  name: string;
  email: string;
  gender: string;
  age: string;
  department: string; 
  rollNo: string;
}

export interface StudentState {
  loading: boolean;
  error: string | null;
  students: Student[];
}

export const initialState: StudentState = {
  loading: false,
  error: null,
  students: [],
};

export const registerStudent = createAsyncThunk(
  "students/register",
  async (studentData: Student, { rejectWithValue }) => {
    try {
      const response = await HttpAxios.axios().post(
        "/Student/student/register",
        studentData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.loading = false;
          state.students.push(action.payload);
        }
      )
      .addCase(
        registerStudent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearError } = studentSlice.actions;
export default studentSlice.reducer;
