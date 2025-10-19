import { Navigate } from "react-router-dom";
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = sessionStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
