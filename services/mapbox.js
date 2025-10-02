import axios from 'axios';

const MAPBOX_TOKEN = 'pk.YOUR_MAPBOX_TOKEN'; // substitua pela sua chave pública
const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const categoryMapping = {
  hospital: 'hospital',
  pharmacy: 'pharmacy',
  gym: 'gym',
  restaurant: 'restaurant',
  tourism: 'tourist attraction',
};

export async function searchPlaces(category, lat, lon) {
  try {
    const query = categoryMapping[category] || category;

    const response = await axios.get(`${BASE_URL}/${encodeURIComponent(query)}.json`, {
      params: {
        proximity: `${lon},${lat}`,
        types: 'poi',
        access_token: MAPBOX_TOKEN,
        limit: 20,
        language: 'pt',
      },
    });

    return response.data.features.map((item) => ({
      id: item.id,
      name: item.text,
      address: item.place_name,
    }));
  } catch (error) {
    console.log('Erro na API Mapbox:', error.response?.data || error.message);
    return [];
  }
}
