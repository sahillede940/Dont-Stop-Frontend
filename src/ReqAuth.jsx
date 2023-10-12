import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";

const RequireAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
