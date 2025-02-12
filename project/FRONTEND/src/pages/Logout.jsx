import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to main page
    navigate("/");
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
