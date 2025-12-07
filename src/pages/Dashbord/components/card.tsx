import "../../../styles/Card/card.css";
interface CardProps {
  icon: string;
  title?: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  return (
    <article className="card-container">
      <figure className="card-img">
        <img
          src={icon}
          alt="Card preview"
          className="w-full h-full object-cover rounded-md"
        />
      </figure>

      <section className="card-section">
        <h2 className="card-sec-text1">{title || "--"}</h2>
        <p className="card-sec-text2">{description || "--"}</p>
      </section>
    </article>
  );
};

export default Card;
