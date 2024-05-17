import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const {login, loading, error} = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(userid, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>
        Username
      </label>
      <input
        type="userid"
        placeholder="Username"
        onChange={(e) => {
          setUserid(e.target.value);
        }} value={userid}
      />
      <label>
        Password
      </label>
      <input type="text" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);
        }} value={password} />
      <button disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
