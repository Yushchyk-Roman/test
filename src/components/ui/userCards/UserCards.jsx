import { React, use, useState } from "react";
import "./UserCards.css";
import Card from "../../cards/CardTemplate.jsx";
import cards from "../../../data/cards.json";
import NewCard from "../../features/createCard/CreateCard.jsx";
import Form from "../../form/RecipeForm.jsx";
import { Link } from "react-router-dom";

const UserCards = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCard, setOpenedCard] = useState(null);

  const handleSave = (formData) => {
    console.log("Form Data:", formData);
    setIsModalOpen(false);
  };

  return (
    <main className="recipe-template-main-content">
      <section className="user-cards-header">
        <h2>Recipes</h2>
        <div className="add-new-recipe">
          <button
            className="add-recipe-btn"
            aria-label="Add New Recipe"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          {isModalOpen && (
            <Form
              onSubmit={handleSave}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </div>
        <div className="toggle-template">
          <i
            className={`fa-solid fa-braille ${
              viewMode == "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          ></i>
          <i
            className={`fa-solid fa-list ${viewMode == "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          ></i>
        </div>
      </section>

      <div className="user-cards-container">
        {/* Умовний рендер */}
        {cards.map((card, index) => (
          <Card
            key={index}
            data={card}
            isAdmin={true}
            isOpen={openCard === index}
            onOpen={() => setOpenedCard(index)}
            onClose={() => setOpenedCard(null)}
            viewMode={viewMode}
          />
        ))}
        <NewCard handleClick={() => setIsModalOpen(true)} />
      </div>
    </main>
  );
};

export default UserCards;
