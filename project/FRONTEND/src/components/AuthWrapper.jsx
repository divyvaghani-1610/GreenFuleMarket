import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  // Check if the user is logged in (Replace with actual authentication logic)
  const isAuthenticated = localStorage.getItem("token"); // Example using localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthWrapper;
