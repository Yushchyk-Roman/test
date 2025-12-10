import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateCard.css";
const CreateCard = ({handleClick}) => {
  return (
    <div className="create-new-card" onClick={handleClick}>
       <button className="new-card-button">+</button>
    </div>
  );
};

export default CreateCard;