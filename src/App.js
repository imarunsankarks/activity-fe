import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Add from "./pages/Add";
import QueryForm from "./pages/Gpt";
import User from "./pages/User";

function App() {
  const { user } = useAuthContext();

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
              element={<Add />}
            />
            <Route
              path="/ask"
              element={<QueryForm />}
            />
            <Route
              path="/user"
              element={<User />}
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
