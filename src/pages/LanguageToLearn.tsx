import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const languagesToLearn = [
  { name: "Assamese", script: "Assamese" },
  { name: "English", script: "Latin" },
  { name: "Bengali", script: "Bengali" },
  { name: "Bodo", script: "Devanagari" },
  { name: "Dogri", script: "Devanagari" },
  { name: "Gujarati", script: "Gujarati" },
  { name: "Hindi", script: "Devanagari" },
  { name: "Kannada", script: "Kannada" },
  { name: "Kashmiri", script: "Perso-Arabic/Devanagari" },
  { name: "Konkani", script: "Devanagari" },
  { name: "Maithili", script: "Devanagari" },
  { name: "Malayalam", script: "Malayalam" },
  { name: "Manipuri", script: "Meitei Mayek" },
  { name: "Marathi", script: "Devanagari" },
  { name: "Nepali", script: "Devanagari" },
  { name: "Odia", script: "Odia" },
  { name: "Punjabi", script: "Gurmukhi" },
  { name: "Sanskrit", script: "Devanagari" },
  { name: "Santali", script: "Ol Chiki" },
  { name: "Sindhi", script: "Arabic/Devanagari" },
  { name: "Tamil", script: "Tamil" },
  { name: "Telugu", script: "Telugu" },
  { name: "Urdu", script: "Perso-Arabic" },
];

export default function LanguagesToLearn() {
  const navigate = useNavigate();
  const [nativeLanguage, setNativeLanguage] = useState<string>('');

  useEffect(() => {
    // Get the native language from localStorage
    const storedNativeLanguage = localStorage.getItem('nativeLanguage');
    if (!storedNativeLanguage) {
      navigate('/native-language');
      return;
    }
    setNativeLanguage(storedNativeLanguage);
  }, [navigate]);

  const handleLanguageSelect = (language: string) => {
    console.log('Selected language to learn:', language);
    console.log('Native language:', nativeLanguage);
    
    if (language === nativeLanguage) {
      console.log('Cannot select native language');
      return;
    }

    // Store the selected language to learn
    localStorage.setItem('languageToLearn', language);
    localStorage.setItem('hasSelectedLanguages', 'true');
    
    // Navigate to the language learning path
    navigate(`/languages/${language}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        What language would you like to learn?
      </h1>

      {nativeLanguage && (
        <p className="text-center text-gray-600 mb-6">
          Your native language: {nativeLanguage}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {languagesToLearn.map((lang) => (
          <button
            key={lang.name}
            onClick={() => handleLanguageSelect(lang.name)}
            disabled={lang.name === nativeLanguage}
            className={`bg-white rounded-2xl shadow hover:shadow-lg p-6 transition w-full text-left
              ${lang.name === nativeLanguage 
                ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                : 'hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500'
              }`}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {lang.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Script: {lang.script}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
