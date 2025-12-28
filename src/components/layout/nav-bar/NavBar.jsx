import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../../../context/AuthContext.jsx";

const NavBar = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <nav>
        <ul>
          <li>Loading...</li>
        </ul>
      </nav>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Помилка виходу:", error);
      alert("Не вдалося вийти. Спробуйте ще раз.");
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/category"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            CATEGORY
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            BLOG
          </NavLink>
        </li>
        {currentUser && (
          <li>
            <NavLink
              to="/my-recipes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              MY RECIPES
            </NavLink>
          </li>
        )}
        {currentUser ? (
          <>
            <li className="nav-logout-item">
              <button onClick={handleLogout} className="nav-button-out">
                LOG OUT
              </button>
            </li>
            <li>
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "Профіль"}
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-placeholder">
                  {currentUser.email.charAt(0).toUpperCase()}
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                LOG IN
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                SIGN UP
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;