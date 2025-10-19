import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllStudents, registerStudent } from "./thunk";

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
        (state, _action: PayloadAction<Student>) => {
          state.loading = false;
          state.students = [];
        }
      )
      .addCase(
        registerStudent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllStudents.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.students = action.payload;
        }
      )
      .addCase(getAllStudents.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = studentSlice.actions;
export default studentSlice.reducer;
