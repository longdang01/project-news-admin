import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("id_token");
  if (token) return children;
  return <Navigate to="/login"></Navigate>;
};

export default AuthGuard;
