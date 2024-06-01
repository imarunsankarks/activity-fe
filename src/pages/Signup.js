import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useSignup()

  const handleSubmit = async (e) => {
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
      <div className="to-login">
        <p>Already have account?</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </form>
  );
};

export default Signup;
