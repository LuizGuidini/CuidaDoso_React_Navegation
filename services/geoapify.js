import axios from 'axios';

const API_KEY = 'dcc61bc6617448129ceca26309ab4444';
const BASE_URL = 'https://api.geoapify.com/v2/places';

const categoryMapping = {
  hospital: 'healthcare.hospital',
  pharmacy: 'healthcare.pharmacy',
  gym: 'sports.fitness',
  restaurant: 'catering.restaurant',
  tourism: 'tourism.attraction',
};

// Busca lugares por coordenadas
export async function getPlaces(lat, lon, category = 'tourism') {
  try {
    const type = categoryMapping[category] || 'tourism.attraction';
    const response = await axios.get(BASE_URL, {
      params: {
        categories: type,
        'filter[circle]': `${lon},${lat},5000`, // 5km
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
    console.log('Erro na API Geoapify:', error.response?.data || error.message);
    return [];
  }
}

// Busca lugares por cidade
export async function getPlacesByCity(city, category = 'tourism') {
  try {
    const type = categoryMapping[category] || 'tourism.attraction';

    // Geocodificar a cidade
    const geoResponse = await axios.get('https://api.geoapify.com/v1/geocode/search', {
      params: {
        text: city,
        format: 'json',
        apiKey: API_KEY,
      },
    });

    if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
      console.log('Cidade não encontrada');
      return [];
    }

    const { lat, lon } = geoResponse.data.features[0].properties;

    // Busca lugares usando coordenadas da cidade
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
