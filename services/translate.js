// services/translate.js
import axios from "axios";

const API_URL = "https://libretranslate.de/translate"; // servidor público

export async function translateText(text, targetLang = "pt") {
  try {
    const response = await axios.post(
      API_URL,
      {
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.translatedText;
  } catch (error) {
    console.error("Erro na tradução:", error.message);
    return text; // fallback: retorna o original se falhar
  }
}
