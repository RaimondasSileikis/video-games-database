import axios from "axios";

export default function Logout() {

  axios.defaults.withCredentials = true;

  const logout = () => {
    axios.get('http://localhost:3001/logout', )
      .then(res => {
        console.log(res);
        window.location.replace('/login');
    });
  };
    return logout();
}