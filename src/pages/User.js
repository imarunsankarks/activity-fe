import Navbar from "../components/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
// import { useState } from "react";

const User = () => {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  // const [profilePic, setProfilePic] = useState(null);

  const handleClick = () => {
    logout();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // setProfilePic(base64String);
        handleUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (base64String) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/api/user/updateProfilePhoto`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            profilePhoto: base64String,
            userid: user.userid,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload profile picture");
      }

      const data = await response.json();
      // Update the user context with the new profile photo
      dispatch({ type: "UPDATE_PROFILE_PHOTO", payload: data.profilePhoto });
      // setProfilePic(null);
      // Optionally update the user in localStorage
      const updatedUser = { ...user, profilePhoto: data.profilePhoto };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="user">
        {user && (
          <>
            <div className="profile-pic">
              <img src={user.profilePhoto || "/user.avif"} alt="Profile" />
            </div>
            <div className="pic-button">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="file-upload"
              />
              <img src="/edit_dp.png" alt="" />
              {/* <span>Choose</span> */}
            </div>
            <div className="user-details">
              <div className="add-title">
                <h1>
                  <span>Hi, </span>
                  {user.userid.split("@")[0]}
                </h1>
              </div>
              <div className="logout-sec">
                <p>see you soon!</p>
                <button onClick={handleClick}>Logout</button>
              </div>
            </div>
          </>
        )}
        {!user && (
          <div className="add-title">
            <h1>
              <span>Hi, </span>Buddy
            </h1>
            <p>Please login</p>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
