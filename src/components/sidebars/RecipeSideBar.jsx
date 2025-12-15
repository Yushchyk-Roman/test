import { React, useState, useEffect } from "react";
import "./RecipeSideBar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const RecipeSideBar = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  const initialName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "Guest";
  const [userName, setUserName] = useState(initialName);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.displayName || currentUser.email.split("@")[0]);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };
  const changePhoto = () => {
  };

  const handleSave = (e) => {
    e.preventDefault(); 
    console.log("Save changes: ", userName);
    setEditProfile(false);
  };

  if (loading || !currentUser) {
    return <aside className="recipe-sidebar">Loading profile...</aside>;
  }

  const getUserPhoto = () => {
    return currentUser.photoURL || "/assets/images/default-user.png";
  };

  return (
    <aside className="recipe-sidebar">
      {editProfile ? (
        <form className="edit-user-info" onSubmit={handleSave}>
          <img
            src={getUserPhoto()}
            alt="userPhoto"
            className="userProfilePhoto"
            onClick={changePhoto}
          />

          <label htmlFor="userName">USERNAME</label>
          <input
            type="text"
            required
            value={userName}
            id="userName"
            aria-label="edit name-input"
            onChange={(e) => setUserName(e.target.value)}
          />

          <button type="button" className="chng-user-pas">
            Change Password
          </button>

          <div className="user-profile-actions">
            <button
              type="submit"
              className="save-user-data-changes"
            >
              SAVE
            </button>
            <button
              type="button"
              className="cancel-user-data-changes"
              onClick={() => setEditProfile(false)}
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : (
        <>
          <section className="center-information">
            <img
              src={getUserPhoto()}
              alt="user image"
            />
            <p>{userName}</p>
            <button
              className="edit-user-profile"
              onClick={() => {
                setEditProfile(true);
              }}
            >
              Edit profile
            </button>
          </section>

          <section className="user-statistics">
            <h2>Statistics</h2>

            <ul className="statistic-list">
              <li>
                Created recipes <span>41</span>
              </li>
              <li>
                Average stars <span>4.7</span>
              </li>
              <li>
                Total views <span>21.4k</span>
              </li>
              <li>
                Total like count <span>12.1k</span>
              </li>
              <li>
                Commented recipes <span>9.3k</span>
              </li>
            </ul>
          </section>

          <button className="user-log-out" onClick={handleLogout}>
            Log out
          </button>
        </>
      )}
    </aside>
  );
};

export default RecipeSideBar;
