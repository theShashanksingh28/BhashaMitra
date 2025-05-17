import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const LANGUAGES = [
  "Assamese", "English", "Bengali", "Bodo", "Dogri", "Gujarati",
  "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili", "Malayalam",
  "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi", "Sanskrit",
  "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"
];

const LanguageToLearn: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [nativeLanguage, setNativeLanguage] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if native language is selected
    const storedNativeLanguage = localStorage.getItem('nativeLanguage');
    if (!storedNativeLanguage) {
      navigate('/native-language');
      return;
    }
    setNativeLanguage(storedNativeLanguage);

    // Clear any previously selected language to learn
    localStorage.removeItem('languageToLearn');
    localStorage.removeItem('hasSelectedLanguages');
  }, [navigate]);

  const handleLanguageSelect = (language: string) => {
    console.log('Selected language:', language);
    console.log('Native language:', nativeLanguage);
    
    if (language === nativeLanguage) {
      console.log('Cannot select native language');
      return;
    }

    setSelectedLanguage(language);
    localStorage.setItem('languageToLearn', language);
    localStorage.setItem('hasSelectedLanguages', 'true');
    
    console.log('Navigating to:', `/languages/${language}`);
    navigate(`/languages/${language}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <button 
                  className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
                <div className="ml-4 flex items-center">
                  <span className="font-bold text-2xl text-indigo-600">BHASHA-MITRA</span>
                  <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Beta</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Language Selection Content */}
        <div className="flex-1 bg-gray-900 text-white p-4">
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
      </div>
    </div>
  );
};

export default LanguageToLearn; 