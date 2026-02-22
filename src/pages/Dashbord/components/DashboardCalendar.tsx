import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Tech Fest",
    start: new Date(2026, 0, 21, 10, 0),
    end: new Date(2026, 0, 21, 12, 0),
  },
  {
    title: "Workshop",
    start: new Date(2026, 0, 22, 9, 0),
    end: new Date(2026, 0, 22, 11, 0),
  },
  {
    title: "Cultural Event",
    start: new Date(2026, 0, 25, 14, 0),
    end: new Date(2026, 0, 25, 17, 0),
  },
];
const formattedEvents = events.map((event) => ({
  title: event.title,
  start: event.start,
  end: event.end,
}));
const DashboardCalendar = () => {
  const [date, setDate] = useState(new Date(2026, 0, 1));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
      />
    </div>
  );
};
export default DashboardCalendar;
