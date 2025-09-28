import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authindex from "./pages/Auth/Authindex";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashbord from "./pages/Dashbord/DashBord";

 

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/auth" element={<Authindex />} />

       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashbord/>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Authindex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
