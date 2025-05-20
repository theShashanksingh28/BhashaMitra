import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

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
  const { currentUser } = useAuth();

  const handleLanguageSelect = async (language: string) => {
    try {
      if (!currentUser) {
        toast.error("Please log in to continue");
        navigate("/login");
        return;
      }

      // Save to Firebase
      await setDoc(doc(db, "users", currentUser.uid), {
        nativeLanguage: language,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Store in localStorage for immediate access
      localStorage.setItem('nativeLanguage', language);
      localStorage.setItem('hasSelectedLanguages', 'true');
      
      toast.success("Native language saved successfully!");
      // Navigate to dashboard instead of language selection
      navigate('/dashboard');
    } catch (error) {
      console.error("Error saving native language:", error);
      toast.error("Failed to save native language. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Select Your Native Language
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Choose the language you are most comfortable speaking. You can select any language from the list below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {languages.map((lang) => (
            <button
              key={lang.name}
              onClick={() => handleLanguageSelect(lang.name)}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition duration-200 text-left w-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <h2 className="text-xl font-semibold text-gray-800">{lang.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Script: {lang.script}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
