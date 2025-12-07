import eventimg from "../../../assets/event-1.jpg";
import "../../../styles/Card/AllEventsCard.css";
import calendericon from "../../../assets/calender-icon.svg";
type EventCardProps = {
  title: string;
  name: string;
  date: string;
  cost: string;
};

const AlleventsCards: React.FC<EventCardProps> = ({
  title,
  name,
  date,
  cost,
}) => {
  return (
    <>
      <div className="card-inner-event-container">
        <img src={eventimg} alt="Card preview" className="event-img" />

        <div className="section-cardinfo">
          <h4 id="cart-font1">{title}</h4>
          <p id="cart-font2">{name}</p>
          <div className="card-footer-sec">
            <figure className="small-card-img">
              <img
                src={calendericon}
                alt="Card preview"
                className="event-img"
              />
            </figure>
            <span className="inner-span">{date}</span>
            <span className="inner-span margin">{cost}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlleventsCards;
