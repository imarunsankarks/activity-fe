import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userid, password);
  };

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
      <div className="password-field">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <p className="eye-toggle" onClick={handleToggleVisibility}>
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </p>
      </div>
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
