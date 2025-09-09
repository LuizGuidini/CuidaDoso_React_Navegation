import { SPOONACULAR_KEY } from '@env'; // Certifique-se de usar react-native-dotenv
import axios from 'axios';

export const getRecipes = async (query = 'easy') => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query,
          number: 10,
          addRecipeInformation: true,
          apiKey: SPOONACULAR_KEY,
        }
      }
    );

    return response.data.results; // Array de receitas
  } catch (error) {
    console.log('Erro ao buscar receitas:', error);
    return [];
  }
};
