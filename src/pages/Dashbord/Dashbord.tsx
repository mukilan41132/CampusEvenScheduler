import Card from "./components/card";
import "../../styles/Dashbord/dashbord.css";
import calendericon from "../../assets/calender-icon.svg";
import AlleventsCards from "./components/AllEventsCard";
const Dashbord = () => {
  const events = [
    {
      name: "Upcoming Events",
      count: "345",
      img: calendericon,
    },
    {
      name: "Ongoing Events",
      count: "112",
      img: calendericon,
    },
    {
      name: "Completed Events",
      count: "980",
      img: calendericon,
    },
  ];
  const eventsData = [
    {
      title: "Event 1",
      name: "Organizer 1",
      date: "21 Jan 2025",
      cost: "₹100",
    },
    {
      title: "Event 2",
      name: "Organizer 2",
      date: "22 Jan 2025",
      cost: "₹200",
    },
    {
      title: "Event 3",
      name: "Organizer 3",
      date: "23 Jan 2025",
      cost: "₹300",
    },
    {
      title: "Event 4",
      name: "Organizer 4",
      date: "24 Jan 2025",
      cost: "₹400",
    },
    {
      title: "Event 5",
      name: "Organizer 5",
      date: "25 Jan 2025",
      cost: "₹500",
    },
    {
      title: "Event 6",
      name: "Organizer 6",
      date: "26 Jan 2025",
      cost: "₹600",
    },
    {
      title: "Event 7",
      name: "Organizer 7",
      date: "27 Jan 2025",
      cost: "₹700",
    },
    {
      title: "Event 8",
      name: "Organizer 8",
      date: "28 Jan 2025",
      cost: "₹800",
    },
    {
      title: "Event 9",
      name: "Organizer 9",
      date: "29 Jan 2025",
      cost: "₹900",
    },
    {
      title: "Event 10",
      name: "Organizer 10",
      date: "30 Jan 2025",
      cost: "₹1000",
    },
  ];

  return (
    <>
      <div className="container-card">
        {events.map((val, index: number) => {
          return (
            <Card
              key={index}
              icon={val.img}
              title={val.name}
              description={val.count}
            />
          );
        })}
      </div>
      <div className="card-event-container">
        {eventsData.map((val, index: number) => {
          return (
            <AlleventsCards
              key={index}
              title={val.title}
              name={val.name}
              date={val.date}
              cost={val.cost}
            />
          );
        })}
      </div>
    </>
  );
};

export default Dashbord;
