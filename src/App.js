import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Campaigns from './components/Campaigns';
import Register from './components/Register';
import FundraisingList from './components/FundraisingList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setIsAdmin(user.isAdmin); 
  };

  return (
    <Router>
      <div className="flex">
        <div className="bg-gray-800 text-white py-4 w-64">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            {isLoggedIn && <Link to="/campaigns" className="hover:text-blue-400">Campaigns</Link>}
            <Link to="/register" className="hover:text-blue-400">Register</Link>
            {isAdmin && <Link to="/fundraising" className="hover:text-blue-400">Fundraising</Link>}
          </div>
        </div>
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/campaigns" element={isLoggedIn ? <Campaigns /> : <Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fundraising" element={isAdmin ? <FundraisingList /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
