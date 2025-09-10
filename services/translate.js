// services/translate.js
import axios from "axios";

const BASE_URL = "https://libretranslate.de/translate";

export async function translateText(text, targetLang = "pt") {
  if (!text) return "";

  try {
    const response = await axios.post(BASE_URL, {
      q: text,
      source: "en",
      target: targetLang,
      format: "text",
    });

    return response.data.translatedText;
  } catch (error) {
    console.error("Erro ao traduzir com LibreTranslate:", error.message);
    return text; // fallback
  }
}
