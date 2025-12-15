import { React, useState } from "react";
import Card from "../../cards/CardTemplate";
import "./CardsBlock.css";

const CardsBlock = ({ title, cards, allowCreation=false }) => {
  const [openCard, setOpenedCard] = useState(null);

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
            cardIndex={index}
            isOpen={openCard === index}
            onOpen={() => setOpenedCard(index)}
            onClose={() => setOpenedCard(null)}
          />
        ))}
        {allowCreation && (
        <div className="add-new-card">
            <button>+</button>
        </div>
        )}
      </div>
    </section>
  );
};

export default CardsBlock;
