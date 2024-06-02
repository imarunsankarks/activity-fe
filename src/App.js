import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Add from "./pages/Add";
import React, { useEffect, useState } from 'react';

function App() {
  const { user } = useAuthContext();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <button onClick={handleAddToHomeScreen} className="add-button">
          Add to Home Screen
        </button>
        <div className="pages">
          <Routes>
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/add"
              element={<Add />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
