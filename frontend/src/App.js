import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';

import AllGroup from './pages/AllGroup';
import Login from './pages/Login';
import NewGroup from './pages/NewGroup';
import Signup from './pages/Signup';
import ViewGroup from './pages/ViewGroup';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import AskEmail from './pages/AskEmail';

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
    else {
      navigate("/login");
    }
  }, [cookies.user]);

  async function login(user = null) {
    setUser(user);
    setCookie('user', user);
  }

  async function logout() {
    setUser(null);
    removeCookie('user');
    navigate("/login");
  }

  return (
    <div className="App">
      <div>
        <NavBar user={user} login={login} logout={logout} />
        <Routes>
          <Route path="/" element={<Profile user={user} login={login} logout={logout} />} />
          <Route path="/all-group" element={<AllGroup user={user} login={login} logout={logout} />} />
          <Route path="/group/:groupId" element={<ViewGroup user={user} login={login} logout={logout} />} />
          <Route path="/new-group" element={<NewGroup user={user} login={login} logout={logout} />} />
          <Route path="/login" element={<Login user={user} login={login} logout={logout} />} />
          <Route path="/signup" element={<Signup user={user} login={login} logout={logout} />} />
          <Route path="/reset-password" element={<ResetPassword user={user} logout={logout} />} />
          <Route path="/ask-email" element={<AskEmail user={user} logout={logout} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
