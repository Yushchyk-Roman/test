import React, { useState } from "react";
import "./CardTemplate.css";
import Star from "./StarRating";
import Comments from "./CardComments";
import RecipeForm from "../form/RecipeForm";
import { useAuth } from "../../context/AuthContext";
import {
  toggleCommentLike,
  toggleRecipeLike,
  toggleSavedRecipe,
  rateRecipe,
} from "../../services/recipeService";
const CardTemplate = ({
  data,
  type = "data",
  isOpen,
  onOpen,
  onClose,
  viewMode = "grid",
  onDelete,
  onEdit,
  cardIndex,
  onAddComment,
  onUpdate,
}) => {
  const { currentUser } = useAuth();
  const recipeId = data.id || cardIndex;

  const isOwner = currentUser && currentUser.uid === data.authorId;
  const currentUserId = currentUser?.uid;

  const {
    title,
    imageUrl,
    stars,
    ratings = {},
    seen,
    likes,
    comments,
    likers = [],
    savers = [],
    instructions,
    ingredients,
    author,
    time_of_cooking,
  } = data;

  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [liked, setLiked] = useState(likers.includes(currentUserId));
  const [saved, setSaved] = useState(savers.includes(currentUserId));

  const userRating = ratings[currentUserId] || 0;
  const [currentStars, setCurrentStars] = useState(userRating);

  const [likeCount, setLikeCount] = useState(likers.length);
  const [instrictionsOpen, setInstructionOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [recipeComments, setRecipeComments] = useState(comments);

  const toggleLike = () => {
    if (!currentUser) {
      console.warn("Потрібна автентифікація для лайків.");
      return;
    }
    handleToggleLikeAPI(liked);
  };

  const toggleSave = () => {
    handleToggleSaveAPI(saved);
  };

  const toggleIngredients = () => {
    setIngredientsOpen((prev) => !prev);
  };

  const toggleInstructions = () => {
    setInstructionOpen((prev) => !prev);
  };

  const handleToggleLikeAPI = async (isCurrentlyLiked) => {
    const previousLiked = liked;
    const previousLikeCount = likeCount;

    setLiked(!previousLiked);
    setLikeCount(previousLikeCount + (isCurrentlyLiked ? -1 : 1));

    try {
      await toggleRecipeLike(recipeId, currentUserId, isCurrentlyLiked);

      if (onUpdate) {
        onUpdate(recipeId);
      }
    } catch (error) {
      console.error("Помилка лайку рецепта:", error);
      setLiked(previousLiked);
      setLikeCount(previousLikeCount);
      alert("Не вдалося оновити лайк. Спробуйте пізніше.");
    }
  };
  const handleToggleSaveAPI = async (isCurrentlySaved) => {
    const previousSaved = saved;
    setSaved(!previousSaved);

    try {
      await toggleSavedRecipe(recipeId, currentUserId, isCurrentlySaved);

      if (onUpdate) {
        onUpdate(recipeId);
      }
    } catch (error) {
      console.error("Помилка збереження рецепта:", error);
      setSaved(previousSaved);
      alert("Не вдалося оновити статус збереження. Спробуйте пізніше.");
    }
  };

  const handleAddComment = async () => {
    if (!currentUser || newCommentText.trim() === "") {
      console.warn("Коментар не може бути порожнім.");
      return;
    }

    const commentData = {
      text: newCommentText.trim(),
      author: currentUser.displayName || currentUser.email.split("@")[0],
      authorId: currentUser.uid,
      avatar: currentUser.photoURL || "url_to_default_avatar.png",
      date: new Date().toISOString().slice(0, 10),
      commentId: Date.now().toString(),
    };

    try {
      await onAddComment(recipeId, commentData);
      setRecipeComments((prevComments) => [...prevComments, commentData]);

      setNewCommentText("");
      console.log("Коментар успішно додано.");
    } catch (error) {
      console.error("Помилка відправки коментаря:", error);
      alert("Не вдалося відправити коментар. Спробуйте пізніше.");
    }
  };

  const handleSaveRating = async (newRating) => {
    if (!currentUser) {
      alert("Будь ласка, увійдіть, щоб поставити оцінку.");
      return;
    }

    setCurrentStars(newRating);

    try {
      await rateRecipe(recipeId, currentUserId, newRating);
      if (onUpdate) {
        onUpdate(recipeId);
      }
    } catch (error) {
      console.error("Помилка збереження рейтингу:", error);
      setCurrentStars(userRating);
      alert("Не вдалося зберегти оцінку. Спробуйте пізніше.");
    }
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
                  <i className="fa-solid fa-thumbs-up"></i> {likeCount}
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
                    {isOwner && (
                      <div className="owner-actions">
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(data);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                          }}
                        >
                          Delete
                        </button>
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

                  <Star
                    cookingTime={time_of_cooking}
                    onRatingChange={handleSaveRating}
                    currentRating={currentStars}
                  />
                </div>
                <div className="card-right">
                  <Comments
                    comments={recipeComments}
                    setNewCommentText={setNewCommentText}
                    newCommentText={newCommentText}
                    onSendComment={handleAddComment}
                    isUserLoggedIn={!!currentUser}
                    recipeId={recipeId}
                    onCommentLike={toggleCommentLike}
                    currentUserId={currentUser?.uid}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CardTemplate;
