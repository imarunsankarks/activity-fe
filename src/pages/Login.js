import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userid, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>
        <span>Hi, </span>Buddy
      </h1>
      <p>C'mon, let's see your expenses</p>

      <input
        type="userid"
        placeholder="userid"
        onChange={(e) => {
          setUserid(e.target.value);
        }}
        value={userid}
      />

      <input
        type="text"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
      <div className="to-signup">
        <p>Are you new here?</p>
        <Link to="/signup">
          <button>SignUp</button>
        </Link>
      </div>
    </form>
  );
};

export default Login;
