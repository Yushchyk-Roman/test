import {React, useState} from "react"
import "./OpenCard.css"

const OpenCard = (data, isOpen, onOpen, onCancel, onClose) =>{
    return (
    <>
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
    </>);
};

export default OpenCard;