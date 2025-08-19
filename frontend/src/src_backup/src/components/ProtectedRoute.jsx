import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = !!localStorage.getItem("token"); // Simple check, replace with context/auth
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
