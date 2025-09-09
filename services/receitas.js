import axios from 'axios';

const SPOONACULAR_KEY = '618e80f8f0a94028bc3fc2d5e820e3a1'; // ou use @env

export const getRandomRecipes = async (number = 10) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=${number}&language=pt&apiKey=${SPOONACULAR_KEY}`
    );
    return response.data.recipes; // array de receitas
  } catch (error) {
    console.log('Erro ao buscar receitas:', error);
    return [];
  }
};

export const searchRecipes = async (query, number = 10) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${number}&addRecipeInformation=true&language=pt&apiKey=${SPOONACULAR_KEY}`
    );
    return response.data.results; // array de receitas
  } catch (error) {
    console.log('Erro ao buscar receitas:', error);
    return [];
  }
};
