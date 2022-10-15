import axios from "axios";
import { useEffect } from "react";
import { Navigate, } from "react-router-dom";


function Logout() {


  // const navigate = useNavigate();
  const logoutButton = () => {
    axios.get('http://localhost:3001/logout', )
      .then(response => {
    });
  };


    useEffect(() => logoutButton(), []);
    return (
      <Navigate to="/login" replace />
    )
  }

export default Logout;