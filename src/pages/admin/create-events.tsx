import React, { useState } from "react";
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";
import "../../styles/createEvent/create-event.css";
import CustomButton from "../../components/Button/CustomButton";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
const eventTypes = ["Technical", "Cultural", "Sports", "Workshop", "Seminar"];
interface CreateEventProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}
const CreateEventForm: React.FC<CreateEventProps> = ({
  visible,
  setVisible,
}) => {
  const [event, setEvent] = useState({
    eventName: "",
    eventType: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    department: "",
    organizerName: "",
    contactEmail: "",
    contactNumber: "",
    maxParticipants: "",
    registrationFee: "",
    status: "Upcoming",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Event Created:", event);
    alert("Event created successfully!");
  };
  const footerContent = (
    <div className="footer-btn">
      <CustomButton
        size="small"
        color="primary"
        onClick={() => handleSubmit()}
        type="submit"
        text={"Cancel"}
      />
      <CustomButton
        size="small"
        onClick={() => handleSubmit()}
        color="secondary"
        type="submit"
        text={"Register"}
      />
    </div>
  );
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
      <span className="font-bold white-space-nowrap">
        Create New College Event
      </span>
    </div>
  );
  return (
    <Dialog
      header={headerElement}
      footer={footerContent}
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      style={{ width: "50vw", maxHeight: "80vh", overflowY: "auto" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}>
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
            className="form-control">
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
            size="small"
            name="startTime"
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
      </Box>
    </Dialog>
  );
};
export default CreateEventForm;
