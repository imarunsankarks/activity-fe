import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>
        Username
      </label>
      <input
        type="email"
        placeholder="Username"
        onChange={(e) => {
          setEmail(e.target.value);
        }} value={email}
      />
      <label>
        Password
      </label>
      <input type="text" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);
        }} value={password} />
      <button>Login</button>
    </form>
  );
};

export default Login;
