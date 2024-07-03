import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Add from "./pages/Add";
import QueryForm from "./pages/Gpt";
import User from "./pages/User";

function App() {
  const { user } = useAuthContext();
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault(); 
      window.location.href = '/'
    };

    window.onpopstate = handleBackButton;
    return () => {
      window.onpopstate = null; 
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
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
              element={user ? <Add /> : <Navigate to="/login" />}
            />
            <Route
              path="/ask"
              element={user ? <QueryForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/user"
              element={user ? <User /> : <Navigate to="/login" />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </div>
        <div className="pages-md">
          <div className="container">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
          </div>

          <h1>Please open in your phone.</h1>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
