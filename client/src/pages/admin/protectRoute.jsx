import { Outlet, Navigate } from "react-router-dom";
import { IS_LEXI_USER_LOGGED_IN } from "../../constants/constants";

export const ProtectAdminRoutes = () => {
  const isAdminLoggedIn = localStorage.getItem("lexi-admin-loggedin") || null;
  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export const ProtectUserRoutes = () => {
  const isUserLoggedIn = localStorage.getItem(IS_LEXI_USER_LOGGED_IN) || false;
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

