import axios from 'axios';

// Substitua pela sua chave da Geoapify
const GEOAPIFY_API_KEY = '83305EB3B842427EB928BC6D6014821A';

export const getPlaces = async (latitude, longitude, category = 'hospital') => {
  try {
    const radius = 5000; // raio em metros
    const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},${radius}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;

    const response = await axios.get(url);
    return response.data.features; // retorna array de lugares
  } catch (error) {
    console.log('Erro na API Geoapify:', error);
    return [];
  }
};
