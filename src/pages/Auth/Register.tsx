import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
// import { registerAuth, type register } from "../../slices/auth/thunk";
import { validateEmail, validatePassword } from "../../Validation/basic";
import ErrorMessage from "../../Error/ErrorMessage";
 
import "../../styles/Auth/Register.css";
interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const required = (label: string) => (value: string) =>
  value && value.trim() ? undefined : `Enter your ${label}`;

/** unwrap() throws either your rejectWithValue payload or a SerializedError object. */
const toMessage = (err: unknown, fallback: string): string => {
  if (typeof err === "string") return err || fallback;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message?: unknown }).message) || fallback;
  }
  return fallback;
};

const Registerindex = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const Authdata = useSelector((state: any) => state.authlogin);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    const token = Authdata?.auth?.token;
    if (!token) return;

    sessionStorage.setItem("token", token);
    navigate("/dashboard", { replace: true });
  }, [Authdata, navigate]);

  return (
    <div className="login-container">
      <Formik<RegisterValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        }}
        // confirmPassword needs the other field, so it can't be a field-level validator
        validate={(values) => {
          const errors: Partial<Record<keyof RegisterValues, string>> = {};

          if (!values.confirmPassword) {
            errors.confirmPassword = "Repeat your password";
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords don't match";
          }

          if (!values.acceptTerms) {
            errors.acceptTerms = "Accept the terms to continue";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");

          //   try {
          //     const auth: register = {
          //       username: values.email,
          //       firstName: values.firstName,
          //       lastName: values.lastName,
          //       password: values.password,
          //     };

          //     await dispatch(registerAuth(auth)).unwrap();
          //     // navigation happens in the effect above, once the token lands
          //   } catch (err) {
          //     setError(toMessage(err, "Couldn't create the account. Try again."));
          //     setSubmitting(false);
          //   }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="register-form" noValidate>
            <h2>Create your account</h2>

            <ErrorMessage message={error} />

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="firstName">First name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  validate={required("first name")}
                />
                {touched.firstName && errors.firstName && (
                  <ErrorMessage message={errors.firstName} />
                )}
              </div>

              <div className="form-field">
                <label htmlFor="lastName">Last name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  validate={required("last name")}
                />
                {touched.lastName && errors.lastName && (
                  <ErrorMessage message={errors.lastName} />
                )}
              </div>
            </div>

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              validate={validateEmail}
            />
            {touched.email && errors.email && (
              <ErrorMessage message={errors.email} />
            )}

            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <Field
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                validate={validatePassword}
              />

              <button
                type="button"
                className="toggle-eye"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.password && errors.password && (
              <ErrorMessage message={errors.password} />
            )}

            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="password-wrapper">
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="toggle-eye"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword} />
            )}

            <label className="checkbox-row" htmlFor="acceptTerms">
              <Field id="acceptTerms" name="acceptTerms" type="checkbox" />
              <span>
                I agree to the <a href="/terms">terms</a> and{" "}
                <a href="/privacy">privacy policy</a>
              </span>
            </label>
            {touched.acceptTerms && errors.acceptTerms && (
              <ErrorMessage message={errors.acceptTerms} />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

            <p className="divider">or continue with</p>

            <div className="social-buttons">
              <button type="button">Google</button>
              <button type="button">GitHub</button>
              <button type="button">Facebook</button>
            </div>

            <p className="register">
              I already have an account? <a href="/auth/login">Sign in</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registerindex;
