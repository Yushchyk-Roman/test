import React, { useState, useEffect } from "react";
import bg_photo from "../../../public/assets/images/bg-photo.jpg";
import waiter from "../../../public/assets/images/portrait-waiter.jpg";
import bg_section from "../../../public/assets/images/bg-section.jpg";
import dish_example from "../../../public/assets/images/dish-example.jpg";
import spagetti from "../../../public/assets/images/spagetti.jpg";
import strawberries from "../../../public/assets/images/strawberries.jpg";
import veg_mix from "../../../public/assets/images/veg-mix.jpg";
import tomato_soup from "../../../public/assets/images/tomato-soup.jpg";

import recipes from "../../data/cards.json";
import { getRecipes } from "../../services/recipeService.js";

import "./Home.css";
import Footer from "../../components/layout/footer/Footer.jsx";
import NavBar from "../../components/layout/nav-bar/NavBar.jsx";
import Card from "../../components/cards/CardTemplate.jsx";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openCard, setOpenedCard] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Помилка завантаження рецептів з Firestore:", err);
        setError("Не вдалося завантажити рецепти.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="full-screen-center">
        <p>Завантаження найкращих рецептів...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="full-screen-center error">
        <p>{error} Перевірте підключення до Firebase.</p>
      </div>
    );
  }

  return (
    <>
      <header>
        <img src={bg_photo} alt="bg_photo" />
      </header>
      <NavBar />

      <main className="home-page">
        <div className="left-block">
          <h1 className="fade-in ">
            <span>Recipe here</span> це платформа, де ваші рецепти оживають!
          </h1>

          <ul className="ideas-list fade-in ">
            <li>Створюйте власні рецепти з покроковими інструкціями.</li>
            <li>Діліться смачними ідеями та надихайте інших.</li>
            <li>Оцінюйте та коментуйте рецепти від інших учасників.</li>
          </ul>
        </div>

        <div className="right-block">
          <img src={waiter} alt="waiter" />
        </div>
      </main>

      <div className="section-1">
        <h2>Top 3 Recipes</h2>
        <div className="cards">
          {recipes
            .slice()
            .sort((a, b) => b.stars - a.stars)
            .slice(0, 3)
            .map((recipe) => (
              <Card
                key={recipe.id}
                data={recipe}
                isOpen={openCard === recipe.id}
                onOpen={() => setOpenedCard(recipe.id)}
                onClose={() => setOpenedCard(null)}
              />
            ))}
        </div>
        {recipes.length === 0 && <p>Наразі рецепти відсутні.</p>}
      </div>

      <div className="section-2">
        <img className="bg-photo" src={bg_section} alt="" />

        <div className="side-circles">
          <img className="circle top-left" src={spagetti} alt="" />
          <img className="circle middle-left" src={strawberries} alt="" />
          <img className="circle top-right" src={tomato_soup} alt="" />
          <img className="circle middle-right" src={veg_mix} alt="" />
        </div>

        <div className="main-content">
          <img src={dish_example} alt="" />
          <h2>
            <span>Share</span>&nbsp;your recipe to your friends
          </h2>
          <hr />
        </div>

        <p>
          Cook, share, inspire! Our site is where recipes come to life in a
          community of food lovers. Pass on a delicious idea to friends and
          create culinary masterpieces together!
        </p>
      </div>

      <Footer />
    </>
  );
};
export default Home;
