import axios from 'axios';

const API_KEY = 'dcc61bc6617448129ceca26309ab4444';
const BASE_URL = 'https://api.geoapify.com/v2/places';

const categoryMapping = {
  hospital: 'healthcare.hospital',
  pharmacy: 'healthcare.pharmacy',
  gym: 'sport.fitness',
  restaurant: 'catering.restaurant',
  tourism: 'tourism.attraction',
};

// 🔍 Busca lugares por coordenadas (localização atual)
export async function getPlaces(lat, lon, category = 'tourism') {
  try {
    const type = categoryMapping[category] || 'tourism.attraction';

    const response = await axios.get(BASE_URL, {
      params: {
        categories: type,
        'filter[circle]': `${lon},${lat},5000`, // raio de 5km
        limit: 20,
        apiKey: API_KEY,
      },
    });

    return response.data.features.map((item) => ({
      id: item.properties.place_id,
      name: item.properties.name,
      address: item.properties.formatted,
    }));
  } catch (error) {
    console.log('Erro na API Geoapify (coordenadas):', error.response?.data || error.message);
    return [];
  }
}

// 🏙️ Busca lugares por nome de cidade
export async function getPlacesByCity(city, category = 'tourism') {
  try {
    const type = categoryMapping[category] || 'tourism.attraction';

    // Geocodifica a cidade para obter lat/lon
    const geoResponse = await axios.get('https://api.geoapify.com/v1/geocode/search', {
      params: {
        text: city,
        format: 'json',
        apiKey: API_KEY,
      },
    });

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      console.log('Cidade não encontrada:', city);
      return [];
    }

    const { lat, lon } = geoResponse.data.results[0];

    // Busca lugares com base nas coordenadas da cidade
    const response = await axios.get(BASE_URL, {
      params: {
        categories: type,
        'filter[circle]': `${lon},${lat},5000`,
        limit: 20,
        apiKey: API_KEY,
      },
    });

    return response.data.features.map((item) => ({
      id: item.properties.place_id,
      name: item.properties.name,
      address: item.properties.formatted,
    }));
  } catch (error) {
    console.log('Erro na API Geoapify (cidade):', error.response?.data || error.message);
    return [];
  }
}
