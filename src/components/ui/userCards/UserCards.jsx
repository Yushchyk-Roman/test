import { React, useEffect, useState } from "react";
import "./UserCards.css";
import Card from "../../cards/CardTemplate.jsx";
import NewCard from "../../features/createCard/CreateCard.jsx";
import Form from "../../form/RecipeForm.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  getUserRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  addRecipeComment,
} from "../../../services/recipeService.js";
import { uploadFile } from "../../../services/storageService.js";

const UserCards = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser, loading } = useAuth();
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCard, setOpenedCard] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      if (!currentUser?.uid) {
        setDataLoading(false);
        return;
      }
      try {
        const data = await getUserRecipes(currentUser.uid);
        setUserCards(data);
      } catch (error) {
        console.error("Не вдалося завантажити власні рецепти:", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (!loading) {
      fetchCards();
    }
  }, [currentUser, loading]);

  const handleSave = async (data, imageFile) => {
    console.log(
      "handleSave triggered with data:",
      data,
      "and imageFile:",
      imageFile
    );
    if (!currentUser || isSaving) {
      return;
    }
    setIsSaving(true);

    const authorName =
      currentUser.displayName || currentUser.email.split("@")[0] || "Anonymous";
    let recipeData = { ...data };

    let updatePayload = {
      title: data.title,
      time_of_cooking: data.time_of_cooking,
      ingredients: data.ingredients,
      instructions: data.instructions,
    };

    try {
      if (imageFile) {
        console.log("Завантаження нового фото...");
        const newImageUrl = await uploadFile(imageFile);
        updatePayload.imageUrl = newImageUrl;
        console.log("Запхав хуй: \n поки що все добре", newImageUrl);
      } else if (editingRecipe) {
            console.log("Запхав хуй");
        updatePayload.imageUrl = editingRecipe.imageUrl;
      } else {
        updatePayload.imageUrl = "/assets/images/default-dish.png";
        console.log("Випхав хуй");
      }

      if (editingRecipe) {
        await updateRecipe(editingRecipe.id, updatePayload);

        setUserCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingRecipe.id
              ? { ...editingRecipe, ...updatePayload }
              : card
          )
        );

        alert("Рецепт успішно оновлено!");
      } else {
        recipeData.authorId = currentUser.uid;
        recipeData.author = authorName;
        recipeData.imageUrl = updatePayload.imageUrl;
        const newRecipe = await createRecipe(
          recipeData,
          currentUser.uid,
          authorName,
          recipeData.imageUrl
        );

        setUserCards((prevCards) => [newRecipe, ...prevCards]);
        alert("Рецепт успішно створено!");
      }

      handleCloseModal();
    } catch (error) {
      console.error(
        `Помилка під час ${editingRecipe ? "оновлення" : "створення"} рецепта:`,
        error
      );
      alert(
        `Помилка при збереженні рецепта: ${error.message}. Спробуйте пізніше.`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (cardData) => {
    setEditingRecipe(cardData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleDelete = async (recipeId) => {
    if (!currentUser) return;
    const confirmed = window.confirm(
      "Ви впевнені, що хочете видалити цей рецепт? Це неможливо скасувати."
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteRecipe(recipeId);

      setUserCards((prevCards) =>
        prevCards.filter((card) => card.id !== recipeId)
      );

      if (openCard === recipeId) {
        setOpenedCard(null);
      }

      console.log("Рецепт успішно видалено:", recipeId);
    } catch (error) {
      console.error("Помилка видалення рецепта:", error);
      alert("Помилка при видаленні рецепта. Спробуйте пізніше.");
    }
  };

  if (loading || dataLoading) {
    return (
      <main className="recipe-template-main-content">
        <p>Завантаження ваших даних...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="recipe-template-main-content">
        <p>Будь ласка, увійдіть, щоб переглянути ваші рецепти.</p>
      </main>
    );
  }
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
              onCancel={handleCloseModal}
              initialData={editingRecipe || {}}
              isSaving={isSaving}
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
        {userCards.length === 0 ? (
          <div className="no-recipes">
            <p>У вас ще немає створених рецептів.</p>
          </div>
        ) : (
          userCards.map((card) => (
            <Card
              key={card.id}
              data={card}
              isAdmin={true}
              isOpen={openCard === card.id}
              onOpen={() => setOpenedCard(card.id)}
              onClose={() => setOpenedCard(null)}
              viewMode={viewMode}
              onDelete={() => handleDelete(card.id)}
              onEdit={handleEdit}
              onAddComment={addRecipeComment}
            />
          ))
        )}
        <NewCard handleClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && (
        <Form
          onSubmit={handleSave}
          onCancel={handleCloseModal}
          initialData={editingRecipe || {}}
          isSaving={isSaving}
        />
      )}
    </main>
  );
};

export default UserCards;
