import React, { useCallback, useMemo, memo } from "react";
import { TextField, MenuItem } from "@mui/material";
import { Avatar } from "primereact/avatar";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../../components/Button/CustomButton";
import "../../styles/createEvent/create-event.css";
import "../../styles/create-student/createstudent.css";
const eventTypes = ["Technical", "Cultural", "Sports", "Workshop", "Seminar"];

interface CreateEventProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setEvent: React.Dispatch<React.SetStateAction<EventFormData>>;
  event: EventFormData;
  clearState: () => void;
  registerOrUpdateById: () => Promise<void>;
}

export interface EventFormData {
  id: string;
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

const CreateEventForm = memo(
  ({
    visible,
    setVisible,
    setEvent,
    event,
    clearState,
    registerOrUpdateById,
  }: CreateEventProps) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent((prev) => ({ ...prev, [name]: value }));
      },
      [],
    );

    const footerContent = () => (
      <div className="footer-btn">
        <CustomButton
          size="small"
          color="primary"
          onClick={clearState}
          type="submit"
          text={"Cancel"}
        />
        <CustomButton
          size="small"
          onClick={registerOrUpdateById}
          color="secondary"
          type="submit"
          text={"Register"}
        />
      </div>
    );

    const headerElement = useMemo(
      () => (
        <div className="inline-flex align-items-center justify-content-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span className="font-bold white-space-nowrap">
            Create New College Event
          </span>
        </div>
      ),
      [],
    );

    return (
      <Drawer anchor="right" open={visible} onClose={clearState}>
        <Box
          sx={{
            width: { xs: "100vw", sm: 450 },
            p: "12px",
            marginTop: "15%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {headerElement}

            <IconButton onClick={clearState}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="form-column">
            <TextField
              label="Event Name"
              name="eventName"
              size="small"
              value={event.eventName}
              onChange={handleChange}
              fullWidth
              className="form-control"
            />

            <Box className="form-row">
              <TextField
                select
                label="Event Type"
                name="eventType"
                value={event.eventType}
                onChange={handleChange}
                fullWidth
                size="small"
                className="form-control"
              >
                {eventTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Department"
                name="department"
                size="small"
                value={event.department}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />
            </Box>

            <TextField
              label="Description"
              name="description"
              value={event.description}
              size="small"
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              className="form-control"
            />

            <Box className="form-row">
              <TextField
                type="date"
                label="Date"
                name="date"
                size="small"
                value={event.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                className="form-control"
              />

              <TextField
                type="time"
                label="Start Time"
                name="startTime"
                size="small"
                value={event.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                className="form-control"
              />

              <TextField
                type="time"
                label="End Time"
                name="endTime"
                size="small"
                value={event.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                className="form-control"
              />
            </Box>

            <Box className="form-row">
              <TextField
                label="Venue"
                name="venue"
                size="small"
                value={event.venue}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />

              <TextField
                label="Organizer Name"
                name="organizerName"
                size="small"
                value={event.organizerName}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />
            </Box>

            <Box className="form-row">
              <TextField
                label="Contact Email"
                name="contactEmail"
                size="small"
                value={event.contactEmail}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />

              <TextField
                label="Contact Number"
                name="contactNumber"
                size="small"
                value={event.contactNumber}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />
            </Box>

            <Box className="form-row">
              <TextField
                type="number"
                label="Max Participants"
                name="maxParticipants"
                size="small"
                value={event.maxParticipants}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />

              <TextField
                type="number"
                label="Registration Fee (₹)"
                name="registrationFee"
                size="small"
                value={event.registrationFee}
                onChange={handleChange}
                fullWidth
                className="form-control"
              />
            </Box>
            <Box className="drawer-footer">
              <CustomButton
                size="small"
                color="primary"
                onClick={clearState}
                type="submit"
                text={"Cancel"}
              />
              <CustomButton
                size="small"
                onClick={registerOrUpdateById}
                color="secondary"
                type="submit"
                text={"Register"}
              />
            </Box>
          </Box>
        </Box>
      </Drawer>
    );
  },
);

export default CreateEventForm;
