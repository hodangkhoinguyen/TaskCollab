import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['tutor-schedule']);
  const navigate = useNavigate();

  useEffect(() => {
    const currUser = cookies.user;
    if (currUser) {
      setUser(currUser);
    }
  }, [cookies.user]);

  async function login(user = null) {
    setUser(user);
    setCookie('user', user);
  }

  async function logout() {
    setUser(null);
    removeCookie('user');
    navigate("/");
  }

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Home user={user} login={login} logout={logout} />} />
          <Route path="/login" element={<Login user={user} login={login} logout={logout} />} />
          <Route path="/signup" element={<Signup user={user} login={login} logout={logout} />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
