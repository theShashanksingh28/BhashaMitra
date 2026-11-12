import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import allLanguageData from '@/data/languageDataIndex';
import LanguageDetail from '@/components/LanguageDetail';

const LanguagesPage = () => {
  const { translateText } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  
  // List of 22 official Indian languages
  const indianLanguages = [
    { name: 'Assamese', nativeName: 'অসমীয়া' },
    { name: 'Bengali', nativeName: 'বাংলা' },
    { name: 'Bodo', nativeName: 'बड़ो' },
    { name: 'Dogri', nativeName: 'डोगरी' },
    { name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { name: 'Hindi', nativeName: 'हिन्दी' },
    { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { name: 'Kashmiri', nativeName: 'कॉशुर' },
    { name: 'Konkani', nativeName: 'कोंकणी' },
    { name: 'Maithili', nativeName: 'मैथिली' },
    { name: 'Malayalam', nativeName: 'മലയാളം' },
    { name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
    { name: 'Marathi', nativeName: 'मराठी' },
    { name: 'Nepali', nativeName: 'नेपाली' },
    { name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { name: 'Sanskrit', nativeName: 'संस्कृतम्' },
    { name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { name: 'Sindhi', nativeName: 'سنڌي' },
    { name: 'Tamil', nativeName: 'தமிழ்' },
    { name: 'Telugu', nativeName: 'తెలుగు' },
    { name: 'Urdu', nativeName: 'اردو' }
  ];

  const handleLanguageClick = (languageName) => {
    const language = allLanguageData.find(lang => lang.name === languageName);
    setSelectedLanguage(language || null);
  };

  const handleBackClick = () => {
    setSelectedLanguage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-8 px-4 flex-1">
        {selectedLanguage ? (
          <div>
            <button 
              onClick={handleBackClick}
              className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              ← {translateText('Back to all languages')}
            </button>
            <LanguageDetail language={selectedLanguage} />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
              {translateText('Indian Languages')}
            </h1>
            
            <p className="text-center mb-8 max-w-2xl mx-auto text-gray-600">
              {translateText('India is home to 22 officially recognized languages. Select a language to start learning:')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {indianLanguages.map((language) => (
                <Card 
                  key={language.name}
                  className="hover:shadow-lg transition-shadow cursor-pointer hover:border-indigo-300"
                  onClick={() => handleLanguageClick(language.name)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-indigo-700">{language.nativeName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{language.name}</p>
                    <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800">
                      {translateText('Start Learning')} →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default LanguagesPage;