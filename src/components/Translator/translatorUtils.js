// FREE TRANSLATION: LibreTranslate
export const translateText = async (text) => {
    try {
      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "hi",
          format: "text",
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      return data.translatedText;
    } catch (error) {
      return "Translation failed.";
    }
  };
  
  // FREE DICTIONARY API
  export const getWordMeaning = async (word) => {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      return data[0].meanings[0].definitions[0].definition;
    } catch (error) {
      return "Meaning not found.";
    }
  };
  