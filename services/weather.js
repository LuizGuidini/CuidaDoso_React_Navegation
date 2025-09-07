import * as Location from 'expo-location';

export const getWeather = async () => {
  try {
    // Solicitar permissão de localização
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada.');
      return { temp: '--', city: 'Cidade', description: '-' };
    }

    // Obter localização atual
    const location = await Location.getCurrentPositionAsync({});
    if (!location?.coords) return { temp: '--', city: 'Cidade', description: '-' };

    const { latitude, longitude } = location.coords;

    // Substitua aqui pela sua API Key do OpenWeatherMap
    const apiKey = 'c3397714bb395f1c3b2854d9ee0a7cab';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`
    );
    const data = await response.json();

    if (!data || !data.main) return { temp: '--', city: 'Cidade', description: '-' };

    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0]?.description || '-',
      city: data.name || 'Cidade',
    };
  } catch (error) {
    console.log('Erro ao buscar o tempo:', error);
    return { temp: '--', city: 'Cidade', description: '-' };
  }
};
