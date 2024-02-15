import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Campaigns from './components/Campaigns';
import Register from './components/Register';
import FundraisingList from './components/FundraisingList';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />  {/* Use Navbar here instead of Sidebar */}
        <div className="flex-1 overflow-y-auto">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <Routes>
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/campaigns" element={isLoggedIn ? <Campaigns /> : <Navigate to="/login" />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/fundraising" element={<FundraisingList />} />
                  <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;