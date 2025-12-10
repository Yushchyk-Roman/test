import { React, useState } from "react";
import "./GridCard.css";

const GridCard = (data, isOpen, onOpen, onClose) => {
  const {
    title,
    imageUrl,
    stars,
    seen,
    likes,
    comments,
    instructions,
    ingredients,
    author,
    time_of_cooking,
  } = data;
  
  return (
    <>
      <div className={isOpen ? "open" : ""}>
        <div className={"grid-card"} onClick={onOpen}>
          <div className="img-container">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="card-content">
            <p className="time">{time_of_cooking} min</p>
            <h5>{title}</h5>

            <p className="about-author">
              <span>Author: </span> {author}
            </p>

            <div className="card-meta">
              <ul className="card-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star}>
                    <i
                      className={`fa-solid fa-star ${
                        star <= stars ? "active" : ""
                      }`}
                      style={{ color: star <= stars ? "#e5a329" : "#ccc" }}
                    ></i>
                  </li>
                ))}
              </ul>

              <ul className="stats">
                <li>
                  <i className="fa-solid fa-eye"></i> {seen}
                </li>
                <li>
                  <i className="fa-solid fa-thumbs-up"></i> {likes}
                </li>
                <li>
                  <i className="fa-solid fa-comment"></i> {comments.length}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridCard;
