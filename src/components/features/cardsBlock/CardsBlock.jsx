import { React, useState } from "react";
import Card from "../../cards/CardTemplate";
import "./CardsBlock.css";

const CardsBlock = ({ title, cards }) => {
  // const [isCreating, setIsCreating] = useState(false);
  const [openCard, setOpenedCard] = useState(null);

  // const handleSave = (updatedRecipe) => {
  //   console.log("New data:", updatedRecipe);
  //   setIsEditing(false);
  // };

  return (
    <section className="cards-block">
      <div className="text-container">
        <h3>{title}</h3>
        <hr />
      </div>
      <div className="category-cards">
        {cards.map((card, index) => (
          <Card
            key={index}
            data={card}
            isOpen={openCard === index}
            onOpen={() => setOpenedCard(index)}
            onClose={() => setOpenedCard(null)}
          />
        ))}
        <div className="add-new-card">
          {/* {isCreating ? (
            TODO:
            <RecipeForm
              onSubmit={handleSave}
              onCancel={() => setIsCreating(false)}
              initialData={{}}
            />
          ) : ( */}
            <button>+</button>
           {/* )} */}
        </div>
      </div>
    </section>
  );
};

export default CardsBlock;
