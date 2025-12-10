import React from "react";
import NavBar from "../../components/layout/nav-bar/NavBar.jsx";
import Footer from "../../components/layout/footer/Footer.jsx";
import Aside from "../../components/sidebars/RecipeSideBar.jsx";
import UserCards from "../../components/ui/userCards/UserCards.jsx";
import "./Recipes.css";
const Recipe = () => {
  return (
    <>
      <NavBar />
      <section className="main-user-page-information">
        <Aside />
        <UserCards />
      </section>
      <Footer />
    </>
  );
};

export default Recipe;
