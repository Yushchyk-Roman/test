import React, { useState, useEffect } from "react";
import bg_photo from "/assets/images/bg-photo.jpg";
import waiter from "/assets/images/portrait-waiter.jpg";
import bg_section from "/assets/images/bg-section.jpg";
import dish_example from "/assets/images/dish-example.jpg";
import spagetti from "/assets/images/spagetti.jpg";
import strawberries from "/assets/images/strawberries.jpg";
import veg_mix from "/assets/images/veg-mix.jpg";
import tomato_soup from "/assets/images/tomato-soup.jpg";

import recipes from "../../data/cards.json";


import "./Home.css";
import Footer from "../../components/layout/footer/Footer.jsx";
import NavBar from "../../components/layout/nav-bar/NavBar.jsx";
import Card from "../../components/cards/CardTemplate";
 const Home = () => {
  const [openCard, setOpenedCard] = useState(null);
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
        <h2>Top Recipes</h2>
        <div className="cards">
          {recipes.map((recipe, index) => (
            <Card
            key={index}
            data={recipe}
            
            isOpen={openCard === index}
            onOpen={() => setOpenedCard(index)}
            onClose={() => setOpenedCard(null)}
          />
          ))}
        </div>
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
}
export default Home;
