import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { loginAuth, type login } from "../../slices/auth/thunk";
import { validateEmail, validatePassword } from "../../Validation/basic";
import ErrorMessage from "../../components/Error/ErrorMessage";
import "../../styles/Auth/auth.css";

const Authindex = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const Authdata = useSelector((state: any) => state.authlogin);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

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
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        onSubmit={(values) => {
          setError("");

          try {
            const auth: login = {
              username: values.email,
              password: values.password,
            };

            dispatch(loginAuth(auth));
            navigate("/dashboard");
          } catch (err: any) {
            setError(err || "Invalid email or password");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="login-form">
            <h2>Sign In</h2>
            <ErrorMessage message={error} />
            <label htmlFor="email">Email</label>
            <Field name="email" validate={validateEmail} />
            {touched.email && errors.email && (
              <ErrorMessage message={errors.email} />
            )}
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <Field
                name="password"
                type={showPassword ? "password" : "text"}
                validate={validatePassword}
              />

              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {touched.password && errors.password && (
              <ErrorMessage message={errors.password} />
            )}
            <button type="submit">{"Sign In"}</button>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Authindex;
