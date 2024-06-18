import Navbar from "../components/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

const User = () => {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

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
      dispatch({ type: "UPDATE_PROFILE_PHOTO", payload: data.profilePhoto });
      const updatedUser = { ...user, profilePhoto: data.profilePhoto };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () =>{
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/api/user/` + user.user_id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      const json = await response.json();
      console.log(json.error);
    } else {
      console.log("User deleted!");
      logout();
    }

  }

  const showDelete = ()=>{
    setIsDeleteVisible(!isDeleteVisible);
  }

  return (
    <>
      <Navbar />
      <div className="user">
        {user && (
          <>
            <div className="profile-pic">
              <img src={user.profilePhoto || "/user.png"} alt="Profile" />
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
                <button onClick={handleClick}>Logout</button>
                <button onClick={showDelete}>Delete</button>
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
      <div className={`user-delete-confirm ${isDeleteVisible ? 'show' : ''}`}>
        <p>Are you sure to delete your account?</p>
        <button className="yes" onClick={handleDelete}>Yes</button>
        <button onClick={showDelete}>No</button>
      </div>
    </>
  );
};

export default User;
