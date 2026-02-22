import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllEvents } from "./thunk";

export interface EventFormData {
  eventName: string;
  eventType: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  department: string;
  organizerName: string;
  contactEmail: string;
  contactNumber: string;
  maxParticipants: string;
  registrationFee: string;
  status: string;
}

export interface EventFormDataState {
  loading: boolean;
  error: string | null;
  events: EventFormData[];
}

export const initialState: EventFormDataState = {
  loading: false,
  error: null,
  events: [],
};
const manageEventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEventSate(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { clearEventSate } = manageEventSlice.actions;
export default manageEventSlice.reducer;
