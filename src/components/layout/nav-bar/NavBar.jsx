import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
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
        <li>
          <NavLink 
            to="/my-recipes" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            MY RECIPES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
