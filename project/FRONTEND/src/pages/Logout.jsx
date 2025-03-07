import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate('/login');
  }, [setIsAuthenticated, navigate]);

  return null;
};

export default Logout;