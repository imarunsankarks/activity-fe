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
      <h1><span>Hi, </span>Buddy</h1>
      <p>Let's start tracking your expenses</p>
      <h5>Are you new here?</h5>
      
      <input
        type="userid"
        placeholder="userid"
        onChange={(e) => {
          setUserid(e.target.value);
        }}
      />
      <input type="text" placeholder="password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
      <button disabled={loading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
