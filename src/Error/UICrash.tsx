import "../../styles/Error/404Error.css";
import Crash from "../assets/404_Img.svg";
const UiCrash = () => {
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <img
        src={Crash}
        alt="Error 404"
        style={{ maxWidth: "400px", width: "100%" }}
      />
      <h2>Your UI is Crashed</h2>
      <button className="btn_goBack">Go back to where you came from.</button>
    </div>
  );
};

export default UiCrash;
