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
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Navber;
