import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Check if username is in local storage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userName ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/home" element={userName ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
