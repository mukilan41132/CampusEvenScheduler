import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import error404Img from "../../assets/404_Img.svg";
import "../../styles/Error/404Error.css";

interface Error404WrapperProps {
  children?: ReactNode;
}

const Error404Wrapper = ({ children }: Error404WrapperProps) => {
  const navigate = useNavigate();

  if (children) {
    return <>{children}</>;
  }

  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <img
        src={error404Img}
        alt="Error 404"
        style={{ maxWidth: "400px", width: "100%" }}
      />
      <h2>Page Not Found</h2>
      <button onClick={() => navigate("/dashboard")} className="btn_goBack">
        Go back to where you came from.
      </button>
    </div>
  );
};

export default Error404Wrapper;
