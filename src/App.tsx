import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authindex from "./pages/Auth/Authindex";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/MainLayout/MainLayout";
import { routesConfig } from "./routes/routes";



const AppRoutes: React.FC = () => {
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
