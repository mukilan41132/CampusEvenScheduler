import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { loginAuth, type login } from "../../slices/auth/thunk";
import { validateEmail, validatePassword } from "../../Validation/basic";
import ErrorMessage from "../../Error/ErrorMessage";
import "../../styles/Auth/auth.css";

const Authindex = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const Authdata = useSelector((state: any) => state.authlogin);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!Authdata) return;
   navigate("/dashboard", { replace: true });
    // if (Authdata?.auth?.token) {
    //   sessionStorage.setItem("token", Authdata.auth.token);
   
    // } else {
    //   navigate("/", { replace: true });
    // }
  }, [  navigate]);

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        onSubmit={async (values) => {
          setLoading(true)
          setError("");

          try {
            const auth: login = {
              username: values.email,
              password: values.password,
            };

            await dispatch(loginAuth(auth)).unwrap();

            navigate("/dashboard");
          } catch (err: any) {
            setError(err || "Invalid email or password");

          } finally {
            setLoading(false)
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
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
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
