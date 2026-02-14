import { useEffect, useState } from "react";
import "../../styles/Auth/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth, type login } from "../../slices/auth/thunk";

const Authindex = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const Authdata = useSelector((state: any) => state.authlogin);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== "" && email !== "") {
        const auth:login = {
          username: email,
          password: password,
        };
        dispatch(loginAuth(auth));
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!Authdata) return;

    if (Authdata?.auth?.token) {
      sessionStorage.setItem("token", Authdata.auth.token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [Authdata?.auth?.token, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sign In</h2>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Sign In</button>

        <p className="divider">or continue with</p>

        <div className="social-buttons">
          <button type="button">Google</button>
          <button type="button">GitHub</button>
          <button type="button">Facebook</button>
        </div>

        <p className="register">
          I don't have an account?{" "}
          <a href="/auth/register">Register for free</a>
        </p>
      </form>
    </div>
  );
};

export default Authindex;
