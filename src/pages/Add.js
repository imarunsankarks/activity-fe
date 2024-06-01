import ActivityForm from "../components/ActivityForm";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";

const Add = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <div className="add-item">
        {user && (
          <div className="add-title">
            <h1>
              <span>Hi, </span>
              {user.userid.split("@")[0]}
            </h1>
            <p>See what you have<br></br> spend...</p>
          </div>
        )}
        {!user && (
          <div className="add-title">
            <h1>
              <span>Hi, </span>Buddy
            </h1>
            <p>Please login</p>
          </div>
        )}
        <ActivityForm />
      </div>
    </>
  );
};

export default Add;
