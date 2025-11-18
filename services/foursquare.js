import axios from 'axios';

const FOURSQUARE_KEY = 'fsq3H/AeNnfvK9tqF7QR2Zl508oAn4lJ9LFdFGwXGz20j5c=';
const BASE_URL = 'https://api.foursquare.com/v3/places/search';

// Mapeamento de categorias para termos de busca
const categoryMapping = {
  hospital: 'hospital',
  pharmacy: 'pharmacy',
  gym: 'gym',
  restaurant: 'restaurant',
  tourism: 'tourist attraction',
};

// 🔍 Busca lugares por coordenadas (latitude e longitude)
export async function getPlaces(lat, lon, category = 'hospital') {
  try {
    const query = categoryMapping[category] || category;

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: FOURSQUARE_KEY,
        Accept: 'application/json',
      },
      params: {
        ll: `${lat},${lon}`,
        query,
        radius: 5000,
        limit: 20,
        fields: 'fsq_id,name,location',
      },
    });

    return response.data.results.map((item) => ({
      id: item.fsq_id,
      name: item.name,
      address: item.location?.formatted_address || 'Endereço não disponível',
    }));
  } catch (error) {
    console.log('Erro na API Foursquare (coordenadas):', error.response?.data || error.message);
    return [];
  }
}

// 🏙️ Busca lugares por nome de cidade (usando Nominatim para geocodificação)
export async function getPlacesByCity(city, category = 'hospital') {
  try {
    const query = categoryMapping[category] || category;

    // Geocodifica a cidade para obter lat/lon
    const geoResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1,
      },
    });

    if (!geoResponse.data || geoResponse.data.length === 0) {
      console.log('Cidade não encontrada:', city);
      return [];
    }

    const { lat, lon } = geoResponse.data[0];

    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: FOURSQUARE_KEY,
        Accept: 'application/json',
      },
      params: {
        ll: `${lat},${lon}`,
        query,
        radius: 5000,
        limit: 20,
        fields: 'fsq_id,name,location',
      },
    });

    return response.data.results.map((item) => ({
      id: item.fsq_id,
      name: item.name,
      address: item.location?.formatted_address || 'Endereço não disponível',
    }));
  } catch (error) {
    console.log('Erro na API Foursquare (cidade):', error.response?.data || error.message);
    return [];
  }
}
