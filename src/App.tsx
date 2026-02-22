import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authindex from "./pages/Auth/Authindex";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { routesConfig } from "./routes/routes";
import { ThemeContext } from "./context/theme";

const AppRoutes: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
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
        <Route path="/auth" element={<Authindex />} />

        {routesConfig.map(({ path, element, role }) => (
          <Route
            key={path}
            path={path}
            element={
              <MainLayout>
                <ProtectedRoute>{element}</ProtectedRoute>
              </MainLayout>
            }
          />
        ))}

        <Route path="*" element={<Authindex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
