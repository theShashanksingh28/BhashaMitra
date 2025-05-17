import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  "Assamese", "English", "Bengali", "Bodo", "Dogri", "Gujarati",
  "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili", "Malayalam",
  "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi", "Sanskrit",
  "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"
];

const LanguageToLearn: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [nativeLanguage, setNativeLanguage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedNativeLanguage = localStorage.getItem('nativeLanguage');
    if (!storedNativeLanguage) {
      navigate('/native-language');
      return;
    }
    setNativeLanguage(storedNativeLanguage);
  }, [navigate]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('languageToLearn', language);
    localStorage.setItem('hasSelectedLanguages', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Which language would you like to learn?
        </h1>
        
        {nativeLanguage && (
          <p className="text-center text-gray-400 mb-6">
            Your native language: {nativeLanguage}
          </p>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {LANGUAGES.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageSelect(language)}
              className={`p-3 rounded-lg text-center transition-colors ${
                selectedLanguage === language
                  ? 'bg-green-600 cursor-not-allowed'
                  : language === nativeLanguage
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={selectedLanguage === language || language === nativeLanguage}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageToLearn; 