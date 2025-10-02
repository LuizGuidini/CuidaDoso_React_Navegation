import axios from 'axios';

const OPENCAGE_KEY = 'ae72f6a1bcc34b01993acb5e3b8bd6a1';
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export async function geocodeCity(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        key: OPENCAGE_KEY,
        language: 'pt',
        limit: 1,
      },
    });

    if (!response.data.results || response.data.results.length === 0) {
      console.log('Cidade não encontrada:', city);
      return null;
    }

    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lon: lng };
  } catch (error) {
    console.log('Erro na API OpenCage:', error.response?.data || error.message);
    return null;
  }
}
