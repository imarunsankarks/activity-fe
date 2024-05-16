import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const {signup, loading, error} = useSignup()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(userid, password);
    await signup(userid, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>
        Username
      </label>
      <input
        type="userid"
        placeholder="Username"
        onChange={(e) => {
          setUserid(e.target.value);
        }}
      />
      <label>
        Password
      </label>
      <input type="text" placeholder="Password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
      <button disabled={loading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
