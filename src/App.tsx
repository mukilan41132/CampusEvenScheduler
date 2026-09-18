import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authindex from "./pages/Auth/Authindex";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { publicRoutes, routesConfig } from "./routes/routes";
import { ThemeContext } from "./context/theme";
import Error404Wrapper from "./Error/404Error";
import { useSelector } from "react-redux";
import Dashbord from "./pages/Dashbord/Dashbord";

const AppRoutes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const Authdata = useSelector((state: any) => state.authlogin);
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
  console.log("Authdata", Authdata?.auth?.role);
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  useEffect(() => {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;

    if (theme === "dark") {
      themeLink.href = "/themes/lara-dark-blue/theme.css";
    } else {
      themeLink.href = "/themes/lara-light-blue/theme.css";
    }
  }, [theme]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authindex />} />

        {routesConfig.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <MainLayout role={Authdata?.auth?.role}>{element}</MainLayout>
              </ProtectedRoute>
            }
          />
        ))}

        <Route path="*" element={<Error404Wrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
