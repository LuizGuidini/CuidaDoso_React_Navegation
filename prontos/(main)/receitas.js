import axios from 'axios';

const SPOONACULAR_KEY = '618e80f8f0a94028bc3fc2d5e820e3a1'; // ou use @env

const API_URL = "https://api.spoonacular.com/recipes";

export const getRandomRecipes = async (number = 4) => {
  try {
    const res = await axios.get(`${API_URL}/random`, {
      params: {
        apiKey: SPOONACULAR_KEY,
        number,
      },
    });

    if (!res.data.recipes) return [];

    return res.data.recipes.map((r) => ({
      id: r.id,
      title: r.title || "Sem título",
      image: r.image,
      summary: r.summary || "",
      instructions: r.instructions || "",
      extendedIngredients: r.extendedIngredients || [],
    }));
  } catch (error) {
    console.error("Erro getRandomRecipes:", error.message);
    return [];
  }
};

export const searchRecipes = async (query, number = 4) => {
  try {
    const res = await axios.get(`${API_URL}/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_KEY,
        query,
        number,
        addRecipeInformation: true,
      },
    });

    if (!res.data.results) return [];

    return res.data.results.map((r) => ({
      id: r.id,
      title: r.title || "Sem título",
      image: r.image,
      summary: r.summary || "",
      instructions: r.instructions || "",
      extendedIngredients: r.extendedIngredients || [],
    }));
  } catch (error) {
    console.error("Erro searchRecipes:", error.message);
    return [];
  }
};