import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signup, loading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(userid, password);
  };

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>
        <span>Hi, </span>Buddy
      </h1>
      <p>Let's start tracking your expenses</p>
      <h5>Are you new here?</h5>

      <input
        type="userid"
        placeholder="userid"
        onChange={(e) => {
          setUserid(e.target.value);
        }}
      />
      <div className="password-field">
        <input
          type={isPasswordVisible?  "text" : "password"}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="eye-toggle" onClick={handleToggleVisibility}>
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </p>
      </div>
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
