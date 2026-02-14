import Card from "./components/card";
import "../../styles/Dashbord/dashbord.css";
import calendericon from "../../assets/calender-icon.svg";
import AlleventsCards from "./components/AllEventsCard";
import { useRef, useState, useEffect, useMemo } from "react";

const Dashbord = () => {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   console.log("Runs every render");
  // }, [{ a: 1 }]);
  const fetchData = () => {
    setCount(count + 1);
  };

  // console.log("render");

  // useEffect(() => {
  //   console.log("effect");
  //   fetchData();
  // }, [fetchData]);
  console.log("effect");
  const obj = useMemo(() => ({ a: 1 }), []);
  useEffect(() => {
    fetchData();
  }, [obj]);
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

      <div className="card-event-container">
        {eventsData.map((val) => {
          return (
            <AlleventsCards
              key={val.title}
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

function BugExample() {
  const [toggle, setToggle] = useState(true);
  const [num, setNum] = useState(0);
  const [name, setName] = useState("Mukilan");
  const [age, setAge] = useState("23");
  const refvalue = useRef(0);

  function handleClick() {
    refvalue.current += 1;
  }

  return toggle ? (
    <>
      <h3>Name: {name}</h3>
      <h3>render ref: {refvalue.current}</h3>
      <h3>render num: {num}</h3>
      <button onClick={() => setName("Arun")}>Change Name</button>
      <button onClick={() => setToggle(false)}>Toggle</button>
      <button onClick={() => setNum((prev) => prev + 1)}>state add</button>
      <button onClick={handleClick}>ref add</button>
    </>
  ) : (
    <>
      <h3>Age: {age}</h3>
      <button onClick={() => setAge("30")}>Change Age</button>
      <button onClick={() => setToggle(true)}>Toggle</button>
    </>
  );
}

function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((prev) => prev + 1);
          setNumber((prev) => prev + 1);
          setNumber((prev) => prev + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
