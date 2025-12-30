import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
