import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navber = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <button className="logo">
            <img src="/exp.png" alt="" />
          </button>
        </Link>
        <nav>
          {user ? (
            <div className="">
              <Link to="/add">
                <button>
                  <img src="/Add.png" alt="" />
                </button>
              </Link>
              <button onClick={handleClick}>
                <img src="/logout.png" alt="" />
              </button>
            </div>
          ) : (
            <div className="">
              <Link to="/login">
                <button>
                  <img src="/login.png" alt="" />
                </button>
              </Link>
              <Link to="/signup">
                <button>
                  <img src="/signup.png" alt="" />
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navber;
