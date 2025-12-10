import { React, useState } from "react";
import "./RecipeSideBar.css";

const RecipeSideBar = () => {
  const [userName, setUserName] = useState("Author Name");
  const [editProfile, setEditProfile] = useState(false);

  const changePhoto = () => {
    console.log("Change photo");
  };

  const handleSave = (e) => {
    console.log("Save changes: ", e);
    setEditProfile(false);
  };
  return (
    <aside className="recipe-sidebar">
      {editProfile ? (
        <form
          className="edit-user-info"
          action=""
          onClose={() => {
            setEditProfile(false);
          }}
        >
          <img
            src="/assets/images/default-user.png"
            alt="userPhoto"
            className="userProfilePhoto"
            onClick={changePhoto}
          />

          <label htmlFor="user-name">USERNAME</label>
          <input
            type="text"
            required
            value={userName}
            id="userName"
            aria-label="edit name-input"
            onChange={(e)=> setUserName(e.target.value)}
          />

          <button href="#" className="chng-user-pas">
            Change Password
          </button>

          <div className="user-profile-actions">
            <button
              className="save-user-data-changes"
              onClick={() => handleSave(userName)}
            >
              SAVE
            </button>
            <button
              className="cancel-user-data-changes"
              onClick={() => setEditProfile(false)}
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : (
        <>
          {/*  */}
          <section className="center-information">
            <img src="/assets/images/default-user.png" alt="user image" />
            <p>Author Name</p>
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

          <button className="user-log-out">Log out</button>
        </>
      )}
    </aside>
  );
};

export default RecipeSideBar;
