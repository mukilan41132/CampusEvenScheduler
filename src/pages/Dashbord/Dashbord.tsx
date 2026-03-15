import { useState, useEffect, useMemo } from "react";
import calendericon from "../../assets/calender-icon.svg";

import Card from "./components/card";
import "../../styles/Dashbord/dashbord.css";

const Dashbord = () => {
  const events = [
    {
      name: "Total Students",
      count: "345",
      img: calendericon,
    },
    {
      name: "Total Faculty",
      count: "48",
      img: calendericon,
    },
    {
      name: "Total Departments",
      count: "12",
      img: calendericon,
    },
    {
      name: "Active Courses",
      count: "36",
      img: calendericon,
    },
    {
      name: "Ongoing Exams",
      count: "5",
      img: calendericon,
    },

    {
      name: "Fee Collection (This Month)",
      count: "₹4,25,000",
      img: calendericon,
    },
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

  return (
    <>
      <div className="main-container">
        <div className="container-card">
          {events.map((val) => {
            return (
              <Card
                key={val.name}
                icon={val.img}
                title={val.name}
                description={val.count}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashbord;
