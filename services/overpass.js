import axios from 'axios';

const BASE_URL = 'https://overpass-api.de/api/interpreter';

// Mapeia categorias para tags do OpenStreetMap
const categoryTags = {
  hospital: 'amenity=hospital',
  pharmacy: 'amenity=pharmacy',
  gym: 'leisure=fitness_centre',
  restaurant: 'amenity=restaurant',
  tourism: 'tourism=attraction',
};

export async function searchPlaces(category, lat, lon) {
  try {
    const tag = categoryTags[category] || 'amenity=hospital';

    const query = `
      [out:json];
      (
        node[${tag}](around:5000,${lat},${lon});
        way[${tag}](around:5000,${lat},${lon});
        relation[${tag}](around:5000,${lat},${lon});
      );
      out center;
    `;

    const response = await axios.post(BASE_URL, query, {
      headers: { 'Content-Type': 'text/plain' },
    });

    return response.data.elements.map((item) => ({
      id: item.id,
      name: item.tags?.name || 'Sem nome',
      address: item.tags?.['addr:street'] || 'Endereço não disponível',
    }));
  } catch (error) {
    console.log('Erro na API Overpass:', error.response?.data || error.message);
    return [];
  }
}
