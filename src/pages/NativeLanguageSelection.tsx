import React from "react";
import { useNavigate } from "react-router-dom";

const languages = [
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

export default function NativeLanguageSelection() {
  const navigate = useNavigate();

  const handleLanguageSelect = (language: string) => {
    console.log('Selected native language:', language);
    // Store the selected native language
    localStorage.setItem('nativeLanguage', language);
    // Navigate to the language selection page
    navigate('/language-selection');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        What language do you speak natively?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {languages.map((lang) => (
          <button
            key={lang.name}
            onClick={() => handleLanguageSelect(lang.name)}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-200 text-left w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <h2 className="text-xl font-semibold">{lang.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Script: {lang.script}</p>
          </button>
        ))}
      </div>
    </div>
  );
}