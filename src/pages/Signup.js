import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>
        Username
      </label>
      <input
        type="email"
        placeholder="Username"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>
        Password
      </label>
      <input type="text" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
      <button>Signup</button>
    </form>
  );
};

export default Signup;
