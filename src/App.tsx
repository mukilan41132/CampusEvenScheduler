import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authindex from "./pages/Auth/Authindex";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { routesConfig } from "./routes/routes";
import { ThemeContext } from "./context/theme";
import Error404Wrapper from "./Error/404Error";
import { useSelector } from "react-redux";

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
              <MainLayout role={Authdata?.auth?.role}>
                <ProtectedRoute>{element}</ProtectedRoute>
              </MainLayout>
            }
          />
        ))}

        <Route path="*" element={<Error404Wrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
