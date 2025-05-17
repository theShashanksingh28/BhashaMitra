import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = {
  name: string;
  code: string;
};

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  translateText: (text: string) => string;
}

const defaultLanguageContext: LanguageContextType = {
  currentLanguage: 'english',
  setCurrentLanguage: () => {},
  translateText: (text) => text,
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  
  // Simple translation function - in a real app, this would use a translation service
  const translateText = (text: string): string => {
    // This is a simplified mock translation function
    // In a real app, you would use a proper translation service or dictionary
    
    const translations: Record<string, Record<string, string>> = {
      hindi: {
        'Features': 'विशेषताएँ',
        'Benefits': 'लाभ',
        'About': 'हमारे बारे में',
        'Login': 'लॉग इन',
        'Sign Up': 'साइन अप',
        'Languages': 'भाषाएँ',
        'Logout': 'लॉग आउट',
        // Add more translations as needed
      },
      tamil: {
        'Features': 'அம்சங்கள்',
        'Benefits': 'நன்மைகள்',
        'About': 'எங்களை பற்றி',
        'Login': 'உள்நுழைய',
        'Sign Up': 'பதிவு செய்க',
        'Languages': 'மொழிகள்',
        'Logout': 'வெளியேறு',
      },
      // Add more languages as needed
    };
    
    if (currentLanguage === 'english' || !translations[currentLanguage]) {
      return text;
    }
    
    return translations[currentLanguage][text] || text;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        translateText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
