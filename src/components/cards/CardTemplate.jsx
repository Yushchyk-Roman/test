import React, { useState } from "react";
import "./CardTemplate.css";
import Star from "./StarRating";
import Comments from "./CardComments";
import RecipeForm from "../form/RecipeForm";

const CardTemplate = ({
  data,
  type = "data",
  isAdmin = false,
  isOpen,
  onOpen,
  onClose,
  viewMode = "grid",
}) => {
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

  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [instrictionsOpen, setInstructionOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleSave = () => {
    setSaved((prev) => !prev);
  };

  const toggleIngredients = () => {
    setIngredientsOpen((prev) => !prev);
  };

  const toggleInstructions = () => {
    setInstructionOpen((prev) => !prev);
  };

  const handleSave = (updatedRecipe) => {
    console.log("New data:", updatedRecipe);
    setIsEditing(false);
  };
  if (type === "blog") {
    return (
      <div className="blog-card">
        <img src={data.image} alt={data.title} />
        <span className="category">{data.label}</span>
        <span className="reading-time">{data.readingTime}</span>
        <h5>{data.title}</h5>
        <p>{data.description}</p>
        <div className="blog-meta">
          <span className="author">{data.author}</span>
          <span className="date">{data.date}</span>
        </div>
        <div className="stats">
          <i className="fa-solid fa-eye"></i> {data.views}
          <i className="fa-solid fa-comment"></i> {data.comments}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={isOpen ? "open" : ""}>
        <div className={`card ${viewMode}`} onClick={onOpen}>
          <div className="img-container">
            <img src={imageUrl} alt={title} />
{/* Ідея розділити це на два контейнера і між ними дати jcb */}
          </div>
          <div className="card-content">
            {/* TODO: edit this shit */}

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

        {isOpen &&
          (isEditing ? (
            <RecipeForm
              initialData={data}
              onSubmit={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div className="overlay" onClick={onClose}>
              <div
                className={isEditing ? "card-for-editing" : "card-full"}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-btn" onClick={onClose}>
                  ×
                </button>

                <div className="card-left">
                  <div className="img-container">
                    <img src={imageUrl} alt={title} />
                  </div>
                  <div className="txt">
                    <h4>{title}</h4>
                    <div className="content-actions">
                      <button
                        className="like"
                        aria-label="Add to favorites"
                        onClick={toggleLike}
                      >
                        <i
                          id={liked ? "liked" : ""}
                          className={
                            liked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                          }
                        ></i>
                        <span>{likeCount}</span>
                      </button>

                      <button className="share" aria-label="share recipe">
                        <i className="fa-solid fa-share"></i>
                      </button>

                      <button
                        className="save"
                        aria-label="save recipe"
                        onClick={toggleSave}
                      >
                        <i
                          id={saved ? "saved" : ""}
                          className={
                            saved
                              ? "fa-solid fa-bookmark"
                              : "fa-regular fa-bookmark"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="additional-container">
                    <h6 className="author">Author: {author}</h6>
                    {/* 
                  TODO: EDIT DELETE
                  */}
                    {isAdmin && (
                      <div className="owner-actions">
                        <button
                          className="edit-btn"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    )}
                  </div>

                  <p>
                    <i
                      onClick={toggleIngredients}
                      className={`fa-solid ${
                        ingredientsOpen ? "fa-caret-down" : "fa-caret-right"
                      } icon`}
                    ></i>
                    Ingredients
                  </p>
                  {ingredientsOpen && (
                    <ul className="ingredients">
                      {ingredients.map((data, index) => (
                        <li key={index}>{data}</li>
                      ))}
                    </ul>
                  )}
                  <p>
                    <i
                      onClick={toggleInstructions}
                      className={`fa-solid ${
                        instrictionsOpen ? "fa-caret-down" : "fa-caret-right"
                      } icon`}
                    ></i>
                    Instructions
                  </p>

                  {instrictionsOpen && (
                    <ul className="instructions">
                      {instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  )}

                  <Star cookingTime={time_of_cooking} />
                </div>
                <div className="card-right">
                  <Comments comments={comments} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CardTemplate;
