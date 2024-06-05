import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Add from "./pages/Add";
import QueryForm from "./pages/Gpt";

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

            <Route path="/add" element={user ?<Add />: <Navigate to="/login" />} />
            <Route path="/ask" element={user ? <QueryForm />: <Navigate to="/login" />} />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
