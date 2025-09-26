import axios from 'axios';

export const traduzirTexto = async (texto, destino = 'pt') => {
  try {
    const res = await axios.post('https://libretranslate.de/translate', {
      q: texto,
      source: 'en',
      target: destino,
      format: 'text',
    });
    return res.data.translatedText;
  } catch (error) {
    console.error('Erro ao traduzir texto:', error.message);
    return texto;
  }
};
