import { React, useState } from "react";
import "./RecipeForm.css";

const RecipeForm = ({ initialData = {}, onSubmit, onCancel, isSaving }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [ingredientsText, setIngredientsText] = useState(
    initialData.ingredients ? initialData.ingredients.join(", ") : ""
  );
  const [instructionsText, setInstructionsText] = useState(
    initialData.instructions ? initialData.instructions.join(". ") : ""
  );
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const [timeOfCooking, setTimeOfCooking] = useState(
    initialData.time_of_cooking || ""
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const isFormValid =
    title.trim() &&
    timeOfCooking > 0 &&
    ingredientsText.trim().length > 0 &&
    instructionsText.trim().length > 0 &&
    (imageUrl.trim() || selectedFile);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredients = ingredientsText
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const instructions = instructionsText
      .split(".")
      .map((i) => i.trim())
      .filter(Boolean);

    const payload = {
      title,
      time_of_cooking: parseInt(timeOfCooking, 10),
      ingredients,
      instructions,
    };
    onSubmit(payload, selectedFile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    } else {
      setSelectedFile(null);
      if (imageUrl !== initialData.imageUrl) {
        setImageUrl(initialData.imageUrl || "");
      }
    }
  };

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="bg-form-edit" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onCancel}>
          ×
        </button>
        <form className="edit-form" onSubmit={handleSubmit}>
          <h3>
            {initialData.id ? "Edit Recipe" : "Create New Recipe"}
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </h3>

          <label htmlFor="title">
            <i className="fa-solid fa-utensils"></i> RECIPE TITLE
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="img-upload">
            <i className="fa-solid fa-image"></i> IMAGE
          </label>
          <input
            id="img-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {(imageUrl || initialData.imageUrl) && (
            <img
              src={imageUrl || initialData.imageUrl}
              alt="preview"
              className="img-preview"
            />
          )}

          <label htmlFor="time-of-cooking">
            <i className="fa-solid fa-clock"></i> TIME OF COOKING
          </label>
          <input
            id="time-of-cooking"
            type="number"
            min="0"
            value={timeOfCooking}
            onChange={(e) => setTimeOfCooking(e.target.value)}
          />

          <label htmlFor="ingredients">
            <i className="fa-solid fa-bars"></i> INGREDIENTS
          </label>
          <textarea
            id="ingredients"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />

          <label htmlFor="instructions">
            <i className="fa-solid fa-book-open"></i> COOKING INSTRUCTIONS
          </label>
          <textarea
            id="instructions"
            value={instructionsText}
            onChange={(e) => setInstructionsText(e.target.value)}
          />

          <div className="edit-actions">
            <button
              type="submit"
              className="save-changes"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              {initialData.id ? "Save" : "Create"}
            </button>
            <button className="cancel-changes" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>

          {!isFormValid && (
            <p className="form-warning">Please fill in all fields correctly.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
