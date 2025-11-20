import { GoogleGenAI, Type } from "@google/genai";
import { SuggestedItem } from "../types";

export async function getShoppingListSuggestions(prompt: string): Promise<SuggestedItem[] | null> {
  // FIX: Per coding guidelines, the API key is assumed to be available in the environment.
  // The explicit check for process.env.API_KEY has been removed.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Kullanıcının isteği: "${prompt}". Bu isteğe uygun bir alışveriş listesi oluştur. Her ürün için bir kategori de belirt.`,
      config: {
        systemInstruction: `Sen kullanıcılara alışveriş listesi oluşturmada yardımcı olan bir asistansın. Kullanıcının isteğine göre malzeme veya ürün listesi sağla. Her ürün için uygun bir alışveriş reyonu kategorisi (örneğin: "Meyve & Sebze", "Süt Ürünleri", "Et & Tavuk", "Temizlik Malzemeleri", "Diğer") belirtmelisin. YALNIZCA bir JSON nesne dizisi döndür. Her nesne 'name' ve 'category' anahtarlarına sahip olmalıdır. Başka hiçbir metin, açıklama veya markdown biçimlendirmesi ekleme. Örneğin, kullanıcı lazanya malzemeleri isterse, şuna benzer bir yanıt döndür: '[{"name": "kıyma", "category": "Et & Tavuk"}, {"name": "lazanya yaprağı", "category": "Kuru Gıda"}, {"name": "domates sosu", "category": "Konserve & Soslar"}]'`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "Alışveriş listesindeki ürünün adı."
              },
              category: {
                type: Type.STRING,
                description: "Ürünün ait olduğu kategori (örn: Meyve & Sebze)."
              }
            },
            required: ["name", "category"]
          }
        },
      }
    });

    const jsonText = response.text.trim();
    const suggestions = JSON.parse(jsonText);
    
    if (Array.isArray(suggestions) && suggestions.every(item => typeof item.name === 'string' && typeof item.category === 'string')) {
      return suggestions;
    } else {
      console.error("API response is not in the expected format:", suggestions);
      return null;
    }

  } catch (error) {
    console.error("Error fetching suggestions from Gemini API:", error);
    return null;
  }
}
